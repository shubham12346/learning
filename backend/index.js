const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
const blogRoutes = require("./routes/blogRoutes");
const uploadRutes = require("./routes/uploadRoutes");

app.use("/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port number`, PORT);
});
