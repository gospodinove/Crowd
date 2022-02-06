import { createStackNavigator } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { ModalsNavigatorPropsT } from '../../../types/ModalsNavigatorProps'
import CreatePlanScreen from './CreatePlan/CreatePlanScreen'
import InvitePlanMembersScreen from './InvitePlanMembers/InvitePlanMembersScreen'

const Stack = createStackNavigator<ModalsNavigatorPropsT>()

export const ModalsNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={useMemo(
        () => ({
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
    >
      <Stack.Screen
        name="inviteMembers"
        component={InvitePlanMembersScreen}
        options={useMemo(() => ({ title: 'Invite members' }), [])}
      />
      <Stack.Screen
        name="createPlan"
        component={CreatePlanScreen}
        options={useMemo(() => ({ title: 'Create plan' }), [])}
      />
    </Stack.Navigator>
  )
}
