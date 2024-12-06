const express = require("express");
const multer = require("multer");
const { predict } = require("./controller");
const validateFile = require("./middleware");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/predict", upload.single("image"), validateFile, predict);

module.exports = router;
