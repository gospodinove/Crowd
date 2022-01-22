import React, { memo, useMemo } from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'

type PropsT = TextInputProps

const TextInput = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <RNTextInput
      {...props}
      style={useMemo(
        () => [
          props.style,
          {
            padding: 10,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 5
          }
        ],
        [theme]
      )}
    />
  )
}

export default memo(TextInput)
