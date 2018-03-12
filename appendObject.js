function appendObject_(key, object){
  assert(object !== null);
  assert(!(object instanceof Array));
  assert(object instanceof Object);
  assert(typeof key === "string");
  assert(this.readBuffer[H(key)] === undefined);
  assert(this.readBuffer[S(key)] === undefined);
  assert(this.readBuffer[J(key)] === undefined);
  assert(this.readBuffer[L(key)] === undefined);
  if(this.readBuffer[O(key)] === undefined) {
    this.putObject(key, object);
  } else {
    for(var i in object) {
      this.appendObject(O(key, i), object[i]);
    }//for i
  }//if
}//appendObject_

if(typeof exports === "undefined") exports = {};
exports.appendObject_ = appendObject_;

