import React, { memo, useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'

// TODO: Design that baby
const SplashScreen = () => {
  return (
    <View
      style={useMemo(
        () => ({
          flex: 1,
          backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center'
        }),
        []
      )}
    >
      <ActivityIndicator animating size="large" color="black" />
    </View>
  )
}

export default memo(SplashScreen)
