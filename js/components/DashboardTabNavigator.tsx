import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useContext, useMemo } from 'react'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'
import UserScreen from './DashboardScreen'
import { ThemeContext } from './ThemeProvider'

const Stack = createStackNavigator<DashboardTabNavigatorPropsT>()

const DashboardTabNavigator = () => {
  const theme = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName="user"
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
        name="user"
        component={UserScreen}
        options={useMemo(() => ({ title: 'Dashboard' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(DashboardTabNavigator)
