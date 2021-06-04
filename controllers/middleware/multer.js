const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  limits: {
    files: 1, // allow only 1 file per request
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

module.exports = upload;
