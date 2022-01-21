import { useTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import PlansScreen from './PlansScreen'

const Stack = createStackNavigator<PlansTabNavigatorPropsT>()

const PlansTabNavigator = () => {
  const theme = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="plans"
      screenOptions={useMemo(
        () => ({ headerStyle: { backgroundColor: theme.colors.background } }),
        [theme]
      )}
    >
      <Stack.Screen
        name="plans"
        component={PlansScreen}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(PlansTabNavigator)
