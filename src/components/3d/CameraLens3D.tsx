"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface CameraLensProps {
  progress: number;
}

export default function CameraLens3D({ progress }: CameraLensProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lensGroupRef = useRef<THREE.Group | null>(null);
  const apertureBladesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting (Cinematic Volumetric feel)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 2, 50);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x4444ff, 1, 50);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    // 3. Procedural Lens Construction
    const lensGroup = new THREE.Group();
    lensGroupRef.current = lensGroup;
    scene.add(lensGroup);

    // Outer Barrel
    const barrelGeo = new THREE.CylinderGeometry(3, 3, 2, 64, 1, true);
    const barrelMat = new THREE.MeshStandardMaterial({ 
      color: 0x111111, 
      roughness: 0.2, 
      metalness: 0.8,
      side: THREE.DoubleSide
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    lensGroup.add(barrel);

    // Front Glass Element (Convex)
    const glassGeo = new THREE.SphereGeometry(2.9, 64, 64, 0, Math.PI * 2, 0, Math.PI / 6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      metalness: 0,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.z = -2; 
    lensGroup.add(glass);

    // Aperture Blades (Inside the barrel)
    const bladeCount = 8;
    const bladeGeo = new THREE.PlaneGeometry(2, 1);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6, metalness: 0.9, side: THREE.DoubleSide });
    
    const apertureGroup = new THREE.Group();
    apertureGroup.position.z = -0.5;
    lensGroup.add(apertureGroup);

    for (let i = 0; i < bladeCount; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      const angle = (i / bladeCount) * Math.PI * 2;
      
      // Position them in a circle
      const radius = 2.5;
      blade.position.x = Math.cos(angle) * radius;
      blade.position.y = Math.sin(angle) * radius;
      
      // Orient them tangent to the circle
      blade.rotation.z = angle + Math.PI / 2;
      
      apertureGroup.add(blade);
      apertureBladesRef.current.push(blade);
    }

    // Gold Ring
    const ringGeo = new THREE.TorusGeometry(3.05, 0.05, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = 0.9;
    lensGroup.add(ring);

    // 4. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 5. Resize Handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sync GSAP animations with progress prop
  useEffect(() => {
    if (!lensGroupRef.current) return;
    
    // Lens rotation maps to progress
    gsap.to(lensGroupRef.current.rotation, {
      z: progress * 0.05,
      y: Math.sin(progress * 0.1) * 0.2, // Breathing effect
      duration: 1,
      ease: "power2.out"
    });

    // Aperture blades logic
    apertureBladesRef.current.forEach((blade) => {
      // Open and close based on progress steps
      let scaleX = 1;
      const rotZ = blade.rotation.z;

      if (progress > 20 && progress < 50) {
        // Breathing
        scaleX = 1.2;
      } else if (progress > 80) {
        // Lock tight
        scaleX = 1.5;
      }

      gsap.to(blade.scale, {
        x: scaleX,
        duration: 0.5
      });
    });

  }, [progress]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
