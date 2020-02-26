import Header from '@coreui/react/lib/Header';
import NavbarBrand from '@coreui/react/lib/NavbarBrand';
import Sidebar from '@coreui/react/lib/Sidebar';
import SidebarMinimizer from '@coreui/react/lib/SidebarMinimizer';
import SidebarNav from '@coreui/react/lib/SidebarNav';
import SidebarToggler from '@coreui/react/lib/SidebarToggler';
import {menu} from 'config/menu';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Switch, withRouter} from 'react-router';
import {renderRoutes, RouteConfig, RouteConfigComponentProps} from 'react-router-config';
import * as ReactRouterDOM from 'react-router-dom';
import './CoreUILayout.scss';

interface NavbarBrandLogoProps {
  src: string;

  width?: number;

  height?: number;

  alt?: string;
}

const navbarBrandFull: NavbarBrandLogoProps = {
  src: '/assets/img/brand/logo.svg', width: 89, height: 25,
};

const navbarBrandMinimized: NavbarBrandLogoProps = {
  src: '/assets/img/brand/sygnet.svg', width: 30, height: 30,
};

function CoreUILayout(props: RouteConfigComponentProps) {
  const {route} = props;
  const [translate] = useTranslation();

  const translatedMenu = React.useMemo(() => ({
    items: menu.items.map((route: RouteConfig) => ({
      ...route, name: translate(route.name),
    })),
  }), [translate]);

  return (<>
    <Header fixed className="navbar">
      <NavbarBrand
        full={navbarBrandFull}
        minimized={navbarBrandMinimized}
      />
      <SidebarToggler className="d-md-down-none" display="lg"/>
    </Header>
    <div className="app-body">
      <Sidebar display="lg" fixed>
        <SidebarNav navConfig={translatedMenu} router={ReactRouterDOM}/>
        <SidebarMinimizer/>
      </Sidebar>
      <main className="main">
        <div className="app-content">
          <Switch>
            {route?.routes instanceof Array && renderRoutes(route.routes)}
          </Switch>
        </div>
      </main>
    </div>
  </>);
}

export default withRouter(CoreUILayout);
