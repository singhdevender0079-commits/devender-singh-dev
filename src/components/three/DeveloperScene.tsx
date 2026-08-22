import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";

/**
 * Optional custom model.
 * Drop your own file at public/models/devender.glb and set
 * VITE_CHARACTER_MODEL_URL="/models/devender.glb" in your .env
 * to replace the procedural character with it.
 */
const MODEL_URL = import.meta.env["VITE_CHARACTER_MODEL_URL"] as string | undefined;

function CustomModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} scale={1.2} position={[0, -1, 0]} />;
}

function Character() {
  const head = useRef<Group>(null);
  const leftArm = useRef<Mesh>(null);
  const rightArm = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (head.current) {
      head.current.rotation.y = MathUtils.lerp(
        head.current.rotation.y,
        pointer.x * 0.35,
        0.06,
      );
      head.current.rotation.x = MathUtils.lerp(
        head.current.rotation.x,
        -pointer.y * 0.18 + Math.sin(t * 0.8) * 0.02,
        0.06,
      );
    }
    const typing = Math.sin(t * 7) * 0.06;
    if (leftArm.current) leftArm.current.rotation.x = -1.15 + typing;
    if (rightArm.current) rightArm.current.rotation.x = -1.15 - typing;
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* torso */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <capsuleGeometry args={[0.42, 0.5, 8, 24]} />
        <meshStandardMaterial color="#1f2a44" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* hoodie collar */}
      <mesh position={[0, 0.72, 0.02]}>
        <torusGeometry args={[0.26, 0.07, 12, 32]} />
        <meshStandardMaterial color="#2b3a5c" roughness={0.8} />
      </mesh>
      {/* head */}
      <group ref={head} position={[0, 1.05, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color="#e0ac82" roughness={0.6} />
        </mesh>
        {/* hair */}
        <mesh position={[0, 0.12, -0.02]} scale={[1.02, 0.78, 1.02]}>
          <sphereGeometry args={[0.34, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial color="#22181a" roughness={0.9} />
        </mesh>
        {/* glasses */}
        <mesh position={[-0.13, 0.02, 0.3]}>
          <torusGeometry args={[0.09, 0.018, 10, 28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0.13, 0.02, 0.3]}>
          <torusGeometry args={[0.09, 0.018, 10, 28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* eyes */}
        <mesh position={[-0.13, 0.02, 0.31]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#10151f" />
        </mesh>
        <mesh position={[0.13, 0.02, 0.31]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#10151f" />
        </mesh>
      </group>
      {/* arms */}
      <mesh ref={leftArm} position={[-0.44, 0.42, 0.16]} rotation={[-1.15, 0, 0.25]}>
        <capsuleGeometry args={[0.1, 0.46, 6, 16]} />
        <meshStandardMaterial color="#2b3a5c" roughness={0.8} />
      </mesh>
      <mesh ref={rightArm} position={[0.44, 0.42, 0.16]} rotation={[-1.15, 0, -0.25]}>
        <capsuleGeometry args={[0.1, 0.46, 6, 16]} />
        <meshStandardMaterial color="#2b3a5c" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, -0.75, 0.55]}>
      {/* desk top */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.1]} />
        <meshStandardMaterial color="#141c30" roughness={0.5} metalness={0.15} />
      </mesh>
      {/* laptop base */}
      <mesh position={[0, 0.07, 0.1]} castShadow>
        <boxGeometry args={[0.86, 0.05, 0.58]} />
        <meshStandardMaterial color="#3a4considered" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* laptop screen */}
      <group position={[0, 0.1, -0.18]} rotation={[-0.32, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.86, 0.56, 0.04]} />
          <meshStandardMaterial color="#26314c" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[0.78, 0.48]} />
          <meshStandardMaterial
            color="#7fe3e0"
            emissive="#38d9d4"
            emissiveIntensity={1.1}
            toneMapped={false}
          />
        </mesh>
      </group>
      {/* mug */}
      <mesh position={[0.72, 0.13, 0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.09, 0.18, 20]} />
        <meshStandardMaterial color="#f0a04b" roughness={0.6} />
      </mesh>
    </group>
  );
}

function FloatingTokens() {
  const tokens = useMemo(
    () => [
      { pos: [-1.35, 1.15, -0.3] as const, color: "#38d9d4", size: 0.16 },
      { pos: [1.32, 1.42, -0.5] as const, color: "#f0a04b", size: 0.12 },
      { pos: [1.15, 0.35, -0.8] as const, color: "#7c9cf0", size: 0.1 },
      { pos: [-1.15, 0.25, -0.7] as const, color: "#5ad9a8", size: 0.11 },
    ],
    [],
  );

  return (
    <>
      {tokens.map((token, index) => (
        <Float
          key={index}
          speed={1.4 + index * 0.2}
          rotationIntensity={0.6}
          floatIntensity={0.8}
        >
          <mesh position={[...token.pos]}>
            <icosahedronGeometry args={[token.size, 0]} />
            <meshStandardMaterial
              color={token.color}
              emissive={token.color}
              emissiveIntensity={0.35}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.22 + Math.sin(t * 0.35) * 0.03,
      0.05,
    );
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.08,
      0.05,
    );
    group.current.position.y = Math.sin(t * 0.9) * 0.05;
  });

  return <group ref={group}>{children}</group>;
}

export default function DeveloperScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      camera={{ position: [0, 0.75, 4.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} castShadow />
      <pointLight position={[-2.5, 1.5, 2]} intensity={18} color="#38d9d4" distance={9} />
      <pointLight position={[2.5, 0.5, 1.5]} intensity={10} color="#f0a04b" distance={8} />
      <Suspense fallback={null}>
        <Rig>
          {MODEL_URL ? <CustomModel url={MODEL_URL} /> : <Character />}
          <Desk />
          <FloatingTokens />
        </Rig>
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.4}
          scale={7}
          blur={2.6}
          far={3}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
