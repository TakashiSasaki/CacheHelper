putJsonCount = 0;
getJsonCount = 0;
getJsonPrefetchMissedCount = 0;
getJsonLongStringCount = 0;

/**
  @param {string} key
  @param {Any} any
  @return {object}
*/
function putJson(key, any) {
  putJsonCount += 1;
  var jsonString = JSON.stringify(any);
  var all = {"TO BE REMOVED": getDerivedKeys(key)};
  if(jsonString.length > nMaxValueLength){
    all["(" + key + ")"] = "LONG JSON STRING";
    merge(all, putString("(" + key + ")", jsonString));
  } else {
    all["(" + key + ")"] = jsonString;
  }
  return all;
}//putJson

/**
  @param {string} key
  @param {string} value optional
  @return {Array}
*/
function getJson(key, values){
  getJsonCount += 1;
  values = prefetchAny(values, [key]);
  //if(values === undefined) values = {};
  //if(values["(" + key + ")"] === undefined) {
  //  getJsonPrefetchMissedCount += 1;
  //  prefetchAny(values, [key]);
  //}
  if(values["(" + key + ")"] === "LONG JSON STRING") {
    getJsonLongStringCount += 1;
    var jsonString = getString("(" + key + ")", values);
    return JSON.parse(jsonString);
  } else {
    return JSON.parse(values["(" + key + ")"]);
  }
}//getJson

function resetJsonCount(){
  putJsonCount = 0;
  getJsonCount = 0;
  getJsonPrefetchMissedCount = 0;
  getJsonLongStringCount = 0;
}

function showJsonCount(){
  Logger.log("putJsonCount = " + putJsonCount);
  Logger.log("getJsonCount = " + getJsonCount);
  Logger.log("getJsonPrefetchMissedCount = " + getJsonPrefetchMissedCount);
  Logger.log("getJsonLongStringCount = " + getJsonLongStringCount);
}


function testJson(){
  Logger.log("testJson: begin");
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  var o = {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  };
  commit(putJson("k", o));
  var got = getJson("k");
  Logger.log(got);
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testJson: o != got.";
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testJson: end");
}

if(exports === undefined) exports = {};
exports.putJson  = putJson;
exports.getJson  = getJson;
exports.testJson = testJson;
exports.resetJsonCount = resetJsonCount;
exports.showJsonCount = showJsonCount;

