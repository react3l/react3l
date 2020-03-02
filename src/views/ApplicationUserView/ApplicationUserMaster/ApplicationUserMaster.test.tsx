import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';

import ApplicationUserMaster from 'views/ApplicationUserView/ApplicationUserMaster/ApplicationUserMaster';

describe('ApplicationUserMaster', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <ApplicationUserMaster/>
            </MemoryRouter>,
            div,
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
