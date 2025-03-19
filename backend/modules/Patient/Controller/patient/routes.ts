import { Router } from "express";

import auth_id from "../authId";
import paitentRegister from "./patientRegister";
import patientBilling from "../billing/billingRegister";
import patientProfile from "./patientProfile";
import billingRegister from "../billing/billingRegister";
import appointmentRegister from "../appointment/appointmentRegister";
import patientLogin from "./patientLogin";
import DoctorInfo from "../Doctor/getDoctorInfo";
import appointmentDetails from "../appointment/getAppointmentDetails";

const patientRouter = Router();

patientRouter.post("/register", paitentRegister);
patientRouter.post("/login", patientLogin);
patientRouter.get("/doctor/getDetails", DoctorInfo);

patientRouter.use(auth_id);
patientRouter.get("/profile", patientProfile);
patientRouter.post("/billing/register", billingRegister);
patientRouter.post("/appointment/register", appointmentRegister);
patientRouter.get("/appointment/getDetails", appointmentDetails);

export default patientRouter;
