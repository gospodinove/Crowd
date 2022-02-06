import { IconNameT } from '../types/IconName'
import { TabNavigatorPropsT } from '../types/TabNavigatorProps'

export const getIconForTab = (
  routeName: keyof TabNavigatorPropsT
): IconNameT => {
  switch (routeName) {
    case 'dashboardTab':
      return 'tachometer-alt'
    case 'plansTab':
      return 'plane-departure'
    case 'notificationsTab':
      return 'bell'
    case 'moreTab':
      return 'bars'
  }
}
