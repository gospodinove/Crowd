import { StackScreenProps } from '@react-navigation/stack'
import React, { memo } from 'react'
import { Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../hooks/useAppTheme'
import { RootState } from '../redux/store'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'

const connector = connect((state: RootState) => ({
  user: state.user.data
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<DashboardTabNavigatorPropsT, 'user'>

type PropsT = ReduxPropsT & NavigationPropsT

const DashboardScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const containerStyle = {
    margin: 20,
    backgroundColor: theme.colors.secondaryBackground,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    padding: 20
  }

  return (
    <View style={containerStyle}>
      <Text style={{ color: theme.colors.text }}>
        {'First name: ' + (props.user?.firstName ?? '-')}
      </Text>
      <Text style={{ color: theme.colors.text }}>
        {'Last name: ' + (props.user?.lastName ?? '-')}
      </Text>
      <Text style={{ color: theme.colors.text }}>
        {'Email: ' + (props.user?.email ?? '-')}
      </Text>
    </View>
  )
}

export default memo(connector(DashboardScreen))
