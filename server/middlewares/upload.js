const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory is created inside the "server" folder
const uploadDir = path.join(__dirname, "..", "uploads"); // Moves up one level to root of "server"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
