const multer = require('multer');

const MIMES_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIMES_TYPES[file.mimetype];
        if (!extension) {
            callback(null, file.originalname)
            //gérer les erreurs potentielles  
        } else {
            callback(null, name + extension)
        }
    }
});
const imageUpload = multer({
    storage: storage,
    limits: {
      fileSize: 2000000 
    },
    fileFilter(req, file) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return res.status(400).json({message: error });
       }
  }
});


module.exports = imageUpload.single('image');