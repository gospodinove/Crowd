import React, { useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import Button from './Button'
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'

const connector = connect(null, {
  onSignUpPress: userSlice.actions.signUp,
  onLoginPress: userSlice.actions.login
})

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

type StateT = {
  mode: 'login' | 'signUp'
}

const AuthenticationScreen = (props: PropsT) => {
  const [mode, setMode] = useState<StateT['mode']>('login')

  const animation = useRef(new Animated.Value(0)).current

  const pagerViewRef = useRef(React.createRef<PagerView>()).current

  const onLoginPress = (email: string, password: string) => {
    if (!email || !password) {
      return
    }

    props.onLoginPress({ email, password })
  }

  const onSignUpPress = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    if (!email || !password || !firstName || !lastName) {
      return
    }

    props.onSignUpPress({ firstName, lastName, email, password })
  }

  const switchMode = () => {
    if (mode === 'login') {
      pagerViewRef.current?.setPage(1)

      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start()

      setMode('signUp')
    } else {
      pagerViewRef.current?.setPage(0)

      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start()

      setMode('login')
    }
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['#fee', '#ffe']
        })
      }}
    >
      <PagerView ref={pagerViewRef} style={{ flex: 1 }} scrollEnabled={false}>
        <View key="login" style={{ paddingTop: 150, paddingHorizontal: 20 }}>
          <LoginCard onButtonPress={onLoginPress} />
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
              rightIcon="chevron-right"
              onPress={switchMode}
            />
          </View>
        </View>
        <View key="signUp" style={{ paddingTop: 150, paddingHorizontal: 20 }}>
          <SignUpCard onButtonPress={onSignUpPress} />
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
              leftIcon="chevron-left"
              onPress={switchMode}
            />
            <Text style={{ textAlign: 'center', marginLeft: 10 }}>
              You already have an account?
            </Text>
          </View>
        </View>
      </PagerView>
    </Animated.View>
  )
}

export default connector(AuthenticationScreen)
