if(typeof assert === "undefined") assert = require("myassert");

function getJson_(key){
  assert.lengthOf(arguments, 1);
  assert.isString(key);
  const stringified = this.read(J(key));
  const parsed = JSON.parse(stringified);
  assert(parsed === null || typeof parsed === "number" || typeof parsed === "boolean");
  return parsed;
}//getJson_

function putJson_(key, any) {
  assert.lengthOf(arguments, 2);
  assert.isString(key);
  assert.isNotUndefined(any);
  this.remove(key);
  const stringified = JSON.stringify(any);
  if(stringified.length > this.maxValueLength) throw "putJson_: stringified result is too long.";
  this.write(J(key), stringified);
}//putJson_

if(typeof exports === "undefined") exports = {};
exports.putJson_ = putJson_;
exports.getJson_ = getJson_;
