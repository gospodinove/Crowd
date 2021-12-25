import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanT } from '../types/Plan'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import { plansLoader } from '../utils/loaders'
import LoaderOrChildren from './LoaderOrChildren'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plans'>

const connector = connect(
  (state: RootState) => ({
    plans: state.plans.plans,
    isLoading: state.loaders.runningLoaders[plansLoader]
  }),
  { fetchPlans: plansSlice.actions.fetch }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const PlansScreen = (props: PropsT) => {
  useEffect(() => {
    props.fetchPlans()
  }, [])

  return (
    <LoaderOrChildren isLoading={props.isLoading}>
      <FlatList<PlanT>
        data={props.plans}
        renderItem={item => (
          <View>
            <Text>{item.item.name}</Text>
          </View>
        )}
      />
    </LoaderOrChildren>
  )
}

export default connector(PlansScreen)
