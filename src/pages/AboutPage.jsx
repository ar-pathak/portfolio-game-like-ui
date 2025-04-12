import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const AboutContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Content = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
  color: white;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00ff88, #00a1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const NavigationButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 2px solid #00ff88;
  color: #00ff88;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #00ff88;
    color: #0a0a0a;
  }
`;

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float
        speed={4}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#00ff88"
          anchorX="center"
          anchorY="middle"
        >
          Level 1: Origin Story
        </Text>
      </Float>
      <OrbitControls enableZoom={false} />
    </>
  );
}

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Content>
        <Title
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          About Me
        </Title>
        <Description
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Welcome to my origin story! I'm a passionate developer who loves creating
          immersive digital experiences. My journey in tech began with a curiosity
          about how things work, which evolved into a deep love for building
          innovative solutions.
        </Description>
        <NavigationButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          onClick={() => navigate('/skills')}
        >
          Continue to Skills
        </NavigationButton>
      </Content>
    </AboutContainer>
  );
};

export default AboutPage; 