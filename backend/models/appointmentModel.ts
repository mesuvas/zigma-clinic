import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
   
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients',  
        required: true,
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',  
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum : ["booked", "unbooked"],
        required: true,
    }
});

const AppointmentModel = mongoose.model('appointments', appointmentSchema);
export default AppointmentModel;
