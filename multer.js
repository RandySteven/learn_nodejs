const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname)
    }
})

module.exports = storage