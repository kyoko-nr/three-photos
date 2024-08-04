import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import { getGui } from "../gui/gui";
import { createImages, createPlanes } from "./createImages";

const FOV = 45;

const createRenderer = (size: { width: number; height: number }) => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
  return renderer;
};

const createCamera = (size: { width: number; height: number }) => {
  const fov = FOV;
  // const fovRad = (fov / 2) * (Math.PI / 180);
  // const dist = size.height / 2 / Math.tan(fovRad);
  const camera = new PerspectiveCamera(
    fov,
    size.width / size.height,
    0.1,
    1500,
  );
  camera.position.y = 200;
  camera.position.z = 800;
  camera.lookAt(new Vector3(0, 0, 0));
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

    createCameraGui(camera);

    // const images = createImages();
    // scene.add(...images);
    const planes = createPlanes();
    scene.add(...planes);

    app.appendChild(renderer.domElement);

    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }
};
