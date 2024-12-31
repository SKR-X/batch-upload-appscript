function getPropertyByName(key) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var propertyValue = scriptProperties.getProperty(key);
  return propertyValue;
}

function saveProperty(key, data) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, data);
}

function start() {
  var files = processFilesInBatches(getPropertyByName('folderId'))[0];
  if (files) {

    addFilesInfo(files.fileBatch, 0);

    //var mp3ConvertedFiles = getConvertedFiles(files); //converterApi.gs

    addFilesInfo(files.mp3Batch, 1);

    //var decodedMeetings = processFiles(mp3ConvertedFiles); //TLDVApi.gs

    addTLDVFilesInfo(files.TLDVBatch, 2); //addInfo.gs



    var lastFile = files.fileBatch[0];
    Logger.log(lastFile);
    var lastFileDate = lastFile.CreatedAt.toISOString();
    saveProperty('SHARED_FOLDER_LAST_CHECKED', lastFileDate);
  } else {
    saveProperty('SHARED_FOLDER_LAST_CHECKED', new Date().toISOString());
  }
  //getFilesModifiedTime();
}
