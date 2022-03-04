import React, { memo } from 'react'
import Text from '../../../Text'

type PropsT = { title: string }

const ScheduleSectionHeader = (props: PropsT) => {
  return (
    <Text weight="semibold" lineHeight={30} size={30}>
      {props.title}
    </Text>
  )
}

export default memo(ScheduleSectionHeader)
