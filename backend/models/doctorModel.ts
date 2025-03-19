import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: "String",
    required: true,
  },
});

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
