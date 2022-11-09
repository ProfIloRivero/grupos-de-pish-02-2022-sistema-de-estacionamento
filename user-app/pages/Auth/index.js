import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login'
import Register from './Register'
import User from '../Home/User'

const AuthStack = createNativeStackNavigator()

const Auth = () => {
    return(
        <AuthStack.Navigator initialRouteName='Login'>
                <AuthStack.Screen options={{headerShown:false}} name='Login' component={Login}/>
                <AuthStack.Screen options={{headerShown:false}} name='Register' component={Register}/>
        </AuthStack.Navigator>
    )
}

export default Auth