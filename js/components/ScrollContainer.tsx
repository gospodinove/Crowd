import React, { memo, useCallback, useState } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

type PropsT = Omit<
  ScrollViewProps,
  'onContentSizeChange' | 'scrollEnabled' | 'keyboardShouldPersistTaps'
> & { children: (JSX.Element | null)[] }

// Scroll view that doesn't scroll unless its content goes out of its bounds
const ScrollContainer = (props: PropsT) => {
  const [scrollContentHeight, setScrollContentHeight] = useState(0)
  const [scrollViewHeight, setScrollViewHeight] = useState(0)

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={scrollContentHeight > scrollViewHeight}
      onContentSizeChange={useCallback((_, h) => setScrollContentHeight(h), [])}
      onLayout={useCallback(
        event => setScrollViewHeight(event.nativeEvent.layout.height),
        []
      )}
      {...props}
    >
      {props.children}
    </ScrollView>
  )
}

export default memo(ScrollContainer)
