import React from "react";
import "./Modal.css";

const Modal = ({
  folderName,
  handleFolderNameChange,
  handleCreateOrUpdate,
  handleModalClose,
  isUpdate,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isUpdate ? "Update Folder" : "Create Folder"}</h3>
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={handleFolderNameChange}
          className="folder-input"
        />
        <div className="modal-buttons">
          <button onClick={handleModalClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleCreateOrUpdate} className="create-btn">
            {isUpdate ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;