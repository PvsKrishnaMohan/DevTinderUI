import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  // Aggressively scale up the model
  scene.scale.set(60, 60, 60); // Scale up to 50x its original size
  scene.position.set(0, -10, 0); // Adjust position to center the model

  return <primitive object={scene} />;
};

const NoReq = () => {
  const filePath = "https://res.cloudinary.com/krishnamohan479/image/upload/v1736020712/1_xqlasq.glb";

  return (
    <>
    <Canvas camera={{ position: [0, 0, 100], fov: 50 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />

      {/* Model */}
      <Model url={filePath} />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
    <h6 className='text-center text-slate-400'>feel free to rotate me</h6>
    </>
  );
};

export default NoReq;
