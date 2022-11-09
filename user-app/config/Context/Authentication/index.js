import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useState }  from "react"
import { Keyboard } from "react-native"

const AuthenticationContext = createContext({
    isLogged: false,
    isLoading: false,
    setIsLoading: () => {},
    setIsLogged: () => {},
})

export const Authentication = ({children}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    return(
        <AuthenticationContext.Provider value={{isLoading, isLogged, setIsLoading, setIsLogged}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext