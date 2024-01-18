import express from "express";
import createUser from "../controllers/userController";

const router = express.Router();

router.get("/", createUser);

export default router;
