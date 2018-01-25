/**
  @param {String} keyString
  @param {String[]} a list of strings
  @return {void}
*/
function putSequence(keyString, stringArray){
  if(typeof keyString !== "string") throw new Error("keyString should be string.");
  if(!stringArray instanceof Array) throw new Error("stringArray should be an instance of Array.");
  clear(cache, keyString);
  setNextNumber_(keyString, 0);
  appendSequence(keyString, stringArray);
}

/**
  @param {String} keyString
  @param {Integer=} beginIndex 0-origin
  @param {Integer=} endIndex 0-origin
  @returns {String[]} values
*/
function getSequence(keyString, beginIndex, endIndex) {
  if(typeof keyString !== "string") throw new Error("keyString is expected to be a string");
  if(beginIndex === undefined) {
    beginIndex = 0;
  } else {
    beginIndex = Math.max(0, beginIndex);
  }
  var nextNumber = getNextNumber_(keyString);
  if(endIndex === undefined) {
    var  endNextIndex = nextNumber;  
  } else {
    var  endNextIndex = Math.min(nextNumber, endIndex + 1);
  }
  var keys = [];
  for(var i=beginIndex; i<endNextIndex; ++i) {
    var key = keyString + "-" + i;
    keys.push(key);
  }
  var kv = cache.getAll(keys);
  for(var i in kv) {
    if(kv[i] === null) {
      throw new Error("can't get value for key " + i);
    }
  }
  cache.putAll(kv, cacheTimeout); //refresh
  var values = [];
  for(var i=0; i<nextNumber; ++i) {
    var value = kv[keys[i]];
    if(value===undefined) break;
    values.push(kv[keys[i]]);
  }
  return values;
}
