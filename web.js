function doGet() {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.js = getJsdoit("js");
  htmlTemplate.css = getJsdoit("css");
  htmlTemplate.html = getJsdoit("html");
  var htmlOutput = htmlTemplate.evaluate();
  return htmlOutput;
}


function getJsdoit(kind){
  var js = CacheService.getScriptCache().get(kind);
  if(typeof js === "string") {
    Logger.log(kind + " hit");
    return js;
  }
  js = UrlFetchApp.fetch("http://jsrun.it/TakashiSasaki/W5uj/"+kind).getContentText();
  CacheService.getScriptCache().put(kind, js, 10);
  return js;
}
