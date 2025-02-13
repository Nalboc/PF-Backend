import multer from "multer";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

export const config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _dirname + "/public/image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: config });
