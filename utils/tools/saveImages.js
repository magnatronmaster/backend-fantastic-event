const multer  = require('multer');

const upload = multer({
  dest: 'public/files/',
})

module.exports = { upload };
