import connectToDB from "@/database"
import User from "@/models/user";
import Joi from "joi";
import { jwt } from "jsonwebtoken";
import { NextResponse } from "next/server";


const schema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required()
})

export const dynamic = "force-dynamic"

export async function POST( request ) {
    await connectToDB();

    const { email, password } = await request.json()

    const { error } = schema.validate({ email, password })

    if(error) {
        return NextResponse.json({
            success : false,
            message : email.details[0].message
    })
    
}

try {
    const checkUser = await User.findOne({ email })
    
    if(!checkUser) {
            return NextResponse.json({
                success : false,
                message : "Account not found with this email."
        })
    }

    const checkPassword = await compare(password, checkUser.password);
    if(!checkPassword) {
        return NextResponse.json({
            success : false,
            message : "Password isn't right. Try again."
    })
    }

    const token = jwt.sign({
        id : checkUser._id,
        email : checkUser?.email,
        role : checkUser?.role
    }, 'default-secret-key', { expiresIn : '1d'});

    const finalData = {
        token,
        user : {
            email : checkUser.email,
            firstName : checkUser.firstName,
            lastName : checkUser.lastName,
            _id : checkUser._id,
            role : checkUser.role
        }
    }

    return NextResponse.json({
        success : true,
        message : "Login is good.",
        finalData
    })

}

catch( error ) {

    console.log("PROBLEM IS HERE at the login.");
    console.log(`The error is: ${error}`)
    return NextResponse.json({
        success : false,
        message : "Something is wrong with LOGIN. Give it another try."
    })
}

}