assert= require("assert");

assert.isInstanceOf = function(actual, expect) {
  if(actual instanceof expect) return;
  assert.fail(actual.constructor.name. expect.constructor.name, "", "instanceof");
}

assert.isString = function(actual) {
  if(typeof actual === "string") return;
  assert.fail("" + actual + "is not a string.");
}

assert.isArray = function(actual){
  if(actual instanceof Array) return;
  assert.fail("" + actual + " is not an array.");
}

assert.isObject = function(actual) {
  if(actual === null) assert.fail("" + actual + " is null.");
  if(actual instanceof Array) assert.fail("" + actual + " is an array.");
  if(actual instanceof Object) return;
  assert.fail("" + actual + " is not an object.");
}

assert.isUndefined = function(actual) {
  if(typeof actual === "undefined") return;
  assert.fail("" + actual + " is not undefined.");
}

assert.isNotUndefined = function(actual) {
  if(typeof actual === "undefined") {
    assert.fail("" + actual + " is undefined.");
  }
}

assert.lengthOf = function(collection, expectedLength) {
  if(collection.length === expectedLength) return;
  assert.fail("The length of " + collection + " is not " + expectedLength +".");
}

assert.isInteger = function(x){
  if(typeof x !== "number") assert.fail("" + x + " is not an integer number.");
  if(x !== Math.floor(x)) assert.fail("" + x + " is not an integer number.");
  if(x !== Math.ceil(x)) assert.fail("" + x + " is not an integer number.");
}

assert.hasProperty = function(o, p){
  if(Object.keys(o).indexOf(p) < 0) assert.fail("Object " + o + " does not have property " + p + ".");
}

assert.isFunction = function(f) {
  if(typeof f === "function") return;
  assert.fail("" + f +" is not a function.");
}

assert.isPositiveInteger = function(x) {
  assert.isInteger(x);
  if(x <= 0) assert.fail("" + x + " is not a positive integer.");
}

if(typeof exports === "undefined") exports = {};
exports.assert = assert;
