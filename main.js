import * as THREE from 'three';
import { gsap } from 'gsap';
import VanillaTilt from 'vanilla-tilt';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

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

    // Move camera slightly based on mouse position
    camera.position.x = 30 + (mouseX * 0.05);
    camera.position.y = 30 + (mouseY * 0.05);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
});

// Initialize Tilt Effect
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Skill Bars Animation
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
        }
    });
});

// Skill Radar Chart
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
        
        // Draw background circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * (i / 5), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
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
            
            // Draw skill labels
            const labelX = centerX + Math.cos(angle) * (radius + 10);
            const labelY = centerY + Math.sin(angle) * (radius + 10);
            
            ctx.font = '10px "Courier New"';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(skill.name, labelX, labelY);
        });
        
        // Draw skill values
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
        ctx.fillStyle = 'rgba(0, 243, 255, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#00f3ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw points
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const value = skill.value / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00f3ff';
            ctx.fill();
        });
    }
    
    // Initial draw
    drawRadar();
    
    // Animate radar on scroll
    ScrollTrigger.create({
        trigger: canvas,
        start: "top 80%",
        onEnter: () => {
            gsap.to(canvas, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
}

// Terminal typing effect
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
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    });
}

// Navigation Smooth Scroll
document.querySelectorAll('.cyber-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const section = e.target.closest('.cyber-button').dataset.section;
        const targetSection = document.getElementById(section);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetSection,
                offsetY: 50
            },
            ease: "power2.inOut"
        });
    });
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createSkillRadar();
    initTerminalTyping();
    
    // Add hover effect to buttons
    document.querySelectorAll('.cyber-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
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
});

// Start Animation
animate(); 