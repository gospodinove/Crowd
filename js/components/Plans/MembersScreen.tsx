import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'
import { ModalScreensParamsT } from '../../types/ModalScreensParams'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'
import Button from '../Button'

type NavigationPropsT = StackScreenProps<
  PlansTabNavigatorPropsT & ModalScreensParamsT,
  'plan'
>

type PropsT = NavigationPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const onPress = useCallback(
    () => props.navigation.navigate('createPlan'),
    [props.navigation]
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
