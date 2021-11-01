import React, { useState } from 'react'
import { Text } from 'react-native'
import Button from './Button'
import Card from './Card'
import TextInput from './TextInput'

type PropsT = {
  isLoading: boolean
  onButtonPress: (email: string, password: string) => void
}

type StateT = {
  email: string
  password: string
}

const LoginCard = (props: PropsT) => {
  const [email, setEmail] = useState<StateT['email']>('')
  const [password, setPassword] = useState<StateT['password']>('')

  const onButtonPress = () => {
    props.onButtonPress(email, password)
  }

  return (
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
        secureTextEntry
        onChangeText={setPassword}
        style={{ marginBottom: 10 }}
      />
      <Button
        text="Login"
        size="medium"
        type="primary"
        isLoading={props.isLoading}
        onPress={onButtonPress}
        style={{ marginBottom: 10 }}
      />
    </Card>
  )
}

export default LoginCard
