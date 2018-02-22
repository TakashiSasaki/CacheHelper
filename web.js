var maxAccessCount = 100;
var accessCountExpiresIn = 60;

function doGet(e) {
  var temporaryActiveUserKey = Session.getTemporaryActiveUserKey();
  if(typeof CacheService.getScriptCache().get(temporaryActiveUserKey) === "string"){
    var accessCount = parseInt(CacheService.getScriptCache().get(temporaryActiveUserKey));
    if(accessCount > maxAccessCount) {
      return ContentService.createTextOutput("Rate limit exceeded. " + accessCount);
    }
    CacheService.getScriptCache().put(temporaryActiveUserKey, "" + (accessCount + 1), accessCountExpiresIn);
  } else {
    CacheService.getScriptCache().put(temporaryActiveUserKey, "1", accessCountExpiresIn);
  }
  
  if(typeof e.parameter.clipboardId === "string") {
    var clipboardId = e.parameter.clipboardId;
    if(clipboardId.length == 24) {
      var contentTextOutput = ContentService.createTextOutput();
      contentTextOutput.setMimeType(ContentService.MimeType.JSON);
      contentTextOutput.setContent(JSON.stringify(get(clipboardId)));
      return contentTextOutput;
    } else {
      return ContentService.createTextOutput("clipboardId should be a string of 24 characters.");
    }
  }
  
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.js = getJsdoit("js");
  htmlTemplate.css = getJsdoit("css");
  htmlTemplate.html = getJsdoit("html");
  var htmlOutput = htmlTemplate.evaluate();
  return htmlOutput;
}

function doPost(e){
  Logger.log(e);
  return doGet(e);
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
