import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import { debounce } from 'lodash'
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import usePrevious from '../../../../hooks/usePrevious'
import { membersSlice } from '../../../../reducers/members'
import { searchSlice } from '../../../../reducers/search'
import { RootState } from '../../../../redux/store'
import { ModalsNavigatorPropsT } from '../../../../types/ModalsNavigatorProps'
import { RootStackPropsT } from '../../../../types/RootStackProps'
import { UserT } from '../../../../types/User'
import {
  inviteMembersSearchLoader,
  updatePlanMembersLoader
} from '../../../../utils/loaders'
import Button from '../../../Button'
import LoaderOrChildren from '../../../LoaderOrChildren'
import PlanMemberItem from '../../../PlanMemberItem'
import ScrollContainer from '../../../ScrollContainer'
import Text from '../../../Text'
import TextInput from '../../../TextInput'
import UserInitials from '../../../UserInitials'

const connector = connect(
  (state: RootState) => ({
    searchResults: state.search.members,
    isSearching: state.loaders.runningLoaders[inviteMembersSearchLoader],
    isLoading: state.loaders.runningLoaders[updatePlanMembersLoader]
  }),
  {
    search: searchSlice.actions.search,
    setSearchResults: searchSlice.actions.setMemberResults,
    updatePlanMembers: membersSlice.actions.update
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<ModalsNavigatorPropsT, 'inviteMembers'>,
  StackScreenProps<RootStackPropsT, 'modals'>
>

type PropsT = ReduxPropsT & NavigationPropsT

const InvitePlanMembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const [searchResults, setSearchResults] = useState<UserT[]>([])
  const [selectedUsers, setSelectedUsers] = useState<UserT[]>([])

  const prevIsLoading = usePrevious(props.isLoading)

  useLayoutEffect(
    () =>
      props.navigation.setOptions({
        headerRight: () => (
          <Button
            text="Done"
            type="text"
            size="medium"
            style={{ marginRight: 15 }}
            onPress={() => props.navigation.goBack()}
          />
        )
      }),
    [props.navigation]
  )

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

  const style = useMemo(
    () =>
      StyleSheet.create({
        emptyUserSelectionContainer: {
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10
        },
        selectedUsersContainer: { height: 40, marginBottom: 10 },
        selectedUsersCaption: { marginBottom: 5 },
        selectedUserInitials: {
          marginRight: 10
        }
      }),
    []
  )

  const onChangeText = useCallback(
    debounce(
      (text: string) => props.search({ domain: 'members', query: text }),
      500
    ),
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

  const onAddButtonPress = useCallback(() => {
    if (!props.route.params.planId) {
      return
    }

    props.updatePlanMembers({
      planId: props.route.params.planId,
      newMembers: selectedUsers
    })
  }, [
    props.updatePlanMembers,
    props.route.params.planId,
    props.route.params.userIds,
    selectedUsers
  ])

  const renderItem = useCallback(
    (data: ListRenderItemInfo<UserT>) => (
      <PlanMemberItem
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

  const renderSelectedUsers = useCallback(
    () => (
      <>
        <Text
          weight="regular"
          size={11}
          lineHeight={15}
          style={style.selectedUsersCaption}
        >
          {selectedUsers.length + ' selected - tap to remove'}
        </Text>
        <ScrollContainer horizontal style={style.selectedUsersContainer}>
          {selectedUsers.map(user => (
            <View key={user.email}>
              <Pressable
                onPress={() =>
                  setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))
                }
              >
                <UserInitials
                  user={user}
                  textColor="white"
                  backgroundColor="primary"
                  containerStyle={style.selectedUserInitials}
                />
              </Pressable>
            </View>
          ))}
        </ScrollContainer>
      </>
    ),
    [style, selectedUsers, setSelectedUsers, theme.colors]
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
          renderSelectedUsers()
        ) : (
          <View style={style.emptyUserSelectionContainer}>
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

      <LoaderOrChildren isLoading={props.isSearching} color="grey" size="large">
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
