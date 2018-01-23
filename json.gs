function putJson(key, any) {
  var jsonString = JSON.stringify(any);
  cache.put("(" + key + ")", jsonString);
}

/**
  @param {string} key
  @param {string} value optional
*/
function getJson(key, value){
  if(value === undefined) {
    value = cache.get("(" + key + ")");
  }
  return JSON.parse(value);
}
