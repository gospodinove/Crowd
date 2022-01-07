import auth from '@react-native-firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import IconButton from './IconButton'
import MoreScreen from './MoreScreen'

const Stack = createStackNavigator<MoreTabNavigatorPropsT>()

const MoreTabNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="more">
      <Stack.Screen
        name="more"
        component={MoreScreen}
        options={useMemo(
          () => ({
            title: 'More',
            headerRight: () => (
              <IconButton
                iconName="sign-out-alt"
                size={32}
                color="black"
                onPress={() => auth().signOut()}
              />
            )
          }),
          []
        )}
      />
    </Stack.Navigator>
  )
}

export default memo(MoreTabNavigator)
