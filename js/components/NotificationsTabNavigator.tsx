import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { NotificationsTabNavigatorPropsT } from '../types/NotificationsTabNavigatorProps'
import NotificationsScreen from './NotificationsScreen'

const Stack = createStackNavigator<NotificationsTabNavigatorPropsT>()

const NotificationsTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="notifications">
      <Stack.Screen
        name="notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  )
}

export default NotificationsTabNavigator
