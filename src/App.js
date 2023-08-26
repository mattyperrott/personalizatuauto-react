import { Canvas } from '@react-three/fiber';
import { Center, AccumulativeShadows, RandomizedLight, Environment, OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { pane } from './tweakpane.js';
import { Model } from './Car';
import { Effects } from './Effects';

export default function App() {
  const pane = useRef(null);
  const params = useRef({
    color: '#ff9621',
    realism: true,
    importanceSampling: true,
  });

  useEffect(() => {
    pane.current = new pane();
    pane.current.addInput(params.current, 'color');
    pane.current.addInput(params.current, 'realism');
    pane.current.addInput(params.current, 'importanceSampling');
    pane.current.addButton({
      title: 'Screenshot',
    }).on('click', () => {
      const link = document.createElement('a');
      link.setAttribute('download', 'canvas.png');
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'));
      link.click();
    });
  }, []);

  return (
    <Canvas gl={{ antialias: false, preserveDrawingBuffer: true }} shadows camera={{ position: [4, 0, 6], fov: 35 }}>
      <group position={[0, -0.75, 0]}>
        <Center top>
          <Model color={params.current.color} />
        </Center>
        <AccumulativeShadows>
          <RandomizedLight position={[2, 5, 5]} />
        </AccumulativeShadows>
      </group>
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      {params.current.realism && <Effects importanceSampling={params.current.importanceSampling} />}
      <Environment preset="dawn" background blur={1} />
    </Canvas>
  );
}
