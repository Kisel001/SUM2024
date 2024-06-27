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
import { getDecV, getDecoI, getIcoI } from "../utils/plat.js";
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
    //this.rnd.gl.disable(this.rnd.gl.BLEND);
    this.rnd.gl.enable(this.rnd.gl.DEPTH_TEST);
    this.timer = new Timer();
    //this.rnd.gl.pointSize(5);
  } // End of constructor

  // Anim render function.
  render() {
    this.rnd.start();
    this.rnd.end();
    this.timer.response();
  } // End of 'render' function
} // End of 'Anim' class

let prim, prim1, shd, prim2, prim3, prim4;

// Init default anim
export function AnimInit() {
  //let V = [
  //  -1, -1, -1, 1, 5, 1, -1, 0, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, -1, 0, 0,
  //  0, -1, 1, -1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, -1, 0, 0,
  //   0,
  //];
  //];

  let V = [
    -1.0, -1.0, -1.0, 0.0, -1.0, 0.0, -1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, -1.0,
    1.0, 0.0, -1.0, 0.0, 1.0, -1.0, -1.0, 0.0, -1.0, 0.0, -1.0, -1.0, -1.0,
    -1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0,
    0.0, -1.0, -1.0, 1.0, -1.0, 0.0, 0.0, -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, -1.0,
    1.0, -1.0, 0.0, 0.0, -1.0, 1.0, 1.0, -1.0, 0.0, 0.0, 1.0, 1.0, -1.0, -1.0,
    0.0, 0.0, 1.0, -1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 1.0, 1.0, 0.0, 0.0, -1.0, -1.0, 1.0, 1.0, 0.0, 0.0, -1.0, 1.0,
    -1.0, -1.0, 1.0, 0.0, 0.0, 1.0, -1.0, 1.0, -1.0, 0.0, 0.0, 1.0, 1.0, 1.0,
    1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 0.0, 0.0, -1.0, 1.0, -1.0, 0.0, -1.0,
    0.0, -1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, -1.0, 0.0, 1.0, 1.0,
    -1.0, 0.0, -1.0, 0.0,
  ];

  let I = [
    0, 1, 2, 0, 3, 2, 4, 5, 6, 4, 7, 6, 8, 9, 10, 8, 11, 10, 12, 13, 14, 12, 15,
    14, 16, 17, 18, 16, 19, 18, 20, 21, 22, 20, 23, 22,
  ];

  //let V = [
  //  -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1, 1, -1, -1,
  //  1, -1, -1, -1, 1, -1, -1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  //  -1, 1, 1, -1,
  //];
  //let V = [-1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0];
  //let V = [
  //  -1, -1, 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0,
  //];
  ///let V = [-1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //let I = [0, 1, 2];

  //let V = [-1, -1, 0, 1, 1, 0, -1, 1, 0];

  //let I = [0, 1, 2, 0, 3, 2];

  MainAnim = new Anim("AnimHandle");

  shd = new rnd.res.shd.shader(MainAnim.rnd.gl);
  prim = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    V,
    I,
    MainAnim.rnd.shdprg
  );
  prim1 = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    ipgl.plat.getIcoV(),
    ipgl.plat.getIcoI(),
    MainAnim.rnd.shdprg
  );

  let VS = new getDecV();
  let IS = new getDecoI();

  let LOL = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Lol",
    null,
    null,
    MainAnim.rnd.shdprg
  );
  LOL.autoNormals(VS, IS, 60, 108);

  prim2 = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    VS,
    IS,
    MainAnim.rnd.shdprg
  );

  let VSS = new ipgl.plat.getTetraV();
  let ISS = new ipgl.plat.getTetraI();

  LOL.autoNormals(VSS, ISS, 12, 12);

  prim3 = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    VSS,
    ISS,
    MainAnim.rnd.shdprg
  );

  let VSSS = new ipgl.plat.getOctaV();
  let ISSS = new ipgl.plat.getOctaI();

  LOL.autoNormals(VSSS, ISSS, 24, 24);

  let VSDS = [
    -100, 0, -100, 0, 1, 0,

    -100, 0, 100, 0, 1, 0,

    100, 0, 100, 0, 1, 0,

    100, 0, -100, 0, 1, 0,
  ];

  let ISDS = [0, 1, 2, 0, 3, 2];

  prim4 = new rnd.res.prim.Prim(
    MainAnim.rnd.gl,
    "Trimesh",
    VSDS,
    ISDS,
    MainAnim.rnd.shdprg
  );
} // End of 'AnimInit' function

// Render default anim
export function AnimRender() {
  MainAnim.render();
  let m = ipgl.mth.mat4(),
    m1 = ipgl.mth.mat4(),
    m2 = ipgl.mth.mat4(),
    m4 = ipgl.mth.mat4(),
    m5 = ipgl.mth.mat4(),
    m7 = ipgl.mth.mat4(),
    m9 = ipgl.mth.mat4();

  m4.translate(ipgl.mth.vec3(1.5, 2, -2));
  m5.rotate(MainAnim.timer.localTime * 50, ipgl.mth.vec3(8, 4, 2));
  m.rotate(MainAnim.timer.localTime * 50, ipgl.mth.vec3(3, 5, 2));
  m1.translate(ipgl.getyp.getCoordinates());
  m2.rotate(MainAnim.timer.localTime * 50, ipgl.mth.vec3(1, 7, 4));
  let m3 = m2.mul(m1);
  let m6 = m5.mul(m4);
  m7.translate(ipgl.mth.vec3(-5, -1, 0));
  let m8 = m5.mul(m7);
  m9.translate(ipgl.mth.vec3(-3, -3, 2));
  let m10 = m.mul(m9);

  prim.primDraw(MainAnim.rnd, m3, MainAnim.rnd.shader);
  prim1.primDraw(MainAnim.rnd, m6, MainAnim.rnd.shader);
  prim2.primDraw(MainAnim.rnd, m, MainAnim.rnd.shader);
  prim3.primDraw(MainAnim.rnd, m8, MainAnim.rnd.shader);
  prim4.primDraw(MainAnim.rnd, ipgl.mth.mat4(), MainAnim.rnd.shader);
} // End of 'AnimRender' function

// END OF 'anim.js' FILE
