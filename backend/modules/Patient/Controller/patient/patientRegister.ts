import { Request, Response } from "express";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import patientModel from "../../../../models/patientModel";



const paitentRegister = async (req: Request, res: Response) => {
  const { dob, email, password, patientAddress, patientName, phoneNumber } = req.body;
  try {
    if (patientName.length < 3) {
      throw new Error("patientName should be greater than 3 characters");
    }
    const encryptedPassword = await bcrypt.hash(password, 8);
    console.log(encryptedPassword);
    const patientCreate= await patientModel.create({
      dob: dob,
      email: email,
      password: encryptedPassword,
      patientAddress: patientAddress,
      patientName: patientName,
      phoneNumber: phoneNumber,
    });

    const patientInfo = await patientModel.findOne({
        email,
    })
    
    console.log(patientInfo);
    const  payload = {
        patient_id:patientInfo?.id

    };

    console.log(payload);

    const accessToken=  jwt.sign(payload,"1076");
    console.log(accessToken);

    const objectAccessToken = { accessToken };
  const mergedData = { ...patientCreate.toObject(), ...objectAccessToken };
      
   
    res.status(200).json({
      message: "Register successfully",
      data:  mergedData
    });

  } catch (error: any) {  
    console.error("Error during registration:", error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

export default paitentRegister;
