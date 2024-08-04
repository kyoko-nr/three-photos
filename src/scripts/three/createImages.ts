import {
  DoubleSide,
  Mesh,
  Object3D,
  PlaneGeometry,
  ShaderMaterial,
} from "three";
import { createImageMesh } from "./createImageMesh";
import vShader from "./shader/testVshader.glsl";
import fShader from "./shader/textFshader.glsl";

/** Carousel radius */
const RADIUS = 300;

const calcImageWidth = (elms: HTMLImageElement[]) => {
  const sum = elms.reduce((prev, acc) => prev + acc.naturalWidth, 0);
  return sum;
};

export const createImages = (): Object3D[] => {
  const images = document.querySelectorAll<HTMLImageElement>(".js-sliderImage");

  const imagesWidth = calcImageWidth(Array.from(images));

  const circumference = 2 * RADIUS * Math.PI;
  const ratio = circumference / imagesWidth;

  const meshes: Mesh[] = [];

  images.forEach((image, index) => {
    const rotateRad = ((Math.PI * 2) / images.length) * index + Math.PI * 0.5;

    const size = {
      width: image.naturalWidth * ratio,
      height: image.naturalHeight * ratio,
    };

    const mesh = createImageMesh({
      src: image.src,
      size,
      radius: RADIUS,
      rotateY: rotateRad,
    });
    meshes.push(mesh);
  });
  return meshes;
};

// planes to test
export const createPlanes = () => {
  const planeLength = 6;
  const planeSize = { width: 300, height: 200 };

  const meshes: Mesh[] = [];

  const circleLength = 300 * planeLength;
  const radius = (circleLength / Math.PI) * 0.5;
  console.log("radius", radius);

  for (let i = 0; i < planeLength; i++) {
    const geo = new PlaneGeometry(planeSize.width, planeSize.height, 50, 50);

    const uniforms = {
      uRadius: { value: radius },
      uTheta: { value: 0.0 },
      uImageLength: { value: planeLength },
    };

    const mat = new ShaderMaterial({
      uniforms,
      vertexShader: vShader,
      fragmentShader: fShader,
      side: DoubleSide,
    });
    const mesh = new Mesh(geo, mat);

    const rotateY = ((Math.PI * 2) / planeLength) * i + Math.PI * 0.5;
    mesh.rotateY(rotateY);

    meshes.push(mesh);
  }
  return meshes;
};
