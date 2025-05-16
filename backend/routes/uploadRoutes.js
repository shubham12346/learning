const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("textfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File cannot be empty " });
  }

  const filePath = path.join(__dirname, "..", req.file.path);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    res.json({
      message: "File uploaded and read successfully",
      filename: req.file.originalname,
      content: data,
    });
  });
});
module.exports = router;
