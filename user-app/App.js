import 'react-native-gesture-handler'
import React from 'react'
import Pages from './pages'
import { NavigationContainer } from '@react-navigation/native'
import { Authentication } from './config/Context/Authentication'
import { StatusBar } from 'react-native'

const App = () => {
  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0066CC"/>
      <NavigationContainer>
        <Authentication>
          <Pages/>
        </Authentication>
      </NavigationContainer>
    </>
  )
}

export default App