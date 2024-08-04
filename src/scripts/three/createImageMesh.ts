import {
  PlaneGeometry,
  TextureLoader,
  Mesh,
  ShaderMaterial,
  DoubleSide,
} from "three";
import { Pos, Size } from "./type";
import vShader from "./shader/planeVshader.glsl";
import fShader from "./shader/planeFshader.glsl";

const loader = new TextureLoader();

type Props = {
  /** Image src */
  src: string;
  /** Image size */
  size: Size;
  /** Image position */
  pos: Pos;
  /** Radius of the image carousel */
  radius: number;
  /** Rotate Y radian */
  rotateY: number;
};

/**
 * create Three.js Mesh from HTMLImageElement
 * @param src image src
 * @returns
 */
export const createImageMesh = ({ src, size, pos, radius, rotateY }: Props) => {
  const texture = loader.load(src);
  const uniforms = {
    uTexture: { value: texture },
    uRadius: { value: radius },
  };
  const geo = new PlaneGeometry(size.width, size.height, 50, 50);
  const mat = new ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
    side: DoubleSide,
  });
  const mesh = new Mesh(geo, mat);
  mesh.position.set(pos.x, pos.y, pos.z);
  mesh.rotateY(rotateY);
  return mesh;
};
