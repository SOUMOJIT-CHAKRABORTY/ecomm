import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import { User } from "../models/userModel";
import { get, merge } from "lodash";
import { NextFunction, type Request, Response } from "express";

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decode = jwt.verify(
          token,
          process.env.JWT_SECRET
        ) as jwt.JwtPayload;
        const existingUser = await User.findById(decode.userId).select(
          "-password"
        );
        if (!existingUser) {
          res.status(404);
          throw new Error("User not found");
        }

        merge(req, { user: existingUser });
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  }
);

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((get(req, "user.isAdmin") as boolean) === true) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin.");
  }
  console.log("running admin middleware");
};

export { authenticate, authorizeAdmin };
