import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DateTimePicker, {
  AndroidEvent,
  WindowsDatePickerChangeEvent
} from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { plansSlice } from '../../reducers/plans'
import { assertNever } from '../../utils/assertNever'
import { formatDate } from '../../utils/date'
import Button from '../Button'
import TextInput from '../TextInput'
import VerticalSeparator from '../VerticalSepartor'
import ColorSelector from './ColorSelector'
import IconSelector from './IconSelector'

type DatePickerT = 'start-date' | 'end-date'

const connector = connect(null, { createPlan: plansSlice.actions.create })

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT

const colors = [
  'tomato',
  'maroon',
  'navy',
  'peru',
  'teal',
  'red',
  'blue',
  'green',
  'yellow',
  'pink',
  'purple',
  'bisque'
]

const icons: IconProp[] = [
  'users',
  'user-friends',
  'layer-group',
  'plane',
  'plane-departure',
  'paper-plane',
  'globe',
  'globe-europe',
  'globe-americas',
  'globe-africa',
  'globe-asia',
  'bus',
  'car'
]

const CreatePlanScreen = (props: PropsT) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0])
  const [selectedIcon, setSelectedIcon] = useState<IconProp>(icons[0])

  const [name, setName] = useState('')

  const [isDatePickerShown, setShowDatePicker] = useState(false)
  const [openDatePickerType, setOpenDatePickerType] = useState<
    DatePickerT | undefined
  >(undefined)

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const [datePickerMinDate, setDatePickerMinDate] = useState(new Date())
  const [datePickerValue, setDatePickerValue] = useState(new Date())

  const onStartDatePress = () => {
    if (openDatePickerType === 'start-date') {
      setOpenDatePickerType(undefined)
      setShowDatePicker(false)
      return
    }

    setOpenDatePickerType('start-date')

    setDatePickerMinDate(new Date())
    setDatePickerValue(startDate ?? new Date())

    if (!startDate) {
      setStartDate(datePickerValue)
    }

    setShowDatePicker(true)
  }

  const onEndDatePress = () => {
    if (openDatePickerType === 'end-date') {
      setOpenDatePickerType(undefined)
      setShowDatePicker(false)
      return
    }

    setOpenDatePickerType('end-date')

    setDatePickerMinDate(startDate ?? new Date())
    setDatePickerValue(endDate ?? startDate ?? new Date())

    if (!endDate) {
      setEndDate(datePickerValue)
    }

    setShowDatePicker(true)
  }

  const onDatePickerChange = (
    _: WindowsDatePickerChangeEvent | AndroidEvent,
    date?: Date
  ) => {
    if (!date) {
      return
    }

    setDatePickerValue(date)

    switch (openDatePickerType) {
      case 'start-date':
        setStartDate(date)
        break
      case 'end-date':
        setEndDate(date)
        break
      case undefined:
        break
      default:
        assertNever(openDatePickerType)
    }
  }

  const onCreateButtonPress = () => {
    // validation

    if (!startDate || !endDate || !name.length) {
      return
    }

    props.createPlan({
      name,
      color: selectedColor,
      icon: selectedIcon.toString(),
      startDate,
      endDate
    })
  }

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 20,
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: selectedColor,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FontAwesomeIcon icon={selectedIcon} size={35} color="black" />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              marginLeft: 10
            }}
          >
            <TextInput
              placeholder="Name"
              style={{ height: 40 }}
              onChangeText={text => setName(text)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Button
                text={startDate ? formatDate(startDate) : 'Start date'}
                type="text"
                size="small"
                onPress={onStartDatePress}
              />
              <VerticalSeparator
                type="arrow-right"
                size={12}
                spacing={5}
                color="black"
              />
              <Button
                text={endDate ? formatDate(endDate) : 'End date'}
                type="text"
                size="small"
                onPress={onEndDatePress}
              />
            </View>
          </View>
        </View>

        {isDatePickerShown ? (
          <DateTimePicker
            value={datePickerValue}
            mode="date"
            display="spinner"
            minimumDate={datePickerMinDate}
            onChange={onDatePickerChange}
          />
        ) : null}

        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          containerStyle={{
            paddingHorizontal: 20,
            marginTop: 20
          }}
          onColorPress={color => setSelectedColor(color)}
        />

        <IconSelector
          icons={icons}
          selectedIcon={selectedIcon}
          containerStyle={{
            paddingHorizontal: 20,
            marginTop: 20
          }}
          onIconPress={icon => setSelectedIcon(icon)}
        />
      </ScrollView>
      <Button
        text="Create"
        type="primary"
        size="large"
        style={{ marginHorizontal: 20, marginBottom: 20 }}
      />
    </>
  )
}

export default CreatePlanScreen
