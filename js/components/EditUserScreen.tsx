import React, { useState } from 'react'
import { Button, TextInput, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { RootState } from '../redux/store'

const connector = connect(
  (state: RootState) => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email
  }),
  {
    updateUser: userSlice.actions.update
  }
)

type PropsT = ConnectedProps<typeof connector>

const CustomTextInput = (props: {
  value?: string
  placeholder?: string
  onChangeText?: (text: string) => void
}) => {
  return (
    <TextInput
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      editable
      style={{
        height: 40,
        borderWidth: 1
      }}
    />
  )
}

const EditUserScreen = (props: PropsT) => {
  const isDarkMode = useColorScheme() === 'dark'

  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [email, setEmail] = useState(props.email)

  const containerStyle = {
    margin: 20,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  const save = () => {
    props.updateUser({ firstName, lastName, email })
  }

  return (
    <View style={containerStyle}>
      <CustomTextInput
        value={firstName}
        placeholder="First name"
        onChangeText={setFirstName}
      />
      <CustomTextInput
        value={lastName}
        placeholder="Last name"
        onChangeText={setLastName}
      />
      <CustomTextInput
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <Button title="Save" onPress={save} />
    </View>
  )
}

export default connector(EditUserScreen)
