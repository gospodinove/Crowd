import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { connect, ConnectedProps } from 'react-redux'
import { ConstStyles } from '../../constants/style'
import { userSlice } from '../../reducers/user'
import { RootState } from '../../redux/store'
import { loginLoader, signUpLoader } from '../../utils/loaders'
import Button from '../Button'
import { authStyles } from './AuthenticationScreen.styles'
import LoginCard from './LoginCard'
import SignUpCard from './SignUpCard'

const connector = connect(
  (state: RootState) => ({
    isLoginLoading: state.loaders.runningLoaders[loginLoader],
    isSignUpLoading: state.loaders.runningLoaders[signUpLoader]
  }),
  {
    onSignUpPress: userSlice.actions.signUp,
    onLoginPress: userSlice.actions.login
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

type StateT = {
  mode: 'login' | 'signUp'
}

const AuthenticationScreen = (props: PropsT) => {
  const [mode, setMode] = useState<StateT['mode']>('login')

  const animation = useRef(new Animated.Value(0)).current

  const pagerViewRef = useRef(React.createRef<PagerView>()).current

  const onLoginPress = useCallback(
    (email: string, password: string) => {
      if (!email || !password) {
        return
      }

      props.onLoginPress({ email, password })
    },
    [props.onLoginPress]
  )

  const onSignUpPress = useCallback(
    (firstName: string, lastName: string, email: string, password: string) => {
      if (!email || !password || !firstName || !lastName) {
        return
      }

      props.onSignUpPress({ firstName, lastName, email, password })
    },
    [props.onSignUpPress]
  )

  const switchMode = useCallback(() => {
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
  }, [mode])

  return (
    <Animated.View
      style={useMemo(
        () => ({
          flex: 1,
          backgroundColor: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#fee', '#ffe']
          })
        }),
        []
      )}
    >
      <PagerView
        ref={pagerViewRef}
        style={ConstStyles.flex1}
        scrollEnabled={false}
      >
        <View key="login" style={authStyles.cardContainer}>
          <LoginCard
            isLoading={props.isLoginLoading}
            onButtonPress={onLoginPress}
          />
          <View style={authStyles.cardFooterContainer}>
            <Text style={authStyles.loginCardFooterText}>
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
        <View key="signUp" style={authStyles.cardContainer}>
          <SignUpCard
            isLoading={props.isSignUpLoading}
            onButtonPress={onSignUpPress}
          />
          <View style={authStyles.cardFooterContainer}>
            <Button
              text="Login"
              size="small"
              type="rounded"
              leftIcon="chevron-left"
              onPress={switchMode}
            />
            <Text style={authStyles.signUpCardFooterText}>
              You already have an account?
            </Text>
          </View>
        </View>
      </PagerView>
    </Animated.View>
  )
}

export default memo(connector(AuthenticationScreen))
