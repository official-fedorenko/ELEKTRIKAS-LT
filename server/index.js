const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/index.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/services.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/about.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/contact.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
