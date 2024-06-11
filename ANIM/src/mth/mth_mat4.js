//
// mth_mat4.js
//
//      Copyright (C) CGSG of PML 30. All rights reserved.
//
// Matrix 4x4 part of mth library.
//

// Import
import { vec3, _vec3 } from "./mth_vec3";
import { D2R, R2D } from "./mth_def.js";

// Matrix 4x4 class
export class _mat4 {
  // Constructor
  constructor(
    a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    a30,
    a31,
    a32,
    a33
  ) {
    if (a00 === undefined)
      this.a = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
    else if (typeof a00 == "object" && a00.a.length == 4) this.a = a00.a;
    else
      this.a = [
        [a00, a01, a02, a03],
        [a10, a11, a12, a13],
        [a20, a21, a22, a23],
        [a30, a31, a32, a33],
      ];
  } // End of constructor

  // Matr mul matr function
  mul(m) {
    return mat4(
      this.a[0][0] * m.a[0][0] +
        this.a[0][1] * m.a[1][0] +
        this.a[0][2] * m.a[2][0] +
        this.a[0][3] * m.a[3][0],
      this.a[0][0] * m.a[0][1] +
        this.a[0][1] * m.a[1][1] +
        this.a[0][2] * m.a[2][1] +
        this.a[0][3] * m.a[3][1],
      this.a[0][0] * m.a[0][2] +
        this.a[0][1] * m.a[1][2] +
        this.a[0][2] * m.a[2][2] +
        this.a[0][3] * m.a[3][2],
      this.a[0][0] * m.a[0][3] +
        this.a[0][1] * m.a[1][3] +
        this.a[0][2] * m.a[2][3] +
        this.a[0][3] * m.a[3][3],

      this.a[1][0] * m.a[0][0] +
        this.a[1][1] * m.a[1][0] +
        this.a[1][2] * m.a[2][0] +
        this.a[1][3] * m.a[3][0],
      this.a[1][0] * m.a[0][1] +
        this.a[1][1] * m.a[1][1] +
        this.a[1][2] * m.a[2][1] +
        this.a[1][3] * m.a[3][1],
      this.a[1][0] * m.a[0][2] +
        this.a[1][1] * m.a[1][2] +
        this.a[1][2] * m.a[2][2] +
        this.a[1][3] * m.a[3][2],
      this.a[1][0] * m.a[0][3] +
        this.a[1][1] * m.a[1][3] +
        this.a[1][2] * m.a[2][3] +
        this.a[1][3] * m.a[3][3],

      this.a[2][0] * m.a[0][0] +
        this.a[2][1] * m.a[1][0] +
        this.a[2][2] * m.a[2][0] +
        this.a[2][3] * m.a[3][0],
      this.a[2][0] * m.a[0][1] +
        this.a[2][1] * m.a[1][1] +
        this.a[2][2] * m.a[2][1] +
        this.a[2][3] * m.a[3][1],
      this.a[2][0] * m.a[0][2] +
        this.a[2][1] * m.a[1][2] +
        this.a[2][2] * m.a[2][2] +
        this.a[2][3] * m.a[3][2],
      this.a[2][0] * m.a[0][3] +
        this.a[2][1] * m.a[1][3] +
        this.a[2][2] * m.a[2][3] +
        this.a[2][3] * m.a[3][3],

      this.a[3][0] * m.a[0][0] +
        this.a[3][1] * m.a[1][0] +
        this.a[3][2] * m.a[2][0] +
        this.a[3][3] * m.a[3][0],
      this.a[3][0] * m.a[0][1] +
        this.a[3][1] * m.a[1][1] +
        this.a[3][2] * m.a[2][1] +
        this.a[3][3] * m.a[3][1],
      this.a[3][0] * m.a[0][2] +
        this.a[3][1] * m.a[1][2] +
        this.a[3][2] * m.a[2][2] +
        this.a[3][3] * m.a[3][2],
      this.a[3][0] * m.a[0][3] +
        this.a[3][1] * m.a[1][3] +
        this.a[3][2] * m.a[2][3] +
        this.a[3][3] * m.a[3][3]
    );
  } // End of 'mul' function.

  // Matr translate function
  translate(v) {
    this.a = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1).a;
  } // End of 'translate' function

  // Matr scale function
  scale(v) {
    this.a = mat4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
  } // End of 'scale' function

  // Matr RotateX functio
  rotateX(a) {
    let an = D2R(a),
      c = cos(an),
      s = sin(an);

    this.a = mat4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1).a;
  } // End of 'rotateX' function

  // Matr rotateY function
  rotateY(a) {
    let an = D2R(a),
      c = cos(an),
      s = sin(an);

    this.a = mat4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1).a;
  } // End of 'rotateY' function

  // Matr RotateZ function
  rotateZ(a) {
    let an = D2R(a),
      c = cos(an),
      s = sin(an);

    this.a = mat4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).a;
  } // End of 'rotateZ' function

  // Matr rotate function
  rotate(a, r) {
    let A = D2R(a),
      s = Math.sin(A),
      c = Math.cos(A);
    let V = r.getNormal();
    this.a = mat4(
      c + V.x * V.x * (1 - c),
      V.x * V.y * (1 - c) + V.z * s,
      V.x * V.z * (1 - c) - V.y * s,
      0,
      V.y * V.x * (1 - c) - V.z * s,
      c + V.y * V.y * (1 - c),
      V.y * V.z * (1 - c) + V.x * s,
      0,
      V.z * V.x * (1 - c) + V.y * s,
      V.z * V.y * (1 - c) - V.x * s,
      c + V.z * V.z * (1 - c),
      0,
      0,
      0,
      0,
      1
    ).a;
  } // End of 'rotate' function

  // Matr transponse function
  transponse(m) {
    this.a = mat4(
      m.a[0][0],
      m.a[1][0],
      m.a[2][0],
      m.a[3][0],
      m.a[0][1],
      m.a[1][1],
      m.a[2][1],
      m.a[3][1],
      m.a[0][2],
      m.a[1][2],
      m.a[2][2],
      m.a[3][2],
      m.a[0][3],
      m.a[1][3],
      m.a[2][3],
      m.a[3][3]
    ).a;
  } // End of 'transponse' function.

  // Determinate matrix function.
  determ() {
    return (
      this.a[0][0] *
        mat3Determ(
          this.a[1][1],
          this.a[1][2],
          this.a[1][3],
          this.a[2][1],
          this.a[2][2],
          this.a[2][3],
          this.a[3][1],
          this.a[3][2],
          this.a[3][3]
        ) -
      this.a[0][1] *
        mat3Determ(
          this.a[1][0],
          this.a[1][2],
          this.a[1][3],
          this.a[2][0],
          this.a[2][2],
          this.a[2][3],
          this.a[3][0],
          this.a[3][2],
          this.a[3][3]
        ) +
      this.a[0][2] *
        mat3Determ(
          this.a[1][0],
          this.a[1][1],
          this.a[1][3],
          this.a[2][0],
          this.a[2][1],
          this.a[2][3],
          this.a[3][0],
          this.a[3][1],
          this.a[3][3]
        ) -
      this.a[0][3] *
        mat3Determ(
          this.a[1][0],
          this.a[1][1],
          this.a[1][2],
          this.a[2][0],
          this.a[2][1],
          this.a[2][2],
          this.a[3][0],
          this.a[3][1],
          this.a[3][2]
        )
    );
  } // End of 'determ' function

  // Get inverse matrix function
  getInverse() {
    let r = mat4();
    let det = this.determ();

    if (det == 0) return r;

    /* build adjoint matrix */
    r.a[0][0] =
      +mat3Determ(
        this.a[1][1],
        this.a[1][2],
        this.a[1][3],
        this.a[2][1],
        this.a[2][2],
        this.a[2][3],
        this.a[3][1],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[1][0] =
      -mat3Determ(
        this.a[1][0],
        this.a[1][2],
        this.a[1][3],
        this.a[2][0],
        this.a[2][2],
        this.a[2][3],
        this.a[3][0],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[2][0] =
      +mat3Determ(
        this.a[1][0],
        this.a[1][1],
        this.a[1][3],
        this.a[2][0],
        this.a[2][1],
        this.a[2][3],
        this.a[3][0],
        this.a[3][1],
        this.a[3][3]
      ) / det;

    r.a[3][0] =
      -mat3Determ(
        this.a[1][0],
        this.a[1][1],
        this.a[1][2],
        this.a[2][0],
        this.a[2][1],
        this.a[2][2],
        this.a[3][0],
        this.a[3][1],
        this.a[3][2]
      ) / det;

    r.a[0][1] =
      -mat3Determ(
        this.a[0][1],
        this.a[0][2],
        this.a[0][3],
        this.a[2][1],
        this.a[2][2],
        this.a[2][3],
        this.a[3][1],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[1][1] =
      +mat3Determ(
        this.a[0][0],
        this.a[0][2],
        this.a[0][3],
        this.a[2][0],
        this.a[2][2],
        this.a[2][3],
        this.a[3][0],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[2][1] =
      -mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][3],
        this.a[2][0],
        this.a[2][1],
        this.a[2][3],
        this.a[3][0],
        this.a[3][1],
        this.a[3][3]
      ) / det;

    r.a[3][1] =
      +mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][2],
        this.a[2][0],
        this.a[2][1],
        this.a[2][2],
        this.a[3][0],
        this.a[3][1],
        this.a[3][2]
      ) / det;

    r.a[0][2] =
      +mat3Determ(
        this.a[0][1],
        this.a[0][2],
        this.a[0][3],
        this.a[1][1],
        this.a[1][2],
        this.a[1][3],
        this.a[3][1],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[1][2] =
      -mat3Determ(
        this.a[0][0],
        this.a[0][2],
        this.a[0][3],
        this.a[1][0],
        this.a[1][2],
        this.a[1][3],
        this.a[3][0],
        this.a[3][2],
        this.a[3][3]
      ) / det;

    r.a[2][2] =
      +mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][3],
        this.a[1][0],
        this.a[1][1],
        this.a[1][3],
        this.a[3][0],
        this.a[3][1],
        this.a[3][3]
      ) / det;

    r.a[3][2] =
      -mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][2],
        this.a[1][0],
        this.a[1][1],
        this.a[1][2],
        this.a[3][0],
        this.a[3][1],
        this.a[3][2]
      ) / det;

    r.a[0][3] =
      -mat3Determ(
        this.a[0][1],
        this.a[0][2],
        this.a[0][3],
        this.a[1][1],
        this.a[1][2],
        this.a[1][3],
        this.a[2][1],
        this.a[2][2],
        this.a[2][3]
      ) / det;

    r.a[1][3] =
      +mat3Determ(
        this.a[0][0],
        this.a[0][2],
        this.a[0][3],
        this.a[1][0],
        this.a[1][2],
        this.a[1][3],
        this.a[2][0],
        this.a[2][2],
        this.a[2][3]
      ) / det;

    r.a[2][3] =
      -mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][3],
        this.a[1][0],
        this.a[1][1],
        this.a[1][3],
        this.a[2][0],
        this.a[2][1],
        this.a[2][3]
      ) / det;

    r.a[3][3] =
      +mat3Determ(
        this.a[0][0],
        this.a[0][1],
        this.a[0][2],
        this.a[1][0],
        this.a[1][1],
        this.a[1][2],
        this.a[2][0],
        this.a[2][1],
        this.a[2][2]
      ) / det;

    return r;
  } // End of 'getInverse' function.

  // frustum matrix function
  frustum(L, R, B, T, N, F) {
    this.a = mat4(
      (2 * N) / (R - L),
      0,
      0,
      0,
      0,
      (2 * N) / (T - B),
      0,
      0,
      (R + L) / (R - L),
      (T + B) / (T - B),
      -(F + N) / (F - N),
      -1,
      0,
      0,
      (-2 * N * F) / (F - N),
      0
    ).a;
  } // End of 'frustum' function

  // ortho matrix function
  ortho(L, R, B, T, N, F) {
    this.a = mat4(
      2 / (R - L),
      0,
      0,
      0,
      0,
      2 / (T - B),
      0,
      0,
      0,
      0,
      -2 / (F - N),
      0,
      -(R + L) / (R - L),
      -(T + B) / (T - B),
      -(F + N) / (F - N),
      1
    );
  } // End of 'ortho' function

  // Set view matrix function
  view(Loc, At, Up1) {
    const Dir = vec3(At).sub(Loc).getNormal();
    const Right = vec3(Dir).cross(Up1).getNormal();
    const Up = vec3(Right).cross(Dir).getNormal();

    this.a = mat4(
      Right.x,
      Up.x,
      -Dir.x,
      0,
      Right.y,
      Up.y,
      -Dir.y,
      0,
      Right.z,
      Up.z,
      -Dir.z,
      0,
      -Loc.dot(Right),
      -Loc.dot(Up),
      Loc.dot(Dir),
      1
    ).a;
  } // End of 'view' function

  toArray() {
    return [
      this.a[0][0],
      this.a[0][1],
      this.a[0][2],
      this.a[0][3],
      this.a[1][0],
      this.a[2][1],
      this.a[1][2],
      this.a[1][3],
      this.a[2][0],
      this.a[2][1],
      this.a[2][2],
      this.a[2][3],
      this.a[3][0],
      this.a[3][1],
      this.a[3][2],
      this.a[3][3],
    ];
  }
}

// Get matrix function.
export function mat4(
  a00,
  a01,
  a02,
  a03,
  a10,
  a11,
  a12,
  a13,
  a20,
  a21,
  a22,
  a23,
  a30,
  a31,
  a32,
  a33
) {
  return new _mat4(
    a00,
    a01,
    a02,
    a03,
    a10,
    a11,
    a12,
    a13,
    a20,
    a21,
    a22,
    a23,
    a30,
    a31,
    a32,
    a33
  );
} // End of 'mat4' function.

// mat3 determination function
export function mat3Determ(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
  return new Number(
    a11 * a22 * a33 +
      a12 * a23 * a31 +
      a13 * a21 * a32 -
      a11 * a23 * a32 -
      a12 * a21 * a33 -
      a13 * a22 * a31
  );
} // End of 'mat3Determ' function

// END OF 'mth_mat4.js' FILEs
