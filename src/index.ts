import express,{Request,Response} from "express";
import mongoose from "mongoose";
const app=express();
require('dotenv').config()
app.use(express.json())


import { userModel } from "./db";




async function main(){
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connected to the db")
    app.listen(3000,()=>{
        console.log("listening on port 3000")
    })

}
main()

app.post("/create",async(req:Request,res:Response)=>{
    const{name,email,password,course}=req.body;
    await userModel.create({
        name,
        email,
        password,
        course
    })
    res.json({
        message:"your credentials are created"
    })
})
app.put("/modify/:id",async(req:Request,res:Response)=>{
    const{id}=req.params;
    await userModel.findByIdAndUpdate(id,req.body)
    res.json({
        message:"your credentials has been modified"
    })
})
app.get("/all",async(req,res)=>{
    const alldata=await userModel.find({})
    res.json(alldata)
})
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const prod=await userModel.findByIdAndDelete(id);
    if(!prod){
        res.status(404).send({
            message:'the product id is invalid'
        })
    }
    else{
        res.status(200).send({
            message:"deleted successfully"
        })
    }

})