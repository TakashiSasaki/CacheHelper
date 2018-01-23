/**
  @param {string} key
  @param {Any} any
  @return {object}
*/
function putJson(key, any) {
  var jsonString = JSON.stringify(any);
  var all = {};
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
  if(values === undefined) values = {};
  if(values["(" + key + ")"] === undefined) {
    merge(values, cache.getAll([ "(" + key + ")", "$(" + key + ")$" ]));
  }
  if(values["(" + key + ")"] === "LONG JSON STRING") {
    var jsonString = getString("(" + key + ")", values);
    return JSON.parse(jsonString);
  } else {
    return JSON.parse(values["(" + key + ")"]);
  }
}//getJson

function testJson(){
  var nMaxValueLength_old = nMaxValueLength;
  nMaxValueLength = 10;
  var o = {
    a: 1,
    b: null,
    c: "hello",
    d: "oajsfioajfisdajfasdjfdaajiosfpiohruiaghruipoajeofjrghriopajgrioahiogjopefjeriopajgekop:ajbuipagojerwasgbruipoa;jfvhraeuighrewgihuiopagrhj"
  };
  putJson("k", o, true);
  var got = getJson("k");
  Logger.log(got);
  if(JSON.stringify(o) !== JSON.stringify(got)) throw "testJson: o != got.";
  nMaxValueLength = nMaxValueLength_old;
}
