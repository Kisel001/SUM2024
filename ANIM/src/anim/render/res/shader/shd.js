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

layout(location = 0) in vec3 InPosition;
layout(location = 1) in vec3 InNormal;

out vec4 DrawColor;   
out vec3 DrawNormal;
out vec3 DrawPosition; 

uniform mat4 MatrWVP;
uniform mat4 MatrWInv;
uniform mat4 MatrW;

void main( void )
{
  gl_Position = mat4(1.414, 0.0, -1.414, 0.0,
                     -0.816, 1.632, -0.816, 0.0,
                     //-0.816, 1.632, -0.816, 0.0,
                     -0.577, -0.577, -0.577, -8.8,
                     -0.577, -0.577, -0.577, -8.6) * vec4(InPosition, 1.0); 
                     
                     //gl_Position = //mat4(1.414, -0.816, -0.577, -0.577,
                //       0.0,  1.632, -0.577, -0.577,
                //    -1.414, -0.816, -0.577, -0.577,
                //      0.0,     0.0,   -8.8,   -8.6) * vec4(InPosition, 1.0);
  DrawColor = vec4(1.0, 1.0, 0.0, 1.0);
  DrawNormal = mat3(MatrWInv) * InNormal;
  DrawPosition = vec3(MatrW * vec4(InPosition, 1.0));
}
`;

// Text for default fragment shader
const deffstxt = `#version 300 es
precision highp float;
#line 37

in vec4 DrawColor;   
in vec3 DrawNormal;
in vec3 DrawPosition; 

out vec4 OutColor;

void main( void )
{
  OutColor = DrawColor;
}`;

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
export class _shader {
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
  } // End of constructor
} // End of 'Shader' class

// Get shader function
export function shader(gl) {
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
