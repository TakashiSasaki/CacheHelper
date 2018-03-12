function H(key) {  // generate hint-key
  assert.isString(key);
  return "#" + key + "#";
}

if(typeof exports === "undefined") exports = {};
exports.H = H;


