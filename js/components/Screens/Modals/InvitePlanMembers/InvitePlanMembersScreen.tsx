import { StackScreenProps } from '@react-navigation/stack'
import { debounce } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItemInfo, Pressable, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import usePrevious from '../../../../hooks/usePrevious'
import { plansSlice } from '../../../../reducers/plans'
import { usersSlice } from '../../../../reducers/users'
import { RootState } from '../../../../redux/store'
import { ModalScreensParamsT } from '../../../../types/ModalScreensParams'
import { UserT } from '../../../../types/User'
import { inviteMembersSearch, setPlanMembers } from '../../../../utils/loaders'
import Button from '../../../Button'
import LoaderOrChildren from '../../../LoaderOrChildren'
import ScrollContainer from '../../../ScrollContainer'
import Text from '../../../Text'
import TextInput from '../../../TextInput'
import UserInitials from '../../../UserInitials'
import InvitePlanMemberItem from './InvitePlanMemberItem'
import { invitePlanMembersScreenStyles } from './InvitePlanMembersScreen.styles'

const connector = connect(
  (state: RootState) => ({
    searchResults: state.users.searchResults,
    isSearching: state.loaders.runningLoaders[inviteMembersSearch],
    isLoading: state.loaders.runningLoaders[setPlanMembers]
  }),
  {
    search: usersSlice.actions.search,
    setSearchResults: usersSlice.actions.setSearchResults,
    updatePlanMembers: plansSlice.actions.updateMembersForPlanId
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<
  ModalScreensParamsT,
  'inviteGroupPlanMembers'
>

type PropsT = ReduxPropsT & NavigationPropsT

const InvitePlanMembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const [searchResults, setSearchResults] = useState<UserT[]>([])
  const [selectedUsers, setSelectedUsers] = useState<UserT[]>([])

  const prevIsLoading = usePrevious(props.isLoading)

  // filter the results to omit the users already in the group
  useEffect(() => {
    setSearchResults(
      props.searchResults.filter(
        result => !props.route.params.userIds.includes(result.id)
      )
    )
  }, [props.searchResults, props.route.params.userIds])

  // detect when the loading state has changed
  useEffect(() => {
    if (prevIsLoading && !props.isLoading) {
      props.navigation.goBack()
    }
  }, [prevIsLoading, props.isLoading])

  // clear search result at screen dismissal
  useEffect(() => {
    return () => {
      if (props.searchResults.length === 0) {
        return
      }

      props.setSearchResults([])
    }
  }, [props.searchResults.length])

  const onChangeText = useCallback(
    debounce((text: string) => props.search(text), 500),
    [props.search]
  )

  const onItemPress = useCallback(
    user => {
      if (selectedUsers.includes(user)) {
        setSelectedUsers(selectedUsers.filter(u => user.id !== u.id))
      } else {
        setSelectedUsers([...selectedUsers, user])
      }
    },
    [selectedUsers]
  )

  const onAddButtonPress = useCallback(
    () =>
      props.updatePlanMembers({
        planId: props.route.params.planId,
        newMembers: selectedUsers
      }),
    [
      props.updatePlanMembers,
      props.route.params.planId,
      props.route.params.userIds,
      selectedUsers
    ]
  )

  const renderItem = useCallback(
    (data: ListRenderItemInfo<UserT>) => (
      <InvitePlanMemberItem
        user={data.item}
        isSelected={selectedUsers.map(u => u.id).includes(data.item.id)}
        onPress={onItemPress}
      />
    ),
    [setSelectedUsers, selectedUsers]
  )

  const renderSpacer = useCallback(
    () => <View style={useMemo(() => ({ height: 5 }), [])} />,
    []
  )

  const renderSelectedUsers = useMemo(
    () => (
      <>
        <Text
          weight="regular"
          size={11}
          lineHeight={15}
          style={invitePlanMembersScreenStyles.selectedUsersCaption}
        >
          {selectedUsers.length + ' selected - tap to remove'}
        </Text>
        <ScrollContainer
          horizontal
          style={invitePlanMembersScreenStyles.selectedUsersContainer}
        >
          {selectedUsers.map(user => (
            <View key={user.email}>
              <Pressable
                onPress={() =>
                  setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))
                }
              >
                <UserInitials
                  user={user}
                  textColor={theme.colors.white}
                  backgroundColor={theme.colors.primary}
                  containerStyle={
                    invitePlanMembersScreenStyles.selectedUserInitials
                  }
                />
              </Pressable>
            </View>
          ))}
        </ScrollContainer>
      </>
    ),
    [
      invitePlanMembersScreenStyles.selectedUsersCaption,
      invitePlanMembersScreenStyles.selectedUsersContainer,
      selectedUsers,
      setSelectedUsers,
      theme.colors,
      invitePlanMembersScreenStyles.selectedUserInitials
    ]
  )

  return (
    <View
      style={useMemo(
        () => ({
          backgroundColor: theme.colors.background,
          flex: 1,
          padding: 20
        }),
        [theme]
      )}
    >
      <View
        style={useMemo(
          () => ({ backgroundColor: theme.colors.background }),
          [theme]
        )}
      >
        {selectedUsers.length > 0 ? (
          renderSelectedUsers
        ) : (
          <View
            style={invitePlanMembersScreenStyles.emptyUserSelectionContainer}
          >
            <Text weight="regular" size={14} lineHeight={20}>
              No selected users
            </Text>
          </View>
        )}

        <TextInput
          placeholder="Search by email"
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoFocus
          autoCorrect={false}
        />
      </View>

      <LoaderOrChildren
        isLoading={props.isSearching}
        color={theme.colors.grey}
        size="large"
      >
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSpacer}
          contentContainerStyle={useMemo(() => ({ paddingVertical: 10 }), [])}
        />
      </LoaderOrChildren>

      <Button
        text="Add"
        size="large"
        type="primary"
        onPress={onAddButtonPress}
        isLoading={props.isLoading}
        disabled={selectedUsers.length === 0}
      />
    </View>
  )
}

export default memo(connector(InvitePlanMembersScreen))
