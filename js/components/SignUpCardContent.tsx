import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Button from './Button'
import TextInput from './TextInput'

type PropsT = {
  onButtonPress: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void
}

type StateT = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const SignUpCardContent = (props: PropsT) => {
  const [firstName, setFirstName] = useState<StateT['firstName']>('')
  const [lastName, setLastName] = useState<StateT['firstName']>('')
  const [email, setEmail] = useState<StateT['email']>('')
  const [password, setPassword] = useState<StateT['password']>('')

  const onButtonPress = () => {
    props.onButtonPress(firstName, lastName, email, password)
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

      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <TextInput
          autoCapitalize="none"
          value={firstName}
          placeholder="First name"
          onChangeText={setFirstName}
          style={{
            flex: 1,
            marginRight: 5,
            marginBottom: 10
          }}
        />
        <TextInput
          autoCapitalize="none"
          value={lastName}
          placeholder="Last name"
          onChangeText={setLastName}
          style={{
            flex: 1,
            marginLeft: 5,
            marginBottom: 10
          }}
        />
      </View>

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
      <Button
        text="Sign Up"
        size="medium"
        type="primary"
        onPress={onButtonPress}
        style={{ marginBottom: 10 }}
      />
    </>
  )
}

export default SignUpCardContent
