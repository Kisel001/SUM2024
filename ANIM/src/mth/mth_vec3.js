//
// mth_vec3.js
//
//      Copyright (C) CGSG of PML 30. All rights reserved.
//
// Vector 3D part of mth library.
//

// Vector 3D class
export class _vec3 {
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
export function vec3(x, y, z) {
  return new _vec3(x, y, z);
} // End of 'vec3' function

// END OF 'mth_vec3.h' FILEs
