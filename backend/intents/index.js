const { StandardFonts, rgb } = require("pdf-lib");

async function applyIntent(intent, pdfDoc) {
  if (intent === "study") {
    console.log("Applying Study Notes intent");

    // 1️) Insert cover page at the beginning
    const coverPage = pdfDoc.insertPage(0, [595, 842]); // A4 size

    // 2️) Load fonts
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const pageFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 3️) Draw cover title
    coverPage.drawText("Study Notes", {
      x: 200,
      y: 520,
      size: 32,
      font: titleFont,
      color: rgb(0, 0, 0),
    });

    // 4️) Draw date
    coverPage.drawText(`Generated on: ${new Date().toDateString()}`, {
      x: 210,
      y: 480,
      size: 14,
      font: pageFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // 5️) Add page numbers (skip cover page)
    const pages = pdfDoc.getPages();

    pages.forEach((page, index) => {
      if (index === 0) return; // skip cover page

      const { width } = page.getSize();

      page.drawText(`Page ${index}`, {
        x: width / 2 - 25,
        y: 40,
        size: 12,
        font: pageFont,
        color: rgb(0, 0, 0),
      });
    });
  }

  return pdfDoc;
}

module.exports = { applyIntent };
