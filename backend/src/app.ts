import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { Request, Response, Express } from "express";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRouters from "./routes/userRoute";
import catagoryRouters from "./routes/categoryRoute";
import productRouters from "./routes/productRoutes";
import uploadRoutes from "./routes/uploadRoutes";
const app: Express = express();
const port = 3000;

dotenv.config();
connectDB();

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouters);
app.use("/api/category", catagoryRouters);
app.use("/api/products", productRouters);
app.use("/api/upload", uploadRoutes);
const server = http.createServer(app);

server.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
