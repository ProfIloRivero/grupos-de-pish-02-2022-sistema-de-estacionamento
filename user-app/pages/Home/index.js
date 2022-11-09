import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Main from "./Main"
import User from './User'

const HomeTabs = createBottomTabNavigator()

const Home = () => {

    const SelectIconTab = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
                iconName = focused ? 'ios-home' : 'ios-home-outline'
            } else if (route.name === 'User') {
                iconName = focused ? 'person' : 'person-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: 'gray',
    })

    return(
        <HomeTabs.Navigator screenOptions={SelectIconTab} initialRouteName='Main'>
            <HomeTabs.Screen options={{headerShown:false}} name='Main' component={Main}/>
            <HomeTabs.Screen options={{headerShown:false}} name='User' component={User}/>
        </HomeTabs.Navigator>
    )
}

export default Home