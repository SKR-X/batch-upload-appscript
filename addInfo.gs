function addFileInfo(file,sheetId) {
  var fileInfo = file;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[sheetId];

  var newRow = [fileInfo.FileId, fileInfo.Owner, fileInfo.Filename, fileInfo.FileUrl, fileInfo.FileCreatedAt, fileInfo.CreatedAt, fileInfo.FileSize, fileInfo.FilePath];

  sheet.appendRow(newRow);
}

function addFilesInfo(files,sheetId) {
  for (var i = 0; i < files.length; i++) {
    addFileInfo(files[i],sheetId);
  }
}

function addTLDVFileInfo(file,sheetId) {
  var fileInfo = file;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheets()[sheetId];

  var newRow = [fileInfo.Url,fileInfo.MOCK];

  sheet.appendRow(newRow);
}

function addTLDVFilesInfo(files) {
  Logger.log('TLDV:' + files[0].Url);
  for (var i = 0; i < files.length; i++) {
    addTLDVFileInfo(files[i],2);
  }
}
