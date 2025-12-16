const { StandardFonts, rgb } = require("pdf-lib");

async function applyIntent(intent, pdfDoc) {
   if (intent === "study") {
      console.log("Applying Study Notes intent");

    // 1️⃣ Insert a new page at the beginning
    const coverPage = pdfDoc.insertPage(0, [595, 842]); // A4 size

    // 2️⃣ Load font
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // 3️⃣ Draw title text
    coverPage.drawText("Study Notes", {
      x: 200,
      y: 520,
      size: 32,
      font: titleFont,
      color: rgb(0, 0, 0),
    });

    coverPage.drawText(`Generated on: ${new Date().toDateString()}`, {
      x: 210,
      y: 480,
      size: 14,
      color: rgb(0.4, 0.4, 0.4),
    });

  //   case "office":
  //     console.log("Applying Office Submission intent");
  //     break;

  //   default:
  //     console.log("Applying Default merge behavior");
  // }

  }

  return pdfDoc;
}

module.exports = { applyIntent };
