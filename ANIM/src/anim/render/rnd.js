//
// rnd.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Render module.
//

// Import
import * as ipgl from "./../../includes.js";
import * as res from "./res/res.js";

// Export
export * as res from "./res/res.js";

// Render class
export class Render {
  // Constructor
  constructor(canvasid) {
    this.handle = document.getElementById(canvasid);
    this.gl = this.handle.getContext("webgl2");
    if (this.gl === undefined) {
      alert(
        "Error GL0047!\nWebGL 2.0 not supported by your browser!\nFor more information, visit https://school30.spb.ru/cgsg/"
      );
    }
    this.gl.clearColor(0.3, 0.47, 0.8, 1);
  } // End of constructor

  // Render start function
  start() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  } // End of 'start' function

  // Render end function
  end() {} // End of 'end' function
} // End of 'Render' class

// END OF 'rnd.js' FILE
