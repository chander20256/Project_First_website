const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const walletRoutes = require("./routes/walletRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/wallet", walletRoutes);


// health check
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully" });
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB connected");

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });

})
.catch(err => {
  console.log(err);
});