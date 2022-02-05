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
import Button from '../../Button'
import PlanMemberItem from '../../PlanMemberItem'
import Text from '../../Text'

type NavigationPropsT = StackScreenProps<
  GroupPlanTabBarPropsT & ModalScreensParamsT,
  'members'
>

const connector = connect(
  (state: RootState, props: NavigationPropsT) => ({
    members: state.plans.membersForPlanId[props.route.params.planId]
  }),
  { fetchMembers: plansSlice.actions.fetchMembersForPlanId }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    if (!props.members) {
      props.fetchMembers(props.route.params.planId)
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
    () => props.fetchMembers(props.route.params.planId),
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

  const onPress = useCallback(
    () =>
      props.navigation.navigate('inviteGroupPlanMembers', {
        planId: props.route.params.planId,
        userIds: props.members?.map(m => m.id) ?? []
      }),
    [props.navigation, props.route.params.planId, props.members]
  )

  return (
    <View
      style={useMemo(
        () => ({
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.background
        }),
        [theme]
      )}
    >
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
          rounded
          onPress={onPress}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        onRefresh={onRefresh}
        refreshing={true}
      />
    </View>
  )
}

export default memo(connector(MembersScreen))
