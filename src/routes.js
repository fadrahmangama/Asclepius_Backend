const express = require("express");
const multer = require("multer");
const { predict, getHistoriesControl } = require("./controller");
const validateFile = require("./middleware");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/predict", upload.single("image"), validateFile, predict);
router.get("/predict/histories", getHistoriesControl);

module.exports = router;
