import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { TabNavigatorParamsT } from '../types/TabNavigatorParams'

export const getIconForTab = (
  routeName: keyof TabNavigatorParamsT
): IconProp => {
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
