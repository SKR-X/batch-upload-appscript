// function resetModifiedDate(fileId) {
//   var time = new Date().toISOString();
//   var newModifiedTime = time;
//   saveProperty('SHARED_FOLDER_LAST_CHECKED',time);
//   var url = "https://www.googleapis.com/drive/v3/files/" + fileId;
//   var params = {
//     method: "patch",
//     headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
//     payload: JSON.stringify({ modifiedTime: newModifiedTime }),
//     contentType: "application/json",
//   };
//   UrlFetchApp.fetch(url, params);
// }

function saveProperty(key, data) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, data);
}

const getQuery = () => {
  const mimeTypes = ['video', 'audio'];
  const lastCheckedDate = PropertiesService.getScriptProperties().getProperty('SHARED_FOLDER_LAST_CHECKED') || new Date().toISOString();
  Logger.log(`Last checked date: ${lastCheckedDate}`);
  const date = new Date(lastCheckedDate);
  const formattedLastCheckedDate = date.toISOString();
  const createdTimeQuery = `(modifiedDate > '${formattedLastCheckedDate}')`;
  const mimeTypesQuery = mimeTypes.map(type => `mimeType contains '${type}'`).join(' or ');
  return `(${mimeTypesQuery}) and ${createdTimeQuery}`;
};

function processFilesInBatches(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  var fileBatch = [];
  var mp3Batch = [];
  var TLDVBatch = [];

  const batchSize = getPropertyByName('batchSize');
  const query = getQuery();
  var files = folder.searchFiles(query);
  var k = 0;

  var allBatches = []; // Массив для хранения всех батчей

  while (files.hasNext()) {
    var file = getFileInfo(files.next());

    Logger.log(`New file! ${file.Filename} Last update: ${file.CreatedAt}`);

    fileBatch.push(file);
    Logger.log('File added');
    var cnv = convertAndUploadFile(file.FileId);
    mp3Batch.push(getFileInfo(cnv));
    Logger.log(getFileInfo(cnv));
    Logger.log('MP3 Converted');
    TLDVBatch.push(getResultOfTLDVDecoding(mp3Batch[k]));
    Logger.log('TLDV Converted');

    if (fileBatch.length === batchSize) {
      var currentBatch = {
        fileBatch: fileBatch,
        mp3Batch: mp3Batch,
        TLDVBatch: TLDVBatch
      };
      allBatches.push(currentBatch);

      return allBatches;
    }

    k++;
  }

  if (fileBatch.length > 0) {
    var currentBatch = {
      fileBatch: fileBatch,
      mp3Batch: mp3Batch,
      TLDVBatch: TLDVBatch
    };
    allBatches.push(currentBatch);
  }
