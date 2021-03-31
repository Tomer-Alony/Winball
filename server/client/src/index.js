import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import Theme from './Theme';

import App from './components/App';
import reducers from './reducers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
window.axios = axios;

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root')
);