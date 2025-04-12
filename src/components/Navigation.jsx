import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${theme.colors.cardBorder};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  text-decoration: none;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${theme.shadows.text};
  
  &:hover {
    text-shadow: ${theme.shadows.glow};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.cardBorder};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  transition: ${theme.transitions.default};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${theme.gradients.primary};
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    color: ${theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];
  
  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo to="/">Game Portfolio</Logo>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </MenuButton>
      <NavLinks isOpen={isOpen}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation; 