import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import Text from '../../../Text'

type PropsT = { title: string }

const ScheduleSectionHeader = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <Text
      weight="semibold"
      lineHeight={30}
      size={30}
      style={useMemo(
        () => ({ backgroundColor: theme.colors.background }),
        [theme]
      )}
    >
      {props.title}
    </Text>
  )
}

export default memo(ScheduleSectionHeader)
