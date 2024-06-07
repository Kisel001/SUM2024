//
// prim.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Primitive module.
//

import * as ipgl from "../../../../includes";

// Vertex class
export class Vertex {
  constructor(p, t, n, c) {
    this.p = null;
    this.t = null;
    this.n = nu;
  }
}

// Primitive class
export class Prim {
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
