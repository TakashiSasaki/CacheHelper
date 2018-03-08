/**
 * @param {string} key
 * @param {array} array
*/
function appendArray_(key, array) {
  assert(typeof key === "string");
  assert(array instanceof Array);
  var currentLength = parseInt(this.read(L(key)));
  assert(typeof currentLength === "number" && currentLength === Math.floor(currentLength) && Math.ceil(currentLength));
  this.write(L(key), "" + (currentLength + array.length));
  for(var i=0; i<array.length; ++i) {
    this.put(L(key, currentLength + i), array[i]);
  }//for i
}//appendArray
