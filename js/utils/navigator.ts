import { IconNameT } from '../types/IconName'
import { TabNavigatorParamsT } from '../types/TabNavigatorParams'

export const getIconForTab = (
  routeName: keyof TabNavigatorParamsT
): IconNameT => {
  switch (routeName) {
    case 'dashboardStack':
      return 'tachometer-alt'
    case 'plansStack':
      return 'plane-departure'
    case 'notificationsStack':
      return 'bell'
    case 'moreStack':
      return 'bars'
  }
}
