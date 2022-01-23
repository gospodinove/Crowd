import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'
import { PlanT } from '../../types/Plan'
import { formatDate } from '../../utils/date'
import Text from '../Text'
import VerticalSeparator from '../VerticalSepartor'
import { planItemStyles } from './PlanItem.styles'

type PropsT = { data: PlanT; onPress: (planId: string) => void }

const PlanItem = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      planItemStyles({
        avatarBackgroundColor: props.data.color
      }),
    [props.data.color, theme]
  )

  const onPress = useCallback(
    () => props.onPress(props.data.id),
    [props.data.id, props.onPress]
  )

  const renderAvatar = () => (
    <View style={style.avatar}>
      <FontAwesomeIcon icon={props.data.icon} size={20} color="white" />
    </View>
  )

  const renderPeopleCount = () => (
    <>
      <FontAwesomeIcon icon="user" size={11} color="grey" />
      <Text size={11} weight="regular" lineHeight={20}>
        {props.data.userIds.length}
      </Text>
    </>
  )

  return (
    <Pressable style={style.container} onPress={onPress}>
      {renderAvatar()}

      <View style={style.detailsContainer}>
        <Text size={18} weight="semibold" lineHeight={20}>
          {props.data.name}
        </Text>

        <View style={style.detailsRow}>
          {renderPeopleCount()}

          <VerticalSeparator type="circle" size={3} spacing={5} color="grey" />

          <Text size={11} weight="regular" lineHeight={20}>
            {formatDate(props.data.startDate.toDate())}
          </Text>
          <VerticalSeparator
            type="arrow-right"
            size={11}
            spacing={2}
            color="grey"
          />
          <Text size={11} weight="regular" lineHeight={20}>
            {formatDate(props.data.endDate.toDate())}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default memo(PlanItem)
