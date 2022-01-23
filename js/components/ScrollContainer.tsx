import React, { memo, useCallback, useState } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type PropsT = Omit<
  ScrollViewProps,
  'onContentSizeChange' | 'scrollEnabled' | 'keyboardShouldPersistTaps'
> & { children: (JSX.Element | null)[] }

// Scroll view that doesn't scroll unless its content goes out of its bounds
const ScrollContainer = (props: PropsT) => {
  const [contentDimensionOfInterest, setContentDimensionOfInterest] =
    useState(0)
  const [dimensionOfInterest, setDimensionOfInterest] = useState(0)

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={contentDimensionOfInterest > dimensionOfInterest}
      onContentSizeChange={useCallback(
        (w, h) => {
          setContentDimensionOfInterest(props.horizontal ? w : h)
        },
        [props.horizontal]
      )}
      onLayout={useCallback(
        event =>
          setDimensionOfInterest(
            props.horizontal
              ? event.nativeEvent.layout.width
              : event.nativeEvent.layout.height
          ),
        [props.horizontal]
      )}
      {...props}
    >
      {props.children}
    </ScrollView>
  )
}

export default memo(ScrollContainer)
