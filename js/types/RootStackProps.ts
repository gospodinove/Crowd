import { NavigatorScreenParams } from '@react-navigation/core'
import { ModalsNavigatorPropsT } from './ModalsNavigatorProps'

export type RootStackPropsT = {
  modals: NavigatorScreenParams<ModalsNavigatorPropsT>
  tab: undefined
}
