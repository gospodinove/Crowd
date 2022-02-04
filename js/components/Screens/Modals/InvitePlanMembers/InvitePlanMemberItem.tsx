import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { UserT } from '../../../../types/User'
import Text from '../../../Text'
import UserInitials from '../../../UserInitials'

type PropsT = {
  user: UserT
  isSelected: boolean
  onPress: (user: UserT) => void
}

const InvitePlanMemberItem = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <Pressable
      style={useMemo(
        () => ({
          flexDirection: 'row',
          alignItems: 'center'
        }),
        []
      )}
      onPress={useCallback(
        () => props.onPress(props.user),
        [props.onPress, props.user]
      )}
    >
      <UserInitials
        user={props.user}
        backgroundColor={
          props.isSelected ? theme.colors.primary : theme.colors.grey
        }
        textColor={theme.colors.white}
        containerStyle={useMemo(() => ({ marginRight: 10 }), [])}
      />
      <View>
        <Text weight="regular" size={15} lineHeight={20}>
          {props.user.firstName + ' ' + props.user.lastName}
        </Text>
        <Text
          weight="regular"
          size={12}
          lineHeight={15}
          color={theme.colors.grey}
        >
          {props.user.email}
        </Text>
      </View>
    </Pressable>
  )
}

export default memo(InvitePlanMemberItem)
