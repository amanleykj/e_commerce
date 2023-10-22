import connectToDB from "@/database";
import User from "@/models/user";
import { NextResponse } from "next/server";


const schema = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email : Joi.email().required(),
    password : Joi.string().min(6).required(),
    role : Joi.string().required()
})

export const dynamic = 'force-dynamic'

export async function POST( request ) {
await connectToDB();

const { firstName, lastName, password, role} = await request.json();
// validation of schema is next

const { error } = schema.validate({ firstName, lastName, email, password, role })

if(error) {
    return NextResponse.json({
        success : false,
        message : email.details[0]
    })
}

try {
    // check if the user is in the DB first
    const isUserAlreadyHere = await User.findOne({ email });
    if(isUserAlreadyHere) {
        return NextResponse.json({
            success : false,
            message : "That email is already being used. Try another email."
        })
    }
    else {
        const hashPW = await hash(password, 13);
        const newlyMadeUser = await User.create({
            firstName, lastName, email, password : hashPW, role
        })
    }
    if(newlyMadeUser) {
        return NextResponse.json({
            success : true,
            message : "Account created successfully. All good!"
        })
    }

}
catch(error) {
    console.log("You have an error with your user registration.")

    return NextResponse.json({
        success : false,
        message : "Something is wrong. Give it another try."
    })

}


}