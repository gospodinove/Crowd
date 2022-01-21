import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'
import UserScreen from './DashboardScreen'

const Stack = createStackNavigator<DashboardTabNavigatorPropsT>()

const DashboardTabNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="user"
      screenOptions={useMemo(
        () => ({ headerStyle: { backgroundColor: theme.colors.background } }),
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
