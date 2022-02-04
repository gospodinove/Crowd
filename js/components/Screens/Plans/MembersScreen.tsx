import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { RootState } from '../../../redux/store'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { ModalScreensParamsT } from '../../../types/ModalScreensParams'
import Button from '../../Button'

type NavigationPropsT = StackScreenProps<
  GroupPlanTabBarPropsT & ModalScreensParamsT,
  'members'
>

const connector = connect((status: RootState, props: NavigationPropsT) => ({
  userIds: status.plans[props.route.params.planId].userIds
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const onPress = useCallback(
    () =>
      props.navigation.navigate('inviteGroupPlanMembers', {
        planId: props.route.params.planId,
        userIds: props.userIds
      }),
    [props.navigation, props.route.params.planId, props.userIds]
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
