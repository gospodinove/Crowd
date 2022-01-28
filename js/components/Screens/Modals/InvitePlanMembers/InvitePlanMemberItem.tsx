import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { UserT } from '../../../../types/User'
import Text from '../../../Text'

type PropsT = {
  user: UserT
}

const InvitePlanMemberItem = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <View
      style={useMemo(
        () => ({
          flexDirection: 'row',
          alignItems: 'center'
        }),
        []
      )}
    >
      <View
        style={useMemo(
          () => ({
            marginRight: 10,
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: theme.colors.grey,
            justifyContent: 'center',
            alignItems: 'center'
          }),
          [theme]
        )}
      >
        <Text
          weight="semibold"
          size={20}
          lineHeight={25}
          color={theme.colors.white}
        >
          {props.user.firstName[0] + props.user.lastName[0]}
        </Text>
      </View>
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
    </View>
  )
}

export default memo(InvitePlanMemberItem)
