import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { plansSlice } from '../../../reducers/plans'
import { RootState } from '../../../redux/store'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { ModalScreensParamsT } from '../../../types/ModalScreensParams'
import Button from '../../Button'

type NavigationPropsT = StackScreenProps<
  GroupPlanTabBarPropsT & ModalScreensParamsT,
  'members'
>

const connector = connect(
  (state: RootState, props: NavigationPropsT) => ({
    members: state.plans.membersForPlanId[props.route.params.planId]
  }),
  { fetchMembers: plansSlice.actions.fetchMembersForPlanId }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    if (!props.members) {
      props.fetchMembers(props.route.params.planId)
    }
  }, [])

  const onPress = useCallback(
    () =>
      props.navigation.navigate('inviteGroupPlanMembers', {
        planId: props.route.params.planId,
        userIds: props.members?.map(m => m.id) ?? []
      }),
    [props.navigation, props.route.params.planId, props.members]
  )

  return (
    <View
      style={useMemo(
        () => ({
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.background
        }),
        [theme]
      )}
    >
      <Button
        text="Add"
        type="primary"
        size="medium"
        rounded
        onPress={onPress}
      />
    </View>
  )
}

export default memo(connector(MembersScreen))
