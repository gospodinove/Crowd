import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'
import OneScreen from './OneScreen'
import TwoScreen from './TwoScreen'

const Stack = createStackNavigator<AuthenticationNavigatorPropsT>()

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="one">
      <Stack.Screen
        name="one"
        component={OneScreen}
        options={{ title: 'One' }}
      />
      <Stack.Screen
        name="two"
        component={TwoScreen}
        options={{ title: 'Two' }}
      />
    </Stack.Navigator>
  )
}

export default AuthenticationNavigator
