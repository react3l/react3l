import Layout from 'antd/lib/layout';
import * as React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {Switch, withRouter} from 'react-router-dom';

const {Header, Sider, Content, Footer} = Layout;

interface DefaultLayoutProps extends RouteConfigComponentProps {
  className?: string;

  headerClassName?: string;

  contentClassName?: string;

  mainClassName?: string;
}

function DefaultLayout(props: DefaultLayoutProps) {
  const {route, className, contentClassName, headerClassName, mainClassName} = props;

  return (
    <Layout className={className}>
      <Header className={headerClassName}/>
      <Layout className={mainClassName}>
        <Sider theme="dark" collapsible/>
        <Content className={contentClassName}>
          <Switch>
            {route && route.children && renderRoutes(route.children)}
          </Switch>
          <Footer/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(DefaultLayout);
