import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import '@shopify/polaris/build/esm/styles.css'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import AppContainer from './AppContainer.jsx'

import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider, Frame } from '@shopify/polaris'

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider i18n={enTranslations}>
        <Frame>
          <AppContainer />
        </Frame>
      </AppProvider>
    </Provider>
  </BrowserRouter>,
)
