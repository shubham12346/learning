const express = require("express");
const router = express.Router();

//
let blogs = [];
let nextId = 1;

// create a blog

router.post("/", (req, res) => {
  const { title } = req.body;

  const blog = {
    title,
    createAt: new Date().toISOString(),
    id: title,
  };
  blogs.push(blog);
  res.status(201).json(blog);
});

router.get("/", (req, res) => {
  res.json(blogs);
});

// single blog
router.get("/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found " });
  }
  res.json(blog);
});

router.delete("/:id", (req, res) => {
  const index = blogs.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.staus(404).json({ message: "Blog not found" });
  blogs.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
