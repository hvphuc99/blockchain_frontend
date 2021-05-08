import { Layout, message } from 'antd';
import { removePrivateKey } from 'app/userSlice';
import 'components/Layout/styles.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { includes } from 'lodash';

const { Header, Sider, Content } = Layout;

function MainLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>('1');

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const { pathname } = location;
    if (includes(pathname, 'dashboard')) {
      setSelectedKey('1');
    } else if (includes(pathname, 'sendTransaction')) {
      setSelectedKey('2');
    } else if (includes(pathname, 'transactionHistory')) {
      setSelectedKey('3');
    }
  }, []);

  const handleSelectKey = ({ selectedKeys = [] }: { selectedKeys?: React.Key[] }): void => {
    const key = selectedKeys[0];
    if (key === '1') {
      history.push('/dashboard');
      setSelectedKey(key);
    } else if (key === '2') {
      history.push('/sendTransaction');
      setSelectedKey(key);
    } else if (key === '3') {
      history.push('/transactionHistory');
      setSelectedKey(key);
    }
  };

  const toggleCollapsedSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  const handleLogout = () => {
    dispatch(removePrivateKey());
    message.success('Successful logged out');
  };

  return (
    <Layout>
      <Sider className="sider-sidebar" theme="light" trigger={null} collapsible collapsed={collapsedSidebar}>
        <Sidebar selectedKey={selectedKey} onSelectKey={handleSelectKey} />
      </Sider>
      <Layout>
        <Header className="site-layout-header" style={{ padding: 0 }}>
          <Navbar collapsed={collapsedSidebar} toggle={toggleCollapsedSidebar} onLogout={handleLogout} />
        </Header>
        <Content className="site-layout-content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
