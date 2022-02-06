import { NavigatorScreenParams } from '@react-navigation/core'
import { CreatePlanNavigatorParamsT } from '../components/Screens/Modals/CreatePlan/CreatePlanNavigator'
import { InvitePlanMembersNavigatorParamsT } from '../components/Screens/Modals/InvitePlanMembers/InvitePlanMembersNavigator'

export type ModalScreensParamsT = {
  createPlanStack: NavigatorScreenParams<CreatePlanNavigatorParamsT>
  invitePlanMembersStack: NavigatorScreenParams<InvitePlanMembersNavigatorParamsT>
}
