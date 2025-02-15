const express = require("express");
const { createFolder, getSubFolders, updateFolder, deleteFolder } = require("../controllers/folderControllers");
const protect = require("../middlewares/auth");

const router = express.Router();

// 📌 Create a New Folder
router.post("/", protect, createFolder);

// 📌 Get All Subfolders of a Parent
router.get("/:parentId", protect, getSubFolders);

// 📌 Update a Folder
router.put("/:folderId", protect, updateFolder);

// 📌 Delete a Folder
router.delete("/:folderId", protect, deleteFolder);

module.exports = router;
