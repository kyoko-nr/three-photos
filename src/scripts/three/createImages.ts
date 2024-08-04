import { Mesh, Object3D } from "three";
import { createImagePlane } from "./createImagePlane";

/** Gap between images */
const GAP = 40;

/** Carousel radius */
const RADIUS = 800;

const calcImageWidth = (elms: HTMLImageElement[]) => {
  const sum = elms.reduce((prev, acc) => prev + acc.naturalWidth, 0);
  return sum;
};

export const createImages = (): Object3D[] => {
  const images = document.querySelectorAll<HTMLImageElement>(".js-sliderImage");

  const imagesWidth = calcImageWidth(Array.from(images));

  const circumference = 2 * RADIUS * Math.PI;
  const ratio = (circumference - GAP * images.length) / imagesWidth;

  const meshes: Mesh[] = [];
  let posX = 0;
  images.forEach((image) => {
    const pos = { x: posX, y: 0 };
    const size = {
      width: image.naturalWidth * ratio,
      height: image.naturalHeight * ratio,
    };
    const mesh = createImagePlane(image.src, size, pos);
    meshes.push(mesh);
    posX += GAP + image.naturalWidth * ratio;
  });
  return meshes;
};
