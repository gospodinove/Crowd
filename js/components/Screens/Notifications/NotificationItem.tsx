import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { NotificationT } from '../../../types/Notification'
import Card from '../../Card'
import Icon from '../../Icon'
import Text from '../../Text'

type PropsT = {
  data: NotificationT
}

const NotificationItem = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <Card style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon
        name="bell"
        size={15}
        color={theme.colors.icon}
        style={useMemo(() => ({ marginRight: 15 }), [])}
      />
      <View style={useMemo(() => ({ flex: 1 }), [])}>
        <Text weight="semibold" size={15} lineHeight={15}>
          {props.data.title}
        </Text>
      </View>
      <Icon
        // TODO: add X icon
        name="plus"
        size={15}
        color={theme.colors.icon}
        style={useMemo(() => ({ alignSelf: 'flex-start' }), [])}
      />
    </Card>
  )
}

export default memo(NotificationItem)
