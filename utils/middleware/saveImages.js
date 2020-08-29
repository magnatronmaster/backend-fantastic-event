const { Storage } = require('@google-cloud/storage');
const boom = require('@hapi/boom');
const path = require('path');
const { config } = require('../../config');

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../event-0196dcad9f97.json'),
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
    next(boom.badRequest(err));
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
