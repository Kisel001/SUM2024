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
let MainAnim;

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

// Init default anim
export function AnimInit() {
  MainAnim = new Anim("AnimHandle");
} // End of 'AnimInit' function

// Render default anim
export function AnimRender() {
  MainAnim.render();
} // End of 'AnimRender' function

// END OF 'anim.js' FILE
