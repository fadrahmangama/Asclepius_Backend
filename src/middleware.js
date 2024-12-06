const validateFile = (req, res, next) => {
  const file = req.file;
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  const maxFileSize = 1000000; // 1MB

  if (!file) {
    return res.status(400).json({
      status: "fail",
      message: "File tidak ditemukan atau tidak valid",
    });
  }

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({
      status: "fail",
      message: "Format file tidak didukung. Gunakan JPEG atau PNG.",
    });
  }

  if (file.size > maxFileSize) {
    return res.status(413).json({
      status: "fail",
      message: `Payload content length greater than maximum allowed: ${maxFileSize}`,
    });
  }

  next();
};

module.exports = validateFile;
