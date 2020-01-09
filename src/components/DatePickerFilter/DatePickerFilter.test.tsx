import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePickerFilter from './DatePickerFilter';

describe('DatePickerFilter', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
      <DatePickerFilter/>
      </MemoryRouter>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

