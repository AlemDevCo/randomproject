import * as THREE from 'https://threejs.org/build/three.module.js';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Set up the cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhysicalMaterial({
    color: 0x00ff00, // Cube color
    transparent: true,
    opacity: 1, // Cube opacity
    metalness: 0.5, // Reflectivity
    roughness: 0.5, // Smoothness
});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // Cube casts shadows
scene.add(cube);

// Set up the lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(2, 2, 2);
scene.add(light);

// Set up the white background
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - Math.PI / 2;
plane.position.y = -2; // Adjust the position as needed
plane.receiveShadow = true; // Plane receives shadows
scene.add(plane);

// Add shadows
renderer.shadowMap.enabled = true;

// Set up animation
const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

animate();
