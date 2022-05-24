const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.originalUrl);
  res.header("Access-Control-Allow-Origin", "*");
  if (req.file === undefined)
    return res.status(400).send("you must select a file.");
  const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(imgUrl);
});

module.exports = router;
