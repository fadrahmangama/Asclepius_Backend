const express = require("express");
const app = express();
const router = require("./src/routes");

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    });
  }
  res.status(500).json({ status: "fail", message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
