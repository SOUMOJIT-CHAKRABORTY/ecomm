/**
 * Specifies the types for the Express Request object, here adding the user object to the request.
 */
import * as express from "express";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | undefined;
    }
  }
}
