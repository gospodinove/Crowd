import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
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
    <Card style={style.card}>
      <Icon name="bell" size={15} color="icon" style={style.icon} />
      <Text weight="semibold" size={15} lineHeight={15}>
        {props.data.title}
      </Text>
    </Card>
  )
}

const style = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 15 }
})

export default memo(NotificationItem)
