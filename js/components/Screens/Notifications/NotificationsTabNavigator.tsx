import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { NotificationsTabNavigatorPropsT } from '../../../types/NotificationsTabNavigatorProps'
import NotificationsScreen from './NotificationsScreen'

const Stack = createStackNavigator<NotificationsTabNavigatorPropsT>()

const NotificationsTabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName="notifications"
      screenOptions={useMemo(
        () => ({
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: 'transparent',
            borderBottomWidth: 0.2,
            borderBottomColor: theme.colors.border
          },
          headerTintColor: theme.colors.text
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
