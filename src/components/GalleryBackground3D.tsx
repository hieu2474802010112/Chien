import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface GalleryBackground3DProps {
  /** Màu nền không gian (mặc định than chì #151719) */
  backgroundColor?: string;
  /** Màu kim loại của khung hình (mặc định #292D31) */
  frameColor?: string;
  /** Màu ánh sáng điểm nhấn viền (mặc định champagne #C7B895) */
  accentColor?: string;
  /** Hệ số cường độ chuyển động (mặc định 1.0) */
  motionIntensity?: number;
  /** Ảnh trưng bày khung chính (tùy chọn) */
  mainImage?: string;
  /** Ảnh khung phụ trái (tùy chọn) */
  leftSubImage?: string;
  /** Ảnh khung phụ phải (tùy chọn) */
  rightSubImage?: string;
  /** Bật/tắt hoạt ảnh chuyển động */
  isAnimated?: boolean;
  /** Tiến độ cuộn trang (0.0 đến 1.0), nếu không truyền sẽ tự động theo dõi cuộn của window */
  scrollProgress?: number;
  /** ClassName tùy biến cho container */
  className?: string;
}

export function GalleryBackground3D({
  backgroundColor = '#151719',
  frameColor = '#292D31',
  accentColor = '#C7B895',
  motionIntensity = 1.0,
  mainImage,
  leftSubImage,
  rightSubImage,
  isAnimated = true,
  scrollProgress: externalScrollProgress,
  className = '',
}: GalleryBackground3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const stateRef = useRef({
    scrollProgress: 0,
    mouseTarget: { x: 0, y: 0 },
    mouseCurrent: { x: 0, y: 0 },
    isVisible: true,
    isMobile: false,
    prefersReducedMotion: false,
  });

  // Theo dõi cuộn trang tự động nếu không truyền externalScrollProgress
  useEffect(() => {
    if (externalScrollProgress !== undefined) {
      stateRef.current.scrollProgress = Math.min(Math.max(externalScrollProgress, 0), 1);
      return;
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        stateRef.current.scrollProgress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      } else {
        stateRef.current.scrollProgress = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [externalScrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Kiểm tra WebGL
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 2. Kiểm tra prefers-reduced-motion & mobile
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.prefersReducedMotion = mediaQueryMotion.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.prefersReducedMotion = e.matches;
    };
    mediaQueryMotion.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      stateRef.current.isMobile = window.innerWidth < 768;
    };
    checkMobile();

    // 3. Khởi tạo Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    scene.fog = new THREE.FogExp2(backgroundColor, 0.045);

    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      60
    );
    // Vị trí camera ban đầu
    camera.position.set(0, 0.1, 7.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        powerPreference: 'high-performance',
        antialias: true,
        alpha: false,
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Track assets for cleanup
    const disposables: {
      geometries: THREE.BufferGeometry[];
      materials: THREE.Material[];
      textures: THREE.Texture[];
    } = {
      geometries: [],
      materials: [],
      textures: [],
    };

    const textureLoader = new THREE.TextureLoader();

    // 4. Hệ thống chiếu sáng Studio Tinh Tế
    const ambientLight = new THREE.AmbientLight(0xf5f3ee, 0.7);
    scene.add(ambientLight);

    // Đèn chính ấm từ trên xuống (Warm Studio Key Light)
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    keyLight.position.set(2.5, 5.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Đèn rim viền màu Champagne (#C7B895)
    const champagneRimLight = new THREE.PointLight(new THREE.Color(accentColor), 2.2, 16, 1.8);
    champagneRimLight.position.set(3.5, 2.5, 2.0);
    scene.add(champagneRimLight);

    // Đèn fill phụ dịu nhẹ
    const softFillLight = new THREE.DirectionalLight(0xdfe4ea, 0.6);
    softFillLight.position.set(-4.0, 1.5, 3.0);
    scene.add(softFillLight);

    // 5. Sàn tối bóng mờ (Subtle Dark Ground with Soft Reflections)
    const floorGeo = new THREE.PlaneGeometry(35, 35);
    disposables.geometries.push(floorGeo);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111315,
      roughness: 0.65,
      metalness: 0.25,
    });
    disposables.materials.push(floorMat);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.6;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // 6. Tạo Khung 3D Có Chiều Sâu & Lòng Khung Trung Tính
    // Group chứa toàn bộ các khung (Tập trung ở trung tâm & bên phải: x ≈ +1.0)
    const galleryGroup = new THREE.Group();
    galleryGroup.position.set(0.95, 0.05, 0);
    scene.add(galleryGroup);

    // Hàm tạo 1 khung tranh 3D hoàn chỉnh (Khung kim loại mờ + Lòng khung)
    const createPictureFrame = (
      width: number,
      height: number,
      depth: number,
      borderThickness: number,
      imageUrl?: string
    ) => {
      const frameGroup = new THREE.Group();

      // A. Khung kim loại mờ #292D31
      const frameMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(frameColor),
        roughness: 0.42,
        metalness: 0.8,
        clearcoat: 0.12,
        clearcoatRoughness: 0.35,
        reflectivity: 0.5,
      });
      disposables.materials.push(frameMat);

      // 4 cạnh của khung (Viền mảnh, sắc nét)
      const topBottomGeo = new THREE.BoxGeometry(width, borderThickness, depth);
      const leftRightGeo = new THREE.BoxGeometry(borderThickness, height - borderThickness * 2, depth);
      disposables.geometries.push(topBottomGeo, leftRightGeo);

      const topBorder = new THREE.Mesh(topBottomGeo, frameMat);
      topBorder.position.y = height / 2 - borderThickness / 2;
      topBorder.castShadow = true;
      topBorder.receiveShadow = true;
      frameGroup.add(topBorder);

      const bottomBorder = new THREE.Mesh(topBottomGeo, frameMat);
      bottomBorder.position.y = -height / 2 + borderThickness / 2;
      bottomBorder.castShadow = true;
      bottomBorder.receiveShadow = true;
      frameGroup.add(bottomBorder);

      const leftBorder = new THREE.Mesh(leftRightGeo, frameMat);
      leftBorder.position.x = -width / 2 + borderThickness / 2;
      leftBorder.castShadow = true;
      leftBorder.receiveShadow = true;
      frameGroup.add(leftBorder);

      const rightBorder = new THREE.Mesh(leftRightGeo, frameMat);
      rightBorder.position.x = width / 2 - borderThickness / 2;
      rightBorder.castShadow = true;
      rightBorder.receiveShadow = true;
      frameGroup.add(rightBorder);

      // B. Mép vát viền phản chiếu Champagne
      const innerBevelGeo = new THREE.BoxGeometry(
        width - borderThickness * 1.8,
        height - borderThickness * 1.8,
        depth * 0.15
      );
      disposables.geometries.push(innerBevelGeo);
      const innerBevelMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor),
        roughness: 0.25,
        metalness: 0.9,
        transparent: true,
        opacity: 0.4,
      });
      disposables.materials.push(innerBevelMat);
      const bevelMesh = new THREE.Mesh(innerBevelGeo, innerBevelMat);
      bevelMesh.position.z = depth * 0.35;
      frameGroup.add(bevelMesh);

      // C. Lòng khung (Neutral matte dark surface hoặc Texture)
      const canvasWidth = width - borderThickness * 2;
      const canvasHeight = height - borderThickness * 2;
      const canvasGeo = new THREE.PlaneGeometry(canvasWidth, canvasHeight);
      disposables.geometries.push(canvasGeo);

      let canvasMat: THREE.MeshStandardMaterial;
      if (imageUrl) {
        const tex = textureLoader.load(imageUrl);
        tex.colorSpace = THREE.SRGBColorSpace;
        disposables.textures.push(tex);
        canvasMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.6,
          metalness: 0.1,
        });
      } else {
        // Bề mặt trung tính, không có chữ hay họa tiết ngẫu nhiên
        canvasMat = new THREE.MeshStandardMaterial({
          color: 0x1a1d20,
          roughness: 0.85,
          metalness: 0.15,
        });
      }
      disposables.materials.push(canvasMat);

      const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
      canvasMesh.position.z = -depth * 0.1;
      canvasMesh.receiveShadow = true;
      frameGroup.add(canvasMesh);

      return { frameGroup, canvasMat };
    };

    // 1. Khung chính (Tỷ lệ 9:16 - Đứng)
    const mainFrameObj = createPictureFrame(1.9, 3.38, 0.12, 0.045, mainImage);
    const mainFrame = mainFrameObj.frameGroup;
    mainFrame.position.set(0.2, 0.05, 0.3);
    galleryGroup.add(mainFrame);

    // 2. Khung phụ trái (Tỷ lệ 16:9 - Nằm ngang, lùi về sau, lệch nhẹ)
    const leftSubFrameObj = createPictureFrame(2.6, 1.46, 0.09, 0.038, leftSubImage);
    const leftSubFrame = leftSubFrameObj.frameGroup;
    leftSubFrame.position.set(-1.95, 0.45, -0.9);
    leftSubFrame.rotation.y = 0.06;
    galleryGroup.add(leftSubFrame);

    // 3. Khung phụ phải (Tỷ lệ 16:9 - Nằm ngang, lùi về sau, lệch nhẹ)
    const rightSubFrameObj = createPictureFrame(2.2, 1.24, 0.08, 0.035, rightSubImage);
    const rightSubFrame = rightSubFrameObj.frameGroup;
    rightSubFrame.position.set(1.95, -0.5, -0.75);
    rightSubFrame.rotation.y = -0.08;
    galleryGroup.add(rightSubFrame);

    // Quản lý hiển thị trên Mobile
    if (stateRef.current.isMobile) {
      rightSubFrame.visible = false;
      mainFrame.position.set(0, 0, 0);
      leftSubFrame.position.set(-1.1, 0.3, -0.9);
      galleryGroup.position.set(0, 0, 0);
    }

    // 7. Xử lý di chuyển chuột (Desktop Mouse Parallax: Tối đa ~8px)
    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current.isMobile || stateRef.current.prefersReducedMotion) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      // Độ lệch nhẹ nhàng tương đương 6-8px thị giác
      stateRef.current.mouseTarget.x = nx * 0.12;
      stateRef.current.mouseTarget.y = ny * 0.09;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!camera || !renderer) return;
      checkMobile();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (stateRef.current.isMobile) {
        rightSubFrame.visible = false;
        mainFrame.position.set(0, 0, 0);
        leftSubFrame.position.set(-1.0, 0.2, -0.9);
        galleryGroup.position.set(0, 0, 0);
      } else {
        rightSubFrame.visible = true;
        mainFrame.position.set(0.2, 0.05, 0.3);
        leftSubFrame.position.set(-1.95, 0.45, -0.9);
        rightSubFrame.position.set(1.95, -0.5, -0.75);
        galleryGroup.position.set(0.95, 0.05, 0);
      }
    };
    window.addEventListener('resize', handleResize);

    // 9. IntersectionObserver & Tab Visibility (Dừng render khi tab ẩn hoặc ngoài màn hình)
    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      stateRef.current.isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 10. Animation Loop (60 FPS Motion với Floating & Slow Light Shift)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Nếu không nhìn thấy, không cần render
      if (!stateRef.current.isVisible) return;

      const elapsed = clock.getElapsedTime();
      const intensity = isAnimated && !stateRef.current.prefersReducedMotion ? motionIntensity : 0;

      // A. Chuyển động ánh sáng studio chậm (Chu kỳ ~26 giây)
      if (intensity > 0) {
        const lightCycle = (elapsed / 26) * Math.PI * 2;
        champagneRimLight.position.x = 3.5 + Math.sin(lightCycle) * 0.8;
        champagneRimLight.position.y = 2.5 + Math.cos(lightCycle * 0.8) * 0.4;
        keyLight.position.x = 2.5 + Math.cos(lightCycle * 0.5) * 0.6;
      }

      // B. Khung hình trôi nhẹ (Floating: biên độ 6-10px, xoay tối đa ~1° ≈ 0.017 rad)
      if (intensity > 0) {
        const t = elapsed * 0.65;
        // Khung chính
        mainFrame.position.y = 0.05 + Math.sin(t) * 0.045 * intensity;
        mainFrame.position.x = (stateRef.current.isMobile ? 0 : 0.2) + Math.cos(t * 0.8) * 0.02 * intensity;
        mainFrame.rotation.z = Math.sin(t * 0.5) * 0.012 * intensity;
        mainFrame.rotation.x = Math.cos(t * 0.6) * 0.008 * intensity;

        // Khung phụ trái
        leftSubFrame.position.y = 0.45 + Math.sin(t + 1.6) * 0.035 * intensity;
        leftSubFrame.rotation.z = -Math.cos(t * 0.4 + 1.0) * 0.01 * intensity;

        // Khung phụ phải
        if (rightSubFrame.visible) {
          rightSubFrame.position.y = -0.5 + Math.cos(t + 2.4) * 0.04 * intensity;
          rightSubFrame.rotation.z = Math.sin(t * 0.45 + 2.0) * 0.01 * intensity;
        }
      }

      // C. Nội suy mượt chuyển động chuột (Mouse Parallax Interpolation)
      stateRef.current.mouseCurrent.x +=
        (stateRef.current.mouseTarget.x - stateRef.current.mouseCurrent.x) * 0.06;
      stateRef.current.mouseCurrent.y +=
        (stateRef.current.mouseTarget.y - stateRef.current.mouseCurrent.y) * 0.06;

      // D. Hiệu ứng cuộn trang (Scroll Interpolation)
      // Camera tiến nhẹ về khung chính (7.2 -> 6.35), không zoom xuyên vật thể
      const sp = stateRef.current.scrollProgress;
      const targetCamZ = THREE.MathUtils.lerp(7.2, 6.35, sp);
      const targetCamY = THREE.MathUtils.lerp(0.1, 0.18, sp);
      const targetCamX = THREE.MathUtils.lerp(0, 0.35, sp);

      camera.position.x = targetCamX + stateRef.current.mouseCurrent.x;
      camera.position.y = targetCamY + stateRef.current.mouseCurrent.y;
      camera.position.z = targetCamZ;
      camera.lookAt(galleryGroup.position.x * 0.5, 0.05, 0);

      // Khung phụ giảm nhẹ độ nổi bật khi cuộn
      const subFrameScale = THREE.MathUtils.lerp(1.0, 0.94, sp);
      leftSubFrame.scale.set(subFrameScale, subFrameScale, subFrameScale);
      if (rightSubFrame.visible) {
        rightSubFrame.scale.set(subFrameScale, subFrameScale, subFrameScale);
      }

      renderer.render(scene, camera);
    };

    // Khởi chạy render
    animate();

    // 11. Dọn dẹp tài nguyên khi unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mediaQueryMotion.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      disposables.geometries.forEach((g) => g.dispose());
      disposables.materials.forEach((m) => m.dispose());
      disposables.textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [backgroundColor, frameColor, accentColor, motionIntensity, mainImage, leftSubImage, rightSubImage, isAnimated]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      {/* Canvas Three.js Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Nền tĩnh dự phòng khi WebGL không khả dụng */}
      {!webGLSupported && (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#151719]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 65% 50%, rgba(41, 45, 49, 0.8) 0%, rgba(21, 23, 25, 1) 75%)',
          }}
        />
      )}
    </div>
  );
}
