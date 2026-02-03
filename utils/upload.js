const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let ext = file.originalname.split(".");               // here file is the whole info about our uploaded stuff,originalName indicated it's whole name including it's extension. Split is js array method
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext[ext.length-1])
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PNG and JPEG is allowed!'), false);
  }
};


const upload = multer({ storage: storage,
    limits : {
        fileSize : 3 *1024 *1024             //3 mb
    },
    fileFilter
 })

module.exports = upload

