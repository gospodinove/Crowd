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
        plan: props.route.params.plan
      }),
    [props.navigation, props.route.params.plan]
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
