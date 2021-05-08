import { Button, Form, Input, InputNumber, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import './styles.scss';

function SendTransaction(): JSX.Element {
  const handleSubmit = () => {
    //Todo: call api
    message.success('Successful sent');
  };

  return (
    <Form onFinish={handleSubmit}>
      <Title level={2}>Send Transaction</Title>
      <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input address!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Please input amount!' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginLeft: 74 }}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SendTransaction;
