import React, { memo } from 'react'
import { View } from 'react-native'
import { EventT } from '../../../../types/Event'
import Text from '../../../Text'

type PropsT = { data: EventT }

const ScheduleItem = (props: PropsT) => {
  return (
    <View>
      <Text weight="regular" lineHeight={20} size={20}>
        {props.data.name}
      </Text>
      <Text weight="regular" lineHeight={15} size={15}>
        {props.data.description}
      </Text>
    </View>
  )
}

export default memo(ScheduleItem)
