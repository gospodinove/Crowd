import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, ScrollView, View, ViewStyle } from 'react-native'
import { planColors } from '../../constants/planColors'

type PropsT = {
  selectedColor: string
  containerStyle?: ViewStyle
  onColorPress: (color: string) => void
}

const ColorSelector = (props: PropsT) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={props.containerStyle}
  >
    {planColors.map(c => (
      <Pressable
        key={c}
        onPress={useCallback(() => props.onColorPress(c), [c])}
      >
        <View
          style={useMemo(
            () => ({
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: c,
              marginHorizontal: 5,
              borderColor: 'grey',
              borderWidth: props.selectedColor == c ? 5 : 0
            }),
            [props.selectedColor, c]
          )}
        />
      </Pressable>
    ))}
  </ScrollView>
)

export default memo(ColorSelector)
