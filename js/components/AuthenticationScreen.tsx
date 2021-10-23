import auth from '@react-native-firebase/auth'
import React, { useRef, useState } from 'react'
import { Animated, Text } from 'react-native'
import Button from './Button'
import Card from './Card'
import TextInput from './TextInput'

type StateT = {
  email: string
  password: string
  mode: 'login' | 'signUp'
}

const AuthenticationScreen = () => {
  const [email, setEmail] = useState<StateT['email']>('')
  const [password, setPassword] = useState<StateT['password']>('')
  const [mode, setMode] = useState<StateT['mode']>('login')

  const animation = useRef(new Animated.Value(0)).current

  const onLoginPress = () => {
    if (!email || !password) {
      return
    }

    auth().signInWithEmailAndPassword(email, password)
  }

  const onSignUpPress = () => {
    if (!email || !password) {
      return
    }

    auth().createUserWithEmailAndPassword(email, password)
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

  const renderButton = (): JSX.Element => {
    switch (mode) {
      case 'login':
        return (
          <Button
            text="Login"
            size="medium"
            type="primary"
            onPress={onLoginPress}
            style={{ marginBottom: 10 }}
          />
        )
      case 'signUp':
        return (
          <Button
            text="Sign Up"
            size="medium"
            type="primary"
            onPress={onSignUpPress}
            style={{ marginBottom: 10 }}
          />
        )
    }
  }

  const renderFooter = (): JSX.Element => {
    switch (mode) {
      case 'login':
        return (
          <>
            <Text style={{ textAlign: 'center' }}>
              You do not have an account?
            </Text>
            <Button
              text="Sign Up"
              size="small"
              type="text"
              onPress={switchMode}
            />
          </>
        )
      case 'signUp':
        return (
          <>
            <Text style={{ textAlign: 'center' }}>
              You already have an account?
            </Text>
            <Button
              text="Login"
              size="small"
              type="text"
              onPress={switchMode}
            />
          </>
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 30,
            marginBottom: 10
          }}
        >
          One step away from your Crowds
        </Text>

        <TextInput
          autoCapitalize="none"
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          style={{
            marginBottom: 10
          }}
        />
        <TextInput
          autoCapitalize="none"
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          style={{ marginBottom: 10 }}
        />

        {renderButton()}

        {renderFooter()}
      </Card>
    </Animated.View>
  )
}

export default AuthenticationScreen
