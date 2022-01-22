import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../hooks/useAppTheme'
import { RootState } from '../redux/store'
import { DashboardTabNavigatorPropsT } from '../types/DashboardTabNavigatorProps'
import Card from './Card'

const connector = connect((state: RootState) => ({
  user: state.user.data
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<DashboardTabNavigatorPropsT, 'user'>

type PropsT = ReduxPropsT & NavigationPropsT

const DashboardScreen = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <View
      style={useMemo(
        () => ({
          backgroundColor: theme.colors.background,
          padding: 20,
          flex: 1
        }),
        [theme]
      )}
    >
      <Card>
        <Text style={{ color: theme.colors.text }}>
          {'First name: ' + (props.user?.firstName ?? '-')}
        </Text>
        <Text style={{ color: theme.colors.text }}>
          {'Last name: ' + (props.user?.lastName ?? '-')}
        </Text>
        <Text style={{ color: theme.colors.text }}>
          {'Email: ' + (props.user?.email ?? '-')}
        </Text>
      </Card>
    </View>
  )
}

export default memo(connector(DashboardScreen))
