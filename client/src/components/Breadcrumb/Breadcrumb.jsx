import React from "react";
import "./Breadcrumb.css";
import { useSelector } from "react-redux";

const Breadcrumb = () => {
  const { folderPath } = useSelector((state) => state.folder);

  return (
    <div className="breadcrumb">
      {folderPath.map((folder, index) => (
        <span
          key={folder.id}
          className="breadcrumb-item"
          style={{ cursor: "pointer" }}
        >
          {folder.name}
          {index < folderPath.length - 1 && (
            <span className="separator"> / </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
