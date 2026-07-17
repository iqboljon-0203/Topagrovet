'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 60 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 80;
      const speed = 0.002 + Math.random() / 200;
      const xFactor = -30 + Math.random() * 60;
      const yFactor = -15 + Math.random() * 30;
      const zFactor = -10 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;

      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      const s = Math.cos(t) * 0.3 + 0.5;
      dummy.scale.set(s, s, s);
      dummy.rotation.set(a, b, 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial
        color="#4CAF50"
        transparent
        opacity={0.25}
        roughness={0.8}
      />
    </instancedMesh>
  );
}

function GoldParticles({ count = 20 }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 10 + Math.random() * 40,
        speed: 0.001 + Math.random() / 400,
        xFactor: -20 + Math.random() * 40,
        yFactor: -10 + Math.random() * 20,
        zFactor: -5 + Math.random() * 10,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed;
      dummy.position.set(
        xFactor + Math.cos(t * factor * 0.1) * 2,
        yFactor + Math.sin(t * factor * 0.1) * 2,
        zFactor
      );
      const s = Math.sin(t) * 0.15 + 0.25;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial
        color="#FFD700"
        transparent
        opacity={0.2}
        emissive="#FFD700"
        emissiveIntensity={0.3}
        roughness={0.5}
      />
    </instancedMesh>
  );
}

function FloatingLeaf({ position }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.5 + position[0]) * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <circleGeometry args={[0.4, 6]} />
        <meshStandardMaterial
          color="#2E7D32"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.4} />
        <Particles count={40} />
        <GoldParticles count={15} />
        <FloatingLeaf position={[-8, 3, -2]} />
        <FloatingLeaf position={[10, -2, -3]} />
        <FloatingLeaf position={[5, 5, -4]} />
        <FloatingLeaf position={[-6, -4, -2]} />
      </Canvas>
    </div>
  );
}
