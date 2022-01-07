import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import PlansScreen from './PlansScreen'

const Stack = createStackNavigator<PlansTabNavigatorPropsT>()

const PlansTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="plans">
      <Stack.Screen
        name="plans"
        component={PlansScreen}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(PlansTabNavigator)
