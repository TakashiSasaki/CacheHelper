function J(key){
	var assert = require("myassert");
  assert.isString(key);
  return "(" + key + ")";
}

function O(key, i){
	var assert = require("myassert");
  assert.isString(key);
  assert(i === undefined || typeof i === "string");
  if(i === undefined) return "{" + key + "}";
  return "{" + key + "}" + i;
}

function L(key, i){
	var assert = require("myassert");
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "[" + key + "]";
  return "[" + key + "]" + i;
}

function S(key, i) {  
	var assert = require("myassert");
  assert.isString(key);
  assert(i === undefined || typeof i === "number");
  if(i === undefined) return "$" + key + "$";
  return "$" + key + "$" + i;
}

function H(key) {  // generate hint-key
	var assert = require("myassert");
  assert.isString(key);
  return "#" + key + "#";
}

if(typeof exports === "undefined") exports = {};
exports.J = J;
exports.O = O;
exports.L = L;
exports.S = S;
exports.H = H;

