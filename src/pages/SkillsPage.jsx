import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const SkillsContainer = styled(motion.div)`
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

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 1rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(0, 255, 136, 0.1);
  border: 2px solid #00ff88;
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  
  &:hover {
    background: rgba(0, 255, 136, 0.2);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: #00ff88;
  margin-bottom: 1rem;
`;

const SkillDescription = styled.p`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
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

const skills = [
  {
    title: "Frontend Development",
    description: "React, Vue, JavaScript, HTML5, CSS3, Responsive Design",
    level: 90
  },
  {
    title: "Backend Development",
    description: "Node.js, Python, Java, RESTful APIs, Database Design",
    level: 85
  },
  {
    title: "3D & Animation",
    description: "Three.js, WebGL, GSAP, Animation Principles",
    level: 80
  },
  {
    title: "UI/UX Design",
    description: "Figma, Adobe XD, User Research, Prototyping",
    level: 85
  },
  {
    title: "Game Development",
    description: "Unity, Game Design, Physics, Particle Systems",
    level: 75
  },
  {
    title: "DevOps",
    description: "Git, Docker, CI/CD, AWS, Server Management",
    level: 80
  }
];

const SkillsPage = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);

  React.useEffect(() => {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      VanillaTilt.init(card, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
      });
    });
  }, []);

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
    <SkillsContainer
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
        Power-Up Station
      </Title>
      <SkillsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            className="skill-card"
            variants={cardVariants}
            onClick={() => setSelectedSkill(skill)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillDescription>{skill.description}</SkillDescription>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                height: '4px',
                background: 'linear-gradient(90deg, #00ff88, #00a1ff)',
                marginTop: '1rem',
                borderRadius: '2px'
              }}
            />
          </SkillCard>
        ))}
      </SkillsGrid>
      <NavigationButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/projects')}
      >
        Continue to Missions
      </NavigationButton>
    </SkillsContainer>
  );
};

export default SkillsPage; 