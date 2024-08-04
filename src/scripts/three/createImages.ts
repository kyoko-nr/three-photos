import { Mesh, Object3D } from "three";
import { createImageMesh } from "./createImageMesh";

/** Gap between images */
const GAP = 40;

/** Carousel radius */
const RADIUS = 400;

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
    const theta = (360 / images.length) * index;
    const rotateRad = ((Math.PI * 2) / images.length) * (index + 1);

    const rad = ((Math.PI * 2) / images.length) * index;

    const size = {
      width: image.naturalWidth * ratio,
      height: image.naturalHeight * ratio,
    };

    const pos = {
      x: Math.cos(rad) * RADIUS,
      y: 0,
      z: Math.sin(rad) * RADIUS,
    };

    const mesh = createImageMesh({
      src: image.src,
      pos,
      size,
      theta,
      radius: RADIUS,
      rotateY: rotateRad,
    });
    meshes.push(mesh);
  });
  return meshes;
};
