import "../styles/style.css";
import { initGui } from "./gui/gui";
import { initThree } from "./three/initThree";

/**
 * initialize Three.js app
 */
const init = () => {
  const webgl = document.querySelector<HTMLDivElement>("#webgl");
  if (webgl) {
    const size = {
      width: webgl?.clientWidth ?? 0,
      height: webgl?.clientHeight ?? 0,
    };
    initThree(webgl, size);
    initGui();
  }
};

document.addEventListener("DOMContentLoaded", () => init());
