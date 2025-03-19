import { Request, Response } from "express";
import AppointmentModel from "../../../../models/appointmentModel";

const appointmentRegister = async (req: Request, res: Response) => {
  const { patientID, doctorID, appointmentDate, appointmentTime, status } =
    req.body;

  try {
    await AppointmentModel.create({
      appointmentDate,
      appointmentTime,
      doctorID,
      patientID,
      status,
    });
    res.status(200).json({
      message: "appointment created successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      error: e.message,
    });
  }
};

export default appointmentRegister;
