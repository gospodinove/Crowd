import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../../hooks/useAppTheme'
import { DashboardTabNavigatorPropsT } from '../../types/DashboardTabNavigatorProps'
import UserScreen from './DashboardScreen'

const Stack = createStackNavigator<DashboardTabNavigatorPropsT>()

const DashboardTabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName="user"
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
        name="user"
        component={UserScreen}
        options={useMemo(() => ({ title: 'Dashboard' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(DashboardTabNavigator)
