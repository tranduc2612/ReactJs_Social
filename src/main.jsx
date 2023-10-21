import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './components/GlobalStyle/index.jsx'
import { Provider } from "react-redux";
import store from './redux/store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>,
  {/* </React.StrictMode>, */ }
)
