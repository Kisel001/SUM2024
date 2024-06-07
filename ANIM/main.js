//
// main.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// main file of project (for rollup and include to html).
//
// [PUBLIC]
//

import * as ipgl from "./src/includes.js";
export * as ipgl from "./src/includes.js";

// Executable code
window.addEventListener("load", () => {
  ipgl.anim.AnimInit();
  const Rendering = () => {
    // drawing
    ipgl.anim.AnimRender();
    // animation register
    window.requestAnimationFrame(Rendering);
  };
  Rendering();
});

//window.addEventListener("mousemove", (event) => {
//  ipgl.onClick(event);
//});

//window.addEventListener("keydown", (event) => {
//  ipgl.onKeys(event);
//});

// END OF 'main.js' FILE.
