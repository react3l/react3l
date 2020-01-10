import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import AdvancedNumberFilter from 'components/AdvancedNumberFilter/AdvancedNumberFilter';

describe('AdvancedNumberFilter', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <AdvancedNumberFilter/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
