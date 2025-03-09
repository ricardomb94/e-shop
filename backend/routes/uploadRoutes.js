import express from 'express'
import multer from 'multer'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
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
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      // In production, return the Cloudinary URL
      res.send(req.file.path)
    } else {
      // In development, extract just the filename from the path and return with /uploads/ prefix
      const filename = path.basename(req.file.path)
      res.send(`/uploads/${filename}`)
    }
  } catch (error) {
    console.error('File upload error:', error)
    res.status(500).send({ message: 'File upload failed', error: error.message })
  }
})

export default router
