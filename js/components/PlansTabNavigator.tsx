import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../hooks/useAppTheme'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import PlansScreen from './PlansScreen'

const Stack = createStackNavigator<PlansTabNavigatorPropsT>()

const PlansTabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      initialRouteName="plans"
      screenOptions={useMemo(
        () => ({
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowColor: 'transparent',
            borderBottomWidth: 0.2,
            borderBottomColor: theme.colors.border
          },
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
