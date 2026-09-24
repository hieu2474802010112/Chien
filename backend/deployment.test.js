import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomBytes } from 'node:crypto';

test('production serves frontend and protects contact administration', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'chien-test-'));
  const pin = randomBytes(24).toString('hex');
  const port = 15000 + Math.floor(Math.random() * 30000);
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['backend/index.js'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: String(port), ADMIN_PIN: pin, DATA_DIR: dir },
    stdio: 'ignore'
  });
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      try { if ((await fetch(`${base}/api/health`)).ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'server should start');
    for (const route of ['/', '/admin']) {
      const response = await fetch(base + route);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /text\/html/);
      assert.match(await response.text(), /<div id="root">/);
    }
    const cv = await fetch(`${base}/cv.pdf`);
    assert.equal(cv.status, 200);
    assert.match(cv.headers.get('content-type'), /application\/pdf/);
    for (const route of ['/contacts', '/stats', '/contacts/stream', '/contacts/by-email/demo@example.com']) {
      assert.equal((await fetch(`${base}/api${route}`)).status, 401);
    }
    const login = (value) => fetch(`${base}/api/auth/verify-pin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: value }) });
    assert.equal((await login('ChienPR')).status, 401);
    const auth = await login(pin);
    assert.equal(auth.status, 200);
    const setCookie = auth.headers.get('set-cookie');
    assert.match(setCookie, /HttpOnly/);
    assert.match(setCookie, /Secure/);
    assert.match(setCookie, /SameSite=Strict/);
    const cookie = setCookie.split(';')[0];
    const submitted = await fetch(`${base}/api/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Deployment test', email: 'demo@example.com', phone: '0000000000', company: 'Demo', topic: 'Test', message: 'Synthetic deployment smoke test' }) });
    assert.equal(submitted.status, 201);
    const id = (await submitted.json()).data.id;
    const contacts = await fetch(`${base}/api/contacts`, { headers: { cookie } });
    assert.equal((await contacts.json()).data.length, 1);
    assert.equal((await fetch(`${base}/api/contacts/${id}`, { method: 'DELETE' })).status, 401);
    assert.equal((await fetch(`${base}/api/contacts/${id}/status`, { method: 'PATCH', headers: { cookie, 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'in_progress' }) })).status, 200);
    assert.equal((await fetch(`${base}/api/contacts/clear`, { method: 'POST', headers: { cookie, Origin: 'https://untrusted.example' } })).status, 403);
    const stream = await fetch(`${base}/api/contacts/stream`, { headers: { cookie } });
    assert.equal(stream.status, 200);
    assert.match(stream.headers.get('content-type'), /text\/event-stream/);
    await stream.body.cancel();
    assert.equal((await fetch(`${base}/api/auth/logout`, { method: 'POST', headers: { cookie } })).status, 200);
    assert.equal((await fetch(`${base}/api/contacts`, { headers: { cookie } })).status, 401);
  } finally {
    const exited = new Promise(resolve => child.once('exit', resolve));
    child.kill();
    await exited;
    await rm(dir, { recursive: true, force: true });
  }
});
