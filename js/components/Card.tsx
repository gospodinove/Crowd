import React, { memo, ReactElement, useMemo } from 'react'
import { View, ViewProps } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { cardStyles } from './Card.styles'

type PropsT = ViewProps & {
  children: ReactElement | ReactElement[] | undefined | null
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

  return (
    <View style={useMemo(() => [props.style, style.container], [props.style])}>
      {props.children}
    </View>
  )
}

export default memo(Card)
