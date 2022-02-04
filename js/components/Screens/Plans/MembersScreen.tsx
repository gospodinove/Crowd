import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { ModalScreensParamsT } from '../../../types/ModalScreensParams'
import Button from '../../Button'

type NavigationPropsT = StackScreenProps<
  GroupPlanTabBarPropsT & ModalScreensParamsT,
  'members'
>

type PropsT = NavigationPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const onPress = useCallback(
    () =>
      props.navigation.navigate('inviteGroupPlanMembers', {
        planId: props.route.params.planId,
        userIds: props.route.params.userIds
      }),
    [props.navigation, props.route.params.planId, props.route.params.userIds]
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

export default memo(MembersScreen)
