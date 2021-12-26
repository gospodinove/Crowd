/**
 * @format
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBell, faChevronLeft, faChevronRight, faPlaneDeparture, faSignOutAlt, faTachometerAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// add the icons here in order to include them in your project
library.add(faChevronRight, faChevronLeft, faTachometerAlt, faPlaneDeparture, faBell, faBars, faSignOutAlt)

// group icons
library.add(faUsers, faUser)

AppRegistry.registerComponent(appName, () => App);
