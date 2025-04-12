import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';

const ProjectsContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00ff88, #00a1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid #00ff88;
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(0, 255, 136, 0.2);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
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

const projects = [
  {
    title: "3D Portfolio Website",
    description: "An interactive portfolio website with 3D elements and animations",
    tech: ["React", "Three.js", "GSAP", "Styled Components"],
    difficulty: "Hard"
  },
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with real-time inventory",
    tech: ["Node.js", "React", "MongoDB", "Redux"],
    difficulty: "Medium"
  },
  {
    title: "Game Development",
    description: "A browser-based game with physics and particle effects",
    tech: ["Unity", "C#", "WebGL", "Three.js"],
    difficulty: "Hard"
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat application with AI-powered responses",
    tech: ["Python", "TensorFlow", "WebSocket", "React"],
    difficulty: "Medium"
  }
];

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
          Available Missions
        </Text>
      </Float>
      <OrbitControls enableZoom={false} />
    </>
  );
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Available Missions
      </Title>
      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            variants={cardVariants}
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectTech>
              {project.tech.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </ProjectTech>
            <TechTag style={{ marginTop: '1rem' }}>
              Difficulty: {project.difficulty}
            </TechTag>
          </ProjectCard>
        ))}
      </ProjectsGrid>
      <NavigationButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/contact')}
      >
        Contact Commander
      </NavigationButton>
    </ProjectsContainer>
  );
};

export default ProjectsPage; 