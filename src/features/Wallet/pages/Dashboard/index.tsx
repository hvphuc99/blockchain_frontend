import { AuditOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import { RootState } from 'app/store';
import 'features/Wallet/pages/Dashboard/styles.scss';
import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard(): JSX.Element {
  const { publicKey } = useSelector((state: RootState) => state.user);

  return (
    <Row>
      <Col span={12} className="col-dashboard__left">
        <div className="card-dashboard" style={{ backgroundColor: '#7070E3' }}>
          <AuditOutlined style={{ fontSize: 40, color: 'white' }} />
          <div className="card-dashboard__content">
            <Title level={4}>Address</Title>
            <span>{publicKey}</span>
          </div>
        </div>
      </Col>
      <Col span={12} className="col-dashboard__right">
        <div className="card-dashboard" style={{ backgroundColor: '#25B0E8' }}>
          <CreditCardOutlined style={{ fontSize: 40, color: 'white' }} />
          <div className="card-dashboard__content">
            <Title level={4} style={{ margin: 0 }}>
              Balance
            </Title>
            <span style={{ fontSize: 40 }}>0</span>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Dashboard;
