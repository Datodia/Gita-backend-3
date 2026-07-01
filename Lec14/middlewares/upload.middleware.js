const multer = require("multer");

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WEBP images are allowed"), false);
  }
};

const storage = multer.memoryStorage();

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
