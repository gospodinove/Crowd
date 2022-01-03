import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { PlanT } from '../types/Plan'
import { formatDate } from '../utils/date'
import VerticalSeparator from './VerticalSepartor'

type PropsT = { data: PlanT }

const PlanItem = (props: PropsT) => {
  const renderAvatar = () => (
    <View
      style={useMemo(
        () => ({
          width: 50,
          height: 50,
          backgroundColor: props.data.color,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center'
        }),
        [props.data.color]
      )}
    >
      <FontAwesomeIcon icon={props.data.icon} size={20} color="white" />
    </View>
  )

  const renderPeopleCount = () => (
    <>
      <FontAwesomeIcon icon="user" size={11} color="grey" />
      <Text style={useMemo(() => ({ fontSize: 11, color: 'grey' }), [])}>
        {props.data.userIds.length}
      </Text>
    </>
  )

  return (
    <View
      style={useMemo(
        () => ({
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'center'
        }),
        []
      )}
    >
      {renderAvatar()}

      <View style={useMemo(() => ({ marginHorizontal: 5 }), [])}>
        <Text style={useMemo(() => ({ fontSize: 18, fontWeight: '600' }), [])}>
          {props.data.name}
        </Text>

        <View
          style={useMemo(
            () => ({ flexDirection: 'row', alignItems: 'center' }),
            []
          )}
        >
          {renderPeopleCount()}

          <VerticalSeparator type="circle" size={3} spacing={5} color="grey" />

          <Text style={useMemo(() => ({ fontSize: 11, color: 'grey' }), [])}>
            {formatDate(props.data.startDate.toDate())}
          </Text>
          <VerticalSeparator
            type="arrow-right"
            size={11}
            spacing={2}
            color="grey"
          />
          <Text style={useMemo(() => ({ fontSize: 11, color: 'grey' }), [])}>
            {formatDate(props.data.endDate.toDate())}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default memo(PlanItem)
