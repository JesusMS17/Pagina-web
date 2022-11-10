import { Router } from 'express'
import multer from 'multer'
import mimeTypes from 'mime-types'

const router = Router()
let fileName = ''
const storage = multer.diskStorage({
  destination: './server/uploads/',
  filename: (req, file, cb) => {
    fileName = `${Date.now()}.${mimeTypes.extension(file.mimetype)}`
    cb('', fileName)
  }
})

const upload = multer({
  storage
})
router.post('/saveFile', upload.single('profileImg'), async (req, res) => {
  try {
    res.json({
      message: fileName
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
})

export default router
