import express from 'express'
import multer from 'multer'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { fileURLToPath } from 'url'

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Configure Cloudinary (for production)
if (process.env.NODE_ENV === 'production') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// Configure storage based on environment
let storage

if (process.env.NODE_ENV === 'production') {
  // Cloudinary storage for production
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'e-shop',
      format: async (req, file) => {
        // Get file extension without the dot
        const extension = path.extname(file.originalname).toLowerCase().substring(1)
        return extension
      },
      public_id: (req, file) => {
        return `${file.fieldname}-${Date.now()}`
      },
    },
  })
} else {
  // Disk storage for development
  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads/'))
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
}
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    console.error(`File type validation error: ${file.originalname} is not a valid image file. Only JPG, JPEG, and PNG files are allowed.`);
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single('image');

// Custom error handling middleware for multer
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      console.error(`Multer upload error: ${err.message}`, {
        stack: err.stack,
        filePath: req.file ? req.file.path : 'No file path available',
        uploadDirectory: path.join(__dirname, '../../uploads/'),
        errorCode: err.code,
      });
      
      // Handle specific multer errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File is too large. Maximum size is 5MB.' });
      }
      
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }
    next();
  });
};


router.post('/', uploadMiddleware, (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    
    if (process.env.NODE_ENV === 'production') {
      res.send(req.file.path);
    } else {
      const filename = path.basename(req.file.path);
      res.send(`/uploads/${filename}`);
    }
  } catch (error) {
    console.error('Upload error details:', {
      error: error.message,
      file: req.file,
      environment: process.env.NODE_ENV
    });
    res.status(500).json({
      message: 'Upload failed',
      error: error.message
    });
  }
});

// router.post('/', uploadMiddleware, (req, res) => {
//   try {
//     if (process.env.NODE_ENV === 'production') {
//       // In production, return the Cloudinary URL
//       res.send(req.file.path)
//     } else {
//       // In development, extract just the filename from the path and return with /uploads/ prefix
//       const filename = path.basename(req.file.path)
//       res.send(`/uploads/${filename}`)
//     }
//   } catch (error) {
//     console.error('File upload error:', {
//       message: error.message,
//       stack: error.stack,
//       file: req.file ? {
//         filename: req.file.filename,
//         originalName: req.file.originalname,
//         path: req.file.path,
//         destination: req.file.destination || path.join(__dirname, '../../uploads/')
//       } : 'No file data available',
//       uploadDirectory: path.join(__dirname, '../../uploads/')
//     });
//     res.status(500).send({ message: 'File upload failed', error: error.message })
//   }
// })

export default router
