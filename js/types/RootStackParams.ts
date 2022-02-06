import { NavigatorScreenParams } from '@react-navigation/core'
import { ModalsNavigatorParamsT } from '../components/Screens/Modals/ModalsNavigator'

export type RootStackParamsT = {
  modals: NavigatorScreenParams<ModalsNavigatorParamsT>
  tab: undefined
}
