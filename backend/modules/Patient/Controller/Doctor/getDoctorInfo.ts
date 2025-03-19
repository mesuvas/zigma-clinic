import { Request, Response } from "express";
import doctorModel from "../../../../models/doctorModel";

const DoctorInfo = async (req: any, res: Response) => {
  const doctorList = await doctorModel.find({});

  res.status(200).json({
    message: "welcome to doctor profile",
    status: "success",
    doctorList,
  });
};
export default DoctorInfo;
