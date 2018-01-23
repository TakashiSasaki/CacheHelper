function putArray(key, array) {
  if(!(array instanceof Array)) throw "putArray: expects array";
  cache.put("[" + key + "]", array.length);
  for(var i=0; i<array.length; ++i) {
    put("[" + key + "]" + i, array[i]);
  }//for
}//putArray

/**
 * @param {stirng} key
 * @param {string} value, optional
 * @param {object} values, optional
 */
function getArray(key, value){
  if(value === undefined) {
    value = cache.get("[" + key + "]");
    if(value === null) throw "getArray: [" + key + "] not found";
  }
  var length = parseInt(value);
  var result = [];
  for(var i=0; i < length; ++i) {
    result.push(get("[" + key + "]" + i));
  }
  return result;
}//getArray

function appendArray(key, array) {
  if(typeof key !== "string") throw "appendArray: expects string key";
  if(!(array instanceof Array)) throw "appendArray: expects array value";
  var l = cache.get("[" + key + "]");
  if(l === null) throw "appendArray: key [" + key + "] not found";
  cache.put("[" + key + "]", parseInt(l) + array.length);
  for(var i=0; i<array.length; ++i) {
    put("[" + key + "]" + parseInt(l) + i, array[i]);
  }//for
}//appendArray

