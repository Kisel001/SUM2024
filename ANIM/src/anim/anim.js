//
// anim.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Anim module.
//

// Import
import * as rnd from "./render/rnd.js";
import * as ipgl from "./../includes.js";
import { Timer } from "./timer.js";
//import { allowedNodeEnvironmentFlags } from "process";

// Export
export * as rnd from "./render/rnd.js";
export { Timer };

// Default anim variable
export let MainAnim;

// Anim class
export class Anim {
  constructor(canvasid) {
    this.rnd = new rnd.Render(canvasid);
  } // End of constructor

  // Anim render function.
  render() {
    this.rnd.start();
    this.rnd.end();
  } // End of 'render' function
} // End of 'Anim' class

let prim, shd;

// Init default anim
export function AnimInit() {
  let V = [
    0, 0, 0, 1, 5, 1, -1, 0, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, -1, 0, 0, 0,
    -1, 1, -1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, -1, 0, 0, 0,
  ];
  let I = [
    0, 1, 2, 0, 3, 2, 1, 5, 4, 1, 0, 4, 0, 4, 7, 0, 3, 7, 2, 6, 7, 2, 3, 7, 1,
    5, 6, 1, 2, 6, 5, 4, 7, 5, 6, 7,
  ];
  //let V = [
  //  -1, -1, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0,
  //];

  //let I = [0, 1, 2, 0, 3, 2];

  MainAnim = new Anim("AnimHandle");

  //shd = new rnd.res.shd.shader(MainAnim.rnd.gl);
  prim = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    V,
    I,
    MainAnim.rnd.shdprg
  );
} // End of 'AnimInit' function

// Render default anim
export function AnimRender() {
  MainAnim.render();

  prim.primDraw(MainAnim.rnd, ipgl.mth.mat4(), MainAnim.rnd.shdprg);
} // End of 'AnimRender' function

// END OF 'anim.js' FILE
