import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { NotificationsTabNavigatorPropsT } from '../types/NotificationsTabNavigatorProps'
import NotificationsScreen from './NotificationsScreen'

const Stack = createStackNavigator<NotificationsTabNavigatorPropsT>()

const NotificationsTabNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="notifications"
      screenOptions={useMemo(
        () => ({ headerStyle: { backgroundColor: theme.colors.background } }),
        [theme]
      )}
    >
      <Stack.Screen
        name="notifications"
        component={NotificationsScreen}
        options={useMemo(() => ({ title: 'Notifications' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(NotificationsTabNavigator)
