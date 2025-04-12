import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const StyledCard = styled(motion.div)`
  background: ${props => props.variant === 'glass' ? 'rgba(0, 0, 0, 0.7)' : theme.colors.cardBg};
  border: 2px solid ${theme.colors.cardBorder};
  border-radius: ${theme.borderRadius.large};
  padding: ${props => props.padding || theme.spacing.lg};
  position: relative;
  overflow: hidden;
  transition: ${theme.transitions.default};
  backdrop-filter: ${props => props.variant === 'glass' ? 'blur(10px)' : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.primary};
    opacity: 0;
    z-index: -1;
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
    
    &::before {
      opacity: 0.05;
    }
  }
  
  ${props => props.glow && `
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: ${theme.transitions.default};
      z-index: -1;
    }
    
    &:hover::after {
      opacity: 1;
    }
  `}
`;

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  margin: 0;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: ${theme.shadows.text};
`;

const CardContent = styled.div`
  color: ${theme.colors.text};
  line-height: 1.6;
`;

const CardFooter = styled.div`
  margin-top: ${theme.spacing.md};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Card = ({ 
  children, 
  title, 
  variant = 'default', 
  glow = false, 
  padding,
  header,
  footer,
  ...props 
}) => {
  return (
    <StyledCard
      variant={variant}
      glow={glow}
      padding={padding}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card; 