import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useTheme } from '@react-navigation/native'
import React, { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { PlanT } from '../types/Plan'
import { formatDate } from '../utils/date'
import { planItemStyles } from './PlanItem.styles'
import VerticalSeparator from './VerticalSepartor'

type PropsT = { data: PlanT }

const PlanItem = (props: PropsT) => {
  const theme = useTheme()

  const style = useMemo(
    () =>
      planItemStyles({
        avatarBackgroundColor: props.data.color,
        textColor: theme.colors.text
      }),
    [props.data.color, theme]
  )

  const renderAvatar = () => (
    <View style={style.avatar}>
      <FontAwesomeIcon icon={props.data.icon} size={20} color="white" />
    </View>
  )

  const renderPeopleCount = () => (
    <>
      <FontAwesomeIcon icon="user" size={11} color="grey" />
      <Text style={style.peopleCountNumber}>{props.data.userIds.length}</Text>
    </>
  )

  return (
    <View style={style.container}>
      {renderAvatar()}

      <View style={style.detailsContainer}>
        <Text style={style.name}>{props.data.name}</Text>

        <View style={style.detailsRow}>
          {renderPeopleCount()}

          <VerticalSeparator type="circle" size={3} spacing={5} color="grey" />

          <Text style={style.date}>
            {formatDate(props.data.startDate.toDate())}
          </Text>
          <VerticalSeparator
            type="arrow-right"
            size={11}
            spacing={2}
            color="grey"
          />
          <Text style={style.date}>
            {formatDate(props.data.endDate.toDate())}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default memo(PlanItem)
