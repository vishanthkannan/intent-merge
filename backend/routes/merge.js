const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const { applyIntent } = require("../intents");


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

router.post("/merge", upload.array("pdfs"), async (req, res) => {
  try {
    const intent = req.body.intent || "default";
    console.log("Merge intent:", intent);


    if (!req.files || req.files.length < 2) {
      return res
        .status(400)
        .json({ message: "Upload at least 2 PDF files" });
    }

    await applyIntent(intent, mergedPdf);
    const mergedPdfBytes = await mergedPdf.save();


    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);

      const pages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    
    // ✅ delete uploaded files after merge
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=merged.pdf"
    );

    res.send(Buffer.from(mergedPdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF merge failed" });
  }
});

module.exports = router;
