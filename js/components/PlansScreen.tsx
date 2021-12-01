import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanT } from '../types/Plan'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plans'>

const connector = connect(
  (state: RootState) => ({ plans: state.plans.plans }),
  { fetchPlans: plansSlice.actions.fetch }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const PlansScreen = (props: PropsT) => {
  useEffect(() => {
    props.fetchPlans()
  }, [])

  return (
    <FlatList<PlanT>
      data={props.plans}
      renderItem={item => <Text>{item.item.name}</Text>}
    />
  )
}

export default connector(PlansScreen)
