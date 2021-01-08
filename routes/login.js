const login = require('../models/login');
const  SendOtp = require("sendotp");
const user = require('../models/user');



//pass your msg91 otp credentials sendOtp
const sendOtp = new SendOtp("351065A1dKwJf83zmK5ff46488");
//using promise
exports.SENDOTP = (req,res)=>{
    console.log("req.body",req.body);
    sendOtp.send(req.body.phoneNumber,"otptesting",(err,data)=>{
        console.log(">>>>",data);
        if(err) return res.json({err});
        data.type == "success" ? res.json({success: true})
        : res.json({ success: false});
    });
};

exports.VERIFYOTP = (req, res)=>{
    sendOtp.verify(req.body.phoneNumber, req.body.otp,function(err, data){
        console.log("req.body",req.body);
        if (err) return res.json ({err});
        if (data.type == "success"){
            let { phoneNumber} = req.body;
            user.findOne({ phoneNumber},(err,user)=>{
                if(err) return res.json({err});
                if (!user){
                    //user login

                    login.create(req.body,(err, user)=>{
                        console.log(req.body)
                        if (err) return res.json({ err});
                    })
                }
            })
        }
    })
}


