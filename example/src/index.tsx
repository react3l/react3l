import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import localization from '@react3l/localization';
import vi from './i18n/vi.json';
import './styles/index.scss'

localization.initialize({
  lng: 'vi',
  fallbackLng: 'vi',
  ns: '',
  defaultNS: '',
}).then(async () => {
  await localization.addLanguage('vi', vi)
  ReactDOM.render(<App/>, document.getElementById('root'))
})
