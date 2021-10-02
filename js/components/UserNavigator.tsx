import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { UserNavigatorParamsT } from '../types/UserNavigatorParams'
import EditUserScreen from './EditUserScreen'
import UserScreen from './UserScreen'

const Stack = createStackNavigator<UserNavigatorParamsT>()

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="user">
      <Stack.Screen
        name="user"
        component={UserScreen}
        options={{ title: 'User' }}
      />
      <Stack.Screen
        name="edit"
        component={EditUserScreen}
        options={{ title: 'Edit User' }}
      />
    </Stack.Navigator>
  )
}

export default UserNavigator
