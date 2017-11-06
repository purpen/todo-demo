import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import App from './containers/App';
import todoApp from './reducers';



/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);

  let result = next(action);

  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result
};

/**
 * 在 state 更新完成和 listener 被通知之后发送崩溃报告。
 */
const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);

    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });

    throw err
  }
};

let store = createStore(
  todoApp,
  applyMiddleware(logger, crashReporter)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);