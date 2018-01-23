nMaxValueLength = 50000;

function putString(key, string) {
  var array = splitByLength(string, nMaxValueLength);
  cache.put("$" + key + "$", array.length);
  for(var i=0; i<array.length; ++i) {
    cache.put("$" + key + "$" + i, array[i]);
  }
}

function getString(key, value) {
  if(value === undefined) {
    value = cache.get("$" + key + "$");
    if(length === null) throw "getString: key $" + key + "$ not found.";
  }
  var length = parseInt(value);
  if(length == 0) return "";

  var keys = [];
  for(var i=0; i<length; ++i) {
    keys.push("$" + key + "$" + i);
  }
  
  var valueStrings = cache.getAll(keys);
  if(valueStrings === null) return null;
  var array = [];
  for(var i=0; i<length; ++i) {
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
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  putString("kkk", a);
  var b = getString("kkk");
  if(a !== b) throw "a !== b";
  putString("kk1", "");
  var c = getString("kk1");
  Logger.log(c);
  nMaxValueLength = nMaxValueLength_old;
}

