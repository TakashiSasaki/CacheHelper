function extendObject_(key, object, overwrite){
  assert(object !== null);
  assert(!(object instanceof Array));
  assert(object instanceof Object);
  assert(typeof key === "string");
  if(this.readBuffer[O(key)] === undefined) throw "extendObject: " + key + " is not an object.";
  if(this.readBuffer[H(key)] !== undefined) throw "extendObject: " + key + " is a hint array.";
  if(this.readBuffer[J(key)] !== undefined) throw "extendObject: " + key + " is a JSON expression.";
  if(this.readBuffer[L(key)] !== undefined) throw "extendObject: " + key + " is a list.";
  if(this.readBuffer[S(key)] !== undefined) throw "extendObject: " + key + " is a string.";
  var keys = JSON.parse(this.readBuffer[O(key)]);
  assert(keys instanceof Array);
  for(var i in object) {
    assert(typeof i === "string");
    if(this.readBuffer[O(key,i)] === undefined){
      keys.push(i);
      this.put(O(key, i), object[i]);
    } else {
      if(overwrite === true) {
        this.put(O(key, i), object[i]);
      }
    }
  }
  this.readBuffer[O(key)] = JSON.stringify(keys);
  this.writeBuffer[O(key)] = JSON.stringify(keys)
}//appendObject_

function updateObject_(key, object) {
  this.extendObject(key, object, true);
}

if(typeof exports === "undefined") exports = {};
exports.extendObject_ = extendObject_;
exports.updateObject_ = updateObject_;
