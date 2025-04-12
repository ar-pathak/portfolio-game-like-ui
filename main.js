import * as THREE from 'three';
import { gsap } from 'gsap';
import VanillaTilt from 'vanilla-tilt';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Audio Context for sound effects
let audioContext;
let audioAnalyser;
let audioData;
let audioSource;
let isAudioInitialized = false;

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Post-processing effects
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,  // strength
    0.4,  // radius
    0.85  // threshold
);
composer.addPass(bloomPass);

const glitchPass = new GlitchPass();
glitchPass.enabled = false;
composer.addPass(glitchPass);

// Create Grid
const gridHelper = new THREE.GridHelper(100, 100, 0x00f3ff, 0x00f3ff);
scene.add(gridHelper);

// Create Floating Cubes
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f3ff,
    wireframe: true,
    emissive: 0x00f3ff,
    emissiveIntensity: 0.5,
});

for (let i = 0; i < 20; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
    );
    cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    scene.add(cube);
    cubes.push(cube);
}

// Create Particle System
const particleCount = 1000;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleColors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    // Position
    particlePositions[i] = (Math.random() - 0.5) * 100;
    particlePositions[i + 1] = (Math.random() - 0.5) * 100;
    particlePositions[i + 2] = (Math.random() - 0.5) * 100;
    
    // Color
    particleColors[i] = 0;     // R
    particleColors[i + 1] = 0.95; // G
    particleColors[i + 2] = 1; // B
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Create Portal
const portalGeometry = new THREE.RingGeometry(10, 12, 32);
const portalMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
});
const portal = new THREE.Mesh(portalGeometry, portalMaterial);
portal.position.set(0, 0, -20);
scene.add(portal);

// Create Portal Core
const portalCoreGeometry = new THREE.CircleGeometry(5, 32);
const portalCoreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.7,
});
const portalCore = new THREE.Mesh(portalCoreGeometry, portalCoreMaterial);
portalCore.position.set(0, 0, -19);
scene.add(portalCore);

// Create DNA Helix
const dnaGroup = new THREE.Group();
scene.add(dnaGroup);

const dnaStrandCount = 2;
const dnaPointCount = 20;
const dnaRadius = 5;
const dnaHeight = 30;
const dnaPoints = [];

for (let i = 0; i < dnaStrandCount; i++) {
    const dnaGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dnaPointCount * 3);
    const colors = new Float32Array(dnaPointCount * 3);
    
    for (let j = 0; j < dnaPointCount; j++) {
        const angle = (j / dnaPointCount) * Math.PI * 4;
        const y = (j / dnaPointCount) * dnaHeight - dnaHeight / 2;
        
        positions[j * 3] = Math.cos(angle + (i * Math.PI)) * dnaRadius;
        positions[j * 3 + 1] = y;
        positions[j * 3 + 2] = Math.sin(angle + (i * Math.PI)) * dnaRadius;
        
        colors[j * 3] = 0;
        colors[j * 3 + 1] = 0.95;
        colors[j * 3 + 2] = 1;
    }
    
    dnaGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dnaGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const dnaMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 2
    });
    
    const dnaStrand = new THREE.Line(dnaGeometry, dnaMaterial);
    dnaGroup.add(dnaStrand);
    dnaPoints.push(dnaStrand);
}

// Create connecting lines between DNA strands
const dnaConnectorGeometry = new THREE.BufferGeometry();
const connectorPositions = new Float32Array(dnaPointCount * 3);
const connectorColors = new Float32Array(dnaPointCount * 3);

for (let i = 0; i < dnaPointCount; i++) {
    const angle = (i / dnaPointCount) * Math.PI * 4;
    const y = (i / dnaPointCount) * dnaHeight - dnaHeight / 2;
    
    connectorPositions[i * 3] = Math.cos(angle) * dnaRadius;
    connectorPositions[i * 3 + 1] = y;
    connectorPositions[i * 3 + 2] = Math.sin(angle) * dnaRadius;
    
    connectorColors[i * 3] = 0;
    connectorColors[i * 3 + 1] = 0.95;
    connectorColors[i * 3 + 2] = 1;
}

dnaConnectorGeometry.setAttribute('position', new THREE.BufferAttribute(connectorPositions, 3));
dnaConnectorGeometry.setAttribute('color', new THREE.BufferAttribute(connectorColors, 3));

const dnaConnectorMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    linewidth: 1,
    transparent: true,
    opacity: 0.5
});

const dnaConnector = new THREE.Line(dnaConnectorGeometry, dnaConnectorMaterial);
dnaGroup.add(dnaConnector);

// Lighting
const pointLight = new THREE.PointLight(0x00f3ff, 1);
pointLight.position.set(25, 25, 25);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add a spotlight for dramatic effect
const spotLight = new THREE.SpotLight(0x00f3ff, 1);
spotLight.position.set(0, 50, 0);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;
scene.add(spotLight);

// Add volumetric light
const volumetricLightGeometry = new THREE.CylinderGeometry(0, 5, 20, 32);
const volumetricLightMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide
});
const volumetricLight = new THREE.Mesh(volumetricLightGeometry, volumetricLightMaterial);
volumetricLight.position.set(0, 0, -10);
scene.add(volumetricLight);

// Initialize Audio
function initAudio() {
    if (isAudioInitialized) return;
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = 256;
    audioData = new Uint8Array(audioAnalyser.frequencyBinCount);
    
    // Create a simple oscillator for background sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioAnalyser);
    audioAnalyser.connect(audioContext.destination);
    
    oscillator.start();
    audioSource = oscillator;
    
    isAudioInitialized = true;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate cubes
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    // Rotate grid
    gridHelper.rotation.y += 0.001;

    // Animate portal
    portal.rotation.z += 0.01;
    portalCore.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    portalCore.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;

    // Animate DNA
    dnaGroup.rotation.y += 0.005;
    
    // Animate particles
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i] * 0.01) * 0.01;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    // Audio reactivity
    if (isAudioInitialized) {
        audioAnalyser.getByteFrequencyData(audioData);
        
        // Use audio data to affect scene
        const average = audioData.reduce((a, b) => a + b) / audioData.length;
        const normalizedAverage = average / 128;
        
        // Affect bloom strength
        bloomPass.strength = 1.5 + normalizedAverage * 2;
        
        // Affect particle size
        particleMaterial.size = 0.1 + normalizedAverage * 0.2;
        
        // Affect volumetric light
        volumetricLight.material.opacity = 0.1 + normalizedAverage * 0.2;
        
        // Affect DNA
        dnaGroup.scale.y = 1 + normalizedAverage * 0.2;
    }

    // Move camera slightly based on mouse position
    camera.position.x = 30 + (mouseX * 0.05);
    camera.position.y = 30 + (mouseY * 0.05);
    camera.lookAt(scene.position);

    // Render with post-processing
    composer.render();
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse movement for camera and cursor
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 10;
    mouseY = (event.clientY - window.innerHeight / 2) / 10;
    
    // Update custom cursor
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    
    // Add glitch effect on mouse movement
    if (Math.random() > 0.95) {
        glitchPass.enabled = true;
        setTimeout(() => {
            glitchPass.enabled = false;
        }, 100);
    }
});

// Click event to initialize audio
document.addEventListener('click', () => {
    initAudio();
}, { once: true });

// Initialize Tilt Effect with enhanced options
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
    scale: 1.05,
    gyroscope: true,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45
});

// Skill Bars Animation with enhanced effects
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const progress = bar.querySelector('.skill-progress');
    const skill = bar.dataset.skill;
    let percentage = 0;

    switch(skill) {
        case 'HTML/CSS':
            percentage = 90;
            break;
        case 'JavaScript':
            percentage = 85;
            break;
        case 'React':
            percentage = 80;
            break;
        case 'Node.js':
            percentage = 75;
            break;
        case 'Three.js':
            percentage = 70;
            break;
        default:
            percentage = 75;
    }

    gsap.to(progress, {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        onComplete: () => {
            // Add pulse effect when animation completes
            gsap.to(progress, {
                boxShadow: "0 0 15px var(--neon-blue)",
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }
    });
});

// Skill Radar Chart with enhanced visuals
function createSkillRadar() {
    const canvas = document.getElementById('skill-radar-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Skills data
    const skills = [
        { name: 'HTML/CSS', value: 90 },
        { name: 'JavaScript', value: 85 },
        { name: 'React', value: 80 },
        { name: 'Node.js', value: 75 },
        { name: 'Three.js', value: 70 },
        { name: 'UI/UX', value: 85 }
    ];
    
    // Draw radar
    function drawRadar() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background circles with gradient
        for (let i = 1; i <= 5; i++) {
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius * (i / 5)
            );
            gradient.addColorStop(0, 'rgba(0, 243, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 243, 255, 0.05)');
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * (i / 5), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        // Draw axes
        const angleStep = (Math.PI * 2) / skills.length;
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw skill labels with glow effect
            const labelX = centerX + Math.cos(angle) * (radius + 10);
            const labelY = centerY + Math.sin(angle) * (radius + 10);
            
            ctx.font = '10px "Courier New"';
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 5;
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, labelX, labelY);
            ctx.shadowBlur = 0;
        });
        
        // Draw skill values with animation
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const value = skill.value / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        
        // Create gradient for skill area
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 243, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 243, 255, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw border with glow
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw points with glow
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const value = skill.value / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00f3ff';
            ctx.shadowColor = '#00f3ff';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }
    
    // Initial draw
    drawRadar();
    
    // Animate radar on scroll with enhanced effects
    ScrollTrigger.create({
        trigger: canvas,
        start: "top 80%",
        onEnter: () => {
            gsap.to(canvas, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });
            
            // Add pulse effect
            gsap.to(canvas, {
                scale: 1.05,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }
    });
}

// Terminal typing effect with enhanced visuals
function initTerminalTyping() {
    const typingTexts = document.querySelectorAll('.typing-text');
    
    typingTexts.forEach(text => {
        const content = text.textContent;
        text.textContent = '';
        text.style.width = '0';
        
        gsap.to(text, {
            width: '100%',
            duration: 2,
            ease: "steps(40, end)",
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
        
        let i = 0;
        const typeWriter = () => {
            if (i < content.length) {
                text.textContent += content.charAt(i);
                i++;
                
                // Add glitch effect randomly
                if (Math.random() > 0.95) {
                    text.style.textShadow = `2px 0 ${getRandomColor()}, -2px 0 ${getRandomColor()}`;
                    setTimeout(() => {
                        text.style.textShadow = 'none';
                    }, 50);
                }
                
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    });
}

// Helper function for random colors
function getRandomColor() {
    const colors = ['#00f3ff', '#ff00ff', '#39ff14'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Navigation Smooth Scroll with enhanced effects
document.querySelectorAll('.cyber-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const section = e.target.closest('.cyber-button').dataset.section;
        const targetSection = document.getElementById(section);
        
        // Add glitch effect to button
        button.style.textShadow = `2px 0 ${getRandomColor()}, -2px 0 ${getRandomColor()}`;
        setTimeout(() => {
            button.style.textShadow = 'none';
        }, 200);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetSection,
                offsetY: 50
            },
            ease: "power2.inOut",
            onStart: () => {
                // Add glitch effect to screen
                glitchPass.enabled = true;
                setTimeout(() => {
                    glitchPass.enabled = false;
                }, 500);
            }
        });
    });
});

// Initialize everything with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    createSkillRadar();
    initTerminalTyping();
    
    // Add hover effect to buttons with enhanced visuals
    document.querySelectorAll('.cyber-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 0 15px var(--neon-blue)"
            });
            
            // Add glitch effect
            button.style.textShadow = `1px 0 ${getRandomColor()}, -1px 0 ${getRandomColor()}`;
            setTimeout(() => {
                button.style.textShadow = 'none';
            }, 100);
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none"
            });
        });
    });
    
    // Add hover effect to project cards with enhanced visuals
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Add glitch effect to card title
            const title = card.querySelector('h3');
            if (title) {
                title.style.textShadow = `1px 0 ${getRandomColor()}, -1px 0 ${getRandomColor()}`;
                setTimeout(() => {
                    title.style.textShadow = 'none';
                }, 100);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Add hover effect to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)",
                boxShadow: "0 0 15px var(--neon-blue)"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none"
            });
        });
    });
    
    // Add hover effect to form inputs
    document.querySelectorAll('.cyber-input').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                boxShadow: "0 0 10px var(--neon-blue)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Add form submission effect
    const form = document.querySelector('.cyber-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add glitch effect to form
            form.style.textShadow = `2px 0 ${getRandomColor()}, -2px 0 ${getRandomColor()}`;
            setTimeout(() => {
                form.style.textShadow = 'none';
            }, 300);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'MESSAGE SENT SUCCESSFULLY';
            form.appendChild(successMessage);
            
            // Animate success message
            gsap.fromTo(successMessage, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                gsap.to(successMessage, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => successMessage.remove()
                });
            }, 3000);
        });
    }
});

// Start Animation
animate(); 