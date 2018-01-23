/**
  @param {Cache} cache
  @param {Object} object
  @param {String} keyPropertyName
  @return {void}
*/
function stash(cache, object, keyPropertyName) {
  if(!isJavaObject_(cache)) cache = CacheService.getScriptCache();
  if(typeof object !== "object") throw new Error("object is expected as the first argument");
  if(typeof keyPropertyName !== "string") throw new Error("string is expected as the second argument");
  var keyString = object[keyPropertyName];
  put(cache, object, keyString);
  Property.hold(object, keyPropertyName);
}

function testStash_(){
  var o1 = {bbb: "2222", aaa:1111, ccc: null};
  var j1 = JSON.stringify(o1);
  stash(undefined, o1, "bbb");
  if(Object.keys(o1).length !== 1) throw new Error("o1 has two or more properties");
  if(Object.keys(o1)[0] !== "bbb") throw new Error('o1 does not have property "bbb"');
  unstash(undefined, o1);
  if(JSON.stringify(o1) !== j1) throw new Error();
}

/**
  @param {Cache} cache
  @param {Object} object
  @return {void}
*/
function unstash(cache, object) {
  if(!isJavaObject_(cache)) cache = CacheService.getScriptCache();
  var propertyNames = Object.keys(object);
  if(propertyNames.length !== 1) throw new Error("object to be unstashed should have only one property");
  var keyPropertyName = propertyNames[0];
  var keyString = object[keyPropertyName];
  if(typeof keyString !== "string") throw new Error("key property should have string value");
  var srcObject = get(cache, keyString);
  Property.copy(srcObject, object);
}
