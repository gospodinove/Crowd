import auth from '@react-native-firebase/auth'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, View } from 'react-native'
import { call } from 'typed-redux-saga/macro'
import { AuthenticationNavigatorPropsT } from '../types/AuthenticationNavigatorProps'

type NavigationPropsT = StackScreenProps<AuthenticationNavigatorPropsT, 'one'>

type PropsT = NavigationPropsT

const OneScreen = (props: PropsT) => {
  call(auth().signInWithEmailAndPassword, 'gospodinove@gmail.com', 'qwerty')

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Button title="Go to Two" onPress={() => props.navigation.push('two')} />
    </View>
  )
}

export default OneScreen
