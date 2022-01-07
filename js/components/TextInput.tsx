import React, { memo, useMemo } from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native'

type PropsT = TextInputProps

const TextInput = (props: PropsT) => {
  return (
    <RNTextInput
      {...props}
      style={useMemo(
        () => [
          props.style,
          {
            padding: 10,
            borderWidth: 1,
            borderColor: '#ededed',
            borderRadius: 5
          }
        ],
        []
      )}
    />
  )
}

export default memo(TextInput)
