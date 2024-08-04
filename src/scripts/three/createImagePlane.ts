import {
  PlaneGeometry,
  TextureLoader,
  Mesh,
  ShaderMaterial,
  MeshBasicMaterial,
} from "three";
import { Pos, Size } from "./type";
import vShader from "./shader/planeVshader.glsl";
import fShader from "./shader/planeFshader.glsl";

const loader = new TextureLoader();

/**
 * create Three.js Mesh from HTMLImageElement
 * @param src image src
 * @returns
 */
export const createImagePlane = (src: string, size: Size, pos: Pos) => {
  const texture = loader.load(src);
  const uniforms = {
    uTexture: { value: texture },
    uCurlR: { value: -800.0 },
  };
  const geo = new PlaneGeometry(size.width, size.height, 50, 50);
  // const mat = new ShaderMaterial({
  //   uniforms,
  //   vertexShader: vShader,
  //   fragmentShader: fShader,
  // });
  const mat = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geo, mat);
  mesh.position.set(pos.x, pos.y, 0);
  return mesh;
};
