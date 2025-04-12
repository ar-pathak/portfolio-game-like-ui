import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow: hidden;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }

  /* Fix for OrbitControls passive event listener warning */
  .orbit-controls {
    touch-action: none;
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
); 