/**
 * @format
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBell, faBus, faCar, faChevronLeft, faChevronRight, faGlobe, faGlobeAfrica, faGlobeAmericas, faGlobeAsia, faGlobeEurope, faLayerGroup, faPaperPlane, faPlane, faPlaneDeparture, faPlus, faSignOutAlt, faTachometerAlt, faUser, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// add the icons here in order to include them in your project
library.add(faChevronRight, faChevronLeft, faTachometerAlt, faPlaneDeparture, faBell, faBars, faSignOutAlt, faPlus, faUser)

// group icons
library.add(faUsers, faUserFriends, faLayerGroup, faPlane, faPaperPlane, faGlobe, faGlobeEurope, faGlobeAfrica, faGlobeAmericas, faGlobeAsia, faBus, faCar)

AppRegistry.registerComponent(appName, () => App);
