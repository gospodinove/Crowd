import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo
} from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { plansSlice } from '../../../reducers/plans'
import { RootState } from '../../../redux/store'
import { PlanT } from '../../../types/Plan'
import { PlansTabNavigatorPropsT } from '../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import {
  fetchPlansLoader,
  refreshPlanMembersLoader
} from '../../../utils/loaders'
import IconButton from '../../IconButton'
import LoaderOrChildren from '../../LoaderOrChildren'
import PlanItem from './PlanItem'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<PlansTabNavigatorPropsT, 'plans'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'plansTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

const connector = connect(
  (state: RootState) => ({
    plans: state.plans.data,
    isLoading: state.loaders.runningLoaders[fetchPlansLoader],
    isRefreshing:
      state.loaders.runningLoaders[refreshPlanMembersLoader] ?? false
  }),
  {
    fetchPlans: plansSlice.actions.fetch,
    cleanPlanData: plansSlice.actions.clear
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const PlansScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    if (props.plans.length) {
      return
    }

    props.fetchPlans({ loader: fetchPlansLoader })
  }, [])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="plus"
          size={32}
          color="icon"
          onPress={() => {
            props.navigation.push('modals', {
              screen: 'createPlan'
            })
          }}
        />
      )
    })
  }, [props.navigation, theme])

  const data = useMemo(() => {
    if (!props.plans) {
      return []
    }

    return Object.keys(props.plans)
      .reduce<PlanT[]>((result, planId) => {
        const plan = props.plans[planId]

        if (!plan) {
          return result
        }

        return [...result, plan]
      }, [])
      .sort((a, b) => a.startDate.seconds - b.startDate.seconds)
  }, [props.plans])

  const onPlanItemPress = useCallback(
    (planId: string) => {
      const plan = props.plans[planId]

      if (!plan) {
        return
      }

      props.navigation.push('plan', { planId: plan.id })
    },
    [props.plans, props.navigation]
  )

  const renderItem = useCallback(
    (item: ListRenderItemInfo<PlanT>) => (
      <PlanItem data={item.item} onPress={onPlanItemPress} />
    ),
    [onPlanItemPress]
  )

  const onRefresh = useCallback(() => {
    props.cleanPlanData({ clearRelatedDataOnly: true })
    props.fetchPlans({ loader: refreshPlanMembersLoader })
  }, [])

  return (
    <LoaderOrChildren
      isLoading={props.isLoading}
      size="large"
      color="text"
      containerStyle={useMemo(
        () => ({ backgroundColor: theme.colors.background }),
        [theme]
      )}
    >
      <FlatList<PlanT>
        data={data}
        renderItem={renderItem}
        refreshing={props.isRefreshing}
        onRefresh={onRefresh}
      />
    </LoaderOrChildren>
  )
}

export default memo(connector(PlansScreen))
