/**
  @param {string} key
  @return {object}
*/
function getObject_(key) {
  assert.strictEqual(arguments.length,1);
  assert(typeof key === "string");

  var stringified = this.read(O(key));
  var properties = JSON.parse(stringified);
  assert(properties instanceof Array);

  var object = {};
  for(var i=0; i<properties.length; ++i) {
    assert(typeof properties[i] === "string");
    object[properties[i]] = this.get(O(key,properties[i]));
    assert(object[properties[i]] !== undefined);
  }
  
  assert.strictEqual(Object.keys(object).length, properties.length);
  
  return object;
}//getObject_

if(typeof exports === "undefined") exports = {};
exports.getObject_=getObject_;
