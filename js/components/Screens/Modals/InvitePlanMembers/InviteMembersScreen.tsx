import React, { memo, useMemo } from 'react'
import { View } from 'react-native'

const InvitePlanMembersScreen = () => {
  return (
    <View style={useMemo(() => ({ backgroundColor: 'yellow', flex: 1 }), [])} />
  )
}

export default memo(InvitePlanMembersScreen)
