import { IconNameT } from '../types/IconName'
import { TabNavigatorPropsT } from '../types/TabNavigatorProps'

export const getIconForTab = (
  routeName: keyof TabNavigatorPropsT
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
