import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback } from 'react'
import { Button, Text, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../redux/store'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'

const connector = connect((state: RootState) => ({
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  email: state.user.email
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<DashboardTabNavigatorPropsT, 'user'>

type PropsT = ReduxPropsT & NavigationPropsT

const DashboardScreen = (props: PropsT) => {
  const isDarkMode = useColorScheme() === 'dark'

  const containerStyle = {
    margin: 20,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <View style={containerStyle}>
      <Text>{'First name: ' + (props.firstName ?? '-')}</Text>
      <Text>{'Last name: ' + (props.lastName ?? '-')}</Text>
      <Text>{'Email: ' + (props.email ?? '-')}</Text>
      <Button
        title="Edit"
        onPress={useCallback(() => props.navigation.push('edit'), [])}
      />
    </View>
  )
}

export default memo(connector(DashboardScreen))
