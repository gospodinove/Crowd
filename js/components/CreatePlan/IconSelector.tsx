import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, View, ViewStyle } from 'react-native'
import { planIcons } from '../../constants/planIcons'

type PropsT = {
  selectedIcon: IconProp
  containerStyle?: ViewStyle
  onIconPress: (icon: IconProp) => void
}

const IconSelector = (props: PropsT) => (
  <View
    style={[
      props.containerStyle,
      {
        flexWrap: 'wrap',
        flexDirection: 'row'
      }
    ]}
  >
    {planIcons.map(i => (
      <View
        key={i.toString()}
        style={{
          flexBasis: '20%',
          alignItems: 'center'
        }}
      >
        <Pressable
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: i == props.selectedIcon ? '#ddd' : undefined,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => props.onIconPress(i)}
        >
          <FontAwesomeIcon icon={i} size={30} color="black" />
        </Pressable>
      </View>
    ))}
  </View>
)

export default IconSelector
