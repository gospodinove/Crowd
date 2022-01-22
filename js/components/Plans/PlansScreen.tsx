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
import { useAppTheme } from '../../hooks/useAppTheme'
import { plansSlice } from '../../reducers/plans'
import { RootState } from '../../redux/store'
import { ModalScreensParamsT } from '../../types/ModalScreensParams'
import { PlanT } from '../../types/Plan'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'
import { plansLoader } from '../../utils/loaders'
import IconButton from '../IconButton'
import ScreenWithLoader from '../ScreenWithLoader'
import PlanItem from './PlanItem'

type NavigationPropsT = StackScreenProps<
  PlansTabNavigatorPropsT & ModalScreensParamsT,
  'plans'
>

const connector = connect(
  (state: RootState) => ({
    plans: state.plans.data,
    isLoading: state.loaders.runningLoaders[plansLoader]
  }),
  { fetchPlans: plansSlice.actions.fetch }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const PlansScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    maybeFetchPlans()
  }, [])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="plus"
          size={32}
          color={theme.colors.icon}
          onPress={() => {
            props.navigation.navigate('createPlan')
          }}
        />
      )
    })
  }, [props.navigation, theme])

  const maybeFetchPlans = useCallback(() => {
    if (props.plans.length) {
      return
    }

    props.fetchPlans()
  }, [props.fetchPlans])

  const onPlanItemPress = useCallback(
    (planId: string) => {
      const plan = props.plans.find(item => item.id === planId)

      if (!plan) {
        return
      }

      props.navigation.push('plan', plan)
    },
    [props.plans, props.navigation]
  )

  const renderItem = useCallback(
    (item: ListRenderItemInfo<PlanT>) => (
      <PlanItem data={item.item} onPress={onPlanItemPress} />
    ),
    [onPlanItemPress]
  )

  return (
    <ScreenWithLoader
      isLoading={props.isLoading}
      size="large"
      containerStyle={useMemo(
        () => ({ backgroundColor: theme.colors.background }),
        [theme]
      )}
    >
      <FlatList<PlanT> data={props.plans} renderItem={renderItem} />
    </ScreenWithLoader>
  )
}

export default memo(connector(PlansScreen))
