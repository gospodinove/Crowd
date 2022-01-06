import React, { memo, useCallback, useState } from 'react'
import { Text, View } from 'react-native'
import Button from '../Button'
import Card from '../Card'
import TextInput from '../TextInput'
import { styles } from './SignUpCard.styles'

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
      <Text style={styles.title}>One step away from your Crowds</Text>

      <View style={styles.namesRowContainer}>
        <TextInput
          autoCapitalize="none"
          value={firstName}
          placeholder="First name"
          onChangeText={setFirstName}
          style={styles.halfWidthInput}
        />
        <TextInput
          autoCapitalize="none"
          value={lastName}
          placeholder="Last name"
          onChangeText={setLastName}
          style={styles.halfWidthInput}
        />
      </View>

      <TextInput
        autoCapitalize="none"
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        style={styles.marginBottom}
      />
      <TextInput
        autoCapitalize="none"
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.marginBottom}
      />
      <Button
        text="Sign Up"
        size="medium"
        type="primary"
        onPress={onButtonPress}
        style={styles.marginBottom}
      />
    </Card>
  )
}

export default memo(SignUpCard)
