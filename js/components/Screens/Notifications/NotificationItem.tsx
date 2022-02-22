import React, { memo, useMemo } from 'react'
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
      <Text weight="semibold" size={15} lineHeight={15}>
        {props.data.title}
      </Text>
    </Card>
  )
}

export default memo(NotificationItem)
