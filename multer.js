const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname)
    }
})

const upload = multer({storage:storage}).single('image')
module.exports = {upload}