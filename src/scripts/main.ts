import "../styles/style.css";
import { initGui } from "./gui/gui";
import { initThree } from "./three/initThree";

/**
 * initialize Three.js app
 */
const init = () => {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (app) {
    const size = {
      width: app?.clientWidth ?? 0,
      height: app?.clientHeight ?? 0,
    };
    initThree(app, size);
    initGui();
  }
};

init();
