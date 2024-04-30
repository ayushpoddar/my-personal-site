const sharp = require('sharp');
const https = require('https');
const path = require('path');
const fs = require('fs')
const AWS = require('aws-sdk');

const cloudFrontBase = 'https://d32g573a6sduc5.cloudfront.net'

const main = () => {
  // Read file name from argv. First argument is the file path
  const pathOrUrl = process.argv[2];

  if (isValidHttpUrl(pathOrUrl)) {
    uploadableFile = resizeFromUrl(pathOrUrl, uploadToS3)
  } else if (isFilePath(pathOrUrl)) {
    uploadableFile = resizeFromFilePath(pathOrUrl, uploadToS3)
  } else {
    throw new Error('Invalid file path');
  }
}

const uploadToS3 = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })

  s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: `images/${filePath}`,
    Body: fileData,
  }, (err, _data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${cloudFrontBase}/images/${filePath}`)
    }
  })
}

const resizeFromFilePath = (filePath, callback) => {
  const destination = path.basename(filePath);
  const fileReader = fs.createReadStream(filePath)
  resizeStream(destination, callback)(fileReader)
}

const resizeFromUrl = (urlString, callback) => {
  const url = new URL(urlString);
  const destination = path.basename(url.pathname);
  https.get(urlString, resizeStream(destination, callback))
}

const resizeStream = (destination, callback) => {
  return (stream) => {
    const resizer = sharp().resize(700, 700, { fit: 'inside' })
    stream
      .pipe(resizer)
      .toFile(destination)
      .then(() => {
        callback(destination)
      })
  }
}

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const isFilePath = (str) => {
  try {
    fs.accessSync(str);
    return true;
  } catch (err) {
    return false;
  }
}

main()
