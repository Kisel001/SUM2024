var Proj = (function (exports) {
  'use strict';

  //
  // mth_vec3.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Vector 3D part of mth library.
  //

  // Vector 3D class
  class _vec3 {
    // Constructor
    constructor(x, y, z) {
      if (x === undefined) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      } else if (typeof x == "object") {
        if (x.x !== undefined) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
        } else if (x.length == 3) {
          this.x = x[0];
          this.y = x[1];
          this.z = x[2];
        } else {
          this.x = 0;
          this.y = 0;
          this.z = 0;
        }
      } else if (y === undefined) {
        this.x = x;
        this.y = x;
        this.z = x;
      } else {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    } // End of constructor

    // Add 2 vectors
    add(v) {
      return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } // End of 'add' function

    // Get negative vector
    getNeg() {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'getNeg' function

    // Set negative vector
    setNeg() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
    } // End of 'setNeg' function

    // Min 2 vectors
    sub(v) {
      return this.add(v.getNeg());
    } // End of 'sub' function

    // Dot 2 vectors
    dot(v) {
      if (v === undefined)
        return this.x * this.x + this.y * this.y + this.z * this.z;
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    // Cross 2 vectors
    cross(v) {
      return vec3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    } // End of 'cross' function

    // Get len of vector
    len() {
      return Math.sqrt(this.dot());
    } // End of 'len' function
    /*
    // Sub 2 vectors
    sub(v) {
      return vec3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    } // End of 'sub' function
  */
    // Vec mul num
    mul(n) {
      return vec3(this.x * n, this.y * n, this.z * n);
    } // End of 'mul' function

    // Vec div num
    div(n) {
      return vec3(this.x / n, this.y / n, this.z / n);
    } // End of 'div' function

    // Set vec normalize
    setNormal() {
      let l = this.len();
      if (l != 0 && l != 1) {
        this.x /= l;
        this.y /= l;
        this.z /= l;
      }
    } // End of 'setNormal' function

    // Get vec nomrmalize
    getNormal() {
      let l = this.len();
      if (l == 0 || l == 1) return vec3(this);
      return this.div(l);
    } // End of 'getNormal' function

    // Vector 3D mul Matr function
    mulMatr(v, m) {
      let w =
        this.x * m.a[0][3] + this.y * m.a[1][3] + this.z * m.a[2][3] + m.a[3][3];

      return vec3(
        (this.x * m.a[0][0] +
          this.y * m.a[1][0] +
          this.z * m.a[2][0] +
          m.a[3][0]) /
          w,
        (this.x * m.a[0][1] +
          this.y * m.a[1][1] +
          this.z * m.a[2][1] +
          m.a[3][1]) /
          w,
        (this.x * m.a[0][2] +
          this.y * m.a[1][2] +
          this.z * m.a[2][2] +
          m.a[3][2]) /
          w
      );
    } // End of 'mulMatr' function

    // Convert vector to array
    toArray() {
      return new [this.x, this.y, this.z]();
    } // End of 'toArray' function
  } // End of '_vec3' class

  // Create vec3 function.
  function vec3(x, y, z) {
    return new _vec3(x, y, z);
  } // End of 'vec3' function

  // END OF 'mth_vec3.h' FILEs

  //
  // mth_def.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Base definitions for mathematic module.
  //


  // D2R function
  function D2R(a) {
    return new Number((a * Math.PI) / 180);
  } // End of 'D2R' function

  // R2D function
  function R2D(a) {
    return new Number((a * 180) / Math.PI);
  }

  // END OF 'mth_def.js' FILE

  //
  // mth_mat4.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Matrix 4x4 part of mth library.
  //


  // Matrix 4x4 class
  class _mat4 {
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
  function mat4(
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
  function mat3Determ(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
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

  //
  // mth.js
  //
  //      Copyright (C) CGSG of PML 30. All rights reserved.
  //
  // Main file of mth library.
  //


  // END OF 'mth.js' FILE

  var mth = /*#__PURE__*/Object.freeze({
    __proto__: null,
    D2R: D2R,
    R2D: R2D,
    _mat4: _mat4,
    _vec3: _vec3,
    mat3Determ: mat3Determ,
    mat4: mat4,
    vec3: vec3
  });

  //
  // prim.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Primitive module.
  //


  // Vertex class
  class _Vertex {
    // Constructor
    constructor(p, n) {
      this.v = [p.x, p.y, p.z, n.x, n.y, n.z];
    } // End of constructor
  } // End of '_Vertex' class

  // Get vertex function
  function Vertex(p, n) {
    return new _Vertex(p, n);
  } // End of 'Vertex' function

  // Primitive class
  class Prim {
    // Constructor
    constructor(gl, type, vertices, indices, prg) {
      this.type = type;
      this.VA = gl.createVertexArray();

      //if (vertices != null && indices != null)
      //  this.autoNormals(vertices, indices, vertices.length, indices.length);

      if (vertices != null && vertices.length != 0) {
        gl.bindVertexArray(this.VA);
        this.VBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBuf);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(vertices),
          gl.STATIC_DRAW
        );
        const posLoc = gl.getAttribLocation(prg, "InPosition");
        const norLoc = gl.getAttribLocation(prg, "InNormal");

        if (posLoc != -1) {
          gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
          gl.enableVertexAttribArray(posLoc);
        }
        if (norLoc != -1) {
          gl.vertexAttribPointer(norLoc, 3, gl.FLOAT, false, 24, 12);
          gl.enableVertexAttribArray(norLoc);
        }
        this.noofV = vertices.length / 6;
      } else {
        this.noofV = 0;
        this.VBuf = 0;
      }

      /* Set index data */
      if (indices != null && indices.length != 0) {
        this.IBuf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
        gl.bufferData(
          gl.ELEMENT_ARRAY_BUFFER,
          new Uint32Array(indices),
          gl.STATIC_DRAW
        );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.noofI = indices.length;
        this.NumOfElements = this.noofI;
      } else {
        this.noofI = 0;
        this.IBuf = 0;
        this.NumOfElements = this.noofV;
      }
      /* GetMinMaxBB */
      //IP5_RndPrimEvalBB(&Pr->MinBB, &Pr->MaxBB, V, NoofV);

      this.MtlNo = 0;
    } // End of contstructor

    // Prim draw function
    primDraw(rnd, matr, shd) {
      let gl = rnd.gl;
      const progId = shd.prg;
      const glPrimType = this.type == "Trimesh" ? gl.TRIANGLES : gl.POINTS;
      const w = mat4(matr),
        wnormal = w.getInverse(),
        wvp = w.mul(rnd.matrVP);

      wnormal.transponse(matr.getInverse());

      // send data to shader
      gl.useProgram(progId);

      gl.uniformMatrix4fv(
        shd.MatrWVPLoc,
        false,
        new Float32Array([].concat(...wvp.a))
      ); // wvp.toArray()));
      gl.uniformMatrix4fv(
        shd.MatrWInvLoc,
        false,
        new Float32Array([].concat(...wnormal.a))
      );
      gl.uniformMatrix4fv(
        shd.MatrWLoc,
        false,
        new Float32Array([].concat(...w.a))
      );

      // render
      gl.bindVertexArray(this.VA);

      if (this.IBuf == 0) {
        gl.drawArrays(glPrimType, 0, this.NumOfElements);
      } else {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBuf);
        gl.drawElements(glPrimType, this.NumOfElements, gl.UNSIGNED_INT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      }

      gl.bindVertexArray(null);
      gl.useProgram(null);
    } //S End of 'rimDraw' function

    // Evalutation bound box function
    evalBB() {
      return 0;
    } // End of 'evalBB' function

    // Evalutation normals by position vectors function.
    autoNormals(V, I, noofV, noofI) {
      let i;

      /* Set all vertex normals to zero */
      for (i = 0; i < noofV; ++i) {
        V[6 * i + 3] = 0;
        V[6 * i + 4] = 0;
        V[6 * i + 5] = 0;
      }

      /* Eval normal for every facet */
      for (i = 0; i < noofI; i += 3) {
        const n0 = I[i],
          n1 = I[i + 1],
          n2 = I[i + 2];
        const p0 = vec3(V[6 * n0], V[6 * n0 + 1], V[6 * n0 + 2]),
          p1 = vec3(V[6 * n1], V[6 * n1 + 1], V[6 * n1 + 2]),
          p2 = vec3(V[6 * n2], V[6 * n2 + 1], V[6 * n2 + 2]),
          N = p1.sub(p0).cross(p2.sub(p0)).getNormal();

        const nn0 = N, //.add(
          //   ipgl.mth.vec3(V[6 * n0 + 3], V[6 * n0 + 4], V[6 * n0 + 5])
          // ),
          nn1 = N, //.add(ipgl.mth.vec3(V[6 * n1 + 3], V[6 * n1 + 4], V[6 * n2 + 5])),
          nn2 = N; //.add(ipgl.mth.vec3(V[6 * n2 + 3], V[6 * n2 + 4], V[6 * n2 + 5]));

        // n0
        V[6 * n0 + 3] = nn0.x;
        V[6 * n0 + 4] = nn0.y;
        V[6 * n0 + 5] = nn0.z;

        // n1
        V[6 * n1 + 3] = nn1.x;
        V[6 * n1 + 4] = nn1.y;
        V[6 * n1 + 5] = nn1.z;

        // n2
        V[6 * n2 + 3] = nn2.x;
        V[6 * n2 + 4] = nn2.y;
        V[6 * n2 + 5] = nn2.z;
      }

      /* Normalize all vertex normals */
      for (i = 0; i < noofV; i++) {
        let N = vec3(V[6 * i + 3], V[6 * i + 4], V[6 * i + 5])
          .getNormal();

        V[6 * i + 3] = N.x;
        V[6 * i + 4] = N.y;
        V[6 * i + 5] = N.z;
      }
    } // End of 'autoNormals' function
  }

  // END OF 'prim.js' FILE

  var prim$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Prim: Prim,
    Vertex: Vertex,
    _Vertex: _Vertex
  });

  //
  // shd.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Shader module.
  //

  // Text for default vertex shader
  const defvstxt = `#version 300 es
precision highp float;
#line 12

/*layout(location = 0)*/ in vec3 InPosition;
/*layout(location = 1)*/ in vec3 InNormal;

out vec4 DrawColor;   
out vec3 DrawNormal;
out vec3 DrawPosition; 
out vec3 SrcPosition;

uniform mat4 MatrWVP;
uniform mat4 MatrWInv;
uniform mat4 MatrW;

void main( void )
{
  gl_Position = (MatrWVP * vec4(InPosition, 1.0)); 
                     
                     //gl_Position = //mat4(1.414, -0.816, -0.577, -0.577,
                //       0.0,  1.632, -0.577, -0.577,
                //    -1.414, -0.816, -0.577, -0.577,
                //      0.0,     0.0,   -8.8,   -8.6) * vec4(InPosition, 1.0);
  DrawColor = vec4(1.0, 1.0, 0.0, 1.0);
  DrawNormal = mat3(MatrWInv) * InNormal;
  DrawPosition = vec3(MatrW * vec4(InPosition, 1.0));
  SrcPosition = vec3(MatrW * vec4(InPosition, 1.0));
}
`;

  // Text for default fragment shader
  const deffstxt = `#version 300 es
precision highp float;
#line 42

in vec4 DrawColor;   
in vec3 DrawNormal;
in vec3 DrawPosition; 
in vec3 SrcPosition;

out vec4 OutColor;

#if 0
void main( void )
{
  vec3 L = normalize(vec3(-1, -1, -1));
  vec3 N = normalize(DrawNormal);

  N = faceforward(N, L, N);

  float k = dot(L, normalize(N));

  vec3 color = k * vec3(0, 0.7f, 0.6f);
  //vec3 R, V = vec3(0, 0, -1);

  //R = reflect(V, N);
  //color += vec3(0.2f) * max(0.01f, pow(dot(R, L), 10.0f));

  //OutColor = vec4(color, 1.0f);
  if (SrcPosition.y >= -0.01 || SrcPosition.y <= 0.01)
    OutColor = vec4(1.0, 0.0, 0.0, 1.0);
  else
    OutColor = vec4(N, 1.0);
}
#endif
void main( void )
{
  vec3 L = vec3(2, 5, 0);
  vec3 N = normalize(faceforward(DrawNormal, -L, DrawNormal));

  vec3 color;

  float k = dot(N, normalize(L));
  if (SrcPosition.y >= -0.01 && SrcPosition.y <= 0.01) 
  {
    color = vec3(0.5, 0.5, 0.0) * 0.2;
    color += vec3(0.5, 0.5, 0.0) * k * 0.8;
  }
  else 
  {
    color = vec3(1.0, 0.829, 0.829) * 0.2;
    color += vec3(1.0, 0.829, 0.829) * k * 0.8;
  }
  OutColor = vec4(color, 1.0);
}
`;

  // Load and compile shader function
  function loadShader(gl, shaderType, shaderSource) {
    const shader = gl.createShader(shaderType);

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      console.log("Shader compile fail: " + gl.getShaderInfoLog(shader));

    return shader;
  } // End of 'loadShader' function

  // Shader class
  class _shader {
    constructor(gl) {
      this.vs = loadShader(gl, gl.VERTEX_SHADER, defvstxt);
      this.fs = loadShader(gl, gl.FRAGMENT_SHADER, deffstxt);
      this.prg = gl.createProgram();

      gl.attachShader(this.prg, this.vs);
      gl.attachShader(this.prg, this.fs);
      gl.linkProgram(this.prg);

      if (!gl.getProgramParameter(this.prg, gl.LINK_STATUS)) {
        let buf = gl.getProgramInfoLog(this.prg);
        console.log("Shader program link fail: " + buf);
      }

      this.MatrWVPLoc = gl.getUniformLocation(this.prg, "MatrWVP");
      this.MatrWLoc = gl.getUniformLocation(this.prg, "MatrW");
      this.MatrWInvLoc = gl.getUniformLocation(this.prg, "MatrWInv");
    } // End of constructor
  } // End of 'Shader' class

  // Get shader function
  function shader(gl) {
    return new _shader(gl);
  } // End of 'shader' function

  /* old render
  class _shader {
    constructor(gl, name) {
      this._init(name);
    }

    async _init(gl, name) {
      this.name = name;
      this.shaders = [
        {
          id: null,
          type: gl.FRAGMENT_SHADER,
        },
        {},
      ];

      for (const s of this.shaders) {
        let response = await fetch("bin/shaders/${name}/${s.name}.glsl");
        let src = await response.text();
        if (typeof src == "string" && src != "") s.src = src;
      }
      // recompile shaders
    }
  } */

  // END OF 'shd.js' FILE

  var shd = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _shader: _shader,
    shader: shader
  });

  //
  // res.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Resource module.
  //


  // END OF 'res.js' FILE

  var res = /*#__PURE__*/Object.freeze({
    __proto__: null,
    prim: prim$1,
    shd: shd
  });

  //
  // rnd.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Render module.
  //


  // Project parameters
  let projSize = 0.1;
  let projDist = 0.1;
  let projFarClip = 300;

  // Render class
  class Render {
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

      this.matrVP = mat4();
      this.matrProj = mat4();
      this.matrView = mat4();

      // Create default shader
      this.shader = shader(this.gl);
      this.shdprg = this.shader.prg;

      this.projSet();
      this.camSet(
        vec3(14, 15, 13),
        vec3(-10, 2, 3),
        vec3(0, 1, 0)
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
      this.matrView = mat4();
      this.matrView.view(Loc, At, Up);
      this.matrVP = this.matrView.mul(this.matrProj);
      //this.matrVP = this.matrProj.mul(this.matrView);

      this.camRight = vec3(
        this.matrView.a[0][0],
        this.matrView.a[1][0],
        this.matrView.a[2][0]
      );
      this.camUp = vec3(
        this.matrView.a[0][1],
        this.matrView.a[1][1],
        this.matrView.a[2][1]
      );
      this.camDir = vec3(
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

      this.matrProj = mat4();
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

  var rnd = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Render: Render,
    projDist: projDist,
    projFarClip: projFarClip,
    projSize: projSize,
    res: res
  });

  //
  // timer.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Timer module.
  //

  // Timer class
  class Timer {
    constructor() {
      // Timer obtain current time in seconds method
      const getTime = () => {
        const date = new Date();
        let t =
          date.getMilliseconds() / 1000.0 +
          date.getSeconds() +
          date.getMinutes() * 60;
        return t;
      };

      // Timer response method
      this.response = (tag_id = null) => {
        let t = getTime();
        // Global time
        this.globalTime = t;
        this.globalDeltaTime = t - this.oldTime;
        // Time with pause
        if (this.isPause) {
          this.localDeltaTime = 0;
          this.pauseTime += t - this.oldTime;
        } else {
          this.localDeltaTime = this.globalDeltaTime;
          this.localTime = t - this.pauseTime - this.startTime;
        }
        // FPS
        this.frameCounter++;
        if (t - this.oldTimeFPS > 3) {
          this.FPS = this.frameCounter / (t - this.oldTimeFPS);
          this.oldTimeFPS = t;
          this.frameCounter = 0;
          if (tag_id != null)
            document.getElementById(tag_id).innerHTML = this.getFPS();
        }
        this.oldTime = t;
      };

      // Obtain FPS as string method
      this.getFPS = () => this.FPS.toFixed(3);

      // Fill timer global data
      this.globalTime = this.localTime = getTime();
      this.globalDeltaTime = this.localDeltaTime = 0;

      // Fill timer semi global data
      this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
      this.frameCounter = 0;
      this.isPause = false;
      this.FPS = 30.0;
      this.pauseTime = 0;

      return this;
    }
  } // End of 'Timer' function

  // END OF 'timer.js' FILE

  //
  // plat.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Platon module.
  //

  // Get icosaedr V array
  function getIcoV() {
    return [
      1.0, -0.5, 0.0, 0.794654, -0.187592, 0.57735, 0.809017, 0.5, 0.587785,
      0.794654, -0.187592, 0.57735, 0.309017, -0.5, 0.951057, 0.794654, -0.187592,
      0.57735, -0.309017, 0.5, 0.951057, 0.794654, -0.187592, -0.57735, -0.809017,
      -0.5, 0.587785, 0.794654, -0.187592, -0.57735, -1.0, 0.5, 0.0, 0.794654,
      -0.187592, -0.57735, -0.809017, -0.5, -0.587785, -0.303531, -0.187592,
      -0.934172, -0.309017, 0.5, -0.951057, -0.303531, -0.187592, -0.934172,
      0.309017, -0.5, -0.951057, -0.303531, -0.187592, -0.934172, 0.809017, 0.5,
      -0.587785, -0.982247, -0.187592, 0.0, 1.0, -0.5, 0.0, -0.982247, -0.187592,
      0.0, 0.809017, 0.5, 0.587785, -0.982247, -0.187592, 0.0, 0.309017, -0.5,
      0.951057, -0.303531, -0.187592, 0.934172, -0.309017, 0.5, 0.951057,
      -0.303531, -0.187592, 0.934172, -0.809017, -0.5, 0.587785, -0.303531,
      -0.187592, 0.934172, -1.0, 0.5, 0.0, 0.794654, -0.187592, 0.57735,
      -0.809017, -0.5, -0.587785, 0.794654, -0.187592, 0.57735, -0.309017, 0.5,
      -0.951057, 0.794654, -0.187592, 0.57735, 0.309017, -0.5, -0.951057,
      0.794654, -0.187592, -0.57735, 0.809017, 0.5, -0.587785, 0.794654,
      -0.187592, -0.57735, 1.0, -0.5, 0.0, 0.794654, -0.187592, -0.57735,
      0.809017, 0.5, 0.587785, -0.303531, -0.187592, -0.934172, 0.309017, -0.5,
      0.951057, -0.303531, -0.187592, -0.934172, -0.309017, 0.5, 0.951057,
      -0.303531, -0.187592, -0.934172, -0.809017, -0.5, 0.587785, -0.982247,
      -0.187592, -0.0, -1.0, 0.5, 0.0, -0.982247, -0.187592, -0.0, -0.809017,
      -0.5, -0.587785, -0.982247, -0.187592, -0.0, -0.309017, 0.5, -0.951057,
      -0.303531, -0.187592, 0.934172, 0.309017, -0.5, -0.951057, -0.303531,
      -0.187592, 0.934172, 0.809017, 0.5, -0.587785, -0.303531, -0.187592,
      0.934172, 1.0, -0.5, 0.0, 0.491123, -0.794654, 0.356822, 0.809017, 0.5,
      0.587785, -0.187592, -0.794654, -0.57735, 0.309017, -0.5, 0.951057,
      0.491123, -0.794654, 0.356822, -0.309017, 0.5, 0.951057, -0.187592,
      -0.794654, -0.57735, -0.809017, -0.5, 0.587785, -0.607062, -0.794654, -0.0,
      -1.0, 0.5, 0.0, 0.491123, -0.794654, 0.356822, -0.809017, -0.5, -0.587785,
      -0.607062, -0.794654, -0.0, -0.309017, 0.5, -0.951057, 0.491123, -0.794654,
      0.356822, 0.309017, -0.5, -0.951057, 0.491123, -0.794654, -0.356822,
      0.809017, 0.5, -0.587785, -0.607062, -0.794654, 0.0, 1.0, -0.5, 0.0,
      0.491123, -0.794654, -0.356822, 0.809017, 0.5, 0.587785, -0.607062,
      -0.794654, 0.0, 0.309017, -0.5, 0.951057, -0.187592, -0.794654, 0.57735,
      -0.309017, 0.5, 0.951057, 0.491123, -0.794654, -0.356822, -0.809017, -0.5,
      0.587785, -0.187592, -0.794654, 0.57735, -1.0, 0.5, 0.0, 0.491123,
      -0.794654, -0.356822, -0.809017, -0.5, -0.587785, -0.187592, -0.794654,
      -0.57735, -0.309017, 0.5, -0.951057, -0.187592, -0.794654, 0.57735,
      0.309017, -0.5, -0.951057, -0.187592, -0.794654, -0.57735, 0.809017, 0.5,
      -0.587785, -0.187592, -0.794654, 0.57735, 0.0, 1.118034, 0.0, -0.187592,
      -0.794654, -0.57735, 0.0, 1.118034, 0.0, 0.491123, -0.794654, 0.356822, 0.0,
      1.118034, 0.0, -0.607062, -0.794654, 0.0, 0.0, 1.118034, 0.0, 0.491123,
      -0.794654, -0.356822, 0.0, 1.118034, 0.0, -0.187592, -0.794654, 0.57735,
      0.0, -1.118034, 0.0, 0.491123, -0.794654, 0.356822, 0.0, -1.118034, 0.0,
      -0.607062, -0.794654, -0.0, 0.0, -1.118034, 0.0, 0.491123, -0.794654,
      -0.356822, 0.0, -1.118034, 0.0, -0.187592, -0.794654, 0.57735, 0.0,
      -1.118034, 0.0, -0.187592, -0.794654, -0.57735,
    ];
  }

  // Get icosaedr I
  function getIcoI() {
    return [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 55, 34, 36, 56, 38, 40, 57, 42,
      44, 58, 46, 48, 59, 31, 33, 50, 35, 37, 51, 39, 41, 52, 43, 45, 53, 47, 49,
      54,
    ];
  }

  // Get dodecaedr V
  function getDecV() {
    const V = new getIcoV();
    const I = new getIcoI();

    let V1 = [];

    for (let i = 0; i < 60; i += 3) {
      const S1 = V[6 * I[i]];
      const S2 = V[6 * I[i] + 1];
      const S3 = V[6 * I[i] + 2];
      const S4 = V[6 * I[i + 1]];
      const S5 = V[6 * I[i + 1] + 1];
      const S6 = V[6 * I[i + 1] + 2];
      const S7 = V[6 * I[i + 2]];
      const S8 = V[6 * I[i + 2] + 1];
      const S9 = V[6 * I[i + 2] + 2];

      const S10 = (S1 + S4 + S7) / 3;
      const S11 = (S2 + S5 + S8) / 3;
      const S12 = (S3 + S6 + S9) / 3;

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);

      V1.push(S10);
      V1.push(S11);
      V1.push(S12);
      V1.push(0);
      V1.push(0);
      V1.push(0);
    }

    return V1;
  }

  function getDecoI() {
    let S = [];
    let A, B, C, D, E;
    let I1N = [
      1, 18, 15, 7, 4, 13, 4, 7, 0, 10, 3, 0, 10, 12, 6, 12, 6, 9, 2, 14, 11, 14,
      2, 5, 8, 8, 1, 4, 13, 11, 11, 14, 12, 10, 13, 0, 7, 15, 17, 3, 6, 3, 17, 19,
      9, 2, 9, 19, 16, 5, 1, 8, 5, 16, 18, 18, 16, 19, 17, 15,
    ];

    let NewI = [];

    for (let i = 0; i < 108; i++) S[i] = 0;

    for (let i = 0; i < 70; i += 5) {
      let S1 = I1N[i],
        S2 = I1N[i + 1],
        S3 = I1N[i + 2],
        S4 = I1N[i + 3],
        S5 = I1N[i + 4];

      A = S[S1]++;
      B = S[S2]++;
      C = S[S3]++;
      D = S[S4]++;
      E = S[S5]++;

      S1 *= 3;
      S2 *= 3;
      S3 *= 3;
      S4 *= 3;
      S5 *= 3;

      if (A == 0);
      else if (A == 1) ++S1;
      else if (A == 2) S1 += 2;

      if (B == 0);
      else if (B == 1) ++S2;
      else if (B == 2) S2 += 2;

      if (C == 0);
      else if (C == 1) ++S3;
      else if (C == 2) S3 += 2;

      if (D == 0);
      else if (D == 1) ++S4;
      else if (D == 2) S4 += 2;

      if (E == 0);
      else if (E == 1) ++S5;
      else if (E == 2) S5 += 2;

      NewI.push(S1);
      NewI.push(S2);
      NewI.push(S3);
      NewI.push(S1);
      NewI.push(S3);
      NewI.push(S4);
      NewI.push(S1);
      NewI.push(S4);
      NewI.push(S5);
    }

    //for (let Elem of I) {
    //  let S1 = Elem * 3;

    //   A = S[Elem]++;

    //   if (A == 0);
    //   else if (A == 1) ++S1;
    //   else if (A == 2) S1 += 2;
    //
    //  NewI.push(S1);
    //}

    return NewI;
  }

  function getTetraV() {
    return [
      -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, -1, -1, 0, 0, 0, -1, 1, 1, 0,
      0, 0, -1, 1, 1, 0, 0, 0, -1, 1, 1, 0, 0, 0, 1, 1, -1, 0, 0, 0, 1, 1, -1, 0,
      0, 0, 1, 1, -1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, 1, 0, 0, 0, 1, -1, 1, 0,
      0, 0,
    ];
  }

  function getTetraI() {
    return [0, 3, 9, 1, 4, 6, 5, 7, 10, 2, 11, 8];
  }

  function getOctaV() {
    return [
      0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,

      0, -1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0,

      0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,

      0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0,
    ];
  }

  function getOctaI() {
    return [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
  }

  // End of 'plat.js' FILE

  var plat = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDecV: getDecV,
    getDecoI: getDecoI,
    getIcoI: getIcoI,
    getIcoV: getIcoV,
    getOctaI: getOctaI,
    getOctaV: getOctaV,
    getTetraI: getTetraI,
    getTetraV: getTetraV
  });

  //
  // anim.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Anim module.
  //


  // Default anim variable
  let MainAnim;

  // Anim class
  class Anim {
    constructor(canvasid) {
      this.rnd = new Render(canvasid);
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

  let prim, prim1, prim2, prim3, prim4;

  // Init default anim
  function AnimInit() {
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

    new shader(MainAnim.rnd.gl);
    prim = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      V,
      I,
      MainAnim.rnd.shdprg
    );
    prim1 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      getIcoV(),
      getIcoI(),
      MainAnim.rnd.shdprg
    );

    let VS = new getDecV();
    let IS = new getDecoI();

    let LOL = new Prim(
      MainAnim.rnd.gl,
      "Lol",
      null,
      null,
      MainAnim.rnd.shdprg
    );
    LOL.autoNormals(VS, IS, 60, 108);

    prim2 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VS,
      IS,
      MainAnim.rnd.shdprg
    );

    let VSS = new getTetraV();
    let ISS = new getTetraI();

    LOL.autoNormals(VSS, ISS, 12, 12);

    prim3 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VSS,
      ISS,
      MainAnim.rnd.shdprg
    );

    let VSSS = new getOctaV();
    let ISSS = new getOctaI();

    LOL.autoNormals(VSSS, ISSS, 24, 24);

    let VSDS = [
      -100, 0, -100, 0, 1, 0,

      -100, 0, 100, 0, 1, 0,

      100, 0, 100, 0, 1, 0,

      100, 0, -100, 0, 1, 0,
    ];

    let ISDS = [0, 1, 2, 0, 3, 2];

    prim4 = new Prim(
      MainAnim.rnd.gl,
      "Trimesh",
      VSDS,
      ISDS,
      MainAnim.rnd.shdprg
    );
  } // End of 'AnimInit' function

  // Render default anim
  function AnimRender() {
    MainAnim.render();
    let m = mat4(),
      m1 = mat4(),
      m2 = mat4(),
      m4 = mat4(),
      m5 = mat4(),
      m7 = mat4(),
      m9 = mat4();

    m4.translate(vec3(1.5, 2, -2));
    m5.rotate(MainAnim.timer.localTime * 50, vec3(8, 4, 2));
    m.rotate(MainAnim.timer.localTime * 50, vec3(3, 5, 2));
    m1.translate(getCoordinates());
    m2.rotate(MainAnim.timer.localTime * 50, vec3(1, 7, 4));
    let m3 = m2.mul(m1);
    let m6 = m5.mul(m4);
    m7.translate(vec3(-5, -1, 0));
    let m8 = m5.mul(m7);
    m9.translate(vec3(-3, -3, 2));
    m.mul(m9);

    prim.primDraw(MainAnim.rnd, m3, MainAnim.rnd.shader);
    prim1.primDraw(MainAnim.rnd, m6, MainAnim.rnd.shader);
    prim2.primDraw(MainAnim.rnd, m, MainAnim.rnd.shader);
    prim3.primDraw(MainAnim.rnd, m8, MainAnim.rnd.shader);
    prim4.primDraw(MainAnim.rnd, mat4(), MainAnim.rnd.shader);
  } // End of 'AnimRender' function

  // END OF 'anim.js' FILE

  var anim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Anim: Anim,
    AnimInit: AnimInit,
    AnimRender: AnimRender,
    get MainAnim () { return MainAnim; },
    Timer: Timer,
    rnd: rnd
  });

  //
  // getyp.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Get coordinates Y module.
  //


  // get coordinates function
  function getCoordinates() {
    let vec = vec3(MainAnim.rnd.camDir);
    let loc = vec3(MainAnim.rnd.camLoc);

    if (vec.y === 0) return null;

    let vecx = (-loc.y / vec.y) * vec.x + loc.x;
    let vecz = (-loc.y / vec.y) * vec.z + loc.z;

    //console.log(vecx);
    //console.log(vecz);

    return vec3(vecx, 0, vecz);
  } // End of 'getCoordinates' function

  // END OF 'getyp.js' FILE

  var getyp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCoordinates: getCoordinates
  });

  //
  // includes.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // base includes of project.
  //


  // END OF 'includes.js' FILE

  var ipgl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    anim: anim,
    getyp: getyp,
    mth: mth,
    plat: plat
  });

  //
  // main.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // main file of project (for rollup and include to html).
  //
  // [PUBLIC]
  //


  // Executable code
  window.addEventListener("load", () => {
    AnimInit();
    const Rendering = () => {
      // drawing
      AnimRender();
      // animation register
      window.requestAnimationFrame(Rendering);
    };
    Rendering();
    // onClickButton();
  });

  function onClickButton() {
    const element = document.getElementById("myInput");
    console.log(element.value);
  }

  //window.addEventListener("mousemove", (event) => {
  //  ipgl.onClick(event);
  //});

  //window.addEventListener("keydown", (event) => {
  //  ipgl.onKeys(event);
  //});

  // END OF 'main.js' FILE.

  exports.ipgl = ipgl;
  exports.onClickButton = onClickButton;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL210aC9tdGhfdmVjMy5qcyIsIi4uL3NyYy9tdGgvbXRoX2RlZi5qcyIsIi4uL3NyYy9tdGgvbXRoX21hdDQuanMiLCIuLi9zcmMvbXRoL210aC5qcyIsIi4uL3NyYy9hbmltL3JlbmRlci9yZXMvcHJpbS9wcmltLmpzIiwiLi4vc3JjL2FuaW0vcmVuZGVyL3Jlcy9zaGFkZXIvc2hkLmpzIiwiLi4vc3JjL2FuaW0vcmVuZGVyL3Jlcy9yZXMuanMiLCIuLi9zcmMvYW5pbS9yZW5kZXIvcm5kLmpzIiwiLi4vc3JjL2FuaW0vdGltZXIuanMiLCIuLi9zcmMvdXRpbHMvcGxhdC5qcyIsIi4uL3NyYy9hbmltL2FuaW0uanMiLCIuLi9zcmMvdXRpbHMvZ2V0eXAuanMiLCIuLi9zcmMvaW5jbHVkZXMuanMiLCIuLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbi8vIG10aF92ZWMzLmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTCAzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gVmVjdG9yIDNEIHBhcnQgb2YgbXRoIGxpYnJhcnkuXHJcbi8vXHJcblxyXG4vLyBWZWN0b3IgM0QgY2xhc3NcclxuZXhwb3J0IGNsYXNzIF92ZWMzIHtcclxuICAvLyBDb25zdHJ1Y3RvclxyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHopIHtcclxuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgdGhpcy56ID0gMDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHggPT0gXCJvYmplY3RcIikge1xyXG4gICAgICBpZiAoeC54ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgIHRoaXMueiA9IHguejtcclxuICAgICAgfSBlbHNlIGlmICh4Lmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgdGhpcy54ID0geFswXTtcclxuICAgICAgICB0aGlzLnkgPSB4WzFdO1xyXG4gICAgICAgIHRoaXMueiA9IHhbMl07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMueiA9IDA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgIHRoaXMueSA9IHg7XHJcbiAgICAgIHRoaXMueiA9IHg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnggPSB4O1xyXG4gICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICB0aGlzLnogPSB6O1xyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcblxyXG4gIC8vIEFkZCAyIHZlY3RvcnNcclxuICBhZGQodikge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICsgdi54LCB0aGlzLnkgKyB2LnksIHRoaXMueiArIHYueik7XHJcbiAgfSAvLyBFbmQgb2YgJ2FkZCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gR2V0IG5lZ2F0aXZlIHZlY3RvclxyXG4gIGdldE5lZygpIHtcclxuICAgIHJldHVybiB2ZWMzKC10aGlzLngsIC10aGlzLnksIC10aGlzLnopO1xyXG4gIH0gLy8gRW5kIG9mICdnZXROZWcnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldCBuZWdhdGl2ZSB2ZWN0b3JcclxuICBzZXROZWcoKSB7XHJcbiAgICB0aGlzLnggPSAtdGhpcy54O1xyXG4gICAgdGhpcy55ID0gLXRoaXMueTtcclxuICAgIHRoaXMueiA9IC10aGlzLno7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldE5lZycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWluIDIgdmVjdG9yc1xyXG4gIHN1Yih2KSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQodi5nZXROZWcoKSk7XHJcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cclxuXHJcbiAgLy8gRG90IDIgdmVjdG9yc1xyXG4gIGRvdCh2KSB7XHJcbiAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBDcm9zcyAyIHZlY3RvcnNcclxuICBjcm9zcyh2KSB7XHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgdGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueFxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnY3Jvc3MnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldCBsZW4gb2YgdmVjdG9yXHJcbiAgbGVuKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRvdCgpKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxyXG4gIC8qXHJcbiAgLy8gU3ViIDIgdmVjdG9yc1xyXG4gIHN1Yih2KSB7XHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgdGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxyXG4gICAgICB0aGlzLnogKiB2LnggLSB0aGlzLnggKiB2LnosXHJcbiAgICAgIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueFxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnc3ViJyBmdW5jdGlvblxyXG4qL1xyXG4gIC8vIFZlYyBtdWwgbnVtXHJcbiAgbXVsKG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAqIG4sIHRoaXMueSAqIG4sIHRoaXMueiAqIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdtdWwnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlYyBkaXYgbnVtXHJcbiAgZGl2KG4pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG4sIHRoaXMueSAvIG4sIHRoaXMueiAvIG4pO1xyXG4gIH0gLy8gRW5kIG9mICdkaXYnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFNldCB2ZWMgbm9ybWFsaXplXHJcbiAgc2V0Tm9ybWFsKCkge1xyXG4gICAgbGV0IGwgPSB0aGlzLmxlbigpO1xyXG4gICAgaWYgKGwgIT0gMCAmJiBsICE9IDEpIHtcclxuICAgICAgdGhpcy54IC89IGw7XHJcbiAgICAgIHRoaXMueSAvPSBsO1xyXG4gICAgICB0aGlzLnogLz0gbDtcclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAnc2V0Tm9ybWFsJyBmdW5jdGlvblxyXG5cclxuICAvLyBHZXQgdmVjIG5vbXJtYWxpemVcclxuICBnZXROb3JtYWwoKSB7XHJcbiAgICBsZXQgbCA9IHRoaXMubGVuKCk7XHJcbiAgICBpZiAobCA9PSAwIHx8IGwgPT0gMSkgcmV0dXJuIHZlYzModGhpcyk7XHJcbiAgICByZXR1cm4gdGhpcy5kaXYobCk7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldE5vcm1hbCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIDNEIG11bCBNYXRyIGZ1bmN0aW9uXHJcbiAgbXVsTWF0cih2LCBtKSB7XHJcbiAgICBsZXQgdyA9XHJcbiAgICAgIHRoaXMueCAqIG0uYVswXVszXSArIHRoaXMueSAqIG0uYVsxXVszXSArIHRoaXMueiAqIG0uYVsyXVszXSArIG0uYVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gdmVjMyhcclxuICAgICAgKHRoaXMueCAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy55ICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLnogKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIG0uYVszXVswXSkgL1xyXG4gICAgICAgIHcsXHJcbiAgICAgICh0aGlzLnggKiBtLmFbMF1bMV0gK1xyXG4gICAgICAgIHRoaXMueSAqIG0uYVsxXVsxXSArXHJcbiAgICAgICAgdGhpcy56ICogbS5hWzJdWzFdICtcclxuICAgICAgICBtLmFbM11bMV0pIC9cclxuICAgICAgICB3LFxyXG4gICAgICAodGhpcy54ICogbS5hWzBdWzJdICtcclxuICAgICAgICB0aGlzLnkgKiBtLmFbMV1bMl0gK1xyXG4gICAgICAgIHRoaXMueiAqIG0uYVsyXVsyXSArXHJcbiAgICAgICAgbS5hWzNdWzJdKSAvXHJcbiAgICAgICAgd1xyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTWF0cicgZnVuY3Rpb25cclxuXHJcbiAgLy8gQ29udmVydCB2ZWN0b3IgdG8gYXJyYXlcclxuICB0b0FycmF5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBbdGhpcy54LCB0aGlzLnksIHRoaXMuel0oKTtcclxuICB9IC8vIEVuZCBvZiAndG9BcnJheScgZnVuY3Rpb25cclxufSAvLyBFbmQgb2YgJ192ZWMzJyBjbGFzc1xyXG5cclxuLy8gQ3JlYXRlIHZlYzMgZnVuY3Rpb24uXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWMzKHgsIHksIHopIHtcclxuICByZXR1cm4gbmV3IF92ZWMzKHgsIHksIHopO1xyXG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cclxuXHJcbi8vIEVORCBPRiAnbXRoX3ZlYzMuaCcgRklMRXNcclxuIiwiLy9cclxuLy8gbXRoX2RlZi5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gQmFzZSBkZWZpbml0aW9ucyBmb3IgbWF0aGVtYXRpYyBtb2R1bGUuXHJcbi8vXHJcblxyXG5leHBvcnQgeyBEMlIsIFIyRCB9O1xyXG5cclxuLy8gRDJSIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIEQyUihhKSB7XHJcbiAgcmV0dXJuIG5ldyBOdW1iZXIoKGEgKiBNYXRoLlBJKSAvIDE4MCk7XHJcbn0gLy8gRW5kIG9mICdEMlInIGZ1bmN0aW9uXHJcblxyXG4vLyBSMkQgZnVuY3Rpb25cclxuZnVuY3Rpb24gUjJEKGEpIHtcclxuICByZXR1cm4gbmV3IE51bWJlcigoYSAqIDE4MCkgLyBNYXRoLlBJKTtcclxufVxyXG5cclxuLy8gRU5EIE9GICdtdGhfZGVmLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIG10aF9tYXQ0LmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTCAzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gTWF0cml4IDR4NCBwYXJ0IG9mIG10aCBsaWJyYXJ5LlxyXG4vL1xyXG5cclxuLy8gSW1wb3J0XHJcbmltcG9ydCB7IHZlYzMsIF92ZWMzIH0gZnJvbSBcIi4vbXRoX3ZlYzNcIjtcclxuaW1wb3J0IHsgRDJSLCBSMkQgfSBmcm9tIFwiLi9tdGhfZGVmLmpzXCI7XHJcblxyXG4vLyBNYXRyaXggNHg0IGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBfbWF0NCB7XHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGEwMCxcclxuICAgIGEwMSxcclxuICAgIGEwMixcclxuICAgIGEwMyxcclxuICAgIGExMCxcclxuICAgIGExMSxcclxuICAgIGExMixcclxuICAgIGExMyxcclxuICAgIGEyMCxcclxuICAgIGEyMSxcclxuICAgIGEyMixcclxuICAgIGEyMyxcclxuICAgIGEzMCxcclxuICAgIGEzMSxcclxuICAgIGEzMixcclxuICAgIGEzM1xyXG4gICkge1xyXG4gICAgaWYgKGEwMCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aGlzLmEgPSBbXHJcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxyXG4gICAgICBdO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIGEwMCA9PSBcIm9iamVjdFwiICYmIGEwMC5hLmxlbmd0aCA9PSA0KSB0aGlzLmEgPSBhMDAuYTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5hID0gW1xyXG4gICAgICAgIFthMDAsIGEwMSwgYTAyLCBhMDNdLFxyXG4gICAgICAgIFthMTAsIGExMSwgYTEyLCBhMTNdLFxyXG4gICAgICAgIFthMjAsIGEyMSwgYTIyLCBhMjNdLFxyXG4gICAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdLFxyXG4gICAgICBdO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcblxyXG4gIC8vIE1hdHIgbXVsIG1hdHIgZnVuY3Rpb25cclxuICBtdWwobSkge1xyXG4gICAgcmV0dXJuIG1hdDQoXHJcbiAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVswXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzBdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMF1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVswXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMF1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVswXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMF1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVswXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMF1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVswXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzFdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMV1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMV1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVsxXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMV1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVsxXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMV1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVsxXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzJdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbMl1bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbMl1bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVsyXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbMl1bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVsyXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbMl1bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVsyXVszXSAqIG0uYVszXVszXSxcclxuXHJcbiAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVswXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdICogbS5hWzFdWzBdICtcclxuICAgICAgICB0aGlzLmFbM11bMl0gKiBtLmFbMl1bMF0gK1xyXG4gICAgICAgIHRoaXMuYVszXVszXSAqIG0uYVszXVswXSxcclxuICAgICAgdGhpcy5hWzNdWzBdICogbS5hWzBdWzFdICtcclxuICAgICAgICB0aGlzLmFbM11bMV0gKiBtLmFbMV1bMV0gK1xyXG4gICAgICAgIHRoaXMuYVszXVsyXSAqIG0uYVsyXVsxXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdICogbS5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbM11bMF0gKiBtLmFbMF1bMl0gK1xyXG4gICAgICAgIHRoaXMuYVszXVsxXSAqIG0uYVsxXVsyXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdICogbS5hWzJdWzJdICtcclxuICAgICAgICB0aGlzLmFbM11bM10gKiBtLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVszXVswXSAqIG0uYVswXVszXSArXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdICogbS5hWzFdWzNdICtcclxuICAgICAgICB0aGlzLmFbM11bMl0gKiBtLmFbMl1bM10gK1xyXG4gICAgICAgIHRoaXMuYVszXVszXSAqIG0uYVszXVszXVxyXG4gICAgKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsJyBmdW5jdGlvbi5cclxuXHJcbiAgLy8gTWF0ciB0cmFuc2xhdGUgZnVuY3Rpb25cclxuICB0cmFuc2xhdGUodikge1xyXG4gICAgdGhpcy5hID0gbWF0NCgxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCB2LngsIHYueSwgdi56LCAxKS5hO1xyXG4gIH0gLy8gRW5kIG9mICd0cmFuc2xhdGUnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHIgc2NhbGUgZnVuY3Rpb25cclxuICBzY2FsZSh2KSB7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KHYueCwgMCwgMCwgMCwgMCwgdi55LCAwLCAwLCAwLCAwLCB2LnosIDAsIDAsIDAsIDAsIDEpO1xyXG4gIH0gLy8gRW5kIG9mICdzY2FsZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciBSb3RhdGVYIGZ1bmN0aW9cclxuICByb3RhdGVYKGEpIHtcclxuICAgIGxldCBhbiA9IEQyUihhKSxcclxuICAgICAgYyA9IGNvcyhhbiksXHJcbiAgICAgIHMgPSBzaW4oYW4pO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdDQoMSwgMCwgMCwgMCwgMCwgYywgcywgMCwgMCwgLXMsIGMsIDAsIDAsIDAsIDAsIDEpLmE7XHJcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVgnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIE1hdHIgcm90YXRlWSBmdW5jdGlvblxyXG4gIHJvdGF0ZVkoYSkge1xyXG4gICAgbGV0IGFuID0gRDJSKGEpLFxyXG4gICAgICBjID0gY29zKGFuKSxcclxuICAgICAgcyA9IHNpbihhbik7XHJcblxyXG4gICAgdGhpcy5hID0gbWF0NChjLCAwLCAtcywgMCwgMCwgMSwgMCwgMCwgcywgMCwgYywgMCwgMCwgMCwgMCwgMSkuYTtcclxuICB9IC8vIEVuZCBvZiAncm90YXRlWScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciBSb3RhdGVaIGZ1bmN0aW9uXHJcbiAgcm90YXRlWihhKSB7XHJcbiAgICBsZXQgYW4gPSBEMlIoYSksXHJcbiAgICAgIGMgPSBjb3MoYW4pLFxyXG4gICAgICBzID0gc2luKGFuKTtcclxuXHJcbiAgICB0aGlzLmEgPSBtYXQ0KGMsIHMsIDAsIDAsIC1zLCBjLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxKS5hO1xyXG4gIH0gLy8gRW5kIG9mICdyb3RhdGVaJyBmdW5jdGlvblxyXG5cclxuICAvLyBNYXRyIHJvdGF0ZSBmdW5jdGlvblxyXG4gIHJvdGF0ZShhLCByKSB7XHJcbiAgICBsZXQgQSA9IEQyUihhKSxcclxuICAgICAgcyA9IE1hdGguc2luKEEpLFxyXG4gICAgICBjID0gTWF0aC5jb3MoQSk7XHJcbiAgICBsZXQgViA9IHIuZ2V0Tm9ybWFsKCk7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KFxyXG4gICAgICBjICsgVi54ICogVi54ICogKDEgLSBjKSxcclxuICAgICAgVi54ICogVi55ICogKDEgLSBjKSArIFYueiAqIHMsXHJcbiAgICAgIFYueCAqIFYueiAqICgxIC0gYykgLSBWLnkgKiBzLFxyXG4gICAgICAwLFxyXG4gICAgICBWLnkgKiBWLnggKiAoMSAtIGMpIC0gVi56ICogcyxcclxuICAgICAgYyArIFYueSAqIFYueSAqICgxIC0gYyksXHJcbiAgICAgIFYueSAqIFYueiAqICgxIC0gYykgKyBWLnggKiBzLFxyXG4gICAgICAwLFxyXG4gICAgICBWLnogKiBWLnggKiAoMSAtIGMpICsgVi55ICogcyxcclxuICAgICAgVi56ICogVi55ICogKDEgLSBjKSAtIFYueCAqIHMsXHJcbiAgICAgIGMgKyBWLnogKiBWLnogKiAoMSAtIGMpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAxXHJcbiAgICApLmE7XHJcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWF0ciB0cmFuc3BvbnNlIGZ1bmN0aW9uXHJcbiAgdHJhbnNwb25zZShtKSB7XHJcbiAgICB0aGlzLmEgPSBtYXQ0KFxyXG4gICAgICBtLmFbMF1bMF0sXHJcbiAgICAgIG0uYVsxXVswXSxcclxuICAgICAgbS5hWzJdWzBdLFxyXG4gICAgICBtLmFbM11bMF0sXHJcbiAgICAgIG0uYVswXVsxXSxcclxuICAgICAgbS5hWzFdWzFdLFxyXG4gICAgICBtLmFbMl1bMV0sXHJcbiAgICAgIG0uYVszXVsxXSxcclxuICAgICAgbS5hWzBdWzJdLFxyXG4gICAgICBtLmFbMV1bMl0sXHJcbiAgICAgIG0uYVsyXVsyXSxcclxuICAgICAgbS5hWzNdWzJdLFxyXG4gICAgICBtLmFbMF1bM10sXHJcbiAgICAgIG0uYVsxXVszXSxcclxuICAgICAgbS5hWzJdWzNdLFxyXG4gICAgICBtLmFbM11bM11cclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAndHJhbnNwb25zZScgZnVuY3Rpb24uXHJcblxyXG4gIC8vIERldGVybWluYXRlIG1hdHJpeCBmdW5jdGlvbi5cclxuICBkZXRlcm0oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmFbMF1bMF0gKlxyXG4gICAgICAgIG1hdDNEZXRlcm0oXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgICApIC1cclxuICAgICAgdGhpcy5hWzBdWzFdICpcclxuICAgICAgICBtYXQzRGV0ZXJtKFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICAgKSArXHJcbiAgICAgIHRoaXMuYVswXVsyXSAqXHJcbiAgICAgICAgbWF0M0RldGVybShcclxuICAgICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICAgICkgLVxyXG4gICAgICB0aGlzLmFbMF1bM10gKlxyXG4gICAgICAgIG1hdDNEZXRlcm0oXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgICB0aGlzLmFbM11bMl1cclxuICAgICAgICApXHJcbiAgICApO1xyXG4gIH0gLy8gRW5kIG9mICdkZXRlcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIEdldCBpbnZlcnNlIG1hdHJpeCBmdW5jdGlvblxyXG4gIGdldEludmVyc2UoKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIGxldCBkZXQgPSB0aGlzLmRldGVybSgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMCkgcmV0dXJuIHI7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIuYVswXVswXSA9XHJcbiAgICAgICttYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzFdWzBdID1cclxuICAgICAgLW1hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMl1bMF0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVszXVswXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzBdWzFdID1cclxuICAgICAgLW1hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMV1bMV0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVsyXVsxXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzNdWzFdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bMl1cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMF1bMl0gPVxyXG4gICAgICArbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbM11bMV0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzJdLFxyXG4gICAgICAgIHRoaXMuYVszXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVsxXVsyXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzJdWzJdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzNdWzBdLFxyXG4gICAgICAgIHRoaXMuYVszXVsxXSxcclxuICAgICAgICB0aGlzLmFbM11bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbM11bMl0gPVxyXG4gICAgICAtbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbM11bMF0sXHJcbiAgICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICAgIHRoaXMuYVszXVsyXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVswXVszXSA9XHJcbiAgICAgIC1tYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVsxXSxcclxuICAgICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsxXSxcclxuICAgICAgICB0aGlzLmFbMV1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgICB0aGlzLmFbMl1bMl0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzNdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgci5hWzFdWzNdID1cclxuICAgICAgK21hdDNEZXRlcm0oXHJcbiAgICAgICAgdGhpcy5hWzBdWzBdLFxyXG4gICAgICAgIHRoaXMuYVswXVsyXSxcclxuICAgICAgICB0aGlzLmFbMF1bM10sXHJcbiAgICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgICB0aGlzLmFbMV1bM10sXHJcbiAgICAgICAgdGhpcy5hWzJdWzBdLFxyXG4gICAgICAgIHRoaXMuYVsyXVsyXSxcclxuICAgICAgICB0aGlzLmFbMl1bM11cclxuICAgICAgKSAvIGRldDtcclxuXHJcbiAgICByLmFbMl1bM10gPVxyXG4gICAgICAtbWF0M0RldGVybShcclxuICAgICAgICB0aGlzLmFbMF1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgICB0aGlzLmFbMV1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsxXVszXSxcclxuICAgICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzFdLFxyXG4gICAgICAgIHRoaXMuYVsyXVszXVxyXG4gICAgICApIC8gZGV0O1xyXG5cclxuICAgIHIuYVszXVszXSA9XHJcbiAgICAgICttYXQzRGV0ZXJtKFxyXG4gICAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgICB0aGlzLmFbMF1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzBdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsxXVswXSxcclxuICAgICAgICB0aGlzLmFbMV1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzFdWzJdLFxyXG4gICAgICAgIHRoaXMuYVsyXVswXSxcclxuICAgICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgICAgdGhpcy5hWzJdWzJdXHJcbiAgICAgICkgLyBkZXQ7XHJcblxyXG4gICAgcmV0dXJuIHI7XHJcbiAgfSAvLyBFbmQgb2YgJ2dldEludmVyc2UnIGZ1bmN0aW9uLlxyXG5cclxuICAvLyBmcnVzdHVtIG1hdHJpeCBmdW5jdGlvblxyXG4gIGZydXN0dW0oTCwgUiwgQiwgVCwgTiwgRikge1xyXG4gICAgdGhpcy5hID0gbWF0NChcclxuICAgICAgKDIgKiBOKSAvIChSIC0gTCksXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgICgyICogTikgLyAoVCAtIEIpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAoUiArIEwpIC8gKFIgLSBMKSxcclxuICAgICAgKFQgKyBCKSAvIChUIC0gQiksXHJcbiAgICAgIC0oRiArIE4pIC8gKEYgLSBOKSxcclxuICAgICAgLTEsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgICgtMiAqIE4gKiBGKSAvIChGIC0gTiksXHJcbiAgICAgIDBcclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAnZnJ1c3R1bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gb3J0aG8gbWF0cml4IGZ1bmN0aW9uXHJcbiAgb3J0aG8oTCwgUiwgQiwgVCwgTiwgRikge1xyXG4gICAgdGhpcy5hID0gbWF0NChcclxuICAgICAgMiAvIChSIC0gTCksXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDAsXHJcbiAgICAgIDIgLyAoVCAtIEIpLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAwLFxyXG4gICAgICAtMiAvIChGIC0gTiksXHJcbiAgICAgIDAsXHJcbiAgICAgIC0oUiArIEwpIC8gKFIgLSBMKSxcclxuICAgICAgLShUICsgQikgLyAoVCAtIEIpLFxyXG4gICAgICAtKEYgKyBOKSAvIChGIC0gTiksXHJcbiAgICAgIDFcclxuICAgICk7XHJcbiAgfSAvLyBFbmQgb2YgJ29ydGhvJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXQgdmlldyBtYXRyaXggZnVuY3Rpb25cclxuICB2aWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgY29uc3QgRGlyID0gdmVjMyhBdCkuc3ViKExvYykuZ2V0Tm9ybWFsKCk7XHJcbiAgICBjb25zdCBSaWdodCA9IHZlYzMoRGlyKS5jcm9zcyhVcDEpLmdldE5vcm1hbCgpO1xyXG4gICAgY29uc3QgVXAgPSB2ZWMzKFJpZ2h0KS5jcm9zcyhEaXIpLmdldE5vcm1hbCgpO1xyXG5cclxuICAgIHRoaXMuYSA9IG1hdDQoXHJcbiAgICAgIFJpZ2h0LngsXHJcbiAgICAgIFVwLngsXHJcbiAgICAgIC1EaXIueCxcclxuICAgICAgMCxcclxuICAgICAgUmlnaHQueSxcclxuICAgICAgVXAueSxcclxuICAgICAgLURpci55LFxyXG4gICAgICAwLFxyXG4gICAgICBSaWdodC56LFxyXG4gICAgICBVcC56LFxyXG4gICAgICAtRGlyLnosXHJcbiAgICAgIDAsXHJcbiAgICAgIC1Mb2MuZG90KFJpZ2h0KSxcclxuICAgICAgLUxvYy5kb3QoVXApLFxyXG4gICAgICBMb2MuZG90KERpciksXHJcbiAgICAgIDFcclxuICAgICkuYTtcclxuICB9IC8vIEVuZCBvZiAndmlldycgZnVuY3Rpb25cclxuXHJcbiAgdG9BcnJheSgpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHRoaXMuYVswXVswXSxcclxuICAgICAgdGhpcy5hWzBdWzFdLFxyXG4gICAgICB0aGlzLmFbMF1bMl0sXHJcbiAgICAgIHRoaXMuYVswXVszXSxcclxuICAgICAgdGhpcy5hWzFdWzBdLFxyXG4gICAgICB0aGlzLmFbMl1bMV0sXHJcbiAgICAgIHRoaXMuYVsxXVsyXSxcclxuICAgICAgdGhpcy5hWzFdWzNdLFxyXG4gICAgICB0aGlzLmFbMl1bMF0sXHJcbiAgICAgIHRoaXMuYVsyXVsxXSxcclxuICAgICAgdGhpcy5hWzJdWzJdLFxyXG4gICAgICB0aGlzLmFbMl1bM10sXHJcbiAgICAgIHRoaXMuYVszXVswXSxcclxuICAgICAgdGhpcy5hWzNdWzFdLFxyXG4gICAgICB0aGlzLmFbM11bMl0sXHJcbiAgICAgIHRoaXMuYVszXVszXSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBHZXQgbWF0cml4IGZ1bmN0aW9uLlxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NChcclxuICBhMDAsXHJcbiAgYTAxLFxyXG4gIGEwMixcclxuICBhMDMsXHJcbiAgYTEwLFxyXG4gIGExMSxcclxuICBhMTIsXHJcbiAgYTEzLFxyXG4gIGEyMCxcclxuICBhMjEsXHJcbiAgYTIyLFxyXG4gIGEyMyxcclxuICBhMzAsXHJcbiAgYTMxLFxyXG4gIGEzMixcclxuICBhMzNcclxuKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NChcclxuICAgIGEwMCxcclxuICAgIGEwMSxcclxuICAgIGEwMixcclxuICAgIGEwMyxcclxuICAgIGExMCxcclxuICAgIGExMSxcclxuICAgIGExMixcclxuICAgIGExMyxcclxuICAgIGEyMCxcclxuICAgIGEyMSxcclxuICAgIGEyMixcclxuICAgIGEyMyxcclxuICAgIGEzMCxcclxuICAgIGEzMSxcclxuICAgIGEzMixcclxuICAgIGEzM1xyXG4gICk7XHJcbn0gLy8gRW5kIG9mICdtYXQ0JyBmdW5jdGlvbi5cclxuXHJcbi8vIG1hdDMgZGV0ZXJtaW5hdGlvbiBmdW5jdGlvblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0M0RldGVybShhMTEsIGExMiwgYTEzLCBhMjEsIGEyMiwgYTIzLCBhMzEsIGEzMiwgYTMzKSB7XHJcbiAgcmV0dXJuIG5ldyBOdW1iZXIoXHJcbiAgICBhMTEgKiBhMjIgKiBhMzMgK1xyXG4gICAgICBhMTIgKiBhMjMgKiBhMzEgK1xyXG4gICAgICBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICBhMTEgKiBhMjMgKiBhMzIgLVxyXG4gICAgICBhMTIgKiBhMjEgKiBhMzMgLVxyXG4gICAgICBhMTMgKiBhMjIgKiBhMzFcclxuICApO1xyXG59IC8vIEVuZCBvZiAnbWF0M0RldGVybScgZnVuY3Rpb25cclxuXHJcbi8vIEVORCBPRiAnbXRoX21hdDQuanMnIEZJTEVzXHJcbiIsIi8vXHJcbi8vIG10aC5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwgMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIE1haW4gZmlsZSBvZiBtdGggbGlicmFyeS5cclxuLy9cclxuXHJcbi8qIGltcG9ydHMgKi9cclxuaW1wb3J0IHsgdmVjMywgX3ZlYzMgfSBmcm9tIFwiLi9tdGhfdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBtYXQ0LCBfbWF0NCwgbWF0M0RldGVybSB9IGZyb20gXCIuL210aF9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IEQyUiwgUjJEIH0gZnJvbSBcIi4vbXRoX2RlZi5qc1wiO1xyXG5cclxuLyogZXhwb3J0cyAqL1xyXG5leHBvcnQgeyB2ZWMzLCBfdmVjMyB9O1xyXG5leHBvcnQgeyBtYXQ0LCBfbWF0NCwgbWF0M0RldGVybSB9O1xyXG5leHBvcnQgeyBEMlIsIFIyRCB9O1xyXG5cclxuLy8gRU5EIE9GICdtdGguanMnIEZJTEVcclxuIiwiLy9cclxuLy8gcHJpbS5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUHJpbWl0aXZlIG1vZHVsZS5cclxuLy9cclxuXHJcbmltcG9ydCAqIGFzIGlwZ2wgZnJvbSBcIi4uLy4uLy4uLy4uL2luY2x1ZGVzXCI7XHJcblxyXG4vLyBWZXJ0ZXggY2xhc3NcclxuZXhwb3J0IGNsYXNzIF9WZXJ0ZXgge1xyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3RydWN0b3IocCwgbikge1xyXG4gICAgdGhpcy52ID0gW3AueCwgcC55LCBwLnosIG4ueCwgbi55LCBuLnpdO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcbn0gLy8gRW5kIG9mICdfVmVydGV4JyBjbGFzc1xyXG5cclxuLy8gR2V0IG9iamVjdCB2ZXJ0ZXhcclxuZnVuY3Rpb24gX0dldE9ialZlcnRleCh2KSB7XHJcbiAgcmV0dXJuIHsgcDogW3ZbMF0sIHZbMV0sIHZbMl1dLCBuOiBbblswXSwgblsxXSwgblsyXV0gfTtcclxufSAvLyBFbmQgb2YgJ19HZXRPYmpWZXJ0ZXgnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgbmV3IG9iamVjdCB2ZXJ0ZXhcclxuZnVuY3Rpb24gR2V0T2JqVmVydGV4KHYpIHtcclxuICByZXR1cm4gbmV3IF9HZXRPYmpWZXJ0ZXgodik7XHJcbn0gLy8gRW5kIG9mICdHZXRPYmpWZXJ0ZXgnIGZ1bmN0aW9uXHJcblxyXG4vLyBHZXQgdmVydGV4IGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBWZXJ0ZXgocCwgbikge1xyXG4gIHJldHVybiBuZXcgX1ZlcnRleChwLCBuKTtcclxufSAvLyBFbmQgb2YgJ1ZlcnRleCcgZnVuY3Rpb25cclxuXHJcbi8vIFByaW1pdGl2ZSBjbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJpbSB7XHJcbiAgLy8gQ29uc3RydWN0b3JcclxuICBjb25zdHJ1Y3RvcihnbCwgdHlwZSwgdmVydGljZXMsIGluZGljZXMsIHByZykge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuVkEgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG5cclxuICAgIC8vaWYgKHZlcnRpY2VzICE9IG51bGwgJiYgaW5kaWNlcyAhPSBudWxsKVxyXG4gICAgLy8gIHRoaXMuYXV0b05vcm1hbHModmVydGljZXMsIGluZGljZXMsIHZlcnRpY2VzLmxlbmd0aCwgaW5kaWNlcy5sZW5ndGgpO1xyXG5cclxuICAgIGlmICh2ZXJ0aWNlcyAhPSBudWxsICYmIHZlcnRpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLlZBKTtcclxuICAgICAgdGhpcy5WQnVmID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLlZCdWYpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLkFSUkFZX0JVRkZFUixcclxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KHZlcnRpY2VzKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBwb3NMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcmcsIFwiSW5Qb3NpdGlvblwiKTtcclxuICAgICAgY29uc3Qgbm9yTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJnLCBcIkluTm9ybWFsXCIpO1xyXG5cclxuICAgICAgaWYgKHBvc0xvYyAhPSAtMSkge1xyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zTG9jLCAzLCBnbC5GTE9BVCwgZmFsc2UsIDI0LCAwKTtcclxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NMb2MpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChub3JMb2MgIT0gLTEpIHtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKG5vckxvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMTIpO1xyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vckxvYyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5ub29mViA9IHZlcnRpY2VzLmxlbmd0aCAvIDY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vb2ZWID0gMDtcclxuICAgICAgdGhpcy5WQnVmID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTZXQgaW5kZXggZGF0YSAqL1xyXG4gICAgaWYgKGluZGljZXMgIT0gbnVsbCAmJiBpbmRpY2VzLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgIHRoaXMuSUJ1ZiA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLklCdWYpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKFxyXG4gICAgICAgIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLFxyXG4gICAgICAgIG5ldyBVaW50MzJBcnJheShpbmRpY2VzKSxcclxuICAgICAgICBnbC5TVEFUSUNfRFJBV1xyXG4gICAgICApO1xyXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcclxuICAgICAgdGhpcy5ub29mSSA9IGluZGljZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLk51bU9mRWxlbWVudHMgPSB0aGlzLm5vb2ZJO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub29mSSA9IDA7XHJcbiAgICAgIHRoaXMuSUJ1ZiA9IDA7XHJcbiAgICAgIHRoaXMuTnVtT2ZFbGVtZW50cyA9IHRoaXMubm9vZlY7XHJcbiAgICB9XHJcbiAgICAvKiBHZXRNaW5NYXhCQiAqL1xyXG4gICAgLy9JUDVfUm5kUHJpbUV2YWxCQigmUHItPk1pbkJCLCAmUHItPk1heEJCLCBWLCBOb29mVik7XHJcblxyXG4gICAgdGhpcy5NdGxObyA9IDA7XHJcbiAgfSAvLyBFbmQgb2YgY29udHN0cnVjdG9yXHJcblxyXG4gIC8vIFByaW0gZHJhdyBmdW5jdGlvblxyXG4gIHByaW1EcmF3KHJuZCwgbWF0ciwgc2hkKSB7XHJcbiAgICBsZXQgZ2wgPSBybmQuZ2w7XHJcbiAgICBjb25zdCBwcm9nSWQgPSBzaGQucHJnO1xyXG4gICAgbGV0IGxvYztcclxuICAgIGNvbnN0IGdsUHJpbVR5cGUgPSB0aGlzLnR5cGUgPT0gXCJUcmltZXNoXCIgPyBnbC5UUklBTkdMRVMgOiBnbC5QT0lOVFM7XHJcbiAgICBjb25zdCB3ID0gaXBnbC5tdGgubWF0NChtYXRyKSxcclxuICAgICAgd25vcm1hbCA9IHcuZ2V0SW52ZXJzZSgpLFxyXG4gICAgICB3dnAgPSB3Lm11bChybmQubWF0clZQKTtcclxuXHJcbiAgICB3bm9ybWFsLnRyYW5zcG9uc2UobWF0ci5nZXRJbnZlcnNlKCkpO1xyXG5cclxuICAgIC8vIHNlbmQgZGF0YSB0byBzaGFkZXJcclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ0lkKTtcclxuXHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFxyXG4gICAgICBzaGQuTWF0cldWUExvYyxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLnd2cC5hKSlcclxuICAgICk7IC8vIHd2cC50b0FycmF5KCkpKTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoXHJcbiAgICAgIHNoZC5NYXRyV0ludkxvYyxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW10uY29uY2F0KC4uLndub3JtYWwuYSkpXHJcbiAgICApO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihcclxuICAgICAgc2hkLk1hdHJXTG9jLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbXS5jb25jYXQoLi4udy5hKSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gcmVuZGVyXHJcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy5WQSk7XHJcblxyXG4gICAgaWYgKHRoaXMuSUJ1ZiA9PSAwKSB7XHJcbiAgICAgIGdsLmRyYXdBcnJheXMoZ2xQcmltVHlwZSwgMCwgdGhpcy5OdW1PZkVsZW1lbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuSUJ1Zik7XHJcbiAgICAgIGdsLmRyYXdFbGVtZW50cyhnbFByaW1UeXBlLCB0aGlzLk51bU9mRWxlbWVudHMsIGdsLlVOU0lHTkVEX0lOVCwgMCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheShudWxsKTtcclxuICAgIGdsLnVzZVByb2dyYW0obnVsbCk7XHJcbiAgfSAvL1MgRW5kIG9mICdyaW1EcmF3JyBmdW5jdGlvblxyXG5cclxuICAvLyBFdmFsdXRhdGlvbiBib3VuZCBib3ggZnVuY3Rpb25cclxuICBldmFsQkIoKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IC8vIEVuZCBvZiAnZXZhbEJCJyBmdW5jdGlvblxyXG5cclxuICAvLyBFdmFsdXRhdGlvbiBub3JtYWxzIGJ5IHBvc2l0aW9uIHZlY3RvcnMgZnVuY3Rpb24uXHJcbiAgYXV0b05vcm1hbHMoViwgSSwgbm9vZlYsIG5vb2ZJKSB7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICAvKiBTZXQgYWxsIHZlcnRleCBub3JtYWxzIHRvIHplcm8gKi9cclxuICAgIGZvciAoaSA9IDA7IGkgPCBub29mVjsgKytpKSB7XHJcbiAgICAgIFZbNiAqIGkgKyAzXSA9IDA7XHJcbiAgICAgIFZbNiAqIGkgKyA0XSA9IDA7XHJcbiAgICAgIFZbNiAqIGkgKyA1XSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRXZhbCBub3JtYWwgZm9yIGV2ZXJ5IGZhY2V0ICovXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbm9vZkk7IGkgKz0gMykge1xyXG4gICAgICBjb25zdCBuMCA9IElbaV0sXHJcbiAgICAgICAgbjEgPSBJW2kgKyAxXSxcclxuICAgICAgICBuMiA9IElbaSArIDJdO1xyXG4gICAgICBjb25zdCBwMCA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjBdLCBWWzYgKiBuMCArIDFdLCBWWzYgKiBuMCArIDJdKSxcclxuICAgICAgICBwMSA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjFdLCBWWzYgKiBuMSArIDFdLCBWWzYgKiBuMSArIDJdKSxcclxuICAgICAgICBwMiA9IGlwZ2wubXRoLnZlYzMoVls2ICogbjJdLCBWWzYgKiBuMiArIDFdLCBWWzYgKiBuMiArIDJdKSxcclxuICAgICAgICBOID0gcDEuc3ViKHAwKS5jcm9zcyhwMi5zdWIocDApKS5nZXROb3JtYWwoKTtcclxuXHJcbiAgICAgIGNvbnN0IG5uMCA9IE4sIC8vLmFkZChcclxuICAgICAgICAvLyAgIGlwZ2wubXRoLnZlYzMoVls2ICogbjAgKyAzXSwgVls2ICogbjAgKyA0XSwgVls2ICogbjAgKyA1XSlcclxuICAgICAgICAvLyApLFxyXG4gICAgICAgIG5uMSA9IE4sIC8vLmFkZChpcGdsLm10aC52ZWMzKFZbNiAqIG4xICsgM10sIFZbNiAqIG4xICsgNF0sIFZbNiAqIG4yICsgNV0pKSxcclxuICAgICAgICBubjIgPSBOOyAvLy5hZGQoaXBnbC5tdGgudmVjMyhWWzYgKiBuMiArIDNdLCBWWzYgKiBuMiArIDRdLCBWWzYgKiBuMiArIDVdKSk7XHJcblxyXG4gICAgICAvLyBuMFxyXG4gICAgICBWWzYgKiBuMCArIDNdID0gbm4wLng7XHJcbiAgICAgIFZbNiAqIG4wICsgNF0gPSBubjAueTtcclxuICAgICAgVls2ICogbjAgKyA1XSA9IG5uMC56O1xyXG5cclxuICAgICAgLy8gbjFcclxuICAgICAgVls2ICogbjEgKyAzXSA9IG5uMS54O1xyXG4gICAgICBWWzYgKiBuMSArIDRdID0gbm4xLnk7XHJcbiAgICAgIFZbNiAqIG4xICsgNV0gPSBubjEuejtcclxuXHJcbiAgICAgIC8vIG4yXHJcbiAgICAgIFZbNiAqIG4yICsgM10gPSBubjIueDtcclxuICAgICAgVls2ICogbjIgKyA0XSA9IG5uMi55O1xyXG4gICAgICBWWzYgKiBuMiArIDVdID0gbm4yLno7XHJcbiAgICB9XHJcblxyXG4gICAgLyogTm9ybWFsaXplIGFsbCB2ZXJ0ZXggbm9ybWFscyAqL1xyXG4gICAgZm9yIChpID0gMDsgaSA8IG5vb2ZWOyBpKyspIHtcclxuICAgICAgbGV0IE4gPSBpcGdsLm10aFxyXG4gICAgICAgIC52ZWMzKFZbNiAqIGkgKyAzXSwgVls2ICogaSArIDRdLCBWWzYgKiBpICsgNV0pXHJcbiAgICAgICAgLmdldE5vcm1hbCgpO1xyXG5cclxuICAgICAgVls2ICogaSArIDNdID0gTi54O1xyXG4gICAgICBWWzYgKiBpICsgNF0gPSBOLnk7XHJcbiAgICAgIFZbNiAqIGkgKyA1XSA9IE4uejtcclxuICAgIH1cclxuICB9IC8vIEVuZCBvZiAnYXV0b05vcm1hbHMnIGZ1bmN0aW9uXHJcbn1cclxuXHJcbi8vIEVORCBPRiAncHJpbS5qcycgRklMRVxyXG4iLCIvL1xyXG4vLyBzaGQuanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIFNoYWRlciBtb2R1bGUuXHJcbi8vXHJcblxyXG4vLyBUZXh0IGZvciBkZWZhdWx0IHZlcnRleCBzaGFkZXJcclxuY29uc3QgZGVmdnN0eHQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuI2xpbmUgMTJcclxuXHJcbi8qbGF5b3V0KGxvY2F0aW9uID0gMCkqLyBpbiB2ZWMzIEluUG9zaXRpb247XHJcbi8qbGF5b3V0KGxvY2F0aW9uID0gMSkqLyBpbiB2ZWMzIEluTm9ybWFsO1xyXG5cclxub3V0IHZlYzQgRHJhd0NvbG9yOyAgIFxyXG5vdXQgdmVjMyBEcmF3Tm9ybWFsO1xyXG5vdXQgdmVjMyBEcmF3UG9zaXRpb247IFxyXG5vdXQgdmVjMyBTcmNQb3NpdGlvbjtcclxuXHJcbnVuaWZvcm0gbWF0NCBNYXRyV1ZQO1xyXG51bmlmb3JtIG1hdDQgTWF0cldJbnY7XHJcbnVuaWZvcm0gbWF0NCBNYXRyVztcclxuXHJcbnZvaWQgbWFpbiggdm9pZCApXHJcbntcclxuICBnbF9Qb3NpdGlvbiA9IChNYXRyV1ZQICogdmVjNChJblBvc2l0aW9uLCAxLjApKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAvL2dsX1Bvc2l0aW9uID0gLy9tYXQ0KDEuNDE0LCAtMC44MTYsIC0wLjU3NywgLTAuNTc3LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgMC4wLCAgMS42MzIsIC0wLjU3NywgLTAuNTc3LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLTEuNDE0LCAtMC44MTYsIC0wLjU3NywgLTAuNTc3LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAwLjAsICAgICAwLjAsICAgLTguOCwgICAtOC42KSAqIHZlYzQoSW5Qb3NpdGlvbiwgMS4wKTtcclxuICBEcmF3Q29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAwLjAsIDEuMCk7XHJcbiAgRHJhd05vcm1hbCA9IG1hdDMoTWF0cldJbnYpICogSW5Ob3JtYWw7XHJcbiAgRHJhd1Bvc2l0aW9uID0gdmVjMyhNYXRyVyAqIHZlYzQoSW5Qb3NpdGlvbiwgMS4wKSk7XHJcbiAgU3JjUG9zaXRpb24gPSB2ZWMzKE1hdHJXICogdmVjNChJblBvc2l0aW9uLCAxLjApKTtcclxufVxyXG5gO1xyXG5cclxuLy8gVGV4dCBmb3IgZGVmYXVsdCBmcmFnbWVudCBzaGFkZXJcclxuY29uc3QgZGVmZnN0eHQgPSBgI3ZlcnNpb24gMzAwIGVzXHJcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcclxuI2xpbmUgNDJcclxuXHJcbmluIHZlYzQgRHJhd0NvbG9yOyAgIFxyXG5pbiB2ZWMzIERyYXdOb3JtYWw7XHJcbmluIHZlYzMgRHJhd1Bvc2l0aW9uOyBcclxuaW4gdmVjMyBTcmNQb3NpdGlvbjtcclxuXHJcbm91dCB2ZWM0IE91dENvbG9yO1xyXG5cclxuI2lmIDBcclxudm9pZCBtYWluKCB2b2lkIClcclxue1xyXG4gIHZlYzMgTCA9IG5vcm1hbGl6ZSh2ZWMzKC0xLCAtMSwgLTEpKTtcclxuICB2ZWMzIE4gPSBub3JtYWxpemUoRHJhd05vcm1hbCk7XHJcblxyXG4gIE4gPSBmYWNlZm9yd2FyZChOLCBMLCBOKTtcclxuXHJcbiAgZmxvYXQgayA9IGRvdChMLCBub3JtYWxpemUoTikpO1xyXG5cclxuICB2ZWMzIGNvbG9yID0gayAqIHZlYzMoMCwgMC43ZiwgMC42Zik7XHJcbiAgLy92ZWMzIFIsIFYgPSB2ZWMzKDAsIDAsIC0xKTtcclxuXHJcbiAgLy9SID0gcmVmbGVjdChWLCBOKTtcclxuICAvL2NvbG9yICs9IHZlYzMoMC4yZikgKiBtYXgoMC4wMWYsIHBvdyhkb3QoUiwgTCksIDEwLjBmKSk7XHJcblxyXG4gIC8vT3V0Q29sb3IgPSB2ZWM0KGNvbG9yLCAxLjBmKTtcclxuICBpZiAoU3JjUG9zaXRpb24ueSA+PSAtMC4wMSB8fCBTcmNQb3NpdGlvbi55IDw9IDAuMDEpXHJcbiAgICBPdXRDb2xvciA9IHZlYzQoMS4wLCAwLjAsIDAuMCwgMS4wKTtcclxuICBlbHNlXHJcbiAgICBPdXRDb2xvciA9IHZlYzQoTiwgMS4wKTtcclxufVxyXG4jZW5kaWZcclxudm9pZCBtYWluKCB2b2lkIClcclxue1xyXG4gIHZlYzMgTCA9IHZlYzMoMiwgNSwgMCk7XHJcbiAgdmVjMyBOID0gbm9ybWFsaXplKGZhY2Vmb3J3YXJkKERyYXdOb3JtYWwsIC1MLCBEcmF3Tm9ybWFsKSk7XHJcblxyXG4gIHZlYzMgY29sb3I7XHJcblxyXG4gIGZsb2F0IGsgPSBkb3QoTiwgbm9ybWFsaXplKEwpKTtcclxuICBpZiAoU3JjUG9zaXRpb24ueSA+PSAtMC4wMSAmJiBTcmNQb3NpdGlvbi55IDw9IDAuMDEpIFxyXG4gIHtcclxuICAgIGNvbG9yID0gdmVjMygwLjUsIDAuNSwgMC4wKSAqIDAuMjtcclxuICAgIGNvbG9yICs9IHZlYzMoMC41LCAwLjUsIDAuMCkgKiBrICogMC44O1xyXG4gIH1cclxuICBlbHNlIFxyXG4gIHtcclxuICAgIGNvbG9yID0gdmVjMygxLjAsIDAuODI5LCAwLjgyOSkgKiAwLjI7XHJcbiAgICBjb2xvciArPSB2ZWMzKDEuMCwgMC44MjksIDAuODI5KSAqIGsgKiAwLjg7XHJcbiAgfVxyXG4gIE91dENvbG9yID0gdmVjNChjb2xvciwgMS4wKTtcclxufVxyXG5gO1xyXG5cclxuLy8gTG9hZCBhbmQgY29tcGlsZSBzaGFkZXIgZnVuY3Rpb25cclxuZnVuY3Rpb24gbG9hZFNoYWRlcihnbCwgc2hhZGVyVHlwZSwgc2hhZGVyU291cmNlKSB7XHJcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHNoYWRlclR5cGUpO1xyXG5cclxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJTb3VyY2UpO1xyXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcclxuXHJcbiAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpXHJcbiAgICBjb25zb2xlLmxvZyhcIlNoYWRlciBjb21waWxlIGZhaWw6IFwiICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcclxuXHJcbiAgcmV0dXJuIHNoYWRlcjtcclxufSAvLyBFbmQgb2YgJ2xvYWRTaGFkZXInIGZ1bmN0aW9uXHJcblxyXG4vLyBTaGFkZXIgY2xhc3NcclxuZXhwb3J0IGNsYXNzIF9zaGFkZXIge1xyXG4gIGNvbnN0cnVjdG9yKGdsKSB7XHJcbiAgICB0aGlzLnZzID0gbG9hZFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgZGVmdnN0eHQpO1xyXG4gICAgdGhpcy5mcyA9IGxvYWRTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZGVmZnN0eHQpO1xyXG4gICAgdGhpcy5wcmcgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMucHJnLCB0aGlzLnZzKTtcclxuICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLnByZywgdGhpcy5mcyk7XHJcbiAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLnByZyk7XHJcblxyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJnLCBnbC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMucHJnKTtcclxuICAgICAgY29uc29sZS5sb2coXCJTaGFkZXIgcHJvZ3JhbSBsaW5rIGZhaWw6IFwiICsgYnVmKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLk1hdHJXVlBMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIFwiTWF0cldWUFwiKTtcclxuICAgIHRoaXMuTWF0cldMb2MgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcmcsIFwiTWF0cldcIik7XHJcbiAgICB0aGlzLk1hdHJXSW52TG9jID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJnLCBcIk1hdHJXSW52XCIpO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcbn0gLy8gRW5kIG9mICdTaGFkZXInIGNsYXNzXHJcblxyXG4vLyBHZXQgc2hhZGVyIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFkZXIoZ2wpIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIoZ2wpO1xyXG59IC8vIEVuZCBvZiAnc2hhZGVyJyBmdW5jdGlvblxyXG5cclxuLyogb2xkIHJlbmRlclxyXG5jbGFzcyBfc2hhZGVyIHtcclxuICBjb25zdHJ1Y3RvcihnbCwgbmFtZSkge1xyXG4gICAgdGhpcy5faW5pdChuYW1lKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIF9pbml0KGdsLCBuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5zaGFkZXJzID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogZ2wuRlJBR01FTlRfU0hBREVSLFxyXG4gICAgICB9LFxyXG4gICAgICB7fSxcclxuICAgIF07XHJcblxyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImJpbi9zaGFkZXJzLyR7bmFtZX0vJHtzLm5hbWV9Lmdsc2xcIik7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpIHMuc3JjID0gc3JjO1xyXG4gICAgfVxyXG4gICAgLy8gcmVjb21waWxlIHNoYWRlcnNcclxuICB9XHJcbn0gKi9cclxuXHJcbi8vIEVORCBPRiAnc2hkLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIHJlcy5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUmVzb3VyY2UgbW9kdWxlLlxyXG4vL1xyXG5cclxuLy8gSW1wb3J0XHJcbmltcG9ydCAqIGFzIHByaW0gZnJvbSBcIi4vcHJpbS9wcmltLmpzXCI7XHJcbmltcG9ydCAqIGFzIHNoZCBmcm9tIFwiLi9zaGFkZXIvc2hkLmpzXCI7XHJcblxyXG4vLyBFeHBvcnRcclxuZXhwb3J0ICogYXMgcHJpbSBmcm9tIFwiLi9wcmltL3ByaW0uanNcIjtcclxuZXhwb3J0ICogYXMgc2hkIGZyb20gXCIuL3NoYWRlci9zaGQuanNcIjtcclxuXHJcbi8vIEVORCBPRiAncmVzLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIHJuZC5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gUmVuZGVyIG1vZHVsZS5cclxuLy9cclxuXHJcbi8vIEltcG9ydFxyXG5pbXBvcnQgKiBhcyBpcGdsIGZyb20gXCIuLy4uLy4uL2luY2x1ZGVzLmpzXCI7XHJcbmltcG9ydCAqIGFzIHJlcyBmcm9tIFwiLi9yZXMvcmVzLmpzXCI7XHJcblxyXG4vLyBFeHBvcnRcclxuZXhwb3J0ICogYXMgcmVzIGZyb20gXCIuL3Jlcy9yZXMuanNcIjtcclxuXHJcbi8vIFByb2plY3QgcGFyYW1ldGVyc1xyXG5leHBvcnQgbGV0IHByb2pTaXplID0gMC4xO1xyXG5leHBvcnQgbGV0IHByb2pEaXN0ID0gMC4xO1xyXG5leHBvcnQgbGV0IHByb2pGYXJDbGlwID0gMzAwO1xyXG5cclxuLy8gUmVuZGVyIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBSZW5kZXIge1xyXG4gIC8vIENvbnN0cnVjdG9yXHJcbiAgY29uc3RydWN0b3IoY2FudmFzaWQpIHtcclxuICAgIHRoaXMuaGFuZGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzaWQpO1xyXG4gICAgdGhpcy5nbCA9IHRoaXMuaGFuZGxlLmdldENvbnRleHQoXCJ3ZWJnbDJcIik7XHJcbiAgICBpZiAodGhpcy5nbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGFsZXJ0KFxyXG4gICAgICAgIFwiRXJyb3IgR0wwMDQ3IVxcbldlYkdMIDIuMCBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3NlciFcXG5Gb3IgbW9yZSBpbmZvcm1hdGlvbiwgdmlzaXQgaHR0cHM6Ly9zY2hvb2wzMC5zcGIucnUvY2dzZy9cIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbC5jbGVhckNvbG9yKDAuMywgMC40NywgMC44LCAxKTtcclxuICAgIHRoaXMudyA9IHRoaXMuaGFuZGxlLndpZHRoO1xyXG4gICAgdGhpcy5oID0gdGhpcy5oYW5kbGUuaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gaXBnbC5tdGgubWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyUHJvaiA9IGlwZ2wubXRoLm1hdDQoKTtcclxuICAgIHRoaXMubWF0clZpZXcgPSBpcGdsLm10aC5tYXQ0KCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGRlZmF1bHQgc2hhZGVyXHJcbiAgICB0aGlzLnNoYWRlciA9IHJlcy5zaGQuc2hhZGVyKHRoaXMuZ2wpO1xyXG4gICAgdGhpcy5zaGRwcmcgPSB0aGlzLnNoYWRlci5wcmc7XHJcblxyXG4gICAgdGhpcy5wcm9qU2V0KCk7XHJcbiAgICB0aGlzLmNhbVNldChcclxuICAgICAgaXBnbC5tdGgudmVjMygxNCwgMTUsIDEzKSxcclxuICAgICAgaXBnbC5tdGgudmVjMygtMTAsIDIsIDMpLFxyXG4gICAgICBpcGdsLm10aC52ZWMzKDAsIDEsIDApXHJcbiAgICApO1xyXG4gIH0gLy8gRW5kIG9mIGNvbnN0cnVjdG9yXHJcblxyXG4gIC8vIFJlbmRlciBzdGFydCBmdW5jdGlvblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gIH0gLy8gRW5kIG9mICdzdGFydCcgZnVuY3Rpb25cclxuXHJcbiAgLy8gUmVuZGVyIGVuZCBmdW5jdGlvblxyXG4gIGVuZCgpIHtcclxuICAgIHJldHVybjtcclxuICB9IC8vIEVuZCBvZiAnZW5kJyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXQgY2FtZXJhIGZ1bmN0aW9uXHJcbiAgY2FtU2V0KExvYywgQXQsIFVwKSB7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gaXBnbC5tdGgubWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyVmlldy52aWV3KExvYywgQXQsIFVwKTtcclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWwodGhpcy5tYXRyUHJvaik7XHJcbiAgICAvL3RoaXMubWF0clZQID0gdGhpcy5tYXRyUHJvai5tdWwodGhpcy5tYXRyVmlldyk7XHJcblxyXG4gICAgdGhpcy5jYW1SaWdodCA9IGlwZ2wubXRoLnZlYzMoXHJcbiAgICAgIHRoaXMubWF0clZpZXcuYVswXVswXSxcclxuICAgICAgdGhpcy5tYXRyVmlldy5hWzFdWzBdLFxyXG4gICAgICB0aGlzLm1hdHJWaWV3LmFbMl1bMF1cclxuICAgICk7XHJcbiAgICB0aGlzLmNhbVVwID0gaXBnbC5tdGgudmVjMyhcclxuICAgICAgdGhpcy5tYXRyVmlldy5hWzBdWzFdLFxyXG4gICAgICB0aGlzLm1hdHJWaWV3LmFbMV1bMV0sXHJcbiAgICAgIHRoaXMubWF0clZpZXcuYVsyXVsxXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY2FtRGlyID0gaXBnbC5tdGgudmVjMyhcclxuICAgICAgLXRoaXMubWF0clZpZXcuYVswXVsyXSxcclxuICAgICAgLXRoaXMubWF0clZpZXcuYVsxXVsyXSxcclxuICAgICAgLXRoaXMubWF0clZpZXcuYVsyXVsyXVxyXG4gICAgKTtcclxuICAgIHRoaXMuY2FtTG9jID0gTG9jO1xyXG4gICAgdGhpcy5jYW1BdCA9IEF0O1xyXG5cclxuICAgIHJldHVybjtcclxuICB9IC8vIEVuZCBvZiAnY2FtU2V0JyBmdW5jdGlvblxyXG5cclxuICAvLyBTZXQgcHJvamVjdCBtYXRyaXggZnVuY3Rpb25cclxuICBwcm9qU2V0KCkge1xyXG4gICAgbGV0IHJ4LCByeTtcclxuXHJcbiAgICByeCA9IHByb2pTaXplO1xyXG4gICAgcnkgPSBwcm9qU2l6ZTtcclxuXHJcbiAgICBpZiAodGhpcy53ID49IHRoaXMuaCkge1xyXG4gICAgICByeCAqPSB0aGlzLncgLyB0aGlzLmg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByeSAqPSB0aGlzLmggLyB0aGlzLnc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tYXRyUHJvaiA9IGlwZ2wubXRoLm1hdDQoKTtcclxuICAgIHRoaXMubWF0clByb2ouZnJ1c3R1bShcclxuICAgICAgLXJ4IC8gMixcclxuICAgICAgcnggLyAyLFxyXG4gICAgICAtcnkgLyAyLFxyXG4gICAgICByeSAvIDIsXHJcbiAgICAgIHByb2pEaXN0LFxyXG4gICAgICBwcm9qRmFyQ2xpcFxyXG4gICAgKTtcclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWwodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3Byb2pTZXQnIGZ1bmN0aW9uXHJcbn0gLy8gRW5kIG9mICdSZW5kZXInIGNsYXNzXHJcblxyXG4vLyBFTkQgT0YgJ3JuZC5qcycgRklMRVxyXG4iLCIvL1xyXG4vLyB0aW1lci5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gVGltZXIgbW9kdWxlLlxyXG4vL1xyXG5cclxuLy8gVGltZXIgY2xhc3NcclxuZXhwb3J0IGNsYXNzIFRpbWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIFRpbWVyIG9idGFpbiBjdXJyZW50IHRpbWUgaW4gc2Vjb25kcyBtZXRob2RcclxuICAgIGNvbnN0IGdldFRpbWUgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgdCA9XHJcbiAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDAuMCArXHJcbiAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgIGRhdGUuZ2V0TWludXRlcygpICogNjA7XHJcbiAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUaW1lciByZXNwb25zZSBtZXRob2RcclxuICAgIHRoaXMucmVzcG9uc2UgPSAodGFnX2lkID0gbnVsbCkgPT4ge1xyXG4gICAgICBsZXQgdCA9IGdldFRpbWUoKTtcclxuICAgICAgLy8gR2xvYmFsIHRpbWVcclxuICAgICAgdGhpcy5nbG9iYWxUaW1lID0gdDtcclxuICAgICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0IC0gdGhpcy5vbGRUaW1lO1xyXG4gICAgICAvLyBUaW1lIHdpdGggcGF1c2VcclxuICAgICAgaWYgKHRoaXMuaXNQYXVzZSkge1xyXG4gICAgICAgIHRoaXMubG9jYWxEZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucGF1c2VUaW1lICs9IHQgLSB0aGlzLm9sZFRpbWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2NhbERlbHRhVGltZSA9IHRoaXMuZ2xvYmFsRGVsdGFUaW1lO1xyXG4gICAgICAgIHRoaXMubG9jYWxUaW1lID0gdCAtIHRoaXMucGF1c2VUaW1lIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gRlBTXHJcbiAgICAgIHRoaXMuZnJhbWVDb3VudGVyKys7XHJcbiAgICAgIGlmICh0IC0gdGhpcy5vbGRUaW1lRlBTID4gMykge1xyXG4gICAgICAgIHRoaXMuRlBTID0gdGhpcy5mcmFtZUNvdW50ZXIgLyAodCAtIHRoaXMub2xkVGltZUZQUyk7XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lRlBTID0gdDtcclxuICAgICAgICB0aGlzLmZyYW1lQ291bnRlciA9IDA7XHJcbiAgICAgICAgaWYgKHRhZ19pZCAhPSBudWxsKVxyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnX2lkKS5pbm5lckhUTUwgPSB0aGlzLmdldEZQUygpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub2xkVGltZSA9IHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE9idGFpbiBGUFMgYXMgc3RyaW5nIG1ldGhvZFxyXG4gICAgdGhpcy5nZXRGUFMgPSAoKSA9PiB0aGlzLkZQUy50b0ZpeGVkKDMpO1xyXG5cclxuICAgIC8vIEZpbGwgdGltZXIgZ2xvYmFsIGRhdGFcclxuICAgIHRoaXMuZ2xvYmFsVGltZSA9IHRoaXMubG9jYWxUaW1lID0gZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5nbG9iYWxEZWx0YVRpbWUgPSB0aGlzLmxvY2FsRGVsdGFUaW1lID0gMDtcclxuXHJcbiAgICAvLyBGaWxsIHRpbWVyIHNlbWkgZ2xvYmFsIGRhdGFcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5vbGRUaW1lID0gdGhpcy5vbGRUaW1lRlBTID0gdGhpcy5nbG9iYWxUaW1lO1xyXG4gICAgdGhpcy5mcmFtZUNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB0aGlzLkZQUyA9IDMwLjA7XHJcbiAgICB0aGlzLnBhdXNlVGltZSA9IDA7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59IC8vIEVuZCBvZiAnVGltZXInIGZ1bmN0aW9uXHJcblxyXG4vLyBFTkQgT0YgJ3RpbWVyLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIHBsYXQuanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIFBsYXRvbiBtb2R1bGUuXHJcbi8vXHJcblxyXG4vLyBHZXQgaWNvc2FlZHIgViBhcnJheVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvVigpIHtcclxuICByZXR1cm4gW1xyXG4gICAgMS4wLCAtMC41LCAwLjAsIDAuNzk0NjU0LCAtMC4xODc1OTIsIDAuNTc3MzUsIDAuODA5MDE3LCAwLjUsIDAuNTg3Nzg1LFxyXG4gICAgMC43OTQ2NTQsIC0wLjE4NzU5MiwgMC41NzczNSwgMC4zMDkwMTcsIC0wLjUsIDAuOTUxMDU3LCAwLjc5NDY1NCwgLTAuMTg3NTkyLFxyXG4gICAgMC41NzczNSwgLTAuMzA5MDE3LCAwLjUsIDAuOTUxMDU3LCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAtMC41NzczNSwgLTAuODA5MDE3LFxyXG4gICAgLTAuNSwgMC41ODc3ODUsIDAuNzk0NjU0LCAtMC4xODc1OTIsIC0wLjU3NzM1LCAtMS4wLCAwLjUsIDAuMCwgMC43OTQ2NTQsXHJcbiAgICAtMC4xODc1OTIsIC0wLjU3NzM1LCAtMC44MDkwMTcsIC0wLjUsIC0wLjU4Nzc4NSwgLTAuMzAzNTMxLCAtMC4xODc1OTIsXHJcbiAgICAtMC45MzQxNzIsIC0wLjMwOTAxNywgMC41LCAtMC45NTEwNTcsIC0wLjMwMzUzMSwgLTAuMTg3NTkyLCAtMC45MzQxNzIsXHJcbiAgICAwLjMwOTAxNywgLTAuNSwgLTAuOTUxMDU3LCAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgLTAuOTM0MTcyLCAwLjgwOTAxNywgMC41LFxyXG4gICAgLTAuNTg3Nzg1LCAtMC45ODIyNDcsIC0wLjE4NzU5MiwgMC4wLCAxLjAsIC0wLjUsIDAuMCwgLTAuOTgyMjQ3LCAtMC4xODc1OTIsXHJcbiAgICAwLjAsIDAuODA5MDE3LCAwLjUsIDAuNTg3Nzg1LCAtMC45ODIyNDcsIC0wLjE4NzU5MiwgMC4wLCAwLjMwOTAxNywgLTAuNSxcclxuICAgIDAuOTUxMDU3LCAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgMC45MzQxNzIsIC0wLjMwOTAxNywgMC41LCAwLjk1MTA1NyxcclxuICAgIC0wLjMwMzUzMSwgLTAuMTg3NTkyLCAwLjkzNDE3MiwgLTAuODA5MDE3LCAtMC41LCAwLjU4Nzc4NSwgLTAuMzAzNTMxLFxyXG4gICAgLTAuMTg3NTkyLCAwLjkzNDE3MiwgLTEuMCwgMC41LCAwLjAsIDAuNzk0NjU0LCAtMC4xODc1OTIsIDAuNTc3MzUsXHJcbiAgICAtMC44MDkwMTcsIC0wLjUsIC0wLjU4Nzc4NSwgMC43OTQ2NTQsIC0wLjE4NzU5MiwgMC41NzczNSwgLTAuMzA5MDE3LCAwLjUsXHJcbiAgICAtMC45NTEwNTcsIDAuNzk0NjU0LCAtMC4xODc1OTIsIDAuNTc3MzUsIDAuMzA5MDE3LCAtMC41LCAtMC45NTEwNTcsXHJcbiAgICAwLjc5NDY1NCwgLTAuMTg3NTkyLCAtMC41NzczNSwgMC44MDkwMTcsIDAuNSwgLTAuNTg3Nzg1LCAwLjc5NDY1NCxcclxuICAgIC0wLjE4NzU5MiwgLTAuNTc3MzUsIDEuMCwgLTAuNSwgMC4wLCAwLjc5NDY1NCwgLTAuMTg3NTkyLCAtMC41NzczNSxcclxuICAgIDAuODA5MDE3LCAwLjUsIDAuNTg3Nzg1LCAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgLTAuOTM0MTcyLCAwLjMwOTAxNywgLTAuNSxcclxuICAgIDAuOTUxMDU3LCAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgLTAuOTM0MTcyLCAtMC4zMDkwMTcsIDAuNSwgMC45NTEwNTcsXHJcbiAgICAtMC4zMDM1MzEsIC0wLjE4NzU5MiwgLTAuOTM0MTcyLCAtMC44MDkwMTcsIC0wLjUsIDAuNTg3Nzg1LCAtMC45ODIyNDcsXHJcbiAgICAtMC4xODc1OTIsIC0wLjAsIC0xLjAsIDAuNSwgMC4wLCAtMC45ODIyNDcsIC0wLjE4NzU5MiwgLTAuMCwgLTAuODA5MDE3LFxyXG4gICAgLTAuNSwgLTAuNTg3Nzg1LCAtMC45ODIyNDcsIC0wLjE4NzU5MiwgLTAuMCwgLTAuMzA5MDE3LCAwLjUsIC0wLjk1MTA1NyxcclxuICAgIC0wLjMwMzUzMSwgLTAuMTg3NTkyLCAwLjkzNDE3MiwgMC4zMDkwMTcsIC0wLjUsIC0wLjk1MTA1NywgLTAuMzAzNTMxLFxyXG4gICAgLTAuMTg3NTkyLCAwLjkzNDE3MiwgMC44MDkwMTcsIDAuNSwgLTAuNTg3Nzg1LCAtMC4zMDM1MzEsIC0wLjE4NzU5MixcclxuICAgIDAuOTM0MTcyLCAxLjAsIC0wLjUsIDAuMCwgMC40OTExMjMsIC0wLjc5NDY1NCwgMC4zNTY4MjIsIDAuODA5MDE3LCAwLjUsXHJcbiAgICAwLjU4Nzc4NSwgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIC0wLjU3NzM1LCAwLjMwOTAxNywgLTAuNSwgMC45NTEwNTcsXHJcbiAgICAwLjQ5MTEyMywgLTAuNzk0NjU0LCAwLjM1NjgyMiwgLTAuMzA5MDE3LCAwLjUsIDAuOTUxMDU3LCAtMC4xODc1OTIsXHJcbiAgICAtMC43OTQ2NTQsIC0wLjU3NzM1LCAtMC44MDkwMTcsIC0wLjUsIDAuNTg3Nzg1LCAtMC42MDcwNjIsIC0wLjc5NDY1NCwgLTAuMCxcclxuICAgIC0xLjAsIDAuNSwgMC4wLCAwLjQ5MTEyMywgLTAuNzk0NjU0LCAwLjM1NjgyMiwgLTAuODA5MDE3LCAtMC41LCAtMC41ODc3ODUsXHJcbiAgICAtMC42MDcwNjIsIC0wLjc5NDY1NCwgLTAuMCwgLTAuMzA5MDE3LCAwLjUsIC0wLjk1MTA1NywgMC40OTExMjMsIC0wLjc5NDY1NCxcclxuICAgIDAuMzU2ODIyLCAwLjMwOTAxNywgLTAuNSwgLTAuOTUxMDU3LCAwLjQ5MTEyMywgLTAuNzk0NjU0LCAtMC4zNTY4MjIsXHJcbiAgICAwLjgwOTAxNywgMC41LCAtMC41ODc3ODUsIC0wLjYwNzA2MiwgLTAuNzk0NjU0LCAwLjAsIDEuMCwgLTAuNSwgMC4wLFxyXG4gICAgMC40OTExMjMsIC0wLjc5NDY1NCwgLTAuMzU2ODIyLCAwLjgwOTAxNywgMC41LCAwLjU4Nzc4NSwgLTAuNjA3MDYyLFxyXG4gICAgLTAuNzk0NjU0LCAwLjAsIDAuMzA5MDE3LCAtMC41LCAwLjk1MTA1NywgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIDAuNTc3MzUsXHJcbiAgICAtMC4zMDkwMTcsIDAuNSwgMC45NTEwNTcsIDAuNDkxMTIzLCAtMC43OTQ2NTQsIC0wLjM1NjgyMiwgLTAuODA5MDE3LCAtMC41LFxyXG4gICAgMC41ODc3ODUsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAwLjU3NzM1LCAtMS4wLCAwLjUsIDAuMCwgMC40OTExMjMsXHJcbiAgICAtMC43OTQ2NTQsIC0wLjM1NjgyMiwgLTAuODA5MDE3LCAtMC41LCAtMC41ODc3ODUsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LFxyXG4gICAgLTAuNTc3MzUsIC0wLjMwOTAxNywgMC41LCAtMC45NTEwNTcsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAwLjU3NzM1LFxyXG4gICAgMC4zMDkwMTcsIC0wLjUsIC0wLjk1MTA1NywgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIC0wLjU3NzM1LCAwLjgwOTAxNywgMC41LFxyXG4gICAgLTAuNTg3Nzg1LCAtMC4xODc1OTIsIC0wLjc5NDY1NCwgMC41NzczNSwgMC4wLCAxLjExODAzNCwgMC4wLCAtMC4xODc1OTIsXHJcbiAgICAtMC43OTQ2NTQsIC0wLjU3NzM1LCAwLjAsIDEuMTE4MDM0LCAwLjAsIDAuNDkxMTIzLCAtMC43OTQ2NTQsIDAuMzU2ODIyLCAwLjAsXHJcbiAgICAxLjExODAzNCwgMC4wLCAtMC42MDcwNjIsIC0wLjc5NDY1NCwgMC4wLCAwLjAsIDEuMTE4MDM0LCAwLjAsIDAuNDkxMTIzLFxyXG4gICAgLTAuNzk0NjU0LCAtMC4zNTY4MjIsIDAuMCwgMS4xMTgwMzQsIDAuMCwgLTAuMTg3NTkyLCAtMC43OTQ2NTQsIDAuNTc3MzUsXHJcbiAgICAwLjAsIC0xLjExODAzNCwgMC4wLCAwLjQ5MTEyMywgLTAuNzk0NjU0LCAwLjM1NjgyMiwgMC4wLCAtMS4xMTgwMzQsIDAuMCxcclxuICAgIC0wLjYwNzA2MiwgLTAuNzk0NjU0LCAtMC4wLCAwLjAsIC0xLjExODAzNCwgMC4wLCAwLjQ5MTEyMywgLTAuNzk0NjU0LFxyXG4gICAgLTAuMzU2ODIyLCAwLjAsIC0xLjExODAzNCwgMC4wLCAtMC4xODc1OTIsIC0wLjc5NDY1NCwgMC41NzczNSwgMC4wLFxyXG4gICAgLTEuMTE4MDM0LCAwLjAsIC0wLjE4NzU5MiwgLTAuNzk0NjU0LCAtMC41NzczNSxcclxuICBdO1xyXG59XHJcblxyXG4vLyBHZXQgaWNvc2FlZHIgSVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWNvSSgpIHtcclxuICByZXR1cm4gW1xyXG4gICAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxyXG4gICAgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAyOSwgMzAsIDMyLCA1NSwgMzQsIDM2LCA1NiwgMzgsIDQwLCA1NywgNDIsXHJcbiAgICA0NCwgNTgsIDQ2LCA0OCwgNTksIDMxLCAzMywgNTAsIDM1LCAzNywgNTEsIDM5LCA0MSwgNTIsIDQzLCA0NSwgNTMsIDQ3LCA0OSxcclxuICAgIDU0LFxyXG4gIF07XHJcbn1cclxuXHJcbi8vIEdldCBkb2RlY2FlZHIgVlxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjVigpIHtcclxuICBjb25zdCBWID0gbmV3IGdldEljb1YoKTtcclxuICBjb25zdCBJID0gbmV3IGdldEljb0koKTtcclxuXHJcbiAgbGV0IFYxID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjA7IGkgKz0gMykge1xyXG4gICAgY29uc3QgUzEgPSBWWzYgKiBJW2ldXTtcclxuICAgIGNvbnN0IFMyID0gVls2ICogSVtpXSArIDFdO1xyXG4gICAgY29uc3QgUzMgPSBWWzYgKiBJW2ldICsgMl07XHJcbiAgICBjb25zdCBTNCA9IFZbNiAqIElbaSArIDFdXTtcclxuICAgIGNvbnN0IFM1ID0gVls2ICogSVtpICsgMV0gKyAxXTtcclxuICAgIGNvbnN0IFM2ID0gVls2ICogSVtpICsgMV0gKyAyXTtcclxuICAgIGNvbnN0IFM3ID0gVls2ICogSVtpICsgMl1dO1xyXG4gICAgY29uc3QgUzggPSBWWzYgKiBJW2kgKyAyXSArIDFdO1xyXG4gICAgY29uc3QgUzkgPSBWWzYgKiBJW2kgKyAyXSArIDJdO1xyXG5cclxuICAgIGNvbnN0IFMxMCA9IChTMSArIFM0ICsgUzcpIC8gMztcclxuICAgIGNvbnN0IFMxMSA9IChTMiArIFM1ICsgUzgpIC8gMztcclxuICAgIGNvbnN0IFMxMiA9IChTMyArIFM2ICsgUzkpIC8gMztcclxuXHJcbiAgICBWMS5wdXNoKFMxMCk7XHJcbiAgICBWMS5wdXNoKFMxMSk7XHJcbiAgICBWMS5wdXNoKFMxMik7XHJcbiAgICBWMS5wdXNoKDApO1xyXG4gICAgVjEucHVzaCgwKTtcclxuICAgIFYxLnB1c2goMCk7XHJcblxyXG4gICAgVjEucHVzaChTMTApO1xyXG4gICAgVjEucHVzaChTMTEpO1xyXG4gICAgVjEucHVzaChTMTIpO1xyXG4gICAgVjEucHVzaCgwKTtcclxuICAgIFYxLnB1c2goMCk7XHJcbiAgICBWMS5wdXNoKDApO1xyXG5cclxuICAgIFYxLnB1c2goUzEwKTtcclxuICAgIFYxLnB1c2goUzExKTtcclxuICAgIFYxLnB1c2goUzEyKTtcclxuICAgIFYxLnB1c2goMCk7XHJcbiAgICBWMS5wdXNoKDApO1xyXG4gICAgVjEucHVzaCgwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBWMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlY29JKCkge1xyXG4gIGxldCBTID0gW107XHJcbiAgbGV0IEEsIEIsIEMsIEQsIEU7XHJcblxyXG4gIGxldCBJID0gW1xyXG4gICAgMSwgMTgsIDE1LCAxLCAxNSwgNywgMSwgNywgNCwgMTMsIDQsIDcsIDEzLCA3LCAwLCAxMywgMCwgMTAsIDMsIDAsIDEwLCAzLFxyXG4gICAgMTAsIDEyLCAzLCAxMiwgNiwgMTIsIDYsIDksIDEyLCA5LCAyLCAxMiwgMiwgMTQsIDExLCAxNCwgMiwgMTEsIDIsIDUsIDExLCA1LFxyXG4gICAgOCwgOCwgMSwgNCwgOCwgNCwgMTMsIDgsIDEzLCAxMSwgMTEsIDE0LCAxMiwgMTEsIDEyLCAxMCwgMTEsIDEwLCAxMywgMCwgNyxcclxuICAgIDE1LCAwLCAxNSwgMTcsIDAsIDE3LCAzLCA2LCAzLCAxNywgNiwgMTcsIDE5LCA2LCAxOSwgOSwgMiwgOSwgMTksIDIsIDE5LCAxNixcclxuICAgIDIsIDE2LCA1LCAxLCA4LCA1LCAxLCA1LCAxNiwgMSwgMTYsIDE4LCAxOCwgMTYsIDE5LCAxOCwgMTksIDE3LCAxOCwgMTcsIDE1LFxyXG4gIF07XHJcbiAgbGV0IEkxTiA9IFtcclxuICAgIDEsIDE4LCAxNSwgNywgNCwgMTMsIDQsIDcsIDAsIDEwLCAzLCAwLCAxMCwgMTIsIDYsIDEyLCA2LCA5LCAyLCAxNCwgMTEsIDE0LFxyXG4gICAgMiwgNSwgOCwgOCwgMSwgNCwgMTMsIDExLCAxMSwgMTQsIDEyLCAxMCwgMTMsIDAsIDcsIDE1LCAxNywgMywgNiwgMywgMTcsIDE5LFxyXG4gICAgOSwgMiwgOSwgMTksIDE2LCA1LCAxLCA4LCA1LCAxNiwgMTgsIDE4LCAxNiwgMTksIDE3LCAxNSxcclxuICBdO1xyXG5cclxuICBsZXQgTmV3SSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwODsgaSsrKSBTW2ldID0gMDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA3MDsgaSArPSA1KSB7XHJcbiAgICBsZXQgUzEgPSBJMU5baV0sXHJcbiAgICAgIFMyID0gSTFOW2kgKyAxXSxcclxuICAgICAgUzMgPSBJMU5baSArIDJdLFxyXG4gICAgICBTNCA9IEkxTltpICsgM10sXHJcbiAgICAgIFM1ID0gSTFOW2kgKyA0XTtcclxuXHJcbiAgICBBID0gU1tTMV0rKztcclxuICAgIEIgPSBTW1MyXSsrO1xyXG4gICAgQyA9IFNbUzNdKys7XHJcbiAgICBEID0gU1tTNF0rKztcclxuICAgIEUgPSBTW1M1XSsrO1xyXG5cclxuICAgIFMxICo9IDM7XHJcbiAgICBTMiAqPSAzO1xyXG4gICAgUzMgKj0gMztcclxuICAgIFM0ICo9IDM7XHJcbiAgICBTNSAqPSAzO1xyXG5cclxuICAgIGlmIChBID09IDApO1xyXG4gICAgZWxzZSBpZiAoQSA9PSAxKSArK1MxO1xyXG4gICAgZWxzZSBpZiAoQSA9PSAyKSBTMSArPSAyO1xyXG5cclxuICAgIGlmIChCID09IDApO1xyXG4gICAgZWxzZSBpZiAoQiA9PSAxKSArK1MyO1xyXG4gICAgZWxzZSBpZiAoQiA9PSAyKSBTMiArPSAyO1xyXG5cclxuICAgIGlmIChDID09IDApO1xyXG4gICAgZWxzZSBpZiAoQyA9PSAxKSArK1MzO1xyXG4gICAgZWxzZSBpZiAoQyA9PSAyKSBTMyArPSAyO1xyXG5cclxuICAgIGlmIChEID09IDApO1xyXG4gICAgZWxzZSBpZiAoRCA9PSAxKSArK1M0O1xyXG4gICAgZWxzZSBpZiAoRCA9PSAyKSBTNCArPSAyO1xyXG5cclxuICAgIGlmIChFID09IDApO1xyXG4gICAgZWxzZSBpZiAoRSA9PSAxKSArK1M1O1xyXG4gICAgZWxzZSBpZiAoRSA9PSAyKSBTNSArPSAyO1xyXG5cclxuICAgIE5ld0kucHVzaChTMSk7XHJcbiAgICBOZXdJLnB1c2goUzIpO1xyXG4gICAgTmV3SS5wdXNoKFMzKTtcclxuICAgIE5ld0kucHVzaChTMSk7XHJcbiAgICBOZXdJLnB1c2goUzMpO1xyXG4gICAgTmV3SS5wdXNoKFM0KTtcclxuICAgIE5ld0kucHVzaChTMSk7XHJcbiAgICBOZXdJLnB1c2goUzQpO1xyXG4gICAgTmV3SS5wdXNoKFM1KTtcclxuICB9XHJcblxyXG4gIC8vZm9yIChsZXQgRWxlbSBvZiBJKSB7XHJcbiAgLy8gIGxldCBTMSA9IEVsZW0gKiAzO1xyXG5cclxuICAvLyAgIEEgPSBTW0VsZW1dKys7XHJcblxyXG4gIC8vICAgaWYgKEEgPT0gMCk7XHJcbiAgLy8gICBlbHNlIGlmIChBID09IDEpICsrUzE7XHJcbiAgLy8gICBlbHNlIGlmIChBID09IDIpIFMxICs9IDI7XHJcbiAgLy9cclxuICAvLyAgTmV3SS5wdXNoKFMxKTtcclxuICAvL31cclxuXHJcbiAgcmV0dXJuIE5ld0k7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXRyYVYoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIC0xLCAtMSwgLTEsIDAsIDAsIDAsIC0xLCAtMSwgLTEsIDAsIDAsIDAsIC0xLCAtMSwgLTEsIDAsIDAsIDAsIC0xLCAxLCAxLCAwLFxyXG4gICAgMCwgMCwgLTEsIDEsIDEsIDAsIDAsIDAsIC0xLCAxLCAxLCAwLCAwLCAwLCAxLCAxLCAtMSwgMCwgMCwgMCwgMSwgMSwgLTEsIDAsXHJcbiAgICAwLCAwLCAxLCAxLCAtMSwgMCwgMCwgMCwgMSwgLTEsIDEsIDAsIDAsIDAsIDEsIC0xLCAxLCAwLCAwLCAwLCAxLCAtMSwgMSwgMCxcclxuICAgIDAsIDAsXHJcbiAgXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRldHJhSSgpIHtcclxuICByZXR1cm4gWzAsIDMsIDksIDEsIDQsIDYsIDUsIDcsIDEwLCAyLCAxMSwgOF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPY3RhVigpIHtcclxuICByZXR1cm4gW1xyXG4gICAgMCwgLTEsIDAsIDAsIDAsIDAsIC0xLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCxcclxuXHJcbiAgICAwLCAtMSwgMCwgMCwgMCwgMCwgMCwgMCwgLTEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsXHJcblxyXG4gICAgMCwgLTEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsXHJcblxyXG4gICAgMCwgLTEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIC0xLCAwLCAwLCAwLCAwLCAwLFxyXG5cclxuICAgIDAsIDEsIDAsIDAsIDAsIDAsIC0xLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCxcclxuXHJcbiAgICAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAtMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCxcclxuXHJcbiAgICAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLFxyXG5cclxuICAgIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIC0xLCAwLCAwLCAwLCAwLCAwLFxyXG4gIF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPY3RhSSgpIHtcclxuICByZXR1cm4gW1xyXG4gICAgMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTksIDIwLFxyXG4gICAgMjEsIDIyLCAyMyxcclxuICBdO1xyXG59XHJcblxyXG4vLyBFbmQgb2YgJ3BsYXQuanMnIEZJTEVcclxuIiwiLy9cclxuLy8gYW5pbS5qc1xyXG4vL1xyXG4vLyAgICAgIENvcHlyaWdodCAoQykgQ0dTRyBvZiBQTUwzMC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy9cclxuLy8gQW5pbSBtb2R1bGUuXHJcbi8vXHJcblxyXG4vLyBJbXBvcnRcclxuaW1wb3J0ICogYXMgcm5kIGZyb20gXCIuL3JlbmRlci9ybmQuanNcIjtcclxuaW1wb3J0ICogYXMgaXBnbCBmcm9tIFwiLi8uLi9pbmNsdWRlcy5qc1wiO1xyXG5pbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuL3RpbWVyLmpzXCI7XHJcbmltcG9ydCB7IGdldERlY1YsIGdldERlY29JLCBnZXRJY29JIH0gZnJvbSBcIi4uL3V0aWxzL3BsYXQuanNcIjtcclxuLy9pbXBvcnQgeyBhbGxvd2VkTm9kZUVudmlyb25tZW50RmxhZ3MgfSBmcm9tIFwicHJvY2Vzc1wiO1xyXG5cclxuLy8gRXhwb3J0XHJcbmV4cG9ydCAqIGFzIHJuZCBmcm9tIFwiLi9yZW5kZXIvcm5kLmpzXCI7XHJcbmV4cG9ydCB7IFRpbWVyIH07XHJcblxyXG4vLyBEZWZhdWx0IGFuaW0gdmFyaWFibGVcclxuZXhwb3J0IGxldCBNYWluQW5pbTtcclxuXHJcbi8vIEFuaW0gY2xhc3NcclxuZXhwb3J0IGNsYXNzIEFuaW0ge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhc2lkKSB7XHJcbiAgICB0aGlzLnJuZCA9IG5ldyBybmQuUmVuZGVyKGNhbnZhc2lkKTtcclxuICAgIC8vdGhpcy5ybmQuZ2wuZGlzYWJsZSh0aGlzLnJuZC5nbC5CTEVORCk7XHJcbiAgICB0aGlzLnJuZC5nbC5lbmFibGUodGhpcy5ybmQuZ2wuREVQVEhfVEVTVCk7XHJcbiAgICB0aGlzLnRpbWVyID0gbmV3IFRpbWVyKCk7XHJcbiAgICAvL3RoaXMucm5kLmdsLnBvaW50U2l6ZSg1KTtcclxuICB9IC8vIEVuZCBvZiBjb25zdHJ1Y3RvclxyXG5cclxuICAvLyBBbmltIHJlbmRlciBmdW5jdGlvbi5cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLnJuZC5zdGFydCgpO1xyXG4gICAgdGhpcy5ybmQuZW5kKCk7XHJcbiAgICB0aGlzLnRpbWVyLnJlc3BvbnNlKCk7XHJcbiAgfSAvLyBFbmQgb2YgJ3JlbmRlcicgZnVuY3Rpb25cclxufSAvLyBFbmQgb2YgJ0FuaW0nIGNsYXNzXHJcblxyXG5sZXQgcHJpbSwgcHJpbTEsIHNoZCwgcHJpbTIsIHByaW0zLCBwcmltNDtcclxuXHJcbi8vIEluaXQgZGVmYXVsdCBhbmltXHJcbmV4cG9ydCBmdW5jdGlvbiBBbmltSW5pdCgpIHtcclxuICAvL2xldCBWID0gW1xyXG4gIC8vICAtMSwgLTEsIC0xLCAxLCA1LCAxLCAtMSwgMCwgMSwgMCwgMCwgMCwgMSwgLTEsIDEsIDAsIDAsIDAsIDEsIC0xLCAtMSwgMCwgMCxcclxuICAvLyAgMCwgLTEsIDEsIC0xLCAwLCAwLCAwLCAtMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgLTEsIDAsIDAsXHJcbiAgLy8gICAwLFxyXG4gIC8vXTtcclxuICAvL107XHJcblxyXG4gIGxldCBWID0gW1xyXG4gICAgLTEuMCwgLTEuMCwgLTEuMCwgMC4wLCAtMS4wLCAwLjAsIC0xLjAsIC0xLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAtMS4wLFxyXG4gICAgMS4wLCAwLjAsIC0xLjAsIDAuMCwgMS4wLCAtMS4wLCAtMS4wLCAwLjAsIC0xLjAsIDAuMCwgLTEuMCwgLTEuMCwgLTEuMCxcclxuICAgIC0xLjAsIDAuMCwgMC4wLCAtMS4wLCAxLjAsIC0xLjAsIDEuMCwgMC4wLCAwLjAsIC0xLjAsIDEuMCwgMS4wLCAtMS4wLCAwLjAsXHJcbiAgICAwLjAsIC0xLjAsIC0xLjAsIDEuMCwgLTEuMCwgMC4wLCAwLjAsIC0xLjAsIC0xLjAsIC0xLjAsIDAuMCwgMC4wLCAxLjAsIC0xLjAsXHJcbiAgICAxLjAsIC0xLjAsIDAuMCwgMC4wLCAtMS4wLCAxLjAsIDEuMCwgLTEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAtMS4wLCAtMS4wLFxyXG4gICAgMC4wLCAwLjAsIDEuMCwgLTEuMCwgLTEuMCwgMS4wLCAwLjAsIDAuMCwgLTEuMCwgMS4wLCAtMS4wLCAxLjAsIDAuMCwgMC4wLFxyXG4gICAgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgLTEuMCwgLTEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAtMS4wLCAxLjAsXHJcbiAgICAtMS4wLCAtMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIC0xLjAsIDEuMCwgLTEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsXHJcbiAgICAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgLTEuMCwgMS4wLCAwLjAsIDAuMCwgLTEuMCwgMS4wLCAtMS4wLCAwLjAsIC0xLjAsXHJcbiAgICAwLjAsIC0xLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIC0xLjAsIDAuMCwgMS4wLCAxLjAsXHJcbiAgICAtMS4wLCAwLjAsIC0xLjAsIDAuMCxcclxuICBdO1xyXG5cclxuICBsZXQgSSA9IFtcclxuICAgIDAsIDEsIDIsIDAsIDMsIDIsIDQsIDUsIDYsIDQsIDcsIDYsIDgsIDksIDEwLCA4LCAxMSwgMTAsIDEyLCAxMywgMTQsIDEyLCAxNSxcclxuICAgIDE0LCAxNiwgMTcsIDE4LCAxNiwgMTksIDE4LCAyMCwgMjEsIDIyLCAyMCwgMjMsIDIyLFxyXG4gIF07XHJcblxyXG4gIC8vbGV0IFYgPSBbXHJcbiAgLy8gIC0xLCAtMSwgLTEsIC0xLCAtMSwgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAtMSwgMSwgMSwgLTEsIDEsIDEsIC0xLCAtMSxcclxuICAvLyAgMSwgLTEsIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIC0xLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLFxyXG4gIC8vICAtMSwgMSwgMSwgLTEsXHJcbiAgLy9dO1xyXG4gIC8vbGV0IFYgPSBbLTEsIC0xLCAwLCAwLCAwLCAwLCAxLCAxLCAwLCAwLCAwLCAwLCAxLCAtMSwgMCwgMCwgMCwgMF07XHJcbiAgLy9sZXQgViA9IFtcclxuICAvLyAgLTEsIC0xLCAwLCAwLCAwLCAwLCAtMSwgMSwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMCwgMSwgLTEsIDAsIDAsIDAsIDAsXHJcbiAgLy9dO1xyXG4gIC8vL2xldCBWID0gWy0xLCAtMSwgMCwgMCwgMCwgMCwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XHJcbiAgLy9sZXQgSSA9IFswLCAxLCAyXTtcclxuXHJcbiAgLy9sZXQgViA9IFstMSwgLTEsIDAsIDEsIDEsIDAsIC0xLCAxLCAwXTtcclxuXHJcbiAgLy9sZXQgSSA9IFswLCAxLCAyLCAwLCAzLCAyXTtcclxuXHJcbiAgTWFpbkFuaW0gPSBuZXcgQW5pbShcIkFuaW1IYW5kbGVcIik7XHJcblxyXG4gIHNoZCA9IG5ldyBybmQucmVzLnNoZC5zaGFkZXIoTWFpbkFuaW0ucm5kLmdsKTtcclxuICBwcmltID0gbmV3IHJuZC5yZXMucHJpbS5QcmltKFxyXG4gICAgTWFpbkFuaW0ucm5kLmdsLFxyXG4gICAgXCJUcmltZXNoXCIsXHJcbiAgICBWLFxyXG4gICAgSSxcclxuICAgIE1haW5BbmltLnJuZC5zaGRwcmdcclxuICApO1xyXG4gIHByaW0xID0gbmV3IHJuZC5yZXMucHJpbS5QcmltKFxyXG4gICAgTWFpbkFuaW0ucm5kLmdsLFxyXG4gICAgXCJUcmltZXNoXCIsXHJcbiAgICBpcGdsLnBsYXQuZ2V0SWNvVigpLFxyXG4gICAgaXBnbC5wbGF0LmdldEljb0koKSxcclxuICAgIE1haW5BbmltLnJuZC5zaGRwcmdcclxuICApO1xyXG5cclxuICBsZXQgVlMgPSBuZXcgZ2V0RGVjVigpO1xyXG4gIGxldCBJUyA9IG5ldyBnZXREZWNvSSgpO1xyXG5cclxuICBsZXQgTE9MID0gbmV3IHJuZC5yZXMucHJpbS5QcmltKFxyXG4gICAgTWFpbkFuaW0ucm5kLmdsLFxyXG4gICAgXCJMb2xcIixcclxuICAgIG51bGwsXHJcbiAgICBudWxsLFxyXG4gICAgTWFpbkFuaW0ucm5kLnNoZHByZ1xyXG4gICk7XHJcbiAgTE9MLmF1dG9Ob3JtYWxzKFZTLCBJUywgNjAsIDEwOCk7XHJcblxyXG4gIHByaW0yID0gbmV3IHJuZC5yZXMucHJpbS5QcmltKFxyXG4gICAgTWFpbkFuaW0ucm5kLmdsLFxyXG4gICAgXCJUcmltZXNoXCIsXHJcbiAgICBWUyxcclxuICAgIElTLFxyXG4gICAgTWFpbkFuaW0ucm5kLnNoZHByZ1xyXG4gICk7XHJcblxyXG4gIGxldCBWU1MgPSBuZXcgaXBnbC5wbGF0LmdldFRldHJhVigpO1xyXG4gIGxldCBJU1MgPSBuZXcgaXBnbC5wbGF0LmdldFRldHJhSSgpO1xyXG5cclxuICBMT0wuYXV0b05vcm1hbHMoVlNTLCBJU1MsIDEyLCAxMik7XHJcblxyXG4gIHByaW0zID0gbmV3IHJuZC5yZXMucHJpbS5QcmltKFxyXG4gICAgTWFpbkFuaW0ucm5kLmdsLFxyXG4gICAgXCJUcmltZXNoXCIsXHJcbiAgICBWU1MsXHJcbiAgICBJU1MsXHJcbiAgICBNYWluQW5pbS5ybmQuc2hkcHJnXHJcbiAgKTtcclxuXHJcbiAgbGV0IFZTU1MgPSBuZXcgaXBnbC5wbGF0LmdldE9jdGFWKCk7XHJcbiAgbGV0IElTU1MgPSBuZXcgaXBnbC5wbGF0LmdldE9jdGFJKCk7XHJcblxyXG4gIExPTC5hdXRvTm9ybWFscyhWU1NTLCBJU1NTLCAyNCwgMjQpO1xyXG5cclxuICBsZXQgVlNEUyA9IFtcclxuICAgIC0xMDAsIDAsIC0xMDAsIDAsIDEsIDAsXHJcblxyXG4gICAgLTEwMCwgMCwgMTAwLCAwLCAxLCAwLFxyXG5cclxuICAgIDEwMCwgMCwgMTAwLCAwLCAxLCAwLFxyXG5cclxuICAgIDEwMCwgMCwgLTEwMCwgMCwgMSwgMCxcclxuICBdO1xyXG5cclxuICBsZXQgSVNEUyA9IFswLCAxLCAyLCAwLCAzLCAyXTtcclxuXHJcbiAgcHJpbTQgPSBuZXcgcm5kLnJlcy5wcmltLlByaW0oXHJcbiAgICBNYWluQW5pbS5ybmQuZ2wsXHJcbiAgICBcIlRyaW1lc2hcIixcclxuICAgIFZTRFMsXHJcbiAgICBJU0RTLFxyXG4gICAgTWFpbkFuaW0ucm5kLnNoZHByZ1xyXG4gICk7XHJcbn0gLy8gRW5kIG9mICdBbmltSW5pdCcgZnVuY3Rpb25cclxuXHJcbi8vIFJlbmRlciBkZWZhdWx0IGFuaW1cclxuZXhwb3J0IGZ1bmN0aW9uIEFuaW1SZW5kZXIoKSB7XHJcbiAgTWFpbkFuaW0ucmVuZGVyKCk7XHJcbiAgbGV0IG0gPSBpcGdsLm10aC5tYXQ0KCksXHJcbiAgICBtMSA9IGlwZ2wubXRoLm1hdDQoKSxcclxuICAgIG0yID0gaXBnbC5tdGgubWF0NCgpLFxyXG4gICAgbTQgPSBpcGdsLm10aC5tYXQ0KCksXHJcbiAgICBtNSA9IGlwZ2wubXRoLm1hdDQoKSxcclxuICAgIG03ID0gaXBnbC5tdGgubWF0NCgpLFxyXG4gICAgbTkgPSBpcGdsLm10aC5tYXQ0KCk7XHJcblxyXG4gIG00LnRyYW5zbGF0ZShpcGdsLm10aC52ZWMzKDEuNSwgMiwgLTIpKTtcclxuICBtNS5yb3RhdGUoTWFpbkFuaW0udGltZXIubG9jYWxUaW1lICogNTAsIGlwZ2wubXRoLnZlYzMoOCwgNCwgMikpO1xyXG4gIG0ucm90YXRlKE1haW5BbmltLnRpbWVyLmxvY2FsVGltZSAqIDUwLCBpcGdsLm10aC52ZWMzKDMsIDUsIDIpKTtcclxuICBtMS50cmFuc2xhdGUoaXBnbC5nZXR5cC5nZXRDb29yZGluYXRlcygpKTtcclxuICBtMi5yb3RhdGUoTWFpbkFuaW0udGltZXIubG9jYWxUaW1lICogNTAsIGlwZ2wubXRoLnZlYzMoMSwgNywgNCkpO1xyXG4gIGxldCBtMyA9IG0yLm11bChtMSk7XHJcbiAgbGV0IG02ID0gbTUubXVsKG00KTtcclxuICBtNy50cmFuc2xhdGUoaXBnbC5tdGgudmVjMygtNSwgLTEsIDApKTtcclxuICBsZXQgbTggPSBtNS5tdWwobTcpO1xyXG4gIG05LnRyYW5zbGF0ZShpcGdsLm10aC52ZWMzKC0zLCAtMywgMikpO1xyXG4gIGxldCBtMTAgPSBtLm11bChtOSk7XHJcblxyXG4gIHByaW0ucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtMywgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbiAgcHJpbTEucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtNiwgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbiAgcHJpbTIucHJpbURyYXcoTWFpbkFuaW0ucm5kLCBtLCBNYWluQW5pbS5ybmQuc2hhZGVyKTtcclxuICBwcmltMy5wcmltRHJhdyhNYWluQW5pbS5ybmQsIG04LCBNYWluQW5pbS5ybmQuc2hhZGVyKTtcclxuICBwcmltNC5wcmltRHJhdyhNYWluQW5pbS5ybmQsIGlwZ2wubXRoLm1hdDQoKSwgTWFpbkFuaW0ucm5kLnNoYWRlcik7XHJcbn0gLy8gRW5kIG9mICdBbmltUmVuZGVyJyBmdW5jdGlvblxyXG5cclxuLy8gRU5EIE9GICdhbmltLmpzJyBGSUxFXHJcbiIsIi8vXHJcbi8vIGdldHlwLmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTDMwLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vL1xyXG4vLyBHZXQgY29vcmRpbmF0ZXMgWSBtb2R1bGUuXHJcbi8vXHJcblxyXG5pbXBvcnQgKiBhcyBpcGdsIGZyb20gXCIuLi9pbmNsdWRlcy5qc1wiO1xyXG5cclxuLy8gZ2V0IGNvb3JkaW5hdGVzIGZ1bmN0aW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29yZGluYXRlcygpIHtcclxuICBsZXQgdmVjID0gaXBnbC5tdGgudmVjMyhpcGdsLmFuaW0uTWFpbkFuaW0ucm5kLmNhbURpcik7XHJcbiAgbGV0IGxvYyA9IGlwZ2wubXRoLnZlYzMoaXBnbC5hbmltLk1haW5BbmltLnJuZC5jYW1Mb2MpO1xyXG5cclxuICBpZiAodmVjLnkgPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICBsZXQgdmVjeCA9ICgtbG9jLnkgLyB2ZWMueSkgKiB2ZWMueCArIGxvYy54O1xyXG4gIGxldCB2ZWN6ID0gKC1sb2MueSAvIHZlYy55KSAqIHZlYy56ICsgbG9jLno7XHJcblxyXG4gIC8vY29uc29sZS5sb2codmVjeCk7XHJcbiAgLy9jb25zb2xlLmxvZyh2ZWN6KTtcclxuXHJcbiAgcmV0dXJuIGlwZ2wubXRoLnZlYzModmVjeCwgMCwgdmVjeik7XHJcbn0gLy8gRW5kIG9mICdnZXRDb29yZGluYXRlcycgZnVuY3Rpb25cclxuXHJcbi8vIEVORCBPRiAnZ2V0eXAuanMnIEZJTEVcclxuIiwiLy9cclxuLy8gaW5jbHVkZXMuanNcclxuLy9cclxuLy8gICAgICBDb3B5cmlnaHQgKEMpIENHU0cgb2YgUE1MMzAuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vXHJcbi8vIGJhc2UgaW5jbHVkZXMgb2YgcHJvamVjdC5cclxuLy9cclxuXHJcbi8qIEltcG9ydHMgKi9cclxuaW1wb3J0ICogYXMgbXRoIGZyb20gXCIuL210aC9tdGguanNcIjtcclxuaW1wb3J0ICogYXMgYW5pbSBmcm9tIFwiLi9hbmltL2FuaW0uanNcIjtcclxuaW1wb3J0ICogYXMgcGxhdCBmcm9tIFwiLi91dGlscy9wbGF0LmpzXCI7XHJcbmltcG9ydCAqIGFzIGdldHlwIGZyb20gXCIuL3V0aWxzL2dldHlwLmpzXCI7XHJcblxyXG4vKiBFeHBvcnRzICovXHJcbmV4cG9ydCAqIGFzIG10aCBmcm9tIFwiLi9tdGgvbXRoLmpzXCI7XHJcbmV4cG9ydCAqIGFzIGFuaW0gZnJvbSBcIi4vYW5pbS9hbmltLmpzXCI7XHJcbmV4cG9ydCAqIGFzIHBsYXQgZnJvbSBcIi4vdXRpbHMvcGxhdC5qc1wiO1xyXG5leHBvcnQgKiBhcyBnZXR5cCBmcm9tIFwiLi91dGlscy9nZXR5cC5qc1wiO1xyXG5cclxuLy8gRU5EIE9GICdpbmNsdWRlcy5qcycgRklMRVxyXG4iLCIvL1xyXG4vLyBtYWluLmpzXHJcbi8vXHJcbi8vICAgICAgQ29weXJpZ2h0IChDKSBDR1NHIG9mIFBNTDMwLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vL1xyXG4vLyBtYWluIGZpbGUgb2YgcHJvamVjdCAoZm9yIHJvbGx1cCBhbmQgaW5jbHVkZSB0byBodG1sKS5cclxuLy9cclxuLy8gW1BVQkxJQ11cclxuLy9cclxuXHJcbmltcG9ydCAqIGFzIGlwZ2wgZnJvbSBcIi4vc3JjL2luY2x1ZGVzLmpzXCI7XHJcbmV4cG9ydCAqIGFzIGlwZ2wgZnJvbSBcIi4vc3JjL2luY2x1ZGVzLmpzXCI7XHJcblxyXG4vLyBFeGVjdXRhYmxlIGNvZGVcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBpcGdsLmFuaW0uQW5pbUluaXQoKTtcclxuICBjb25zdCBSZW5kZXJpbmcgPSAoKSA9PiB7XHJcbiAgICAvLyBkcmF3aW5nXHJcbiAgICBpcGdsLmFuaW0uQW5pbVJlbmRlcigpO1xyXG4gICAgLy8gYW5pbWF0aW9uIHJlZ2lzdGVyXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFJlbmRlcmluZyk7XHJcbiAgfTtcclxuICBSZW5kZXJpbmcoKTtcclxuICAvLyBvbkNsaWNrQnV0dG9uKCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2tCdXR0b24oKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlJbnB1dFwiKTtcclxuICBjb25zb2xlLmxvZyhlbGVtZW50LnZhbHVlKTtcclxufVxyXG5cclxuLy93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQpID0+IHtcclxuLy8gIGlwZ2wub25DbGljayhldmVudCk7XHJcbi8vfSk7XHJcblxyXG4vL3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcclxuLy8gIGlwZ2wub25LZXlzKGV2ZW50KTtcclxuLy99KTtcclxuXHJcbi8vIEVORCBPRiAnbWFpbi5qcycgRklMRS5cclxuIl0sIm5hbWVzIjpbImlwZ2wubXRoLm1hdDQiLCJpcGdsLm10aC52ZWMzIiwiaXBnbC5tdGhcclxuICAgICAgICAudmVjMyIsInJlcy5zaGQuc2hhZGVyIiwicm5kLlJlbmRlciIsInJuZC5yZXMuc2hkLnNoYWRlciIsInJuZC5yZXMucHJpbS5QcmltIiwiaXBnbC5wbGF0LmdldEljb1YiLCJpcGdsLnBsYXQuZ2V0SWNvSSIsImlwZ2wucGxhdC5nZXRUZXRyYVYiLCJpcGdsLnBsYXQuZ2V0VGV0cmFJIiwiaXBnbC5wbGF0LmdldE9jdGFWIiwiaXBnbC5wbGF0LmdldE9jdGFJIiwiaXBnbC5nZXR5cC5nZXRDb29yZGluYXRlcyIsImlwZ2wuYW5pbS5NYWluQW5pbSIsImlwZ2wuYW5pbS5BbmltSW5pdCIsImlwZ2wuYW5pbS5BbmltUmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7RUFBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7RUFDTyxNQUFNLEtBQUssQ0FBQztFQUNuQjtFQUNBLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3ZCLElBQUksSUFB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LElBQUksQ0FBQyxLQUFLLFNBQVM7RUFDdkIsTUFBTSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDakMsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsR0FBRztFQUNSLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ2pDLEdBQUc7RUFDSDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzFCLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2xCLEtBQUs7RUFDTCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsU0FBUyxHQUFHO0VBQ2QsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1QyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDaEIsSUFBSSxJQUFJLENBQUM7RUFDVCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0U7RUFDQSxJQUFJLE9BQU8sSUFBSTtFQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pCLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqQixRQUFRLENBQUM7RUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakIsUUFBUSxDQUFDO0VBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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RyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDNUIsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztFQUM1QixPQUFPLENBQUM7RUFDUixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5QixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENB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QUFDO0VBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQzFCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDUixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRTtFQUNoQixJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSTtFQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNSLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJO0VBQ0osTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixRQUFRLFVBQVU7RUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsUUFBUSxVQUFVO0VBQ2xCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLFFBQVEsVUFBVTtFQUNsQixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixRQUFRLFVBQVU7RUFDbEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU07RUFDTixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsVUFBVSxHQUFHO0VBQ2YsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNCO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxVQUFVO0VBQ2pCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsVUFBVTtFQUNqQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLFVBQVU7RUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDNUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUk7RUFDakIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDeEIsTUFBTSxDQUFDLENBQUM7RUFDUixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzVCLE1BQU0sQ0FBQztFQUNQLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDUixHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzFCLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDO0VBQ1AsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3hCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN4QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDeEIsTUFBTSxDQUFDO0VBQ1AsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtFQUNyQixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDOUMsSUFBSSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQ25ELElBQUksTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNsRDtFQUNBLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ2pCLE1BQU0sS0FBSyxDQUFDLENBQUM7RUFDYixNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ1osTUFBTSxDQUFDO0VBQ1AsTUFBTSxLQUFLLENBQUMsQ0FBQztFQUNiLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDVixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDWixNQUFNLENBQUM7RUFDUCxNQUFNLEtBQUssQ0FBQyxDQUFDO0VBQ2IsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNaLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztFQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDbEIsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUNsQixNQUFNLENBQUM7RUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ1IsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLEdBQUc7RUFDWixJQUFJLE9BQU87RUFDWCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsSUFBSTtFQUNwQixFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFLEdBQUc7RUFDTCxFQUFFO0VBQ0YsRUFBRSxPQUFPLElBQUksS0FBSztFQUNsQixJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFDUCxJQUFJLEdBQUc7RUFD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R0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN2RSxRQUFRLEVBQUUsR0FBR0EsSUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbkUsUUFBUSxFQUFFLEdBQUdBLElBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25FLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyRDtFQUNBLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztFQUNuQjtFQUNBO0VBQ0EsUUFBUSxHQUFHLEdBQUcsQ0FBQztFQUNmLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNoQjtFQUNBO0VBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUI7RUFDQTtFQUNBLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVCO0VBQ0E7RUFDQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1QixLQUFLO0FBQ0w7RUFDQTtFQUNBLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDaEMsTUFBTSxJQUFJLENBQUMsR0FBR0MsSUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3ZELFNBQVMsU0FBUyxFQUFFLENBQUM7QUFDckI7RUFDQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QixLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBOzs7Ozs7Ozs7RUN2TUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtFQUNBO0VBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQztBQUNGO0VBQ0E7RUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUM7QUFDRjtFQUNBO0VBQ0EsU0FBUyxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUU7RUFDbEQsRUFBRSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzdDO0VBQ0EsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztFQUN4QyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENB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QUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN6RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDekUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUc7RUFDN0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDOUUsSUFBSSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUc7RUFDM0UsSUFBSSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRO0VBQ3RFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTztFQUNyRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRztFQUM1RSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUTtFQUN0RSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVE7RUFDckUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU87RUFDdEUsSUFBSSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHO0VBQzVFLElBQUksUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRO0VBQ3ZFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUTtFQUN6RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRO0VBQzFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUTtFQUMxRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3hFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3ZFLElBQUksUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRztFQUMxRSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUTtFQUN0RSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDdEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHO0VBQzlFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUTtFQUM3RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQzlFLElBQUksUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3ZFLElBQUksUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7RUFDdkUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQ3RFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTztFQUMzRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRztFQUM3RSxJQUFJLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRO0VBQ3JFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRO0VBQzFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU87RUFDdEUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUc7RUFDNUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRO0VBQzNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHO0VBQy9FLElBQUksUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUTtFQUMxRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU87RUFDM0UsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUc7RUFDM0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVE7RUFDeEUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHO0VBQ3RFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTztFQUNsRCxHQUFHLENBQUM7RUFDSixDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsT0FBTyxHQUFHO0VBQzFCLEVBQUUsT0FBTztFQUNULElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzVFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUM5RSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDOUUsSUFBSSxFQUFFO0VBQ04sR0FBRyxDQUFDO0VBQ0osQ0FBQztBQUNEO0VBQ0E7RUFDTyxTQUFTLE9BQU8sR0FBRztFQUMxQixFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7RUFDMUIsRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQzFCO0VBQ0EsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDZDtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ2xDLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQixJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9CLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDL0IsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNuQyxJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNuQyxJQUFJLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25DLElBQUksTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25DO0VBQ0EsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNuQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ25DLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkM7RUFDQSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDZixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZjtFQUNBLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNmLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNmO0VBQ0EsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqQixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2YsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLEVBQUUsQ0FBQztFQUNaLENBQUM7QUFDRDtFQUNPLFNBQVMsUUFBUSxHQUFHO0VBQzNCLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ2IsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFTcEIsRUFBRSxJQUFJLEdBQUcsR0FBRztFQUNaLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDL0UsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQzNELEdBQUcsQ0FBQztBQUNKO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEI7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QztFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ2xDLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNuQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNyQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNyQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNyQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RCO0VBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDaEI7RUFDQSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDWjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDaEIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QjtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLEdBQUc7QUFDSDtFQUNBO0VBQ0E7QUFDQTtFQUNBO0FBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtFQUNBLEVBQUUsT0FBTyxJQUFJLENBQUM7RUFDZCxDQUFDO0FBQ0Q7RUFDTyxTQUFTLFNBQVMsR0FBRztFQUM1QixFQUFFLE9BQU87RUFDVCxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUM5RSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0VBQzlFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDOUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNSLEdBQUcsQ0FBQztFQUNKLENBQUM7QUFDRDtFQUNPLFNBQVMsU0FBUyxHQUFHO0VBQzVCLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDaEQsQ0FBQztBQUNEO0VBQ08sU0FBUyxRQUFRLEdBQUc7RUFDM0IsRUFBRSxPQUFPO0VBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDM0Q7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDMUQ7RUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3pEO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzFEO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzFEO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN6RDtFQUNBLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3hEO0VBQ0EsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUN6RCxHQUFHLENBQUM7RUFDSixDQUFDO0FBQ0Q7RUFDTyxTQUFTLFFBQVEsR0FBRztFQUMzQixFQUFFLE9BQU87RUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUM1RSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNkLEdBQUcsQ0FBQztFQUNKLENBQUM7QUFDRDtFQUNBOzs7Ozs7Ozs7Ozs7OztFQ25QQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0FBV0E7RUFDQTtFQUNPLElBQUksUUFBUSxDQUFDO0FBQ3BCO0VBQ0E7RUFDTyxNQUFNLElBQUksQ0FBQztFQUNsQixFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUU7RUFDeEIsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUlJLE1BQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUN4QztFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0VBQzdCO0VBQ0EsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sR0FBRztFQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztFQUNyQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQzFCLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7QUFDRyxNQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFNLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07QUFDMUM7RUFDQTtFQUNPLFNBQVMsUUFBUSxHQUFHO0VBQzNCO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0EsRUFBRSxJQUFJLENBQUMsR0FBRztFQUNWLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztFQUMvRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRztFQUMxRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztFQUM3RSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7RUFDL0UsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUc7RUFDN0UsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQzVFLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUc7RUFDM0UsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQzVFLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRztFQUM1RSxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDL0UsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRztFQUN4QixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxDQUFDLEdBQUc7RUFDVixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQy9FLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN0RCxHQUFHLENBQUM7QUFDSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtFQUNBO0FBQ0E7RUFDQTtBQUNBO0VBQ0EsRUFBRSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEM7RUFDQSxFQUFRLElBQUlDLE1BQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRCxFQUFFLElBQUksR0FBRyxJQUFJQyxJQUFpQjtFQUM5QixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNuQixJQUFJLFNBQVM7RUFDYixJQUFJLENBQUM7RUFDTCxJQUFJLENBQUM7RUFDTCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTTtFQUN2QixHQUFHLENBQUM7RUFDSixFQUFFLEtBQUssR0FBRyxJQUFJQSxJQUFpQjtFQUMvQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNuQixJQUFJLFNBQVM7RUFDYixJQUFJQyxPQUFpQixFQUFFO0VBQ3ZCLElBQUlDLE9BQWlCLEVBQUU7RUFDdkIsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU07RUFDdkIsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7RUFDekIsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQzFCO0VBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJRixJQUFpQjtFQUNqQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNuQixJQUFJLEtBQUs7RUFDVCxJQUFJLElBQUk7RUFDUixJQUFJLElBQUk7RUFDUixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTTtFQUN2QixHQUFHLENBQUM7RUFDSixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkM7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJQSxJQUFpQjtFQUMvQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNuQixJQUFJLFNBQVM7RUFDYixJQUFJLEVBQUU7RUFDTixJQUFJLEVBQUU7RUFDTixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTTtFQUN2QixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSUcsU0FBbUIsRUFBRSxDQUFDO0VBQ3RDLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSUMsU0FBbUIsRUFBRSxDQUFDO0FBQ3RDO0VBQ0EsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDO0VBQ0EsRUFBRSxLQUFLLEdBQUcsSUFBSUosSUFBaUI7RUFDL0IsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDbkIsSUFBSSxTQUFTO0VBQ2IsSUFBSSxHQUFHO0VBQ1AsSUFBSSxHQUFHO0VBQ1AsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU07RUFDdkIsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksSUFBSSxHQUFHLElBQUlLLFFBQWtCLEVBQUUsQ0FBQztFQUN0QyxFQUFFLElBQUksSUFBSSxHQUFHLElBQUlDLFFBQWtCLEVBQUUsQ0FBQztBQUN0QztFQUNBLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN0QztFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUc7RUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDMUI7RUFDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3pCO0VBQ0EsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDeEI7RUFDQSxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ3pCLEdBQUcsQ0FBQztBQUNKO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxFQUFFLEtBQUssR0FBRyxJQUFJTixJQUFpQjtFQUMvQixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNuQixJQUFJLFNBQVM7RUFDYixJQUFJLElBQUk7RUFDUixJQUFJLElBQUk7RUFDUixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTTtFQUN2QixHQUFHLENBQUM7RUFDSixDQUFDO0FBQ0Q7RUFDQTtFQUNPLFNBQVMsVUFBVSxHQUFHO0VBQzdCLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ3BCLEVBQUUsSUFBSSxDQUFDLEdBQUdOLElBQWEsRUFBRTtFQUN6QixJQUFJLEVBQUUsR0FBR0EsSUFBYSxFQUFFO0VBQ3hCLElBQUksRUFBRSxHQUFHQSxJQUFhLEVBQUU7RUFDeEIsSUFBSSxFQUFFLEdBQUdBLElBQWEsRUFBRTtFQUN4QixJQUFJLEVBQUUsR0FBR0EsSUFBYSxFQUFFO0VBQ3hCLElBQUksRUFBRSxHQUFHQSxJQUFhLEVBQUU7RUFDeEIsSUFBSSxFQUFFLEdBQUdBLElBQWEsRUFBRSxDQUFDO0FBQ3pCO0VBQ0EsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDQyxJQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRUEsSUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxFQUFFQSxJQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQ1ksY0FBeUIsRUFBRSxDQUFDLENBQUM7RUFDNUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRVosSUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDdEIsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQ0EsSUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RCLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQ0EsSUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekMsRUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUN0QjtFQUNBLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3hELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3ZELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3hELEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFRCxJQUFhLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3JFLENBQUM7QUFDRDtFQUNBOzs7Ozs7Ozs7Ozs7RUNqTUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDQTtBQUVBO0VBQ0E7RUFDTyxTQUFTLGNBQWMsR0FBRztFQUNqQyxFQUFFLElBQUksR0FBRyxHQUFHQyxJQUFhLENBQUNhLFFBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ3pELEVBQUUsSUFBSSxHQUFHLEdBQUdiLElBQWEsQ0FBQ2EsUUFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekQ7RUFDQSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDL0I7RUFDQSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzlDLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUM7RUFDQTtFQUNBO0FBQ0E7RUFDQSxFQUFFLE9BQU9iLElBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3RDLENBQUM7QUFDRDtFQUNBOzs7Ozs7O0VDMUJBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7QUFZQTtFQUNBOzs7Ozs7Ozs7O0VDcEJBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNBO0FBR0E7RUFDQTtFQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTTtFQUN0QyxFQUFFYyxRQUFrQixFQUFFLENBQUM7RUFDdkIsRUFBRSxNQUFNLFNBQVMsR0FBRyxNQUFNO0VBQzFCO0VBQ0EsSUFBSUMsVUFBb0IsRUFBRSxDQUFDO0VBQzNCO0VBQ0EsSUFBSSxNQUFNLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDNUMsR0FBRyxDQUFDO0VBQ0osRUFBRSxTQUFTLEVBQUUsQ0FBQztFQUNkO0VBQ0EsQ0FBQyxDQUFDLENBQUM7QUFDSDtFQUNPLFNBQVMsYUFBYSxHQUFHO0VBQ2hDLEVBQUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUNyRCxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQzdCLENBQUM7QUFDRDtFQUNBO0VBQ0E7RUFDQTtBQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0E7RUFDQTs7Ozs7Ozs7Ozs7In0=
