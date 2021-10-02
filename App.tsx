import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import AuthenticationNavigator from './js/components/AuthenticationNavigator'
import UserNavigator from './js/components/UserNavigator'
import store from './js/redux/store'
import { TabNavigatorParamsT } from './js/types/TabNavigatorParams'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="userStack"
          screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="userStack"
            component={UserNavigator}
            options={{ title: 'User' }}
          />
          <Tab.Screen
            name="authenticationStack"
            component={AuthenticationNavigator}
            options={{ title: 'Login' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
