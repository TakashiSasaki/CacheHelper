function setProperty_(key, property, value){
  assert.lengthOf(arguments, 3);
  assert.isString(key);
  assert.isString(property);
  assert.isNotUndefined(value);
  var properties = JSON.parse(this.read(O(key)));
  assert.isArray(properties);
  this.put(O(key,property), value);
  if(properties.indexOf(property) < 0) {
    properties.push(property);
  }
  this.write(O(key), JSON.stringify(properties));
}//setProeprty_

if(typeof exports === "undefined") exports = {};
exports.setProperty_ = setProperty_;

