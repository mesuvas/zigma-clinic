import { Request, Response } from "express";
import patientModel from "../../../../models/patientModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const patientLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new Error("email is require");
    if (!password) throw new Error(" password is required");
    const findEmail = await patientModel.findOne({
      email,
    });

    if (!findEmail) throw new Error("email not found");

    console.log(findEmail);

    const comparePassword = await bcrypt.compare(password, findEmail.password);
    if (!comparePassword) throw new Error("password didn't matched");

    console.log(findEmail);
    const payload = {
      patient_id: findEmail?.id,
    };

    const accessToken = jwt.sign(payload, "1076");
    console.log(accessToken);

    res.status(200).json({
      message: "login  successfull",
      accessToken: accessToken,
    });
  } catch (e: any) {
    res.status(400).json({
      error: e.message,
    });
  }
};
export default patientLogin;
