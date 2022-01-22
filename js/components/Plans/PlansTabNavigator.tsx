import { createStackNavigator } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../../hooks/useAppTheme'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'
import PlanScreen from './PlanScreen'
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
          headerTintColor: theme.colors.text
        }),
        [theme]
      )}
    >
      <Stack.Screen
        name="plans"
        component={PlansScreen}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
      <Stack.Screen
        name="plan"
        component={PlanScreen}
        options={useMemo(() => ({ title: 'Plan' }), [])}
      />
    </Stack.Navigator>
  )
}

export default memo(PlansTabNavigator)
