import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'

const NotificationsScreen = () => {
  const theme = useAppTheme()

  return (
    <View
      style={useMemo(
        () => ({ backgroundColor: theme.colors.background, flex: 1 }),
        [theme]
      )}
    ></View>
  )
}

export default memo(NotificationsScreen)
