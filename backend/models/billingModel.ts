import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
    
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        description: "Must be a string and is required"
    },
    amount: {
        type: Number,
        required: true,
        description: "Must be a number and is required"
    },
    paymentStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        required: true,
        description: "Must be a string and is required"
    },
    billingDate: {
        type: Date,
        required: true,
        description: "Must be a date and is required"
    }
});

const billingModel= mongoose.model("billings",billingSchema);

export default billingModel;



