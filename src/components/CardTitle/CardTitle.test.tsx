import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import CardTitle from 'components/CardTitle/CardTitle';

describe('CardTitle', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
      <CardTitle/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

