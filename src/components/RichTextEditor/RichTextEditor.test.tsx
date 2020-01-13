import {configTests} from 'helpers/config-tests';
import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import RichTextEditor from './RichTextEditor';

describe('RichTextEditor', () => {
  it('renders without crashing', () => {
    configTests()
      .then(() => {
        const div = document.createElement('div');
        ReactDOM.render(
          <MemoryRouter>
            <RichTextEditor/>
          </MemoryRouter>,
          div,
        );
        ReactDOM.unmountComponentAtNode(div);
      });
  });
});
