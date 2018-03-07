function prefetch_(keys) {
  //if(typeof values === "undefined") values = {};
  if(!(keys instanceof Array)) throw "prefetch_: expects an array of string keys.";
  for(var i in keys) {
    if(typeof keys[i] !== "string") throw "prefetch_: expects a string key.";
    if(this.prefetched[keys[i]] === undefined) {
      var all = cache.getAll(keys);
      for(var j in all) {
        //if(got[j] === null) {
        //  console.log("prefetch_: missing key + " + j);
        //  continue; // for missing keys
        //}
        this.prefetched[j] = all[j];
      }//for j
    }//if
  }//for i
}//prefetch_

function prefetchAny_(keys) {
  if(!(keys instanceof Array)) throw "prefetchAny_: keys should be an array.";
  var bNeedToGet = false;
  for(var i in keys) {
    if(typeof values["$" + keys[i] + "$"] === "undefined" &&
        typeof values["(" + keys[i] + ")"] === "undefined" &&
        typeof values["{" + keys[i] + "}"] === "undefined" &&
        typeof values["[" + keys[i] + "]"] === "undefined") bNeedToGet = true;
  }//for i
  if(bNeedToGet == false) return values;
  var keysToGet = [];
  for(var j in keys) {
    if(typeof keys[j] !== "string") throw "prefetchAny_: key should be a strign.";
    keysToGet.push(keys[j]);
    keysToGet.push("$" + keys[j] + "$");
    keysToGet.push("$" + keys[j] + "$0");
    keysToGet.push("[" + keys[j] + "]");
    keysToGet.push("[" + keys[j] + "]0");
    keysToGet.push("{" + keys[j] + "}");
    keysToGet.push("(" + keys[j] + ")");
  }//for j
  Logger.log("prefetchAny_: keysToGet = " + keysToGet);
  this.prefetch(keysToGet);
}//prefetchAny_
