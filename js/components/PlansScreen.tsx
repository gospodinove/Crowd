import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { PlanT } from '../types/Plan'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import { plansLoader } from '../utils/loaders'
import LoaderOrChildren from './LoaderOrChildren'
import PlanItem from './PlanItem'

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
    maybeFetchPlans()
  }, [])

  const maybeFetchPlans = () => {
    if (props.plans.length) {
      return
    }

    props.fetchPlans()
  }

  const renderItem = (item: ListRenderItemInfo<PlanT>) => (
    <PlanItem data={item.item} />
  )

  return (
    <LoaderOrChildren isLoading={props.isLoading} size="large">
      <FlatList<PlanT> data={props.plans} renderItem={renderItem} />
    </LoaderOrChildren>
  )
}

export default connector(PlansScreen)
