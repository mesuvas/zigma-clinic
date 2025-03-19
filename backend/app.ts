import "express-async-errors";

import express from "express";
import mongoose from "mongoose";
import "./models/appointmentModel";
import "./models/billingModel";
import "./models/doctorModel";
import "./models/patientModel";

import cors from "cors";
import patientRouter from "./modules/Patient/Controller/patient/routes";


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://user10:HVxQjnWDftZZcqWj@democluster.h0hr5.mongodb.net/Medical", {})
  .then(() => {
    console.log("connect to database succesfully");
  })
  .catch((e) => {
    console.log("could not connect to database");
  });


  app.use("/patient",patientRouter)


app.listen(3000, () => {
  console.log("server started successfully");
});
