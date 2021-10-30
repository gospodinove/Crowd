import React, { useState } from 'react'
import { Text } from 'react-native'
import Button from './Button'
import TextInput from './TextInput'

type PropsT = {
  onButtonPress: (email: string, password: string) => void
}

type StateT = {
  email: string
  password: string
}

const LoginCardContent = (props: PropsT) => {
  const [email, setEmail] = useState<StateT['email']>('')
  const [password, setPassword] = useState<StateT['password']>('')

  const onButtonPress = () => {
    props.onButtonPress(email, password)
  }

  return (
    <>
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
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 10 }}
      />
      <Button
        text="Login"
        size="medium"
        type="primary"
        onPress={onButtonPress}
        style={{ marginBottom: 10 }}
      />
    </>
  )
}

export default LoginCardContent
