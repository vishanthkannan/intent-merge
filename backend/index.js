const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload");
const mergeRoutes = require("./routes/merge");

const app = express();
app.use(cors());

app.use("/api", uploadRoutes);
app.use("/api", mergeRoutes);

app.get("/", (req, res) => {
  res.send("IntentMerge Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
