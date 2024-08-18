import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import { getGui } from "../gui/gui";
import { createImages } from "./createImages";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const FOV = 45;

const createRenderer = (size: { width: number; height: number }) => {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
  return renderer;
};

const createCamera = (size: { width: number; height: number }) => {
  const fov = FOV;
  const camera = new PerspectiveCamera(
    fov,
    size.width / size.height,
    0.1,
    1500,
  );
  camera.position.y = 120;
  camera.position.z = 600;
  camera.lookAt(new Vector3(0, -100, 0));
  return camera;
};

const createCameraGui = (camera: PerspectiveCamera) => {
  const gui = getGui();
  const folder = gui.addFolder("camera");
  folder.add(camera.position, "x", -3000, 3000, 1);
  folder.add(camera.position, "y", -3000, 3000, 1);
  folder.add(camera.position, "z", -100, 1500, 1);
};

const createScene = () => {
  return new Scene();
};

const createOrbitControl = (camera: PerspectiveCamera, elm: HTMLElement) => {
  const control = new OrbitControls(camera, elm);
  return control;
};

/**
 * initialize Three.js
 * @param app app element
 */
export const initThree = (
  app: HTMLDivElement | null,
  size: { width: number; height: number },
) => {
  if (app) {
    const renderer = createRenderer(size);
    const camera = createCamera(size);
    const scene = createScene();
    const control = createOrbitControl(camera, renderer.domElement);

    createCameraGui(camera);

    const images = createImages();
    scene.add(...images);

    app.appendChild(renderer.domElement);

    const tick = () => {
      control.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }
};
