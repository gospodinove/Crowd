import React, { memo, useCallback, useMemo, useState } from 'react'
import { Animated, ColorValue, Pressable, View } from 'react-native'
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView
} from 'react-native-tab-view'
import ScrollContainer from './ScrollContainer'
import { tabbedViewStyle } from './TabbedView.styles'

type PropsT = {
  tabs: { key: string; title: string; screen: React.ReactNode }[]
  backgroundColor: ColorValue
}

const TabbedView = (props: PropsT) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const style = useMemo(
    () => tabbedViewStyle({ tabBarBackgroundColor: props.backgroundColor }),
    [props.backgroundColor]
  )

  const renderScene = useCallback(
    SceneMap(
      props.tabs.reduce(
        (result, item) => ({ ...result, [item.key]: item.screen }),
        {}
      )
    ),
    [props.tabs]
  )

  const renderTabBar = useCallback(
    (
      tabProps: SceneRendererProps & {
        navigationState: NavigationState<{ key: string; title: string }>
      }
    ) => {
      const titles = tabProps.navigationState.routes.map(route => route.title)
      const inputRange = tabProps.navigationState.routes.map((_, i) => i)

      return (
        <View style={style.tabBarContainer}>
          <ScrollContainer horizontal showsHorizontalScrollIndicator={false}>
            {titles.map((title, index) => {
              const opacity = tabProps.position.interpolate({
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === index ? 1 : 0.5
                )
              })

              return (
                <Pressable
                  key={index}
                  style={style.tabBarItem}
                  onPress={useCallback(() => setCurrentIndex(index), [index])}
                >
                  <Animated.Text style={[style.tabBarItemTitle, { opacity }]}>
                    {title}
                  </Animated.Text>
                </Pressable>
              )
            })}
          </ScrollContainer>
        </View>
      )
    },
    [currentIndex, props.backgroundColor, style]
  )

  const navigationState = useMemo(
    () => ({
      index: currentIndex,
      routes: props.tabs.map((item, _) => ({
        key: item.key,
        title: item.title
      }))
    }),
    [props.tabs, currentIndex]
  )

  const onIndexChange = useCallback(newIndex => setCurrentIndex(newIndex), [])

  return (
    <TabView
      navigationState={navigationState}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
    />
  )
}

export default memo(TabbedView)
