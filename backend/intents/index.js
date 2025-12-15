async function applyIntent(intent, pdfDoc) {
  switch (intent) {
    case "study":
      console.log("Applying Study Notes intent");
      break;

    case "office":
      console.log("Applying Office Submission intent");
      break;

    default:
      console.log("Applying Default merge behavior");
  }

  return pdfDoc;
}

module.exports = { applyIntent };
