import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CubeState, CubeFace, COLOR_MAP } from '../types/cube';

interface CubeProps {
  cubeState: CubeState;
  isAnimating: boolean;
  currentMove?: string;
}

interface CubeletProps {
  position: [number, number, number];
  colors: { [key: string]: string };
  isAnimating?: boolean;
}

const Cubelet: React.FC<CubeletProps> = ({ position, colors, isAnimating = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Create materials for each face
  const materials = [
    new THREE.MeshLambertMaterial({ color: colors.right || '#000000' }),   // right
    new THREE.MeshLambertMaterial({ color: colors.left || '#000000' }),    // left
    new THREE.MeshLambertMaterial({ color: colors.up || '#000000' }),      // top
    new THREE.MeshLambertMaterial({ color: colors.down || '#000000' }),    // bottom
    new THREE.MeshLambertMaterial({ color: colors.front || '#000000' }),   // front
    new THREE.MeshLambertMaterial({ color: colors.back || '#000000' }),    // back
  ];

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={materials}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
    </mesh>
  );
};

const RubiksCube3D: React.FC<CubeProps> = ({ cubeState, isAnimating, currentMove }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate cubelets based on cube state
  const generateCubelets = () => {
    const cubelets = [];
    
    // Create 27 cubelets (3x3x3)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Skip center cubelet (not visible)
          if (x === 0 && y === 0 && z === 0) continue;
          
          const colors: { [key: string]: string } = {};
          
          // Map 3D position to cube face colors
          if (x === 1) { // Right face
            const faceX = z + 1;
            const faceY = -y + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.right = COLOR_MAP[cubeState.right[faceY][faceX].color];
            }
          }
          if (x === -1) { // Left face
            const faceX = -z + 1;
            const faceY = -y + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.left = COLOR_MAP[cubeState.left[faceY][faceX].color];
            }
          }
          if (y === 1) { // Top face
            const faceX = x + 1;
            const faceY = z + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.up = COLOR_MAP[cubeState.up[faceY][faceX].color];
            }
          }
          if (y === -1) { // Bottom face
            const faceX = x + 1;
            const faceY = -z + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.down = COLOR_MAP[cubeState.down[faceY][faceX].color];
            }
          }
          if (z === 1) { // Front face
            const faceX = x + 1;
            const faceY = -y + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.front = COLOR_MAP[cubeState.front[faceY][faceX].color];
            }
          }
          if (z === -1) { // Back face
            const faceX = -x + 1;
            const faceY = -y + 1;
            if (faceX >= 0 && faceX < 3 && faceY >= 0 && faceY < 3) {
              colors.back = COLOR_MAP[cubeState.back[faceY][faceX].color];
            }
          }
          
          cubelets.push(
            <Cubelet
              key={`${x}-${y}-${z}`}
              position={[x * 1.1, y * 1.1, z * 1.1]}
              colors={colors}
              isAnimating={isAnimating}
            />
          );
        }
      }
    }
    
    return cubelets;
  };

  useFrame(() => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {generateCubelets()}
      {/* Add ambient and directional lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
    </group>
  );
};

export const RubiksCube3DCanvas: React.FC<CubeProps> = ({ cubeState, isAnimating, currentMove }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <RubiksCube3D cubeState={cubeState} isAnimating={isAnimating} currentMove={currentMove} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default RubiksCube3DCanvas;