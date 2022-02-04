import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../../hooks/useAppTheme'
import { MoreTabNavigatorPropsT } from '../../types/MoreTabNavigatorProps'
import MoreScreen from './MoreScreen'

const Stack = createStackNavigator<MoreTabNavigatorPropsT>()

const MoreTabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName="more"
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
