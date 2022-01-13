import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect } from 'react'
import { Text, View } from 'react-native'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plan'>

type PropsT = NavigationPropsT

const PlanScreen = (props: PropsT) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.name
    })
  }, [props.navigation])

  return (
    <View>
      <Text>{props.route.params.name}</Text>
    </View>
  )
}

export default memo(PlanScreen)
