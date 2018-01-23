nMaxValueLength = 50000;

function putString(key, string) {
  var array = splitByLength(string, nMaxValueLength);
  cache.put("$" + key + "$", array.length);
  for(var i=0; i<array.length; ++i) {
    cache.put("$" + key + "$" + i, array[i]);
  }
}

function getString(key) {
  var l = cache.get("$" + key + "$");
  if(l === null) throw "getString: key $" + key + "$ not found.";
  var keys = [];
  if(l == 0) return "";
  
  for(var i=0; i<l; ++i) {
    keys.push("$" + key + "$" + i);
  }
  
  var valueStrings = cache.getAll(keys);
  if(valueStrings === null) return null;
  var array = [];
  for(var i=0; i<l; ++i) {
    var s = valueStrings["$" + key + "$" + i];
    if(s === null) return null;
    array.push(s);
  } 
  return array.join("");
}

function splitByLength(string, length) {
  if(typeof string !== "string") throw "splitByLength: expects string";
  var array = [];
  for(var i=0; i<string.length; i+=length) {
    array.push(string.substr(i, length));
  }
  return array;
}

function testSplitByLength(){
  Logger.log(splitByLength("abcdefg", 3));
  Logger.log(splitByLength("", 4));
}

function testGetString(){
  var a = "aosifjdajasiopfjdsajioasfopsiadfsajasd:alnvuipaojvdaslfhuiaojask;fcmuioa:kscdasnpiuacjaso";
  nMaxValueLength = 10;
  putString("kkk", a);
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  putString("kk1", "");
  var c = getString("kk1");
  Logger.log(c);
}
