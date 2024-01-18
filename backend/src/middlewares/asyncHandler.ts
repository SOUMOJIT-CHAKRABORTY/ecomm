import { NextFunction, Request, Response } from "express";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(
      fn(req, res, next).catch((error: Error) => {
        return res.status(500).send({ error: error.message });
      })
    );
  };

export default asyncHandler;
