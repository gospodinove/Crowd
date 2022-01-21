import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useContext, useMemo } from 'react'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import PlansScreen from './PlansScreen'
import { ThemeContext } from './ThemeProvider'

const Stack = createStackNavigator<PlansTabNavigatorPropsT>()

const PlansTabNavigator = () => {
  const theme = useContext(ThemeContext)

  return (
    <Stack.Navigator
      initialRouteName="plans"
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
        name="plans"
        component={PlansScreen}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(PlansTabNavigator)
