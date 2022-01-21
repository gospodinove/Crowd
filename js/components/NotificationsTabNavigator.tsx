import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useContext, useMemo } from 'react'
import { NotificationsTabNavigatorPropsT } from '../types/NotificationsTabNavigatorProps'
import NotificationsScreen from './NotificationsScreen'
import { ThemeContext } from './ThemeProvider'

const Stack = createStackNavigator<NotificationsTabNavigatorPropsT>()

const NotificationsTabNavigator = () => {
  const theme = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName="notifications"
      screenOptions={useMemo(
        () => ({
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          cardStyle: { backgroundColor: theme.colors.background }
        }),
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
