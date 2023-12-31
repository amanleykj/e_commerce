'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils"
import { useRouter } from "next/navigation";
import { useState } from "react";


const initialFormData = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    role : 'customer'
}

export default function Register() {
    
    const router = useRouter()
    const [ isRegistered, setIsRegistered ] = useState(false)
    const [ formData, setFormData ] = useState(initialFormData);
    console.log(formData)

    
    function isFormValid() {

        return formData && formData.firstName && formData.firstName.trim() !== ''
        &&
        formData && formData.lastName && formData.lastName.trim() !== ''
        &&
        formData && formData.email && formData.email.trim() !== ''
        &&
        formData && formData.password && formData.password.trim() !== '' ?
        true 
        :
        false
    }

    async function handleRegister() {
        const data = await registerNewUser(formData);
        console.log(data);
    }

    return(
        <div className="bg-green relative">
            <div className="flex flex-col items-center justify-between 
            pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto max-w-7xl xl:px-5
            lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justfiy-start pt-10 pr-10 pb-10 pl-10 bg-white
                        shadow-2xl rounded-xl relative z-10
                        ">
                            <p className="w-full text-4xl font-medium text-center font-serif text-black">
                                {
                                    isRegistered ? "Registration success." : "Make an account."
                                }

                            </p>
                            {
                                isRegistered ? 
                                <button className="inline-flex w-full items-center justify-center
                                bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow
                                font-medium uppercase tracking-wide
                                ">
                                Login
                                </button> :
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        registrationFormControls.map(controlItem => 
                                            controlItem.componentType === 'input' ? (
                                            <InputComponent
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData, [controlItem.id] : e.target.value
                                                })
                                            }}
                                            value={formData[controlItem.id]}
                                            />
                                            )
                                            :
                                            controlItem.componentType === 'select' ? (
                                                <SelectComponent
                                                options={controlItem.options}
                                                label={controlItem.label}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData, [controlItem.id] : e.target.value
                                                    })
                                                }}
                                                value={formData[controlItem.id]}
                                                />
                                            ) : null
                                    )}
                                    <button
                                    className="disabled:opacity-50 inline-flex w-full items-center justify-center
                                    bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow
                                    font-medium uppercase tracking-wide
                                    "
                                    disabled={!isFormValid()}
                                    onClick={handleRegister}
                                    >Make Account</button>

                                <div className="flex flex-col gap-2">
                                    <p>Already have account?</p>
                                    <button
                                    onClick={() => router.push("/login")}
                                    className="inline-flex w-full items-center justify-center
                                    bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow
                                    font-medium uppercase tracking-wide
                                    "
                                    >Login</button>
                                
                                </div>

                                </div>
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}