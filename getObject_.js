/**
  @param {string} key
  @return {object}
*/
function getObject_(key) {
  assert.strictEqual(arguments.length, 1);
  assert.isString(key);

  var stringified = this.read(O(key));
  var properties = JSON.parse(stringified);
  assert.isArray(properties);

  var object = {};
  for(var i=0; i<properties.length; ++i) {
    assert.isString(properties[i]);
    object[properties[i]] = this.get(O(key,properties[i]));
    assert(object[properties[i]] !== undefined);
  }//for i
  
  assert.strictEqual(Object.keys(object).length, properties.length);
  
  return object;
}//getObject_

if(typeof exports === "undefined") exports = {};
exports.getObject_  = getObject_;

