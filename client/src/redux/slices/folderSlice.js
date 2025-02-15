import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFolder,
  fetchFolders,
  uploadFile,
  fetchFiles,
  deleteFolder,
  updateFolder,
  deleteFile,
} from "../../apis/driveApi";

// handle folder creation
export const addFolderAsync = createAsyncThunk(
  "folder/addFolder",
  async (data, { rejectWithValue }) => {
    try {
      return await createFolder(data.folderName, data.currentFolderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles folders fetching
export const fetchFoldersAsync = createAsyncThunk(
  "folder/fetchFolders",
  async (currentFolderId, { rejectWithValue }) => {
    try {
      return await fetchFolders(currentFolderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles folder updation
export const updateFolderAsync = createAsyncThunk(
  "folder/updateFolder",
  async (data, { rejectWithValue }) => {
    try {
      return await updateFolder(data.folderName, data.folderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles folder deletion
export const deleteFolderAsync = createAsyncThunk(
  "folder/deleteFolder",
  async (folderId, { rejectWithValue }) => {
    try {
      return await deleteFolder(folderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles file upload
export const uploadFileAsync = createAsyncThunk(
  "folder/uploadFile",
  async (data, { rejectWithValue }) => {
    try {
      return await uploadFile(data.file, data.currentFolderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles files fetching
export const fetchFilesAsync = createAsyncThunk(
  "folder/fetchFiles",
  async (currentFolderId, { rejectWithValue }) => {
    try {
      return await fetchFiles(currentFolderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// handles file deletion
export const deleteFileAsync = createAsyncThunk(
  "file/deleteFile",
  async (file, { rejectWithValue }) => {
    try {
      return await deleteFile(file);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folders: [],
    files: [],
    isUploading: false,
    error: null,
    currentFolderId: "root", // Default to root folder
    folderPath: [{ id: "root", name: "Home" }], // Default breadcrumb
  },
  reducers: {
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    addFile: (state, action) => {
      state.files.push(action.payload);
    },
    setIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setCurrentFolder: (state, action) => {
      state.currentFolderId = action.payload;
    },
    setFolderPath: (
      state,
      action
    ) => {
      state.folderPath.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFolderAsync.fulfilled, (state, action) => {
        state.folders.push(action.payload);
      })
      .addCase(fetchFoldersAsync.fulfilled, (state, action) => {
        state.folders = action.payload;
      })
      .addCase(updateFolderAsync.fulfilled, (state, action) => {
        state.folders = state.folders.map((folder) =>
          folder._id === action.payload.folder._id ? action.payload.folder : folder
        );
      })
      .addCase(deleteFolderAsync.fulfilled, (state, action) => {
        state.folders = state.folders.filter(
          (folder) => folder._id !== action.payload.folder._id
        );
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        state.files.push(action.payload);
      })
      .addCase(fetchFilesAsync.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(deleteFileAsync.fulfilled, (state, action) => {
        state.files = state.files.filter(
          (file) => file._id !== action.payload.file._id
        );
      })
  },
});

export default folderSlice.reducer;
export const { addFolder, addFile, setIsUploading, setCurrentFolder, setFolderPath } = folderSlice.actions;
