const multer = require('multer');
const { access, constants } = require('fs');
const { join } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDirectory = __basedir;
    const uploadDirectory = join(currentDirectory, '/files/');
    access(uploadDirectory, constants.W_OK, (err) => {
      if (err) {
        console.error(err);
        cb(err, null);
      }
    });
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bkth-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;