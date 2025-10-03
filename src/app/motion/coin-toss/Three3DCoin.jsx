import React, { memo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function rad(degrees) {
  return degrees * (Math.PI / 180);
}

const Coin = ({ ref, ...props }) => {
  const [head, tail] = useTexture([
    "/head1.png", // put this in /public
    "/tail.png", // put this in /public
  ]);

  // Fix alignment: rotate tail by 180°
  head.center.set(0.5, 0.5);
  head.rotation = rad(90);
  tail.center.set(0.5, 0.5);
  tail.rotation = rad(90);

  return (
    <>
      <mesh {...props} ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.5, 64]} />
        <meshStandardMaterial attach="material-0" color="gold" />
        <meshStandardMaterial attach="material-1" map={head} />
        <meshStandardMaterial attach="material-2" map={tail} />
      </mesh>
    </>
  );
};

const Three3DCoin = ({ ref }) => {

  return (
    <Canvas camera={{ fov: 40, position: [0, 0, 10], near: 0.1, far: 100 }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <Coin ref={ref} position={[0, 0, 0]} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default memo(Three3DCoin);
