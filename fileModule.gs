// function getPublicUrl(fileId) {
//   // Получаем файл по его ID
//   var file = DriveApp.getFileById(fileId);

//   // Делаем файл доступным для всех
//   file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

//   // Получаем URL файла
//   var fileUrl = file.getUrl();

//   // Преобразуем URL в публичный URL
//   var publicUrl = fileUrl.replace('/file/d/', '/uc?export=download&id=').replace('/view?usp=sharing', '');

//   // Возвращаем публичный URL
//   return publicUrl;
// }

function getFileInfo(file) {
  var fileInfo = {
    FileId: file.getId(),
    Owner: file.getOwner().getEmail(),
    Filename: file.getName(),
    FileUrl: file.getUrl(),
    FileCreatedAt: file.getDateCreated(),
    CreatedAt: file.getLastUpdated(),
    FileSize: file.getSize(),
    FilePath: file.getParents().next().getName()
  };
  return fileInfo;
}


//для отладки
function getFilesModifiedTime() {
  var folderId = getPropertyByName('folderId');
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    var lastModified = file.getLastUpdated().toISOString();
    Logger.log('File: ' + file.getName() + ', Last modified: ' + lastModified);
  }
}

//имитация
function copyFileToNewFolderMp3(sourceFileId, newFolderId) {
  try {
    // Get the source file by ID
    var sourceFile = DriveApp.getFileById(sourceFileId);

    // Create a copy of the file
    var copiedFile = sourceFile.makeCopy();

    // Get the new folder by ID
    var newFolder = DriveApp.getFolderById(newFolderId);

    // Move the copied file to the new folder
    var newFile = DriveApp.getFileById(copiedFile.getId());
    newFolder.addFile(newFile);

    // Rename the copied file
    var id = "id" + Math.random().toString(16).slice(2);
    newFile.setName(id + '.mp3');
    Logger.log('File copied and renamed successfully.');
    return newFile;
  } catch (error) {
    Logger.log('Error copying and renaming file: ' + error.toString());
  }
}
