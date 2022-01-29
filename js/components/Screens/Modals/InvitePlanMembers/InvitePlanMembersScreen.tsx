import { debounce } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItemInfo, Pressable, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { usersSlice } from '../../../../reducers/users'
import { RootState } from '../../../../redux/store'
import { UserT } from '../../../../types/User'
import { inviteMembersSearch } from '../../../../utils/loaders'
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
    isLoading: state.loaders.runningLoaders[inviteMembersSearch]
  }),
  {
    search: usersSlice.actions.search,
    setSearchResults: usersSlice.actions.setSearchResults
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

const InvitePlanMembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const [selectedUsers, setSelectedUsers] = useState<UserT[]>([])

  // clear search result at screen dismissal
  useEffect(() => {
    return () => {
      if (props.searchResults.length === 0) {
        return
      }

      props.setSearchResults([])
    }
  }, [])

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
                    // TODO: figure out how to memoize this
                    onPress={() =>
                      setSelectedUsers(
                        selectedUsers.filter(u => u.id !== user.id)
                      )
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
        isLoading={props.isLoading}
        color={theme.colors.grey}
        size="large"
      >
        <FlatList
          data={props.searchResults}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSpacer}
          contentContainerStyle={useMemo(() => ({ paddingVertical: 10 }), [])}
        />
      </LoaderOrChildren>
    </View>
  )
}

export default memo(connector(InvitePlanMembersScreen))
