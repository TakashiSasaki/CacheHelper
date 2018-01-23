function putJson(key, any) {
  var jsonString = JSON.stringify(any);
  var all = {};
  all["(" + key + ")"] = jsonString;
  //cache.put("(" + key + ")", jsonString);
  cache.putAll(all);
  return all;
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
