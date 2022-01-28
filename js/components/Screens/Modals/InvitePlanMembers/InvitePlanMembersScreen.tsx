import { debounce } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { usersSlice } from '../../../../reducers/users'
import { RootState } from '../../../../redux/store'
import { UserT } from '../../../../types/User'
import { inviteMembersSearch } from '../../../../utils/loaders'
import LoaderOrChildren from '../../../LoaderOrChildren'
import TextInput from '../../../TextInput'
import InvitePlanMemberItem from './InvitePlanMemberItem'

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

  const [selectedAccounts, setSelectedAccounts] = useState<UserT[]>([])

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

  const renderItem = useCallback(
    (data: ListRenderItemInfo<UserT>) => (
      <InvitePlanMemberItem user={data.item} />
    ),
    []
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
      <TextInput
        placeholder="Search by email"
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoFocus
        autoCorrect={false}
      />

      <LoaderOrChildren
        isLoading={props.isLoading}
        color={theme.colors.grey}
        size="large"
        containerStyle={useMemo(() => ({ marginVertical: 20 }), [])}
      >
        <FlatList
          data={props.searchResults}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSpacer}
        />
      </LoaderOrChildren>
    </View>
  )
}

export default memo(connector(InvitePlanMembersScreen))
