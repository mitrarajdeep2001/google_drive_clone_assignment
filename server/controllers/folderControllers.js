const Folder = require("../models/folder");

// 📌 Create a New Folder
const createFolder = async (req, res) => {
  try {
    let { name, parentId } = req.body;

    // If parentId is "root", set it to null
    const parent = parentId === "root" ? null : parentId;

    let path = "Home";
    if (parent) {
      const parentFolder = await Folder.findById(parent);
      if (!parentFolder)
        return res.status(404).json({ message: "Parent folder not found" });
      path = `${parentFolder.path}/${name}`;
    } else {
      path = `Home/${name}`;
    }

    const newFolder = new Folder({ name, parent, path });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: "Error creating folder", error });
  }
};

// 📌 Get All Subfolders of a Parent
const getSubFolders = async (req, res) => {
  try {
    const parentId =
      req.params.parentId === "root" ? null : req.params.parentId;
    const folders = await Folder.find({ parent: parentId });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving folders", error });
  }
};

// 📌 Update a Folder
const updateFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const folder = await Folder.findByIdAndUpdate(
      folderId,
      { name: req.body.name },
      {
        new: true,
      }
    );
    res.json({ message: "Folder updated", folder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folder", error });
  }
};

// 📌 Delete a Folder
const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const folder = await Folder.findByIdAndDelete(folderId);
    res.json({ message: "Folder deleted", folder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folder", error });
  }
};

module.exports = {
  createFolder,
  getSubFolders,
  updateFolder,
  deleteFolder,
};
