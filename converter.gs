function getConvertedFiles(files) {
  var fileBatch = [];
  var mock = [];
  for (var i = 0; i < files.length; i++) {
    var fileInfo = getFileInfo(convertAndUploadFile(files[i].FileId));
    fileBatch.push(fileInfo);
    //---------------
    mock.push(fileInfo);
  }

  //return fileBatch;

  return mock;
}

function convertAndUploadFile(fileId) {
  var sourceId = PropertiesService.getScriptProperties().getProperty('bufferId');
  return copyFileToNewFolderMp3(fileId,sourceId);

  // Настоящая обработка
  // Получаем файл из Google Drive
  var file = DriveApp.getFileById(fileId);
  var fileBlob = file.getBlob();

  // URL внешнего сервиса для конвертации
  var conversionServiceUrl = 'https://example.com/convert';

  // Отправляем файл на внешний сервис для конвертации
  var response = UrlFetchApp.fetch(conversionServiceUrl, {
    method: 'post',
    payload: fileBlob,
    contentType: file.getMimeType(),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() === 200) {
    // Получаем конвертированный файл
    var convertedBlob = response.getBlob();

    var folderId = getPropertyByName('bufferId');
    var folder = DriveApp.getFolderById(folderId);

    // Создаем новый файл на Google Drive в буффере
    var id = "id" + Math.random().toString(16).slice(2);
    var newFile = DriveApp.createFile(convertedBlob.setName(id + '.mp3'));

    folder.createFile(newFile);

    return newFile;
  } else {
    Logger.log('Conversion failed: ' + response.getContentText());
    return null;
  }
}
