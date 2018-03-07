/**
 * @param {string} key
 * @param {array} array
 * @return {object}
*/
function appendArray(key, array) {
  if(typeof key !== "string") throw "appendArray: expects string key";
  if(!(array instanceof Array)) throw "appendArray: expects array value";
  var l = cache.get("[" + key + "]");
  if(l === null) throw "appendArray: key [" + key + "] not found";
  var all = {};
  all["[" + key + "]"] = "" + (parseInt(l) + array.length);
  for(var i=0; i<array.length; ++i) {
    merge_(all, putAny("[" + key + "]" + (parseInt(l) + i), array[i]));
  }//for
  if(typeof all["TO BE REMOVED"] !== "undefined") {
    cache.removeAll(all["TO BE REMOVED"]);
    delete all["TO BE REMOVED"];
  }
  cache.putAll(all);
}//appendArray
