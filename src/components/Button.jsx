import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const StyledButton = styled(motion.button)`
  background: ${props => props.variant === 'outline' ? 'transparent' : theme.gradients.primary};
  border: 2px solid ${theme.colors.primary};
  color: ${props => props.variant === 'outline' ? theme.colors.primary : theme.colors.background};
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : props.size === 'large' ? '1.2rem 2.5rem' : '0.8rem 1.5rem'};
  font-size: ${props => props.size === 'small' ? '0.9rem' : props.size === 'large' ? '1.2rem' : '1rem'};
  font-weight: 600;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.gradients.primary};
    z-index: -1;
    opacity: 0;
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    color: ${theme.colors.background};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      box-shadow: none;
    }
  }
`;

const Button = ({ 
  children, 
  variant = 'outline', 
  size = 'medium', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 