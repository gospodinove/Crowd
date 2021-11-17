/**
 * @format
 */

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faBell, faChevronLeft, faChevronRight, faPlaneDeparture, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// add the icons here in order to include them in your project
library.add(faChevronRight, faChevronLeft, faTachometerAlt, faPlaneDeparture, faBell, faBars)

AppRegistry.registerComponent(appName, () => App);
