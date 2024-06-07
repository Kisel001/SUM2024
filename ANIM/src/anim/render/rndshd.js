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
}
