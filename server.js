const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" })); // CORS-konfiguration här
app.use(express.json());

// Testroute
app.get("/", (req, res) => {
  res.send("Detta kommer från backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
