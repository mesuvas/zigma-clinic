import { Request, Response } from "express";
import patientModel from "../../../../models/patientModel";



const patientProfile = async (req: any, res: Response) => {
  console.log(req.patient);

  const patientData = await patientModel.findOne({
    _id: req.patient.patient_id,
  });

  res.status(200).json({
    message: "welcome to user profile",
    status: "success",
    patientInfo: patientData,
  });
};
export default patientProfile;
