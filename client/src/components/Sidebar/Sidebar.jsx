import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import {
  addFolderAsync,
  uploadFileAsync,
} from "../../redux/slices/folderSlice";

import "./Sidebar.css";
import Modal from "../Modal/Modal";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const currentFolderId = useSelector((state) => state.folder.currentFolderId);

  const handleCreateFolder = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFolderName("");
  };

  const handleCreate = async () => {
    if (!folderName.trim()) {
      alert("Folder name cannot be empty!");
      return;
    }

    dispatch(addFolderAsync({folderName, currentFolderId}));
    handleModalClose();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadFileAsync({file, currentFolderId}));
    }
  };

  return (
    <div className="sidebar">
      <button className="sidebar-btn" onClick={handleCreateFolder}>
        Create Folder
      </button>
        <label htmlFor="file-upload" className="sidebar-btn">
          <input
            type="file"
            id="file-upload"
            style={{ display: "none", width: "100%" }}
            onChange={handleFileUpload}
          />
          Upload File
        </label>

      {isModalOpen &&
        createPortal(
          <Modal
            folderName={folderName}
            handleFolderNameChange={(e) => setFolderName(e.target.value)}
            handleCreateOrUpdate={handleCreate}
            handleModalClose={handleModalClose}
            isUpdate={false}
          />,
          document.getElementById("modal-root")
        )}
    </div>
  );
};

export default Sidebar;


