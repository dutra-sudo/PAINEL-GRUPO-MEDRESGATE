var DOC_ID = '1e1oSIu8MU_RqMvdnv0h7iKjZZOxgwkdbycOd_5hf87I';

function doGet(e) {
  var doc = DocumentApp.openById(DOC_ID);
  var tables = doc.getBody().getTables();
  var processos = [];
  tables.forEach(function (table) {
    var text = table.getText().trim();
    if (text.length > 20) { processos.push(text); }
  });
  var payload = { updatedAt: new Date().toISOString(), processos: processos };
  var json = JSON.stringify(payload);
  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
