import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import MoreScreen from './MoreScreen'

const Stack = createStackNavigator<MoreTabNavigatorPropsT>()

const MoreTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="more">
      <Stack.Screen
        name="more"
        component={MoreScreen}
        options={{ title: 'More' }}
      />
    </Stack.Navigator>
  )
}

export default MoreTabNavigator
