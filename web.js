function doGet(e) {
  var hw = new HashWrapper();
  hw.put("abcabc", {"hello":123.456});
  hw.commit();
  assert.deepStrictEqual(hw.get("abcabc"), {"hello":123.456}); 
  var hw2 = new HashWrapper();
  hw2.put("defdef", {"hello2":456.789});
  assert.deepStrictEqual(hw2.get("abcabc"), {"hello":123.456});
  assert.deepStrictEqual(hw2.get("defdef"), {"hello2":456.789}); 
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.js = getJsdoit("js");
  htmlTemplate.css = getJsdoit("css");
  htmlTemplate.html = getJsdoit("html");
  var htmlOutput = htmlTemplate.evaluate();
  return htmlOutput;
}


function getJsdoit(kind){
  var text = CacheService.getScriptCache().get("jsdoit-" + kind);
  if(typeof text === "string") {
    Logger.log(kind + " hit");
    return text;
  }
  var text = UrlFetchApp.fetch("http://jsrun.it/TakashiSasaki/W5uj/"+kind, {"validateHttpsCertificates" : false}).getContentText();
  CacheService.getScriptCache().put("jsdoit-" + kind, text, 10);
  return text;
}


function get(keyString){
  var hw = new HashWrapper();
  assert.strictEqual(typeof keyString, "string");
  return hw.get(keyString);
}

function put(keyString, value){
  var hw = new HashWrapper();
  assert.strictEqual(typeof keyString, "string");
  hw.put(keyString, value);
  hw.commit();
  assert.deepStrictEqual(hw.get(keyString), value);
}
