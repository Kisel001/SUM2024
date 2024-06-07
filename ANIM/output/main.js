(function (exports) {
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
      } else if (typeof x == Object) {
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
      return this.Vec3AddVec3(this.getNeg(v));
    } // End of 'sub' function

    // Dot 2 vectors
    dot(v) {
      if (v === undefined)
        return this.x * this.x + this.y * this.y + this.z * this.z;
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    // Get len of vector
    len() {
      return this.dot();
    } // End of 'len' function

    // Sub 2 vectors
    sub(v) {
      return vec3(
        this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x
      );
    } // End of 'sub' function

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
    }

    // Get vec nomrmalize
    getNormal() {
      let l = this.len;
      if (l == 0 || l == 1) return vec3(this);
      return this.div(l);
    }

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
      else if (typeof a00 == Object && a00.length == 16) this.a = new a00();
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
          this[0][1] * m.a[1][0] +
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
        s = sin(A),
        c = cos(A);
      let V = r.getNormal();
      this.a = mat4(
        c + V.X * V.X * (1 - c),
        V.X * V.Y * (1 - c) + V.Z * s,
        V.X * V.Z * (1 - c) - V.Y * s,
        0,
        V.Y * V.X * (1 - c) - V.Z * s,
        c + V.Y * V.Y * (1 - c),
        V.Y * V.Z * (1 - c) + V.X * s,
        0,
        V.Z * V.X * (1 - c) + V.Y * s,
        V.Z * V.Y * (1 - c) - V.X * s,
        c + V.Z * V.Z * (1 - c),
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
        +MatrDeterm3x3(
          M.A[1][1],
          M.A[1][2],
          M.A[1][3],
          M.A[2][1],
          M.A[2][2],
          M.A[2][3],
          M.A[3][1],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[1][0] =
        -MatrDeterm3x3(
          M.A[1][0],
          M.A[1][2],
          M.A[1][3],
          M.A[2][0],
          M.A[2][2],
          M.A[2][3],
          M.A[3][0],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[2][0] =
        +MatrDeterm3x3(
          M.A[1][0],
          M.A[1][1],
          M.A[1][3],
          M.A[2][0],
          M.A[2][1],
          M.A[2][3],
          M.A[3][0],
          M.A[3][1],
          M.A[3][3]
        ) / det;

      r.a[3][0] =
        -MatrDeterm3x3(
          M.A[1][0],
          M.A[1][1],
          M.A[1][2],
          M.A[2][0],
          M.A[2][1],
          M.A[2][2],
          M.A[3][0],
          M.A[3][1],
          M.A[3][2]
        ) / det;

      r.a[0][1] =
        -MatrDeterm3x3(
          M.A[0][1],
          M.A[0][2],
          M.A[0][3],
          M.A[2][1],
          M.A[2][2],
          M.A[2][3],
          M.A[3][1],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[1][1] =
        +MatrDeterm3x3(
          M.A[0][0],
          M.A[0][2],
          M.A[0][3],
          M.A[2][0],
          M.A[2][2],
          M.A[2][3],
          M.A[3][0],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[2][1] =
        -MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][3],
          M.A[2][0],
          M.A[2][1],
          M.A[2][3],
          M.A[3][0],
          M.A[3][1],
          M.A[3][3]
        ) / det;

      r.a[3][1] =
        +MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][2],
          M.A[2][0],
          M.A[2][1],
          M.A[2][2],
          M.A[3][0],
          M.A[3][1],
          M.A[3][2]
        ) / det;

      r.a[0][2] =
        +MatrDeterm3x3(
          M.A[0][1],
          M.A[0][2],
          M.A[0][3],
          M.A[1][1],
          M.A[1][2],
          M.A[1][3],
          M.A[3][1],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[1][2] =
        -MatrDeterm3x3(
          M.A[0][0],
          M.A[0][2],
          M.A[0][3],
          M.A[1][0],
          M.A[1][2],
          M.A[1][3],
          M.A[3][0],
          M.A[3][2],
          M.A[3][3]
        ) / det;

      r.a[2][2] =
        +MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][3],
          M.A[1][0],
          M.A[1][1],
          M.A[1][3],
          M.A[3][0],
          M.A[3][1],
          M.A[3][3]
        ) / det;

      r.a[3][2] =
        -MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][2],
          M.A[1][0],
          M.A[1][1],
          M.A[1][2],
          M.A[3][0],
          M.A[3][1],
          M.A[3][2]
        ) / det;

      r.a[0][3] =
        -MatrDeterm3x3(
          M.A[0][1],
          M.A[0][2],
          M.A[0][3],
          M.A[1][1],
          M.A[1][2],
          M.A[1][3],
          M.A[2][1],
          M.A[2][2],
          M.A[2][3]
        ) / det;

      r.a[1][3] =
        +MatrDeterm3x3(
          M.A[0][0],
          M.A[0][2],
          M.A[0][3],
          M.A[1][0],
          M.A[1][2],
          M.A[1][3],
          M.A[2][0],
          M.A[2][2],
          M.A[2][3]
        ) / det;

      r.a[2][3] =
        -MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][3],
          M.A[1][0],
          M.A[1][1],
          M.A[1][3],
          M.A[2][0],
          M.A[2][1],
          M.A[2][3]
        ) / det;

      r.a[3][3] =
        +MatrDeterm3x3(
          M.A[0][0],
          M.A[0][1],
          M.A[0][2],
          M.A[1][0],
          M.A[1][1],
          M.A[1][2],
          M.A[2][0],
          M.A[2][1],
          M.A[2][2]
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
    return new _mat4(arguments);
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
  class Vertex {
    constructor(p, t, n, c) {
      this.p = null;
      this.t = null;
      this.n = nu;
    }
  }

  // Primitive class
  class Prim {
    // Constructor
    constructor(gl, type, vertices, noofv, indices, noofi) {
      this.type = type;
      this.VA = gl.createVertexArray();

      if (vertices != null && noofv != 0) {
        gl.bindVertexArray(this.VA);
        this.VBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBuf);
        gl.bufferData(
          GL_ARRAY_BUFFER,
          sizeof(ip5VERTEX) * NoofV,
          V,
          GL_STATIC_DRAW
        );

        gl.vertexAttribPointer(0, 3, GL_FLOAT, FALSE, sizeof(ip5VERTEX), 0);
        gl.vertexAttribPointer(1, 2, GL_FLOAT, FALSE, sizeof(ip5VERTEX), 12);
        gl.vertexAttribPointer(2, 3, GL_FLOAT, FALSE, sizeof(ip5VERTEX), 20);
        gl.vertexAttribPointer(3, 4, GL_FLOAT, FALSE, sizeof(ip5VERTEX), 32);

        /* Enable necessary coordinates (Layout) */
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);

        gl.bindVertexArray(0);
      } else this.VBuf = 0;

      /* Set index data */
      if (indices != null && noofi != 0) {
        /* Create buffer with indexes */
        //glGenBuffers(1, &Pr->IBuf);
        /* Set active buffer with indexes */
        //glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, Pr->IBuf);
        /* Send data to GPU memory */
        //glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(INT) * NoofI, Ind, GL_STATIC_DRAW);
        /* Off buffer with indexes */
        //glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

        this.NumOfElements = NoofI;
      } else this.NumOfElements = NoofV;

      /* GetMinMaxBB */
      //IP5_RndPrimEvalBB(&Pr->MinBB, &Pr->MaxBB, V, NoofV);

      this.MtlNo = 0;
    } // End of contstructor

    // Evalutation bound box function
    evalBB() {} // End of 'evalBB' function
  }

  // END OF 'prim.js' FILE

  var prim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Prim: Prim,
    Vertex: Vertex
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
    prim: prim
  });

  //
  // rnd.js
  //
  //      Copyright (C) CGSG of PML30. All rights reserved.
  //
  // Render module.
  //


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
    } // End of constructor

    // Render start function
    start() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    } // End of 'start' function

    // Render end function
    end() {} // End of 'end' function
  } // End of 'Render' class

  // END OF 'rnd.js' FILE

  var rnd = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Render: Render,
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
    } // End of constructor

    // Anim render function.
    render() {
      this.rnd.start();
      this.rnd.end();
    } // End of 'render' function
  } // End of 'Anim' class

  // Init default anim
  function AnimInit() {
    MainAnim = new Anim("AnimHandle");
  } // End of 'AnimInit' function

  // Render default anim
  function AnimRender() {
    MainAnim.render();
  } // End of 'AnimRender' function

  // END OF 'anim.js' FILE

  var anim = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Anim: Anim,
    AnimInit: AnimInit,
    AnimRender: AnimRender,
    Timer: Timer,
    rnd: rnd
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
    mth: mth
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
  });

  //window.addEventListener("mousemove", (event) => {
  //  ipgl.onClick(event);
  //});

  //window.addEventListener("keydown", (event) => {
  //  ipgl.onKeys(event);
  //});

  // END OF 'main.js' FILE.

  exports.ipgl = ipgl;

  return exports;

})({});
