import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, View } from 'react-native'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'

type NavigationPropsT = StackScreenProps<AuthenticationNavigatorPropsT, 'two'>

type PropsT = NavigationPropsT

const TwoScreen = (props: PropsT) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <Button title="Go to One" onPress={() => props.navigation.pop()} />
    </View>
  )
}

export default TwoScreen
