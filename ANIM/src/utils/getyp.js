//
// getyp.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Get coordinates Y module.
//

import * as ipgl from "../includes.js";

// get coordinates function
export function getCoordinates() {
  let vec = ipgl.mth.vec3(ipgl.anim.MainAnim.rnd.camDir);
  let loc = ipgl.mth.vec3(ipgl.anim.MainAnim.rnd.camLoc);

  if (vec.y === 0) return null;

  let vecx = (-loc.y / vec.y) * vec.x + loc.x;
  let vecz = (-loc.y / vec.y) * vec.z + loc.z;

  //console.log(vecx);
  //console.log(vecz);

  return ipgl.mth.vec3(vecx, 0, vecz);
} // End of 'getCoordinates' function

// END OF 'getyp.js' FILE
