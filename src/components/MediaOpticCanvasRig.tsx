import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MediaOpticCanvasRigProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export function MediaOpticCanvasRig({ scrollProgress, mousePos }: MediaOpticCanvasRigProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const prismCoreRef = useRef<THREE.Mesh | null>(null);
  const lensRingsGroupRef = useRef<THREE.Group | null>(null);
  const bokehFieldRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Ánh sáng Cinematic Studio
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const rimWarmLight = new THREE.PointLight(0x818cf8, 3.2, 18);
    rimWarmLight.position.set(-5, -3, -2);
    scene.add(rimWarmLight);

    const cyanSpot = new THREE.PointLight(0x10b981, 2.5, 14);
    cyanSpot.position.set(2, -4, 3);
    scene.add(cyanSpot);

    // 1. Quả cầu lăng kính trung tâm (Hội tụ thông tin PR & Media)
    const prismGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      transmission: 0.2,
      wireframe: false
    });
    const prismCore = new THREE.Mesh(prismGeo, prismMat);
    prismCoreRef.current = prismCore;
    scene.add(prismCore);

    // Khung lưới quang học bọc ngoài (Wireframe Focus)
    const wireGeo = new THREE.IcosahedronGeometry(1.36, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    prismCore.add(wireMesh);

    // 2. Vòng khẩu độ ống kính (Aperture Rings)
    const lensRingsGroup = new THREE.Group();
    lensRingsGroupRef.current = lensRingsGroup;

    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(2.1 + i * 0.4, 2.13 + i * 0.4, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x38bdf8 : i === 1 ? 0x818cf8 : 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28 - i * 0.06
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.35 * (i + 1);
      ring.rotation.y = Math.PI * 0.2 * (i + 1);
      lensRingsGroup.add(ring);
    }
    scene.add(lensRingsGroup);

    // 3. Đốm sáng điện ảnh Bokeh (Cinematic Flare Particles)
    const bokehCount = 650;
    const positions = new Float32Array(bokehCount * 3);
    const colors = new Float32Array(bokehCount * 3);

    const cBlue = new THREE.Color(0x38bdf8);
    const cEmerald = new THREE.Color(0x10b981);
    const cWhite = new THREE.Color(0xf8fafc);

    for (let i = 0; i < bokehCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 26;
      positions[idx + 1] = (Math.random() - 0.5) * 26;
      positions[idx + 2] = (Math.random() - 0.5) * 22 - 3;

      const pick = Math.random();
      const col = pick > 0.6 ? cBlue : pick > 0.3 ? cEmerald : cWhite;
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    const bokehGeo = new THREE.BufferGeometry();
    bokehGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    bokehGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const bokehField = new THREE.Points(bokehGeo, bokehMat);
    bokehFieldRef.current = bokehField;
    scene.add(bokehField);

    // Xử lý co giãn màn hình
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Vòng lặp Render (Ambient Animation Loop)
    const clock = new THREE.Clock();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (prismCoreRef.current) {
        prismCoreRef.current.rotation.x = elapsed * 0.15;
        prismCoreRef.current.rotation.y = elapsed * 0.22;
      }
      if (lensRingsGroupRef.current) {
        lensRingsGroupRef.current.rotation.z = elapsed * 0.08;
      }
      if (bokehFieldRef.current) {
        bokehFieldRef.current.rotation.y = elapsed * 0.015;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      prismGeo.dispose();
      prismMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      bokehGeo.dispose();
      bokehMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Điều hướng chuyển động 3D theo từng mốc cuộn trang (Waypoints Lerp)
  useEffect(() => {
    if (!cameraRef.current || !prismCoreRef.current) return;

    const p = scrollProgress; // 0 -> 1
    const cam = cameraRef.current;
    const core = prismCoreRef.current;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 7.5;
    let targetCoreX = 0;
    let targetCoreY = 0;
    let targetCoreScale = 1;

    if (p <= 0.25) {
      // Hero: Nằm cân đối bên phải để nhường chỗ cho tiêu đề bên trái
      const t = p / 0.25;
      targetX = THREE.MathUtils.lerp(0, -1.8, t);
      targetY = THREE.MathUtils.lerp(0, 0.3, t);
      targetZ = THREE.MathUtils.lerp(7.5, 6.4, t);
      targetCoreX = THREE.MathUtils.lerp(0, 1.9, t);
      targetCoreScale = THREE.MathUtils.lerp(1, 1.1, t);
    } else if (p <= 0.55) {
      // Projects: Nghiêng sang trái để làm nổi bật 2 thẻ Dự án 1M views & Seller
      const t = (p - 0.25) / 0.3;
      targetX = THREE.MathUtils.lerp(-1.8, 1.8, t);
      targetY = THREE.MathUtils.lerp(0.3, -0.8, t);
      targetZ = THREE.MathUtils.lerp(6.4, 5.8, t);
      targetCoreX = THREE.MathUtils.lerp(1.9, -1.9, t);
      targetCoreScale = THREE.MathUtils.lerp(1.1, 0.95, t);
    } else if (p <= 0.8) {
      // Kinh nghiệm & Sự kiện: Zoom gần tạo cảm giác hội tụ
      const t = (p - 0.55) / 0.25;
      targetX = THREE.MathUtils.lerp(1.8, -1.5, t);
      targetY = THREE.MathUtils.lerp(-0.8, 0.4, t);
      targetZ = THREE.MathUtils.lerp(5.8, 6.0, t);
      targetCoreX = THREE.MathUtils.lerp(-1.9, 1.6, t);
      targetCoreScale = THREE.MathUtils.lerp(0.95, 1.05, t);
    } else {
      // Liên hệ: Trở về trung tâm với góc nhìn bao quát
      const t = (p - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(-1.5, 0, t);
      targetY = THREE.MathUtils.lerp(0.4, 0.2, t);
      targetZ = THREE.MathUtils.lerp(6.0, 7.2, t);
      targetCoreX = THREE.MathUtils.lerp(1.6, 0, t);
      targetCoreScale = THREE.MathUtils.lerp(1.05, 1.0, t);
    }

    // Parallax nhẹ theo chuột
    const mouseOffsetX = mousePos.x * 0.35;
    const mouseOffsetY = mousePos.y * 0.25;

    cam.position.x += (targetX + mouseOffsetX - cam.position.x) * 0.08;
    cam.position.y += (targetY - mouseOffsetY - cam.position.y) * 0.08;
    cam.position.z += (targetZ - cam.position.z) * 0.08;
    cam.lookAt(0, 0, 0);

    core.position.x += (targetCoreX - core.position.x) * 0.08;
    core.position.y += (targetCoreY - core.position.y) * 0.08;

    const scaleLerp = THREE.MathUtils.lerp(core.scale.x, targetCoreScale, 0.08);
    core.scale.set(scaleLerp, scaleLerp, scaleLerp);
  }, [scrollProgress, mousePos]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true" 
    />
  );
}
