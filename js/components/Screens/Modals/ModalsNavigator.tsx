import { createStackNavigator } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { ModalsNavigatorPropsT } from '../../../types/ModalsNavigatorProps'
import CreatePlanScreen from './CreatePlan/CreatePlanScreen'
import InvitePlanMembersScreen from './InvitePlanMembers/InvitePlanMembersScreen'

const Stack = createStackNavigator<ModalsNavigatorPropsT>()

/**
 * All modals will be contained here.
 * They will be grouped based on their utility.
 */

export const ModalsNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={useMemo(
        () => ({
          // left and right header buttons will be added from the screens
          headerLeft: _ => undefined,
          headerRight: _ => undefined,
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0.2,
            borderBottomColor: theme.colors.border
          },
          headerTintColor: theme.colors.text
        }),
        [theme]
      )}
    >
      {/* Invite members group */}
      <Stack.Group>
        <Stack.Screen
          name="inviteMembers"
          component={InvitePlanMembersScreen}
          options={useMemo(() => ({ title: 'Invite members' }), [])}
        />
      </Stack.Group>

      {/* Create plan group */}
      <Stack.Group>
        <Stack.Screen
          name="createPlan"
          component={CreatePlanScreen}
          options={useMemo(() => ({ title: 'Create plan' }), [])}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
