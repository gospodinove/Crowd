import React, { memo, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { PlanT } from '../../../types/Plan'
import { formatDate } from '../../../utils/date'
import Icon from '../../Icon'
import Text from '../../Text'
import VerticalSeparator from '../../VerticalSepartor'

type PropsT = { data: PlanT; onPress: (planId: string) => void }

const PlanItem = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'center'
        },
        avatar: {
          width: 50,
          height: 50,
          backgroundColor: props.data.color,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center'
        },
        detailsContainer: {
          marginHorizontal: 5
        },
        detailsRow: {
          flexDirection: 'row',
          alignItems: 'center'
        }
      }),
    [props.data.color, theme]
  )

  const onPress = useCallback(
    () => props.onPress(props.data.id),
    [props.data.id, props.onPress]
  )

  const renderAvatar = () => (
    <View style={style.avatar}>
      <Icon name={props.data.icon} size={20} color="white" />
    </View>
  )

  const renderPeopleCount = () => (
    <>
      <Icon name="user" size={11} color="grey" />
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
