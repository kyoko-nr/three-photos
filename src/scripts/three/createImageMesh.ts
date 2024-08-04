import {
  PlaneGeometry,
  TextureLoader,
  Mesh,
  ShaderMaterial,
  MeshBasicMaterial,
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
  /** Theta of the image */
  theta: number;
  /** Radius of the image carousel */
  radius: number;
};

/**
 * create Three.js Mesh from HTMLImageElement
 * @param src image src
 * @returns
 */
export const createImageMesh = ({ src, size, pos, theta, radius }: Props) => {
  const texture = loader.load(src);
  const uniforms = {
    uTexture: { value: texture },
    uRadius: { value: radius },
    uTheta: { value: theta },
  };
  const geo = new PlaneGeometry(size.width, size.height, 50, 50);
  const mat = new ShaderMaterial({
    uniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
    side: DoubleSide,
  });
  // const mat = new MeshBasicMaterial({ map: texture });
  const mesh = new Mesh(geo, mat);
  mesh.position.set(pos.x, pos.y, pos.z);
  return mesh;
};
