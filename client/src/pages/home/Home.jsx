import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"; // Import the Breadcrumb
import "./Home.css";
import MainContent from "../../components/MainContent/MainContent";

const Home = () => {
  // Example folder hierarchy
  const folderPath = ["Home", "Documents", "Projects", "React App"];

  return (
    <div className="home">
      <Navbar />
      <Breadcrumb path={folderPath} /> {/* Add the Breadcrumb component */}
      <div className="home-container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
