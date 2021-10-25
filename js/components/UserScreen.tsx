import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Button, Text, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../redux/reducers/user'
import { RootState } from '../redux/store'
import { UserNavigatorParamsT } from '../types/UserNavigatorParams'

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

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<UserNavigatorParamsT, 'user'>

type PropsT = ReduxPropsT & NavigationPropsT

const UserScreen = (props: PropsT) => {
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
      <Text>{'First name: ' + (props.firstName ?? '-')}</Text>
      <Text>{'Last name: ' + (props.lastName ?? '-')}</Text>
      <Text>{'Email: ' + (props.email ?? '-')}</Text>
      <Button title="Edit" onPress={() => props.navigation.push('edit')} />
    </View>
  )
}

export default connector(UserScreen)
