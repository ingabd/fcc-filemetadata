require('dotenv').config()

const express = require('express')
const cors = require('cors')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
})

// ==================================================================
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const image = req.file
  res.status(200).json({
    name: image.originalname,
    type: image.mimetype,
    size: image.size
  })
})
// ==================================================================

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
})
