const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/fonts", express.static(path.join(__dirname, "../public/fonts")));
app.use(express.static("public"));

// Database connection
const db = new sqlite3.Database("./db/database.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Routes
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

// API endpoints
app.get("/api/services", (req, res) => {
  const lang = req.query.lang || "lt";
  db.all("SELECT * FROM services WHERE lang = ?", [lang], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, phone, message, service } = req.body;
  const sql =
    'INSERT INTO inquiries (name, email, phone, message, service, created_at) VALUES (?, ?, ?, ?, ?, datetime("now"))';

  db.run(sql, [name, email, phone, message, service], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: "Inquiry saved successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
