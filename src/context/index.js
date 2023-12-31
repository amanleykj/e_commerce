'use client'

import { createContext, useState } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }){

    const [ showNavModal, setShowNavModal ] = useState(false)
    const [ commonLoader, setCommonLoader ] = useState(false)
    const [ isAuthUser, setIsAuthUser] = useState(null)
    const [ user, setUser ] = useState(null)

    return(
        <GlobalContext.Provider value={{
            showNavModal, setShowNavModal,
            commonLoader, setCommonLoader,
            isAuthUser, setIsAuthUser,
            user, setUser
            }}>
                {children}</GlobalContext.Provider>
    )
}
