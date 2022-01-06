import React, { memo, useCallback, useState } from 'react'
import { Text } from 'react-native'
import Button from '../Button'
import Card from '../Card'
import TextInput from '../TextInput'
import { styles } from './LoginCard.styles'

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

  const onButtonPress = useCallback(() => {
    props.onButtonPress(email, password)
  }, [props.onButtonPress, email, password])

  return (
    <Card>
      <Text style={styles.title}>One step away from your Crowds</Text>
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
        text="Login"
        size="medium"
        type="primary"
        isLoading={props.isLoading}
        onPress={onButtonPress}
        style={styles.marginBottom}
      />
    </Card>
  )
}

export default memo(LoginCard)
