const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { config } = require('../../config');

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../event-app-72617-7c6078650743.json'),
  projectId: 'event-app-72617',
});

function sendUploadToGCS(req, res, next) {
  if (!req.file) {
    return next();
  }
  const bucket = storage.bucket(config.googleCloudBucket);
  // storage.getBuckets().then(x => console.log(x))

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${config.googleCloudBucket}/${filename}`;
}

module.exports = {
  sendUploadToGCS,
  getPublicUrl,
};
