import { debounce } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { usersSlice } from '../../../../reducers/users'
import { RootState } from '../../../../redux/store'
import { UserT } from '../../../../types/User'
import { inviteMembersSearch } from '../../../../utils/loaders'
import LoaderOrChildren from '../../../LoaderOrChildren'
import TextInput from '../../../TextInput'

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

      <LoaderOrChildren isLoading={props.isLoading} color="grey" size="large">
        <FlatList
          data={props.searchResults}
          renderItem={item => <Text>{item.item.email}</Text>}
        />
      </LoaderOrChildren>
    </View>
  )
}

export default memo(connector(InvitePlanMembersScreen))
