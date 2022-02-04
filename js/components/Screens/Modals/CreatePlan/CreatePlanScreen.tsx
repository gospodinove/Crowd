import DateTimePicker, {
  AndroidEvent,
  WindowsDatePickerChangeEvent
} from '@react-native-community/datetimepicker'
import firestore from '@react-native-firebase/firestore'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { planColors } from '../../../../constants/planColors'
import { planIcons } from '../../../../constants/planIcons'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { plansSlice } from '../../../../reducers/plans'
import { RootState } from '../../../../redux/store'
import { IconNameT } from '../../../../types/IconName'
import { ModalScreensParamsT } from '../../../../types/ModalScreensParams'
import { assertNever } from '../../../../utils/assertNever'
import { formatDate } from '../../../../utils/date'
import { createPlanLoader } from '../../../../utils/loaders'
import Button from '../../../Button'
import Icon from '../../../Icon'
import ScrollContainer from '../../../ScrollContainer'
import TextInput from '../../../TextInput'
import VerticalSeparator from '../../../VerticalSepartor'
import ColorSelector from './ColorSelector'
import IconSelector from './IconSelector'

type DatePickerT = 'start-date' | 'end-date'

const connector = connect(
  (state: RootState) => ({
    userId: state.users.currentUser?.id,
    isLoading: state.loaders.runningLoaders[createPlanLoader]
  }),
  { createPlan: plansSlice.actions.create }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type NavigationPropsT = StackScreenProps<ModalScreensParamsT, 'createPlan'>

type PropsT = ReduxPropsT & NavigationPropsT

const CreatePlanScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const [selectedColor, setSelectedColor] = useState<string>(planColors[0])
  const [selectedIcon, setSelectedIcon] = useState<IconNameT>(planIcons[0])

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
    // TODO: validation

    if (!startDate || !endDate || !name.length || !props.userId) {
      return
    }

    props.createPlan({
      name,
      color: selectedColor,
      icon: selectedIcon,
      startDate: firestore.Timestamp.fromDate(startDate),
      endDate: firestore.Timestamp.fromDate(endDate),
      userIds: [props.userId]
    })

    props.navigation.goBack()
  }

  return (
    <View
      style={useMemo(
        () => ({ backgroundColor: theme.colors.background, flex: 1 }),
        [theme]
      )}
    >
      <ScrollContainer>
        <View
          style={useMemo(
            () => ({
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 20,
              alignItems: 'center'
            }),
            []
          )}
        >
          <View
            style={useMemo(
              () => ({
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: selectedColor,
                justifyContent: 'center',
                alignItems: 'center'
              }),
              [selectedColor]
            )}
          >
            <Icon name={selectedIcon} size={35} color={theme.colors.black} />
          </View>
          <View
            style={useMemo(
              () => ({
                flex: 1,
                alignItems: 'stretch',
                marginLeft: 10
              }),
              []
            )}
          >
            <TextInput
              placeholder="Name"
              style={useMemo(() => ({ height: 40 }), [])}
              onChangeText={useCallback(text => setName(text), [])}
            />
            <View
              style={useMemo(
                () => ({ flexDirection: 'row', alignItems: 'center' }),
                []
              )}
            >
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
                color={theme.colors.text}
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
          selectedColor={selectedColor}
          containerStyle={useMemo(
            () => ({
              paddingHorizontal: 20,
              marginTop: 20
            }),
            []
          )}
          onColorPress={useCallback(color => setSelectedColor(color), [])}
        />

        <IconSelector
          selectedIcon={selectedIcon}
          containerStyle={useMemo(
            () => ({
              paddingHorizontal: 20,
              marginTop: 20
            }),
            []
          )}
          onIconPress={useCallback(icon => setSelectedIcon(icon), [])}
        />
      </ScrollContainer>
      <Button
        text="Create"
        type="primary"
        size="large"
        isLoading={props.isLoading}
        style={useMemo(() => ({ marginHorizontal: 20, marginBottom: 20 }), [])}
        onPress={onCreateButtonPress}
      />
    </View>
  )
}

export default memo(connector(CreatePlanScreen))
