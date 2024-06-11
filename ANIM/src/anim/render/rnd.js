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

// Project parameters
export let projSize = 0.1;
export let projDist = 0.1;
export let projFarClip = 300;

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
    this.w = this.handle.width;
    this.h = this.handle.height;

    this.matrVP = ipgl.mth.mat4();
    this.matrProj = ipgl.mth.mat4();
    this.matrView = ipgl.mth.mat4();

    // Create default shader
    this.shader = res.shd.shader(this.gl);
    this.shdprg = this.shader.prg;

    this.projSet();
    this.camSet(
      ipgl.mth.vec3(5, 5, 5),
      ipgl.mth.vec3(0, 0, 0),
      ipgl.mth.vec3(0, 1, 0)
    );
  } // End of constructor

  // Render start function
  start() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  } // End of 'start' function

  // Render end function
  end() {
    return;
  } // End of 'end' function

  // Set camera function
  camSet(Loc, At, Up) {
    this.matrView = ipgl.mth.mat4();
    this.matrView.view(Loc, At, Up);
    this.matrVP = this.matrView.mul(this.matrProj);
    //this.matrVP = this.matrProj.mul(this.matrView);

    this.camRight = ipgl.mth.vec3(
      this.matrView.a[0][0],
      this.matrView.a[1][0],
      this.matrView.a[2][0]
    );
    this.camUp = ipgl.mth.vec3(
      this.matrView.a[0][1],
      this.matrView.a[1][1],
      this.matrView.a[2][1]
    );
    this.camDir = ipgl.mth.vec3(
      -this.matrView.a[0][2],
      -this.matrView.a[1][2],
      -this.matrView.a[2][2]
    );
    this.camLoc = Loc;
    this.camAt = At;

    return;
  } // End of 'camSet' function

  // Set project matrix function
  projSet() {
    let rx, ry;

    rx = projSize;
    ry = projSize;

    if (this.w >= this.h) {
      rx *= this.w / this.h;
    } else {
      ry *= this.h / this.w;
    }

    this.matrProj = ipgl.mth.mat4();
    this.matrProj.frustum(
      -rx / 2,
      rx / 2,
      -ry / 2,
      ry / 2,
      projDist,
      projFarClip
    );
    this.matrVP = this.matrView.mul(this.matrProj);
  } // End of 'projSet' function
} // End of 'Render' class

// END OF 'rnd.js' FILE
