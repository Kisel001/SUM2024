//
// prim.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Primitive module.
//

import * as ipgl from "../../../../includes";

// Vertex class
export class _Vertex {
  // Constructor
  constructor(p, n) {
    this.v = [p.x, p.y, p.z, n.x, n.y, n.z];
  } // End of constructor
} // End of '_Vertex' class

// Get object vertex
function _GetObjVertex(v) {
  return { p: [v[0], v[1], v[2]], n: [n[0], n[1], n[2]] };
} // End of '_GetObjVertex' function

// Get new object vertex
function GetObjVertex(v) {
  return new _GetObjVertex(v);
} // End of 'GetObjVertex' function

// Get vertex function
export function Vertex(p, n) {
  return new _Vertex(p, n);
} // End of 'Vertex' function

// Primitive class
export class Prim {
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
    let loc;
    const glPrimType = this.type == "Trimesh" ? gl.TRIANGLES : gl.POINTS;
    const w = ipgl.mth.mat4(matr),
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
      const p0 = ipgl.mth.vec3(V[6 * n0], V[6 * n0 + 1], V[6 * n0 + 2]),
        p1 = ipgl.mth.vec3(V[6 * n1], V[6 * n1 + 1], V[6 * n1 + 2]),
        p2 = ipgl.mth.vec3(V[6 * n2], V[6 * n2 + 1], V[6 * n2 + 2]),
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
      let N = ipgl.mth
        .vec3(V[6 * i + 3], V[6 * i + 4], V[6 * i + 5])
        .getNormal();

      V[6 * i + 3] = N.x;
      V[6 * i + 4] = N.y;
      V[6 * i + 5] = N.z;
    }
  } // End of 'autoNormals' function
}

// END OF 'prim.js' FILE
