import GUI from "lil-gui";

let gui: GUI | null = null;

/**
 * Initialize GUI. This is expected to be called once.
 * @param elm HTML element.
 */
export const initGui = () => (gui = new GUI());

/** get GUI */
export const getGui = () => (gui ? gui : initGui());
