const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  }
});

// POST /api/merge
router.post("/merge", upload.array("pdfs"), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: "Upload at least 2 PDFs" });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf,pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();

// Cleanup uploaded files
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition","attachment; filename=merged.pdf");
    res.send(Buffer.from(mergedBytes));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF merge failed" });
  }
});

module.exports = router;