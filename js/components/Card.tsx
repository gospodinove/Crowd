import React, { memo, ReactElement, useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'

type PropsT = ViewProps & {
  children: ReactElement | ReactElement[] | undefined | null
}

const Card = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.secondaryBackground,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10
        }
      }),
    [theme]
  )

  return (
    <View
      style={useMemo(
        () => [props.style, style.container],
        [props.style, style.container]
      )}
    >
      {props.children}
    </View>
  )
}

export default memo(Card)
