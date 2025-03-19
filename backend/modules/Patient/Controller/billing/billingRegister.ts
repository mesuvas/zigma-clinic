 import { Request, Response } from "express";
import billingModel from "../../../../models/billingModel";


const billingRegister = async(req: Request, res: Response)=>{
   
    const { patientID, amount, paymentStatus, billingDate, } = req.body;
    
    
try{
    await billingModel.create({
        amount,
        patientID,
        paymentStatus,
        billingDate,

    })
    res.status(200).json({
        message: "billing created successfully",
      
    })
}catch(e:any){
   
    res.status(400).json({
        error: e.message
    })
}
      
    
   
   

}




export default billingRegister;