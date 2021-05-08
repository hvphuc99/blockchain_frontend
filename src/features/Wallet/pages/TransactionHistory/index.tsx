import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import './styles.scss';

function TransactionHistory(): JSX.Element {
  return (
    <>
      <Title level={2}>Transaction History</Title>
      <Row>
        <Col span={12} style={{ paddingRight: 10 }}>
          <div className="history-container">
            <div className="history-container__title">
              <Title level={5} style={{ margin: 0 }}>
                Latest Blocks
              </Title>
            </div>
            <div className="history-container__body">
              <span>Block 1</span>
            </div>
          </div>
        </Col>
        <Col span={12} style={{ paddingLeft: 10 }}>
          <div className="history-container">
            <div className="history-container__title">
              <Title level={5} style={{ margin: 0 }}>
                Latest Transactions
              </Title>
            </div>
            <div className="history-container__body">
              <span>Block 1</span>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default TransactionHistory;
