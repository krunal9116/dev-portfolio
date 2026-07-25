import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SkillOrb {
  name: string;
  color: string;
  position: [number, number, number];
  level: number;
}

interface OrbProps {
  skill: SkillOrb;
  isHovered: boolean;
  onHover: (s: SkillOrb | null) => void;
}

function SkillOrb({ skill, isHovered, onHover }: OrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.3);
    const target = isHovered ? 1.25 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
  });

  return (
    <Float speed={1.5 + Math.random()} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        position={skill.position}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(skill); }}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.2 : 0.4}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
        {isHovered && (
          <Html center distanceFactor={6}>
            <div className="pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap"
              style={{ background: 'rgba(5,8,22,0.9)', border: `1px solid ${skill.color}40`, color: skill.color, boxShadow: `0 0 20px ${skill.color}40` }}>
              {skill.name} — {skill.level}%
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ring1.current && (ring1.current.rotation.z += delta * 0.15);
    ring2.current && (ring2.current.rotation.x += delta * 0.12);
    ring3.current && (ring3.current.rotation.y += delta * 0.08);
  });

  return (
    <>
      {[
        { ref: ring1, radius: 2.2, rot: [0, 0, 0] as [number,number,number], color: '#00F5FF' },
        { ref: ring2, radius: 3.2, rot: [Math.PI / 4, 0, 0] as [number,number,number], color: '#6E00FF' },
        { ref: ring3, radius: 4.0, rot: [0, 0, Math.PI / 6] as [number,number,number], color: '#FF00AA' },
      ].map((ring, i) => (
        <mesh key={i} ref={ring.ref} rotation={ring.rot}>
          <torusGeometry args={[ring.radius, 0.006, 2, 120]} />
          <meshStandardMaterial color={ring.color} emissive={ring.color} emissiveIntensity={0.6} transparent opacity={0.35} />
        </mesh>
      ))}
    </>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, d) => { ref.current && (ref.current.rotation.y += d * 0.2); });
  return (
    <Sphere ref={ref} args={[0.7, 64, 64]}>
      <meshStandardMaterial
        color="#050816"
        emissive="#00F5FF"
        emissiveIntensity={0.15}
        roughness={0.3}
        metalness={0.9}
        wireframe={false}
      />
    </Sphere>
  );
}

export default function SkillsScene({ skills, onHover, hoveredSkill }:
  { skills: SkillOrb[]; onHover: (s: SkillOrb | null) => void; hoveredSkill: SkillOrb | null }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.5]} style={{ cursor: 'grab' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={3} color="#00F5FF" />
      <pointLight position={[-5, 3, 2]} intensity={2} color="#6E00FF" />
      <pointLight position={[5, -3, 2]} intensity={1.5} color="#FF00AA" />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      <CoreSphere />
      <OrbitRings />
      {skills.map((skill) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          isHovered={hoveredSkill?.name === skill.name}
          onHover={onHover}
        />
      ))}
    </Canvas>
  );
}
