import React from 'react'
import { Provider } from 'react-redux'
import Root from './js/components/Root'
import store from './js/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

export default App
