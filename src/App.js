import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, AccumulativeShadows, RandomizedLight, Environment, OrbitControls } from '@react-three/drei';
import { useControls, button, image } from 'leva';
import { useGLTF } from '@react-three/drei';
import { Model } from './Car';  // Import your Model component
import { Effects } from './Effects';  // Import your Effects component

export default function App() {
  const { color, realism, importanceSampling, carRender, background } = useControls({
    color: '#ff9621',
    realism: true,
    importanceSampling: true,
    'Car Render': image({ accept: '.glb' }), // Only accept .glb files
    'Background': image(),
    screenshot: button(() => {
      const link = document.createElement('a');
      link.setAttribute('download', 'canvas.png');
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'));
      link.click();
    })
  });

  // Load the default car model
  const { scene: defaultCarModel } = useGLTF('/car-model.glb');
  
  // Load the custom car model if specified
  const { scene: customCarModel } = useGLTF(carRender || '/car-model.glb');

  return (
    <Canvas gl={{ antialias: false, preserveDrawingBuffer: true }} shadows camera={{ position: [4, 0, 6], fov: 35 }}>
      <group position={[0, -0.75, 0]}>
        <Center top>
          {/* Render the custom car model if available, otherwise render the default */}
          <Model object={customCarModel || defaultCarModel} color={color} />
        </Center>
        <AccumulativeShadows>
          <RandomizedLight position={[2, 5, 5]} />
        </AccumulativeShadows>
      </group>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      {realism && <Effects importanceSampling={importanceSampling} />}
      <Environment preset="dawn" background blur={1} />
    </Canvas>
  );
}
