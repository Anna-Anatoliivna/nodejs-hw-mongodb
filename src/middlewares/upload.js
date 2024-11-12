import path from 'node:path';
import multer from 'multer';

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
  destination: function (req, file, cb) {
    cb(null, path.resolve("src", "tmp"));
  },
});

export const upload = multer({ storage });