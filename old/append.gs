/**
  @param {Cache} cache
  @param {String} keyString
  @param {String} stringValue
  @returns {Integer} current sequence length
*/
function append(keyString, valueString){
  if(typeof keyString !== "string") throw new Error("keyString should be a string");
  if(typeof valueString !== "string") throw new Error("valueString should be a string");
  var nextNumber = getNextNumber_(keyString);
  cache.put(keyString + "-" + nextNumber, valueString, cacheTimeout);  
  setNextNumber_(keyString, nextNumber+1);
  return keyString + nextNumber;
}

/**
  @param {Cache} cache
  @param {String} keyString
  @param {String[]} stringArray
  @return {Integer} current sequence length
*/
function appendSequence(keyString, stringArray) {
  if(typeof keyString !== "string") throw new Error("keyString should be a string");
  if(typeof stringArray !== "object") throw new Error("stringValues should be an array");
  if(stringArray.length > 0) {
    if(typeof stringArray[0] !== "string") throw new Error("Each item in stringArray should be a string");
  }
  if(typeof keyString !== "string") throw new Error("keyString should be string");
  if(typeof stringArray !== "object") throw new Error("stringValuseList should be a list of strings");
  var kv = {};
  var nextNumber = getNextNumber_(keyString);
  for(var i=0; i<stringArray.length; ++i) {
    var key = keyString + "-" + (nextNumber + i);
    kv[key] = stringArray[i];
  }
  cache.putAll(kv, cacheTimeout);
  setNextNumber_(keyString, nextNumber + stringArray.length);
  return nextNumber + stringArray.length;
}


function testAppend(){
  var keyString = "abcdef";
  clear(keyString);
  setNextNumber_(keyString, 0);
  append(keyString, "hello1");
  append(keyString, "hello2");
  appendSequence(keyString, ["hello3", "hello4", "hello5"]);
  var retrievedObject = getSequence(keyString);
  if(JSON.stringify(retrievedObject) !== JSON.stringify(["hello1","hello2","hello3","hello4","hello5"])) {
    throw new Error("unexpected list is retrieved from cache.");
  }
  
  if(JSON.stringify(getSequence(keyString, 3, 3)) !== JSON.stringify(["hello4"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 3, 4)) !== JSON.stringify(["hello4", "hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 3, 5)) !== JSON.stringify(["hello4", "hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 3, 6)) !== JSON.stringify(["hello4", "hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 4, 3)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 4, 4)) !== JSON.stringify(["hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 4, 5)) !== JSON.stringify(["hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 4, 6)) !== JSON.stringify(["hello5"])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 5, 3)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 5, 4)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 5, 5)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 5, 6)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 6, 3)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 6, 4)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 6, 5)) !== JSON.stringify([])) throw new Error();
  if(JSON.stringify(getSequence(keyString, 6, 6)) !== JSON.stringify([])) throw new Error();
}
