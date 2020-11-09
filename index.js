const express = require("express");
const app = express();
const PORT = 8000;

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/bcrypt", require("./routes/bcypt-test"));

app.use((req, res, next) => {
  res.status(404).json("not found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message || "internal server error" });
});

app.listen(PORT, () => {
  console.log(`server run localhost:${PORT}`);
});
