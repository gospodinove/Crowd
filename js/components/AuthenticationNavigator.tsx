import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'

const Stack = createStackNavigator<AuthenticationNavigatorPropsT>()

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
    </Stack.Navigator>
  )
}

export default AuthenticationNavigator
