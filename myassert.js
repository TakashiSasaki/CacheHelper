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




