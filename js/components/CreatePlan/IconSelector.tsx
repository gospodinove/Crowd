import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'
import { planIcons } from '../../constants/planIcons'
import { useAppTheme } from '../../hooks/useAppTheme'

type PropsT = {
  selectedIcon: IconProp
  containerStyle?: ViewStyle
  onIconPress: (icon: IconProp) => void
}

const IconSelector = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <View
      style={useMemo(
        () => [
          props.containerStyle,
          {
            flexWrap: 'wrap',
            flexDirection: 'row'
          }
        ],
        [props.containerStyle]
      )}
    >
      {planIcons.map(i => (
        <View
          key={i.toString()}
          style={useMemo(
            () => ({
              flexBasis: '20%',
              alignItems: 'center'
            }),
            []
          )}
        >
          <Pressable
            style={useMemo(
              () => ({
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor:
                  i == props.selectedIcon ? theme.colors.card : undefined,
                justifyContent: 'center',
                alignItems: 'center'
              }),
              [props.selectedIcon, i, theme]
            )}
            onPress={useCallback(() => props.onIconPress(i), [i])}
          >
            <FontAwesomeIcon icon={i} size={30} color={theme.colors.icon} />
          </Pressable>
        </View>
      ))}
    </View>
  )
}

export default memo(IconSelector)
