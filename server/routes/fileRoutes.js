const express = require("express");
const upload = require("../middlewares/upload");
const {uploadFile, getAllFiles, deleteFile} = require("../controllers/fileControllers");
const protect = require("../middlewares/auth");

const router = express.Router();

// 📌 Upload a File
router.post("/",protect, upload.single("file"), uploadFile);

// 📌 Get All Files in a Folder
router.get("/:folderId", protect, getAllFiles);

// 📌 Delete a File
router.delete("/:id", protect, deleteFile);


module.exports = router;
