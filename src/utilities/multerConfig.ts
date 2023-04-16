// multerConfig.ts
import multer, { StorageEngine } from 'multer';
import fs from 'fs';

export const maxCount = 10;

// Multer storage configuration
function createDiskStorage(filePath: string, fileName: string|null): StorageEngine {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      // Create the upload folder if it doesn't exist
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      cb(null, filePath); // Set the destination folder for uploads
    },
    filename: (req, file, cb) => {
      cb(null, `${fileName}_${Date.now()}_${file.originalname}`); // Set the filename with a custom prefix and timestamp
    },
  });
}

// Customizable Multer upload function
export function createUploadMiddleware(filePath: string, fileName: string) {
  const storage = createDiskStorage(filePath, fileName);
  const upload = multer({ storage: storage });
  return upload.fields([{ name: 'images', maxCount: maxCount }]);
}
