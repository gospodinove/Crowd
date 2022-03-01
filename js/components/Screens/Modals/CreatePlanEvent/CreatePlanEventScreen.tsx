import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { ModalsNavigatorPropsT } from '../../../../types/ModalsNavigatorProps'
import { RootStackPropsT } from '../../../../types/RootStackProps'
import Button from '../../../Button'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<ModalsNavigatorPropsT, 'inviteMembers'>,
  StackScreenProps<RootStackPropsT, 'modals'>
>

type PropsT = NavigationPropsT

const CreatePlanEventScreen = (props: PropsT) => {
  useLayoutEffect(
    () =>
      props.navigation.setOptions({
        headerRight: () => (
          <Button
            text="Done"
            type="text"
            size="medium"
            style={{ marginRight: 15 }}
            onPress={() => props.navigation.goBack()}
          />
        )
      }),
    [props.navigation]
  )

  return <View />
}

export default memo(CreatePlanEventScreen)
