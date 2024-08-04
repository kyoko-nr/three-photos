import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import { createImagePlane } from "./createImagePlane";
import taipei1 from "../../assets/images/taipei1.jpg";
import { getGui } from "../gui/gui";

const FOV = 90;

const createRenderer = (size: { width: number; height: number }) => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size.width, size.height);
  return renderer;
};

const createCamera = (size: { width: number; height: number }) => {
  const fov = FOV;
  // const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = 600;
  // const dist = size.height / 2 / Math.tan(fovRad);
  const camera = new PerspectiveCamera(
    fov,
    size.width / size.height,
    0.1,
    1500,
  );
  camera.position.z = dist;
  camera.lookAt(new Vector3(0, 0, 0));
  return camera;
};

const createCameraGui = (camera: PerspectiveCamera) => {
  const gui = getGui();
  const folder = gui.addFolder("camera");
  folder.add(camera.position, "x", -1000, 1000, 1);
  folder.add(camera.position, "y", -1000, 1000, 1);
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

    const image1 = createImagePlane(taipei1, { width: 553, height: 368 });
    console.log("iamge1", image1);
    scene.add(image1);

    app.appendChild(renderer.domElement);

    const tick = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }
};
