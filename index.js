const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);
const auth = require("./middelwares/auth.middleware");
const checkRole = require("./middelwares/role.middleware");

app.get("/", (req, res) => {
  res.send("Welocme to MASAI NEWS");
});

app.get("/appuser", auth, (req, res) => {
  console.log(req.user);
  res.send("WELCOME TO MASAI NEWS");
});
app.get("/appadmin", auth, checkRole, (req, res) => {
  console.log(req.user);
  res.send("MASAI application DEVELOPER");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(
      `server is running on port : ${PORT} and connected to Mongoo DB `
    );
  } catch (error) {
    console.log("error", error);
  }
});
