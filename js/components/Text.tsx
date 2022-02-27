import React, { memo, useMemo } from 'react'
import { Text as RNText } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { TextPropsT } from '../types/TextProps'

const Text = (props: TextPropsT) => {
  const theme = useAppTheme()

  return (
    <RNText
      {...props}
      numberOfLines={props.numberOfLines ?? 1}
      style={useMemo(
        () => [
          {
            color: props.color ? theme.colors[props.color] : theme.colors.text,
            fontWeight: props.weight === 'regular' ? '400' : '600',
            fontSize: props.size,
            lineHeight: props.lineHeight
          },
          props.style
        ],
        [
          theme,
          props.weight,
          props.size,
          props.color,
          props.lineHeight,
          props.style
        ]
      )}
    >
      {props.children}
    </RNText>
  )
}

export default memo(Text)
