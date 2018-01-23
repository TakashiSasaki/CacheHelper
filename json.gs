function putJson(key, any) {
  var jsonString = JSON.stringify(any);
  cache.put("(" + key + ")", jsonString);
}

function getJson(key){
  return JSON.parse(cache.get("(" + key + ")"));
}
