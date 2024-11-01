const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images/users");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
	},
});

const upload = multer({
	storage: multerStorage,
	fileFilter: (req, file, cb) => {
		const acceptedExtensions = [".jpg", ".jpeg", ".png"];
		const ext = path.extname(file.originalname);
		if (!acceptedExtensions.includes(ext)) {
			cb(new Error(`File extension ${ext} is not supported`));
			// req.file = file;
		} else {
			cb(null, true);
		}
	}
});

module.exports = upload;
