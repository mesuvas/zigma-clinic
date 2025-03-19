import mongoose from "mongoose";
import { isDefaultClause } from "typescript";
const patientSchema = new mongoose.Schema({
  
    patientName:{
        type:"String",
        required: true,
    },
    patientAddress:{
        type:"String",
        required: true, 
    },
    dob:{
        required: true,
        type: Date,

    },
    phoneNumber:{
        type: "String",
        required: true,   
    }
,
    email:{
        type:"String",
        unique: true,
        required: true,
      }
     ,
      password:{
        type: "String",
        required: true,
      }

})

const patientModel= mongoose.model("patients",patientSchema);

export default patientModel;



