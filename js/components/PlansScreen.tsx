import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useEffect, useLayoutEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { plansSlice } from '../reducers/plans'
import { RootState } from '../redux/store'
import { ModalScreensParamsT } from '../types/ModalScreensParams'
import { PlanT } from '../types/Plan'
import { PlansTabNavigatorPropsT } from '../types/PlansTabNavigatorProps'
import { plansLoader } from '../utils/loaders'
import IconButton from './IconButton'
import PlanItem from './PlanItem'
import ScreenWithLoader from './ScreenWithLoader'

type NavigationPropsT = StackScreenProps<
  PlansTabNavigatorPropsT & ModalScreensParamsT,
  'plans'
>

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

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="plus"
          size={32}
          color="black"
          onPress={() => {
            props.navigation.navigate('createPlan')
          }}
        />
      )
    })
  }, [props.navigation])

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
    <ScreenWithLoader isLoading={props.isLoading} size="large">
      <FlatList<PlanT> data={props.plans} renderItem={renderItem} />
    </ScreenWithLoader>
  )
}

export default memo(connector(PlansScreen))
