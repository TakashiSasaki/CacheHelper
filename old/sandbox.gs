/**
  don't user 'const' keyword in Google Apps Script.
*/
function testConst__(){
  for(var i=0; i<5; ++i) {
    const s = "hello " + i;
    Logger.log(s);
  }
}

/**
  trying to decode various strings which causes syntax error in JSON.decode.
*/
function testJsonRoundtrip__(a) {
  var json_string = JSON.stringify(a);
  CacheService.getScriptCache().put("jsonRoundtripTest", json_string);
  var json_string_2 = CacheService.getScriptCache().get("jsonRoundtripTest");
  try {
    var json_object = JSON.parse(json_string_2);
    return json_object;
    log("%s : %s : %s", json_string, json_string_2, json_object);
  } catch (e) {
    var errorMessage = e.message;
    return errorMessage;
    log("%s : %s : %s", json_string, json_string_2, e.message);  
  }
}

function testJsonRoundtrip__(){
  //saveSystemLogMessages();
  if(testJsonRoundtrip__(undefined) !== "Unexpected token: u") throw new Error();
  if(testJsonRoundtrip__("undefined") !== "undefined") throw new Error();
  if(testJsonRoundtrip__(null) !== null) throw new Error();
  if(testJsonRoundtrip__("null") !== "null") throw new Error();
  if(testJsonRoundtrip__("") !== "") throw new Error();
  if(testJsonRoundtrip__(1) != 1) throw new Error();
  if(testJsonRoundtrip__(1.234) != 1.234) throw new Error();
}

function testWhatIsByteArray__() {
  var byteArray = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, "こんにちは", Utilities.Charset.UTF_8);
  for(var i in byteArray) {
    if(0<=i && i<=15) {
      continue;
    } else {
      throw new Error();
    }
  }
  for(var i in byteArray.prototype){
    throw new Error();
  }

  var x = Utilities.base64Encode([-128,-128,-128,-128,-128,-128]);
  if(x !== "gICAgICA") throw new Error();

  var x = Utilities.base64Decode("gICAgICA");
  if(JSON.stringify(x) !== JSON.stringify([-128,-128,-128,-128,-128,-128])) throw new Error();

  var x = Utilities.base64Decode("////////");
  if(JSON.stringify(x) !== JSON.stringify([-1,-1,-1,-1,-1,-1])) throw new Error();
}

function testPutUndefined(){
  cache.putAll({a:undefined, b:null});
  var a = cache.get("a");
  Logger.log(a);
  Logger.log(typeof a);
  var b = cache.get("b");
  Logger.log(b);
  Logger.log(typeof b);
}
