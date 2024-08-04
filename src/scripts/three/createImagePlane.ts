import { PlaneGeometry, TextureLoader, Mesh, MeshBasicMaterial } from "three";
import { Size } from "./type";
// import vShader from "./shaders/vShader.glsl";
// import fShader from "./shaders/fShader.glsl";

const loader = new TextureLoader();

/**
 * create Three.js Mesh from HTMLImageElement
 * @param src image src
 * @returns
 */
export const createImagePlane = (src: string, size: Size) => {
  const texture = loader.load(src);
  const geo = new PlaneGeometry(size.width, size.height, 100, 100);
  const mat = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geo, mat);
  return mesh;
};
