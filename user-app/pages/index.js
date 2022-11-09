import React, { useContext, useState } from 'react'
import Home from './Home'
import Auth from './Auth'
import AuthenticationContext from '../config/Context/Authentication'

const Pages = () => {

    const { isLogged } =  useContext(AuthenticationContext)

    return( isLogged ? <Home/> : <Auth/> )
}

export default Pages