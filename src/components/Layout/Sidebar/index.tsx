import { DollarOutlined, HistoryOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import 'components/Layout/Sidebar/styles.scss';
import React from 'react';
import { useHistory } from 'react-router';

interface ISidebar {
  selectedKey: string;
  onSelectKey: (selectedKeys: { selectedKeys?: React.Key[] }) => void;
}

function Sidebar(props: ISidebar): JSX.Element {
  const { selectedKey, onSelectKey } = props;
  const history = useHistory();

  return (
    <>
      <div className="logo" />
      <Menu
        className="sidebar-menu"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        onSelect={onSelectKey}
      >
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => history.push('/dashboard')}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<DollarOutlined />} onClick={() => history.push('/send-transaction')}>
          Send Transaction
        </Menu.Item>
        <Menu.Item key="3" icon={<HistoryOutlined />} onClick={() => history.push('/history-transaction')}>
          Transaction History
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidebar;
