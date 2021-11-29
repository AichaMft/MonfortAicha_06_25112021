const multer = require('multer');

const MIMES_TYPES = {
    'images/jpg' : 'jpg',
    'images/jpeg' : 'jpg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, 'images')
    },
    filename: (req,file,callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIMES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');