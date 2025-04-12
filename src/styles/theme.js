export const theme = {
  colors: {
    primary: '#00ff88',
    secondary: '#00a1ff',
    background: '#0a0a0a',
    backgroundLight: '#121212',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#ff5f56',
    accent2: '#ffbd2e',
    accent3: '#27c93f',
    cardBg: 'rgba(0, 255, 136, 0.1)',
    cardBorder: 'rgba(0, 255, 136, 0.3)',
    cardHover: 'rgba(0, 255, 136, 0.2)',
  },
  gradients: {
    primary: 'linear-gradient(45deg, #00ff88, #00a1ff)',
    secondary: 'linear-gradient(135deg, #00a1ff, #00ff88)',
    dark: 'linear-gradient(to bottom, #0a0a0a, #121212)',
  },
  shadows: {
    glow: '0 0 15px rgba(0, 255, 136, 0.5)',
    glowStrong: '0 0 25px rgba(0, 255, 136, 0.7)',
    text: '0 0 10px rgba(0, 255, 136, 0.3)',
  },
  transitions: {
    default: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    fast: 'all 0.15s ease',
  },
  borderRadius: {
    small: '5px',
    medium: '10px',
    large: '15px',
    round: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1200px',
  },
  animations: {
    pulse: {
      initial: { scale: 1 },
      animate: { 
        scale: [1, 1.05, 1],
        transition: { 
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop'
        }
      }
    },
    float: {
      initial: { y: 0 },
      animate: { 
        y: [-10, 10, -10],
        transition: { 
          duration: 4,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }
      }
    },
    glow: {
      initial: { boxShadow: '0 0 5px rgba(0, 255, 136, 0.3)' },
      animate: { 
        boxShadow: ['0 0 5px rgba(0, 255, 136, 0.3)', '0 0 20px rgba(0, 255, 136, 0.7)', '0 0 5px rgba(0, 255, 136, 0.3)'],
        transition: { 
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop'
        }
      }
    }
  }
}; 