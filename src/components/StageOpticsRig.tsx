import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StageOpticsRigProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export function StageOpticsRig({ scrollProgress, mousePos }: StageOpticsRigProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const leftSpotRef = useRef<THREE.SpotLight | null>(null);
  const rightSpotRef = useRef<THREE.SpotLight | null>(null);
  const centerRingRef = useRef<THREE.Mesh | null>(null);
  const dustParticlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x070A13, 0.05);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.4, 8.0);
    cameraRef.current = camera;

    // 2. High-Performance / Crisp Antialiased Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Tối ưu độ nét cho màn hình Retina/4K
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 3. Stage Platform Group
    const stageGroup = new THREE.Group();
    stageGroupRef.current = stageGroup;
    scene.add(stageGroup);

    // Bục sân khấu chính (Sàn gương phản chiếu Obsidian Mirror)
    const stageFloorGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.3, 64);
    const stageFloorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0f1d,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95
    });
    const stageFloor = new THREE.Mesh(stageFloorGeo, stageFloorMat);
    stageFloor.position.y = -1.8;
    stageGroup.add(stageFloor);

    // Vòng đèn LED Neon bao quanh mép bục
    const neonRingGeo = new THREE.TorusGeometry(4.24, 0.04, 16, 120);
    const neonRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9
    });
    const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = -1.65;
    stageGroup.add(neonRing);

    // Vòng khẩu độ quang học xoay lơ lửng phía sau sân khấu
    const centerRingGeo = new THREE.TorusGeometry(2.2, 0.025, 16, 100);
    const centerRingMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    centerRing.position.set(0, 0.5, -2);
    stageGroup.add(centerRing);
    centerRingRef.current = centerRing;

    // 4. Volumetric Light Cones (Chùm tia sáng đèn rọi sân khấu)
    const coneGeo = new THREE.ConeGeometry(2.0, 8.5, 32, 1, true);
    
    // Tia sáng trái: Tím Violet Sự Kiện
    const leftBeamMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const leftBeam = new THREE.Mesh(coneGeo, leftBeamMat);
    leftBeam.position.set(-3.2, 2.2, 0);
    leftBeam.rotation.z = -Math.PI / 7;
    stageGroup.add(leftBeam);

    // Tia sáng phải: Xanh Cyan
    const rightBeamMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const rightBeam = new THREE.Mesh(coneGeo, rightBeamMat);
    rightBeam.position.set(3.2, 2.2, 0);
    rightBeam.rotation.z = Math.PI / 7;
    stageGroup.add(rightBeam);

    // 5. Dynamic Spotlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const leftSpot = new THREE.SpotLight(0xa855f7, 5.0, 25, Math.PI / 6, 0.5, 1.2);
    leftSpot.position.set(-5, 6, 3);
    leftSpot.target = stageFloor;
    scene.add(leftSpot);
    leftSpotRef.current = leftSpot;

    const rightSpot = new THREE.SpotLight(0x06b6d4, 4.8, 25, Math.PI / 6, 0.5, 1.2);
    rightSpot.position.set(5, 5.5, 3);
    rightSpot.target = stageFloor;
    scene.add(rightSpot);
    rightSpotRef.current = rightSpot;

    // 6. Kim tuyến & Bụi Ánh Sáng Sự Kiện (Stage Confetti Particles)
    const pCount = 550;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);

    const cViolet = new THREE.Color(0xa855f7);
    const cCyan = new THREE.Color(0x38bdf8);
    const cGold = new THREE.Color(0xfbbf24);

    for (let i = 0; i < pCount; i++) {
      const idx = i * 3;
      pPositions[idx] = (Math.random() - 0.5) * 22;
      pPositions[idx + 1] = Math.random() * 8.5 - 1.8;
      pPositions[idx + 2] = (Math.random() - 0.5) * 18;

      const rand = Math.random();
      const col = rand > 0.65 ? cGold : rand > 0.3 ? cCyan : cViolet;
      pColors[idx] = col.r;
      pColors[idx + 1] = col.g;
      pColors[idx + 2] = col.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(pGeo, pMat);
    dustParticlesRef.current = dustParticles;
    scene.add(dustParticles);

    // Resize Handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Render Loop (60 FPS Motion)
    const clock = new THREE.Clock();
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Quét đèn rọi nhịp nhàng như live stage
      if (leftSpotRef.current) {
        leftSpotRef.current.position.x = -5 + Math.sin(elapsed * 0.75) * 0.9;
      }
      if (rightSpotRef.current) {
        rightSpotRef.current.position.x = 5 + Math.cos(elapsed * 0.65) * 0.9;
      }
      if (centerRingRef.current) {
        centerRingRef.current.rotation.z = elapsed * 0.08;
      }
      if (dustParticlesRef.current) {
        dustParticlesRef.current.rotation.y = elapsed * 0.015;
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
      stageFloorGeo.dispose();
      stageFloorMat.dispose();
      neonRingGeo.dispose();
      neonRingMat.dispose();
      centerRingGeo.dispose();
      centerRingMat.dispose();
      coneGeo.dispose();
      leftBeamMat.dispose();
      rightBeamMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 8. Tương tác cuộn mượt mà (Scroll Interpolation & Parallax Damping)
  useEffect(() => {
    if (!cameraRef.current || !stageGroupRef.current) return;

    const p = scrollProgress;
    const cam = cameraRef.current;
    const stage = stageGroupRef.current;

    let targetCamX = 0;
    let targetCamY = 1.4;
    let targetCamZ = 8.0;
    let targetStageY = 0;
    let targetStageRotX = 0;

    if (p <= 0.25) {
      // Hero: Góc máy đối xứng trực diện, bục sàn nằm phía dưới tôn vinh nội dung
      const t = p / 0.25;
      targetCamX = THREE.MathUtils.lerp(0, -1.8, t);
      targetCamY = THREE.MathUtils.lerp(1.4, 0.9, t);
      targetCamZ = THREE.MathUtils.lerp(8.0, 7.0, t);
      targetStageRotX = THREE.MathUtils.lerp(0, 0.06, t);
    } else if (p <= 0.55) {
      // Projects: Nâng góc máy cao (High-angle) nhìn xuống sàn bóng gương
      const t = (p - 0.25) / 0.3;
      targetCamX = THREE.MathUtils.lerp(-1.8, 1.9, t);
      targetCamY = THREE.MathUtils.lerp(0.9, 1.9, t);
      targetCamZ = THREE.MathUtils.lerp(7.0, 6.2, t);
      targetStageY = THREE.MathUtils.lerp(0, 0.35, t);
      targetStageRotX = THREE.MathUtils.lerp(0.06, 0.14, t);
    } else if (p <= 0.8) {
      // Experience: Góc nhìn bao quát dàn đèn sân khấu hoành tráng
      const t = (p - 0.55) / 0.25;
      targetCamX = THREE.MathUtils.lerp(1.9, -1.3, t);
      targetCamY = THREE.MathUtils.lerp(1.9, 1.1, t);
      targetCamZ = THREE.MathUtils.lerp(6.2, 7.2, t);
      targetStageRotX = THREE.MathUtils.lerp(0.14, 0.04, t);
    } else {
      // Contact: Toàn cảnh đêm hội tụ sang trọng
      const t = (p - 0.8) / 0.2;
      targetCamX = THREE.MathUtils.lerp(-1.3, 0, t);
      targetCamY = THREE.MathUtils.lerp(1.1, 0.7, t);
      targetCamZ = THREE.MathUtils.lerp(7.2, 8.2, t);
      targetStageRotX = 0;
    }

    // Parallax theo chuyển động chuột
    const mouseOffsetX = mousePos.x * 0.42;
    const mouseOffsetY = mousePos.y * 0.32;

    cam.position.x += (targetCamX + mouseOffsetX - cam.position.x) * 0.07;
    cam.position.y += (targetCamY - mouseOffsetY - cam.position.y) * 0.07;
    cam.position.z += (targetCamZ - cam.position.z) * 0.07;
    cam.lookAt(0, -0.3, 0);

    stage.rotation.x += (targetStageRotX - stage.rotation.x) * 0.07;
    stage.position.y += (targetStageY - stage.position.y) * 0.07;
  }, [scrollProgress, mousePos]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true" 
    />
  );
}
