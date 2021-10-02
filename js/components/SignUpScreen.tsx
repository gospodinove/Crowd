import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, View } from 'react-native'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'

type NavigationPropsT = StackScreenProps<
  AuthenticationNavigatorPropsT,
  'signUp'
>

type PropsT = NavigationPropsT

const SignUpScreen = (props: PropsT) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <Button title="Login" onPress={() => props.navigation.pop()} />
    </View>
  )
}

export default SignUpScreen
