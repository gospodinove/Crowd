import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import MoreScreen from './MoreScreen'

const Stack = createStackNavigator<MoreTabNavigatorPropsT>()

const MoreTabNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="more"
      screenOptions={useMemo(
        () => ({ headerStyle: { backgroundColor: theme.colors.background } }),
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
