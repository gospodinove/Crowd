import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../hooks/useAppTheme'
import { RootState } from '../../redux/store'
import { DashboardTabNavigatorPropsT } from '../../types/DashboardTabNavigatorProps'
import { RootStackPropsT } from '../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../types/TabNavigatorProps'
import Card from '../Card'
import Text from '../Text'

const connector = connect((state: RootState) => ({
  user: state.users.current
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<DashboardTabNavigatorPropsT, 'user'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'dashboardTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

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
        <Text weight="regular" size={14} lineHeight={20}>
          {'First name: ' + (props.user?.firstName ?? '-')}
        </Text>
        <Text weight="regular" size={14} lineHeight={20}>
          {'Last name: ' + (props.user?.lastName ?? '-')}
        </Text>
        <Text weight="regular" size={14} lineHeight={20}>
          {'Email: ' + (props.user?.email ?? '-')}
        </Text>
      </Card>
    </View>
  )
}

export default memo(connector(DashboardScreen))
