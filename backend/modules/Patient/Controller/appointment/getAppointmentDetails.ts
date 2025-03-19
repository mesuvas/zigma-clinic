import { Request, Response } from "express";
import AppointmentModel from "../../../../models/appointmentModel";

const appointmentDetails = async (req: any, res: Response) => {
  const appointmentData = await AppointmentModel.find({
    patientID: req.patient.patient_id,
  }).populate("doctorID");
  console.log(appointmentData);

  res.status(200).json({
    message: "welcome to user profile",
    status: "success",
    appointmentInfo: appointmentData,
  });
};
export default appointmentDetails;
