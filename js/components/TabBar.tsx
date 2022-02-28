import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { memo, useCallback, useMemo } from 'react'
import { Animated, ColorValue, Pressable, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import ScrollContainer from './ScrollContainer'

type PropsT = MaterialTopTabBarProps & {
  backgroundColor: ColorValue | undefined
  titles: string[]
}

function TabBar(props: PropsT) {
  const theme = useAppTheme()

  const inputRange = useMemo(
    () => props.state.routes.map((_, i) => i),
    [props.state.routes.length]
  )

  const style = useMemo(
    () =>
      StyleSheet.create({
        tabBarItem: {
          paddingHorizontal: 20,
          justifyContent: 'center'
        },
        tabBarItemName: { color: theme.colors.white, fontWeight: '600' }
      }),
    [theme]
  )

  const renderTabs = useCallback(
    () =>
      props.state.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex =>
            inputIndex === i ? 1 : 0.5
          )
        })

        return (
          <Pressable
            key={i}
            style={style.tabBarItem}
            onPress={() => props.navigation.navigate(route.name)}
          >
            <Animated.Text style={[{ opacity }, style.tabBarItemName]}>
              {props.titles[i]}
            </Animated.Text>
          </Pressable>
        )
      }),
    [
      props.state.routes,
      style.tabBarItem,
      props.navigation.navigate,
      style.tabBarItemName
    ]
  )

  return (
    <View
      style={useMemo(
        () => ({ height: 40, backgroundColor: props.backgroundColor }),
        [props.backgroundColor]
      )}
    >
      <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
        {renderTabs()}
      </ScrollContainer>
    </View>
  )
}

export default memo(TabBar)
