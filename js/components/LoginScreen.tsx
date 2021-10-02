import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, View } from 'react-native'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'

type NavigationPropsT = StackScreenProps<AuthenticationNavigatorPropsT, 'login'>

type PropsT = NavigationPropsT

const LoginScreen = (props: PropsT) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Button title="Sing Up" onPress={() => props.navigation.push('signUp')} />
    </View>
  )
}

export default LoginScreen
