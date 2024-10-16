import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, ChevronDown } from 'lucide-react';
import CupboardModel from './components/CupboardModel';
import TouchPanel from './components/TouchPanel';
import CustomizationPanel from './components/CustomizationPanel';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCupboard, setShowCupboard] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const cupboardY = useTransform(scrollYProgress, [0, 0.2], [2, 0]);
  const cupboardRotation = useTransform(scrollYProgress, [0.2, 0.4], [0, Math.PI * 2]);
  const touchPanelOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const customizationOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div ref={containerRef} className={`h-[500vh] ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <button
        className="fixed top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={isDarkMode ? 0.2 : 0.5} />
          <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 0.5 : 1} />
          <directionalLight
            position={[0, 10, 0]}
            intensity={isDarkMode ? 0.5 : 1}
            castShadow
          />
          <Suspense fallback={<mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="yellow" /></mesh>}>
            {showCupboard && (
              <CupboardModel
                position={[0, cupboardY.get(), 0]}
                rotation={[0, cupboardRotation.get(), 0]}
                isDarkMode={isDarkMode}
              />
            )}
          </Suspense>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
        </Canvas>

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: showCupboard ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Max Your Space with Ezyloft</h1>
          <p className="mb-4">An innovative solution for loft storage, effortlessly lowering your belongings with just a tap.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center mx-auto"
            onClick={() => setShowCupboard(true)}
          >
            Start Exploring <ChevronDown className="ml-2" />
          </button>
        </motion.div>

        <motion.div style={{ opacity: touchPanelOpacity }}>
          <TouchPanel onToggleLight={toggleDarkMode} />
        </motion.div>

        <motion.div style={{ opacity: customizationOpacity }}>
          <CustomizationPanel />
        </motion.div>
      </div>
    </div>
  );
}

export default App;