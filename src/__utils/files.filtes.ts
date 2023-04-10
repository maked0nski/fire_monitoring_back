import {extname} from "path";

export const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = "You can upload only image files";
    return cb(null, false, req.fileValidationError);
  }
  cb(null, true);
};

export const pdfFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    req.fileValidationError = "You can upload only PDF files";
    return cb(null, false, req.fileValidationError);
  }
  cb(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const dateNow = new Date().toISOString().replace(/:/g, "-");
  const randomName = Math.round(Math.random() * 1e9);
  callback(null, `${name}-${dateNow}-${randomName}${fileExtName}`);
};