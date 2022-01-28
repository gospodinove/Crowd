import { debounce } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { usersSlice } from '../../../../reducers/users'
import { RootState } from '../../../../redux/store'
import { UserT } from '../../../../types/User'
import TextInput from '../../../TextInput'

const connector = connect(
  (state: RootState) => ({
    searchResults: state.users.searchResults,
    loading: false
  }),
  {
    search: usersSlice.actions.search
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

const InvitePlanMembersScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const [selectedAccounts, setSelectedAccounts] = useState<UserT[]>([])

  const onChangeText = useCallback(
    debounce((text: string) => props.search(text), 300),
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
      />

      <FlatList
        data={props.searchResults}
        keyExtractor={(_, i) => i.toString()}
        renderItem={item => <Text>{item.item.email}</Text>}
      />
    </View>
  )
}

export default memo(connector(InvitePlanMembersScreen))
