import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import Joi from "joi";


const schema = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
    role : Joi.string().required()
})

export const dynamic = 'force-dynamic'

export async function POST( request ) {
    console.log("Attempting POST route now...")
    await connectToDB();

    const { firstName, lastName, email, password, role} = await request.json();
    // validation of schema is next

    const { error } = schema.validate({ firstName, lastName, email, password, role })

    if(error) {
        return NextResponse.json({
            success : false,
            message : email.details[0].message
    })
    
}

try {
    // check if the user is in the DB first
    console.log("Trying now.")
    const isUserAlreadyHere = await User.findOne({ email });
    console.log("Email fine. It's a new one.")
    if (isUserAlreadyHere) {
        return NextResponse.json({
            success : false,
            message : "That email is already being used. Try another email."
        })
    }
    else {
        const hashPW = await hash(password, 13);
        const newlyMadeUser = await User.create({
            firstName, lastName, email, password : hashPW, role
        });
    }
    if (newlyMadeUser) {
        return NextResponse.json({
            success : true,
            message : "Account created successfully. All good!"
        })
    }

}
catch(error) {
    console.log("PROBLEM IS HERE.");
    console.log(`The error is: ${error}`)
    return NextResponse.json({
        success : false,
        message : "Something is wrongNOOO. Give it another try."
    })

}
}