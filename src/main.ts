import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { DragControls } from "three/examples/jsm/Addons.js";
import { VRButton } from "three/addons/webxr/VRButton.js";

// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const app: HTMLDivElement = document.querySelector<HTMLDivElement>("#app");
app.appendChild(renderer.domElement);
// Геометрия и материал
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "blue" });
const axeccHelper = new THREE.AxesHelper(3);
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(axeccHelper);
app.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;
const objects = [cube];

const control = new DragControls(objects, camera, app);
control.addEventListener("dragstart", (e) => {});

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Радиус = 1, 32 сегмента по ширине и высоте
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true }); // Материал с синим цветом
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
sphere.rotation.z = 0.5;

// Добавляем сферу в сцену
scene.add(sphere);

// Анимация
const animate = function () {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01;
    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    // if (cube.position.y > 0 || cube.position.y > 0) {
    //     cube.position.y += 0.01;
    // } else if (cube.position.x > 0 || cube.position.x < 0) {
    //     cube.position.x += 0.01;
    // }

    renderer.render(scene, camera);
};
if (WebGL.isWebGL2Available()) {
    animate();
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    app.appendChild(warning);
}
