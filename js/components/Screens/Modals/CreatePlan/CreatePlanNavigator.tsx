import { createStackNavigator } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import CreatePlanScreen from './CreatePlanScreen'

export type CreatePlanNavigatorParamsT = {
  createPlan: undefined
}

const Stack = createStackNavigator<CreatePlanNavigatorParamsT>()

export const CreatePlanNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="createPlan"
        component={CreatePlanScreen}
        options={useMemo(
          () => ({
            title: 'Invite members',
            headerLeft: _ => undefined,
            headerRight: _ => undefined,
            headerStyle: {
              backgroundColor: theme.colors.background,
              borderBottomWidth: 0.2,
              borderBottomColor: theme.colors.border
            }
          }),
          [theme]
        )}
      />
    </Stack.Navigator>
  )
}
