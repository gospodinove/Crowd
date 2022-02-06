import { createStackNavigator } from '@react-navigation/stack'
import React, { useMemo } from 'react'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import InvitePlanMembersScreen from './InvitePlanMembersScreen'

export type InvitePlanMembersNavigatorParamsT = {
  inviteMembers: { planId: string; userIds: string[] }
}

const Stack = createStackNavigator<InvitePlanMembersNavigatorParamsT>()

export const InvitePlanMembersNavigator = () => {
  const theme = useAppTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="inviteMembers"
        component={InvitePlanMembersScreen}
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
