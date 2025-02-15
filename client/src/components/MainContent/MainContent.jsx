import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFoldersAsync,
  fetchFilesAsync,
  setCurrentFolder,
  setFolderPath,
  deleteFolderAsync,
  updateFolderAsync,
  deleteFileAsync,
} from "../../redux/slices/folderSlice";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import "./MainContent.css";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

const MainContent = () => {
  const dispatch = useDispatch();
  const { folders, files } = useSelector((state) => state.folder);
  const currentFolderId = useSelector((state) => state.folder.currentFolderId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderId, setFolderId] = useState("");


  useEffect(() => {
    dispatch(fetchFoldersAsync(currentFolderId));
    dispatch(fetchFilesAsync(currentFolderId));
  }, [dispatch, currentFolderId]);

  const handleUpdateFolder = (e, folderId) => {
    e.stopPropagation();
    setIsModalOpen(true);
    setFolderId(folderId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFolderName("");
  };

  const handleFolderClick = (e, folder) => {
    e.stopPropagation();
    dispatch(setCurrentFolder(folder._id));
    dispatch(setFolderPath({ id: folder._id, name: folder.name }));
  };

  const handleDeleteFolder = (e, folderId) => {
    e.stopPropagation();
    dispatch(deleteFolderAsync(folderId));
  };
  const handleEditFolder = () => {
    if (!folderName.trim()) {
      alert("Folder name cannot be empty!");
      return;
    }
    dispatch(updateFolderAsync({ folderName, folderId }));
    handleModalClose();
  };

    const handleDeleteFile = (e, fileId) => {
      e.stopPropagation();
      dispatch(deleteFileAsync(fileId));
    };

  return (
    <>
      <div className="main-content">
        <h1>Google Drive Clone</h1>
        <div className="items-list">
          {folders.map((folder) => (
            <div key={folder._id} className="item">
              <FaFolder className="folder-icon" />
              <div className="item-details">
                <span className="item-title">{folder.name}</span>
                <div className="item-actions">
                  <button
                    className="open-btn"
                    onClick={(e) => handleFolderClick(e, folder)}
                  >
                    Open
                  </button>
                  <button
                    className="edit-btn"
                    onClick={(e) => handleUpdateFolder(e, folder._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteFolder(e, folder._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {files.map((file) => (
            <div key={file._id} className="item">
              <FaFileAlt className="file-icon" />
              <div className="item-details">
                <span className="item-title">{file.name}</span>
                <div className="item-actions">
                  <button
                    className="open-btn"
                    onClick={() =>
                      window.open(`http://localhost:5000${file.url}`, "_blank")
                    }
                  >
                    Open
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteFile(e, file._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal
            folderName={folderName}
            handleFolderNameChange={(e) => setFolderName(e.target.value)}
            handleCreateOrUpdate={handleEditFolder}
            handleModalClose={handleModalClose}
            isUpdate={true}
          />,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default MainContent;
