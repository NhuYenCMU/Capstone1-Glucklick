const multer = require('multer');

// Định nghĩa nơi lưu trữ và cách đặt tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Middleware xử lý file
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn 10MB
});

// Middleware Multer nhận 1 file từ trường 'file'
const uploadSingleFile = upload.single('file');

module.exports = uploadSingleFile;
