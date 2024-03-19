import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import userRouters from "./routes/userRoute";
import connectDB from "./config/db";
import dotenv from "dotenv";
import catagoryRouters from "./routes/categoryRoute";
const app = express();
const port = 3000;

dotenv.config();
connectDB();

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouters);
app.use("/api/category", catagoryRouters);
const server = http.createServer(app);

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
