import * as THREE from "three";
import { getGui } from "./gui";

export const createGui = (camera: THREE.PerspectiveCamera) => {
  const gui = getGui();
  const folder = gui.addFolder("camera");
  folder.add(camera, "fov", 10, 200);
  folder.add(camera.position, "x", -200, 200);
  folder.add(camera.position, "y", -200, 200);
  folder.add(camera.position, "z", -300, 300);
};
