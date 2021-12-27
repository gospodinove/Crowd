import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, View } from 'react-native'
import { PlanT } from '../types/Plan'
import { formatDate } from '../utils/date'
import VerticalSeparator from './VerticalSepartor'

type PropsT = { data: PlanT }

const PlanItem = (props: PropsT) => {
  const starDate = new Date(props.data.startDate.seconds * 1000)
  const endDate = new Date(props.data.endDate.seconds * 1000)

  const renderAvatar = () => (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: props.data.color,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <FontAwesomeIcon icon={props.data.icon} size={20} color="white" />
    </View>
  )

  const renderPeopleCount = () => (
    <>
      <FontAwesomeIcon icon="user" size={11} color="grey" />
      <Text style={{ fontSize: 11, color: 'grey' }}>
        {props.data.peopleCount}
      </Text>
    </>
  )

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
      }}
    >
      {renderAvatar()}

      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          {props.data.name}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderPeopleCount()}

          <VerticalSeparator type="circle" size={3} spacing={5} color="grey" />

          <Text style={{ fontSize: 11, color: 'grey' }}>
            {formatDate(starDate)}
          </Text>
          <VerticalSeparator
            type="arrow-right"
            size={11}
            spacing={2}
            color="grey"
          />
          <Text style={{ fontSize: 11, color: 'grey' }}>
            {formatDate(endDate)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PlanItem
