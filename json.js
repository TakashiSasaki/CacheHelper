putJsonCount = 0;
getJsonCount = 0;
getJsonLongStringCount = 0;

function resetJsonCount_(){
  putJsonCount = 0;
  getJsonCount = 0;
  getJsonLongStringCount = 0;
}

function showJsonCount_(){
  Logger.log("putJsonCount = " + putJsonCount);
  Logger.log("getJsonCount = " + getJsonCount);
  Logger.log("getJsonLongStringCount = " + getJsonLongStringCount);
}


function testJson_(){
  Logger.log("testJson: begin");
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  var o = {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  };
  put("k", o);
  var got = get("k");
  Logger.log(got);
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testJson: o != got.";
  nMaxValueLength = nMaxValueLength_old;
  Logger.log("testJson: end");
}

if(exports === undefined) exports = {};
exports.putJson  = putJson_;
exports.getJson  = getJson_;
exports.testJson = testJson_;
exports.resetJsonCount = resetJsonCount_;
exports.showJsonCount = showJsonCount_;

if(typeof process !== "undefined") {
  global.nMaxValueLength = require("./string.js").nMaxValueLength;
}

