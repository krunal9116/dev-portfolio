import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Box, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMouseParallax } from '../../hooks/useAnimations';

// ─── Robotic Cyber Grid Floor ────────────────────────────────────────────────
function CyberGrid() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((_, delta) => {
    if (gridRef.current) {
      gridRef.current.position.z = (gridRef.current.position.z + delta * 2) % 2;
    }
  });

  return (
    <group position={[0, -3.5, 0]}>
      <gridHelper
        ref={gridRef}
        args={[60, 40, '#00F5FF', '#6E00FF']}
        position={[0, 0, 0]}
      />
    </group>
  );
}

// ─── Robotic Cyber Core (Mecha Central Eye & Outer Mechanical Rings) ────────
function RoboticCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const outerRingRef = useRef<THREE.Group>(null!);
  const midRingRef = useRef<THREE.Group>(null!);
  const innerRingRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.15;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.4;
      outerRingRef.current.rotation.x = Math.cos(t * 0.5) * 0.2;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.6;
      midRingRef.current.rotation.y += delta * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.8;
      innerRingRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={[3.5, 0, -2]}>
        {/* Robotic Core Sphere */}
        <Sphere ref={coreRef} args={[1.4, 64, 64]}>
          <MeshDistortMaterial
            color="#050816"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.95}
            emissive="#00F5FF"
            emissiveIntensity={0.6}
            wireframe={true}
          />
        </Sphere>

        {/* Inner Glowing Reactor Energy Eye */}
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#00F5FF"
            emissive="#00F5FF"
            emissiveIntensity={3}
            roughness={0}
          />
        </Sphere>

        {/* Mechanical Outer Ring 1 */}
        <group ref={outerRingRef}>
          <Torus args={[2.5, 0.04, 16, 100]}>
            <meshStandardMaterial
              color="#00F5FF"
              emissive="#00F5FF"
              emissiveIntensity={1.2}
              wireframe={false}
            />
          </Torus>
          {/* Mechanical notches */}
          {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
            <Box
              key={i}
              args={[0.2, 0.4, 0.2]}
              position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0]}
            >
              <meshStandardMaterial color="#6E00FF" emissive="#6E00FF" emissiveIntensity={1} />
            </Box>
          ))}
        </group>

        {/* Mechanical Mid Ring 2 */}
        <group ref={midRingRef} rotation={[Math.PI / 4, 0, 0]}>
          <Torus args={[3.2, 0.03, 16, 100]}>
            <meshStandardMaterial
              color="#6E00FF"
              emissive="#6E00FF"
              emissiveIntensity={1.5}
            />
          </Torus>
        </group>

        {/* Cyber Orbit Ring 3 */}
        <group ref={innerRingRef} rotation={[0, Math.PI / 3, 0]}>
          <Torus args={[3.8, 0.02, 16, 100]}>
            <meshStandardMaterial
              color="#FF00AA"
              emissive="#FF00AA"
              emissiveIntensity={1.5}
            />
          </Torus>
        </group>
      </group>
    </Float>
  );
}

// ─── Floating Robotic Voxel Data Cubes & Sensors ─────────────────────────────
function FloatingVoxels() {
  const groupRef = useRef<THREE.Group>(null!);

  const voxels = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; color: string; speed: number }[] = [];
    const colors = ['#00F5FF', '#6E00FF', '#FF00AA'];
    for (let i = 0; i < 35; i++) {
      arr.push({
        pos: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 12,
        ] as [number, number, number],
        scale: Math.random() * 0.25 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {voxels.map((v, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.8} rotationIntensity={1}>
          <Box args={[v.scale, v.scale, v.scale]} position={v.pos}>
            <meshStandardMaterial
              color={v.color}
              emissive={v.color}
              emissiveIntensity={1.8}
              wireframe={Math.random() > 0.5}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// ─── Cyber Data Streams (Laser Beams) ───────────────────────────────────────
function CyberBeams() {
  return (
    <group>
      {[-4, 0, 4].map((x, i) => (
        <mesh key={i} position={[x, 0, -8]} rotation={[0, 0, Math.PI / 12]}>
          <cylinderGeometry args={[0.02, 0.02, 20, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00F5FF' : '#FF00AA'}
            emissive={i % 2 === 0 ? '#00F5FF' : '#FF00AA'}
            emissiveIntensity={2}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Camera Mouse Parallax ──────────────────────────────────────────────────
function CameraController({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 1.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Main Scene ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  const mouse = useMouseParallax(1);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F5FF" />
      <pointLight position={[-5, 5, 2]} intensity={2.5} color="#6E00FF" />
      <pointLight position={[5, -3, 3]} intensity={2} color="#FF00AA" />

      <CyberGrid />
      <RoboticCore />
      <FloatingVoxels />
      <CyberBeams />
      <CameraController mouse={mouse} />
    </Canvas>
  );
}
