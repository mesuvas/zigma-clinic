import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth_id = async (req: any, res: Response, next: NextFunction) => {
 
  if (!req.headers.authorization) throw new Error("Authorization failed");

  console.log(req.headers.authorization);

  const payload = req.headers.authorization.split(" ")[1];

  try {
    const accessToken = jwt.verify(payload, "1076");

    console.log(accessToken);
    req.patient = accessToken;
  } catch (e) {
    throw new Error( "Authorization error ! JWT mismatch");
  }

  next();
};

export default auth_id;
