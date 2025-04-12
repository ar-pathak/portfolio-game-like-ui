import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Button from '../components/Button';
import Card from '../components/Card';
import { theme } from '../styles/theme';

const LandingContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${theme.spacing.xl};
`;

const PortalCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.md};
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${theme.shadows.text};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureCards = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxl};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create portal effect
    const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
    });
    const portal = new THREE.Mesh(geometry, material);
    scene.add(portal);
    sceneRef.current = scene;

    // Add particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00a1ff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      portal.rotation.x += 0.01;
      portal.rotation.y += 0.01;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleEnter = () => {
    gsap.to(sceneRef.current.children[0].rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => navigate('/about')
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <LandingContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PortalCanvas ref={canvasRef} />
      <Content>
        <Title
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Welcome to My Universe
        </Title>
        <Subtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Explore my skills, projects, and journey through this interactive game-like experience.
          Click the button below to enter my world.
        </Subtitle>
        <ButtonContainer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Button size="large" onClick={handleEnter}>
            Enter Portal
          </Button>
          <Button variant="outline" size="large" onClick={() => navigate('/contact')}>
            Contact Me
          </Button>
        </ButtonContainer>
        
        <FeatureCards
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card
            as={motion.div}
            variants={itemVariants}
            glow
            title="Interactive Experience"
          >
            Navigate through my portfolio as if you're playing a game, with interactive elements and animations.
          </Card>
          <Card
            as={motion.div}
            variants={itemVariants}
            glow
            title="Skills & Projects"
          >
            Discover my technical skills and explore the projects I've built, presented in a visually engaging way.
          </Card>
          <Card
            as={motion.div}
            variants={itemVariants}
            glow
            title="Connect With Me"
          >
            Use the contact terminal to reach out and start a conversation about potential collaborations.
          </Card>
        </FeatureCards>
      </Content>
    </LandingContainer>
  );
};

export default LandingPage; 