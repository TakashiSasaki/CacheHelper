/**
  @param {string} key
*/
function getObject_(key) {
  assert(typeof key === "string");

  var stringified = this.read("{" + key + "}", true);
  var properties = JSON.parse(stringified);
  assert(properties instanceof Array);

  var object = {};
  for(var i=0; i<properties.length; ++i) {
    assert(typeof properties[i] === "string");
    object[properties[i]] = this.get("{" + key + "}" + properties[i]);
  }

  return object;
}//getObject_

