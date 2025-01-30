/* import multer from "multer";

export const config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage:config });
 */
