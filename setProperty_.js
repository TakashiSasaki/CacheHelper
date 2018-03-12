function setProperty_(key, property, value){
  assert.strictEqual(arguments.length, 3);
  assert.strictEqual(typeof key, "string");
  assert.strictEqual(typeof property, "string");
  assert(value !== undefined);
  var properties = JSON.parse(this.read(O(key)));
  assert(properties instanceof Array);
  this.put(O(key,property), value);
  if(properties.indexOf(property) < 0) {
    properties.push(property);
  }
  this.write(O(key), JSON.stringify(properties));
}//setProeprty_

if(typeof exports === "undefined") exports = {};
exports.setProperty_ = setProperty_;

