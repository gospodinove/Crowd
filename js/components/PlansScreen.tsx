import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plans'>

type PropsT = NavigationPropsT

const PlansScreen = (props: PropsT) => {
  return <View style={{ flex: 1, backgroundColor: 'red' }}></View>
}

export default PlansScreen
