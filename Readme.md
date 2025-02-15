# File Management API

## Overview
This is a File Management API built using Express.js. It allows users to upload, retrieve, and delete files, as well as manage folders. Authentication is required for accessing most routes.

## Installation

### Prerequisites
- Node.js installed
- MongoDB (if using a database for authentication and file storage metadata)

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   - Development mode:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm run start
     ```
5. Start the client:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication Routes
| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login a user       |

### File Routes
| Method | Endpoint         | Description                |
|--------|-----------------|----------------------------|
| POST   | `/api/files/`      | Upload a file (protected) |
| GET    | `/api/files/:folderId` | Get all files in a folder (protected) |
| DELETE | `/api/files/:id`  | Delete a file (protected) |

### Folder Routes
| Method | Endpoint         | Description                 |
|--------|-----------------|-----------------------------|
| POST   | `/api/folders/`   | Create a new folder (protected) |
| GET    | `/api/folders/:parentId` | Get all subfolders of a parent (protected) |
| PUT    | `/api/folders/:folderId` | Update a folder (protected) |
| DELETE | `/api/folders/:folderId` | Delete a folder (protected) |

## Middleware
- `protect`: Middleware for authentication
- `upload`: Middleware for handling file uploads

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (if used for metadata storage)
- **Authentication:** JSON Web Token (JWT)
- **File Upload:** Multer

## License
This project is created by Rajdeep Mitra.

