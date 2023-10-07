'use client'

import { Fragment } from "react";

const isAdminView = false;
const isAuthUser = true;
const user = {
    role : 'admin'
}

function NavItems(){
    return(
        <div className="items-center justify-between w-full md:flex md:w-auto" id="nav-items">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border 
            border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
            
            </ul>

        </div>
    )
}

export default function Navbar(){
    return (
        <>
        
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center cursor-pointer">
                <span className="self-center text-2xl text-black font-semibold whitespace-nowrap">
                    Trap Trap Trap

                </span>

            </div>
            <div className="flex md:order-2 gap-2 text-black">
                {
                    !isAdminView && isAuthUser ?
                <Fragment>
                    <button>Account</button>
                    <button>Cart</button>
                </Fragment> : null
                }
                {
                    user?.role === 'admin' ? 
                    isAdminView ? <button>Client View</button> : <button>Admin View</button>

                    : null
                }
                {
                    isAuthUser ? <button>Logout</button> : <button>Log In</button>
                }

            </div>
        </div>
        </nav>
        </>
    )
}