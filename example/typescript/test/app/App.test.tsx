import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/app/App';

describe('<App />', () => {
  test('renders without exploding', () => {
    ReactDOM.render(<App />, document.createElement('div'));
  });
});
