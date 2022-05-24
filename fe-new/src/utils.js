// import Convert from "convert-video";

const blobToFile = (blobURL, fileName) => {
  return new File([blobURL], fileName, {
    lastModified: new Date().getTime(),
    type: "video/mp4",
  });
};

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function convert(videoFileData, targetFormat = "mp4") {
  try {
    targetFormat = targetFormat.toLowerCase();
    let reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = function (event) {
        let contentType = "video/" + targetFormat;
        let data = event.target.result.split(",");
        let b64Data = data[1];
        let blob = getBlobFromBase64Data(b64Data, contentType);
        let blobUrl = URL.createObjectURL(blob);

        let convertedVideo = {
          name: videoFileData.name.substring(
            0,
            videoFileData.name.lastIndexOf(".")
          ),
          format: targetFormat,
          data: blobUrl,
        };
        // console.log("convertedVideo: ", convertedVideo);
        resolve(convertedVideo);
      };
      reader.readAsDataURL(videoFileData);
    });
  } catch (e) {
    console.log("Error occurred while converting : ", e);
  }
}

function getBlobFromBase64Data(b64Data, contentType, sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// const convertToMp4 = (video) => {
//     return Convert.convert(video, 'mp4')
// }

export {
  blobToFile,
  getBlobFromBase64Data,
  convert,
  formatBytes,
  // convertToMp4
};
