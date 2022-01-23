import React, { memo, useCallback, useState } from 'react'
import { View } from 'react-native'
import Button from '../Button'
import Card from '../Card'
import Text from '../Text'
import TextInput from '../TextInput'
import { signUpCardStyles } from './SignUpCard.styles'

type PropsT = {
  isLoading: boolean
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

const SignUpCard = (props: PropsT) => {
  const [firstName, setFirstName] = useState<StateT['firstName']>('')
  const [lastName, setLastName] = useState<StateT['firstName']>('')
  const [email, setEmail] = useState<StateT['email']>('')
  const [password, setPassword] = useState<StateT['password']>('')

  const onButtonPress = useCallback(() => {
    props.onButtonPress(firstName, lastName, email, password)
  }, [props.onButtonPress, firstName, lastName, email, password])

  return (
    <Card>
      <Text
        size={20}
        weight="semibold"
        lineHeight={30}
        style={signUpCardStyles.title}
      >
        One step away from your Crowds
      </Text>

      <View style={signUpCardStyles.namesRowContainer}>
        <TextInput
          autoCapitalize="none"
          value={firstName}
          placeholder="First name"
          onChangeText={setFirstName}
          style={signUpCardStyles.halfWidthInput}
        />
        <TextInput
          autoCapitalize="none"
          value={lastName}
          placeholder="Last name"
          onChangeText={setLastName}
          style={signUpCardStyles.halfWidthInput}
        />
      </View>

      <TextInput
        autoCapitalize="none"
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        style={signUpCardStyles.marginBottom}
      />
      <TextInput
        autoCapitalize="none"
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={signUpCardStyles.marginBottom}
      />
      <Button
        text="Sign Up"
        size="medium"
        type="primary"
        onPress={onButtonPress}
        style={signUpCardStyles.marginBottom}
      />
    </Card>
  )
}

export default memo(SignUpCard)
