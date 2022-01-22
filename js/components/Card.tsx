import React, { memo, useMemo } from 'react'
import { View, ViewProps } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { cardStyles } from './Card.styles'

type PropsT = ViewProps & {
  children: JSX.Element[] | null
}

const Card = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      cardStyles({
        backgroundColor: theme.colors.secondaryBackground,
        borderColor: theme.colors.border
      }),
    [theme]
  )

  return <View style={style.container}>{props.children}</View>
}

export default memo(Card)
