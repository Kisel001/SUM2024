//
// mth_def.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Base definitions for mathematic module.
//

export { D2R, R2D };

// D2R function
function D2R(a) {
  return new Number((a * Math.PI) / 180);
} // End of 'D2R' function

// R2D function
function R2D(a) {
  return new Number((a * 180) / Math.PI);
}

// END OF 'mth_def.js' FILE
