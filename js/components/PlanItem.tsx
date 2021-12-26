import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, View } from 'react-native'
import { PlanT } from '../types/Plan'
import { formatDate } from '../utils/date'

type PropsT = { data: PlanT }

const PlanItem = (props: PropsT) => {
  const starDate = new Date(props.data.startDate.seconds)
  const endDate = new Date(props.data.endDate.seconds)

  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center'
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'black',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FontAwesomeIcon icon="plane-departure" size={20} color="white" />
      </View>

      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          {props.data.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon icon="user" size={11} color="grey" />
          <Text style={{ fontSize: 11, color: 'grey' }}>
            {props.data.peopleCount}
          </Text>

          <View
            style={{
              backgroundColor: 'grey',
              width: 3,
              height: 3,
              borderRadius: 5,
              marginHorizontal: 5
            }}
          />

          <Text style={{ fontSize: 11, color: 'grey' }}>
            {formatDate(starDate) + ' - ' + formatDate(endDate)}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PlanItem
