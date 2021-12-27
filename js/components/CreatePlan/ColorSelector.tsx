import React from 'react'
import { Pressable, ScrollView, View, ViewStyle } from 'react-native'

type PropsT = {
  colors: string[]
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
    {props.colors.map(c => (
      <Pressable key={c} onPress={() => props.onColorPress(c)}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: c,
            marginHorizontal: 5,
            borderColor: 'grey',
            borderWidth: props.selectedColor == c ? 5 : 0
          }}
        />
      </Pressable>
    ))}
  </ScrollView>
)

export default ColorSelector
