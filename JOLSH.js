if(typeof assert === "undefined") assert = require("myassert");

function J(key){
  assert.isString(key);
  return "(" + key + ")";
}

function O(key, i){
  assert.isString(key);
  assert(i === undefined || typeof i === "string");
  if(i === undefined) return "{" + key + "}";
  return "{" + key + "}" + i;
}

function L(key, i){
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "[" + key + "]";
  return "[" + key + "]" + i;
}

function S(key, i) {  
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "$" + key + "$";
  return "$" + key + "$" + i;
}

function H(key) {  // generate hint-key
  assert.isString(key);
  return "#" + key + "#";
}

if(typeof exports === "undefined") exports = {};
exports.J = J;
exports.O = O;
exports.L = L;
exports.S = S;
exports.H = H;

