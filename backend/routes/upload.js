const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  },
});

router.post("/upload", upload.array("pdfs"), (req, res) => {
  res.json({
    message: "PDF files uploaded successfully",
    count: req.files.length,
  });
});

// ✅ THIS LINE IS CRITICAL
module.exports = router;
