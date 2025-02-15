import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Adjust if needed

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createFolder = async (name, parentId) => {
  const response = await axios.post(
    `${API_BASE_URL}/folders`,
    { name, parentId },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const fetchFolders = async (parentId) => {
  const response = await axios.get(`${API_BASE_URL}/folders/${parentId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateFolder = async (name, folderId) => {
  const response = await axios.put(
    `${API_BASE_URL}/folders/${folderId}`,
    { name },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteFolder = async (folderId) => {
  const response = await axios.delete(`${API_BASE_URL}/folders/${folderId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const uploadFile = async (file, folderId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderId", folderId);

  const response = await axios.post(`${API_BASE_URL}/files`, formData, {
    headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const fetchFiles = async (parentId) => {
  const response = await axios.get(`${API_BASE_URL}/files/${parentId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await axios.delete(`${API_BASE_URL}/files/${fileId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
