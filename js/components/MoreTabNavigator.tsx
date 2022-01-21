import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useContext, useMemo } from 'react'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import MoreScreen from './MoreScreen'
import { ThemeContext } from './ThemeProvider'

const Stack = createStackNavigator<MoreTabNavigatorPropsT>()

const MoreTabNavigator = () => {
  const theme = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName="more"
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
        name="more"
        component={MoreScreen}
        options={useMemo(
          () => ({
            title: 'More'
          }),
          []
        )}
      />
    </Stack.Navigator>
  )
}

export default memo(MoreTabNavigator)
