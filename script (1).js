function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Encabezados si está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha y Hora", "Nombre", "Numero de dia","Valor del Dolar" ]);
    }

    var nombre = (e && e.parameter && e.parameter.nombre) ? e.parameter.nombre : "";
    var Numerodedia = (e && e.parameter && e.parameter.Numerodedia) ? e.parameter.Numerodedia : "";
    var ValordelDolar = (e && e.parameter && e.parameter.ValordelDolar) ? e.parameter.ValordelDolar : "";
    

    sheet.appendRow([new Date(), nombre, Numerodedia,ValordelDolar]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);

  } finally {
    lock.releaseLock();
  }
}