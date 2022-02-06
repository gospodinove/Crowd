import { CompositeScreenProps } from '@react-navigation/core'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { plansSlice } from '../../../reducers/plans'
import { RootState } from '../../../redux/store'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { ModalScreensParamsT } from '../../../types/ModalScreensParams'
import { UserT } from '../../../types/User'
import {
  fetchPlanMembersLoader,
  refreshPlanMembersLoader
} from '../../../utils/loaders'
import Button from '../../Button'
import LoaderOrChildren from '../../LoaderOrChildren'
import PlanMemberItem from '../../PlanMemberItem'
import Text from '../../Text'

type NavigationPropsT = CompositeScreenProps<
  MaterialTopTabScreenProps<GroupPlanTabBarPropsT, 'members'>,
  StackScreenProps<ModalScreensParamsT>
>

const connector = connect(
  (state: RootState, props: NavigationPropsT) => ({
    members: state.plans.membersForPlanId[props.route.params.planId],
    isLoading: state.loaders.runningLoaders[fetchPlanMembersLoader],
    isRefreshing:
      state.loaders.runningLoaders[refreshPlanMembersLoader] ?? false
  }),
  { fetchMembers: plansSlice.actions.fetchMembersForPlanId }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    if (!props.members) {
      props.fetchMembers({ planId: props.route.params.planId })
    }
  }, [])

  const data = useMemo(
    () =>
      [...(props.members ?? [])].sort((a, b) =>
        a.firstName > b.firstName ? 1 : -1
      ),
    [props.members]
  )

  const onRefresh = useCallback(
    () =>
      props.fetchMembers({
        planId: props.route.params.planId,
        loader: refreshPlanMembersLoader
      }),
    [props.fetchMembers, props.route.params.planId]
  )

  const renderItem = useCallback(
    (info: ListRenderItemInfo<UserT>) => <PlanMemberItem user={info.item} />,
    []
  )

  const renderSeparator = useCallback(
    () => <View style={useMemo(() => ({ height: 5 }), [])} />,
    []
  )

  const onAddButtonPress = useCallback(() => {
    console.log(props.members?.length)

    props.navigation.navigate('invitePlanMembersStack', {
      screen: 'inviteMembers',
      params: {
        planId: props.route.params.planId,
        userIds: props.members?.map(m => m.id) ?? []
      }
    })
  }, [props.navigation, props.route.params.planId, props.members])

  return (
    <LoaderOrChildren
      isLoading={props.isLoading}
      color={theme.colors.text}
      size="large"
      containerStyle={useMemo(
        () => ({
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: theme.colors.background
        }),
        [theme]
      )}
    >
      <>
        <View
          style={useMemo(
            () => ({
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }),
            []
          )}
        >
          <Text weight="semibold" lineHeight={20} size={20}>
            {(props.members?.length ?? 0) +
              ' member' +
              ((props.members?.length ?? 0) !== 1 ? 's' : '')}
          </Text>
          <Button
            text="Add"
            type="primary"
            size="medium"
            leftIcon="plus"
            rounded
            onPress={onAddButtonPress}
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          onRefresh={onRefresh}
          refreshing={props.isRefreshing}
        />
      </>
    </LoaderOrChildren>
  )
}

export default memo(connector(MembersScreen))
