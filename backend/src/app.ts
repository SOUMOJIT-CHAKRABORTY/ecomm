import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
// import userRoute from "./routes/userRoute";
const app = express();
const port = 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api/users", userRoute);
const server = http.createServer(app);

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
