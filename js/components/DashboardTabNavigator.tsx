import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'
import UserScreen from './DashboardScreen'
import EditUserScreen from './EditUserScreen'

const Stack = createStackNavigator<DashboardTabNavigatorPropsT>()

const DashboardTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="user">
      <Stack.Screen
        name="user"
        component={UserScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name="edit"
        component={EditUserScreen}
        options={{ title: 'Edit User' }}
      />
    </Stack.Navigator>
  )
}

export default DashboardTabNavigator
