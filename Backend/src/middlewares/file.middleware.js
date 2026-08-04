const multer = require('multer');

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 3 * 1024 * 1024
    }
});

upload.errorHandler = (error, req, res, next) => {
    try {
        if (error) {
            return next(error);
        }
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = upload