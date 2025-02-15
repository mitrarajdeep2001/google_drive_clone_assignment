
const fs = require("fs");
const path = require("path");
const File = require("../models/file");
const Folder = require("../models/folder");

// handles file upload
const uploadFile = async (req, res) => {
  try {
    let { folderId: folder } = req.body;
    const fileName = req.file.filename;
    const fileUrl = `/uploads/${fileName}`;

    let path = "Home";

    // If folderId is "root", set folder to null
    if (folder === "root") {
      folder = null;
    } else if (folder) {
      const parentFolder = await Folder.findById(folder);
      if (!parentFolder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      path = parentFolder.path;
    }

    // Save the file record in the database
    const newFile = new File({ name: fileName, folder, path, url: fileUrl });
    await newFile.save();

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};

// handles files retrieve
const getAllFiles = async (req, res) => {
  try {
    const folderId = req.params.folderId === "root" ? null : req.params.folderId;
    const files = await File.find({ folder: folderId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving files", error });
  }
}

// handles file deletion
const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the file in the database
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Get the file path on disk
    const filePath = path.join(__dirname, "..", file.url); // Adjust path to match "server/uploads/"

    // Delete the file from the uploads folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete the file record from the database
    await File.findByIdAndDelete(id);

    res.json({ message: "File deleted successfully", file });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error });
  }
};

module.exports = {uploadFile, getAllFiles, deleteFile};