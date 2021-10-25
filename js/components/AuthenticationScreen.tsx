import auth from '@react-native-firebase/auth'
import React, { useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../redux/reducers/user'
import Button from './Button'
import Card from './Card'
import LoginCardContent from './LoginCardContent'
import SignUpCardContent from './SignUpCardContent'

const connector = connect(null, {
  onSignUpPress: userSlice.actions.create
})

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

type StateT = {
  mode: 'login' | 'signUp'
}

const AuthenticationScreen = (props: PropsT) => {
  const [mode, setMode] = useState<StateT['mode']>('login')

  const animation = useRef(new Animated.Value(0)).current

  const onLoginPress = (email: string, password: string) => {
    if (!email || !password) {
      return
    }

    auth().signInWithEmailAndPassword(email, password)
  }

  const onSignUpPress = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    props.onSignUpPress({ firstName, lastName, email, password })
  }

  const switchMode = () => {
    if (mode === 'login') {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start()
      setMode('signUp')
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()
      setMode('login')
    }
  }

  const renderFooter = (): JSX.Element => {
    switch (mode) {
      case 'login':
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              You do not have an account?
            </Text>
            <Button
              text="Sign Up"
              size="small"
              type="rounded"
              onPress={switchMode}
            />
          </View>
        )
      case 'signUp':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10
            }}
          >
            <Button
              text="Login"
              size="small"
              type="rounded"
              onPress={switchMode}
            />
            <Text style={{ textAlign: 'center', marginLeft: 10 }}>
              You already have an account?
            </Text>
          </View>
        )
    }
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['#fee', '#ffe']
        }),
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'stretch'
      }}
    >
      <Card>
        {mode === 'login' ? (
          <LoginCardContent onButtonPress={onLoginPress} />
        ) : (
          <SignUpCardContent onButtonPress={onSignUpPress} />
        )}
      </Card>

      {renderFooter()}
    </Animated.View>
  )
}

export default connector(AuthenticationScreen)
