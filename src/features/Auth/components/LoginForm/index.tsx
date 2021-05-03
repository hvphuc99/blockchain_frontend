import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ILoginValues {
  privateKey: string;
}

const initialValues: ILoginValues = {
  privateKey: '',
};

interface IProps {
  form: FormInstance;
  isSubmitting: boolean;
  onSubmit: (values: ILoginValues) => void;
}

function LoginForm(props: IProps): JSX.Element {
  const { form, isSubmitting, onSubmit } = props;

  return (
    <Form form={form} name="login" initialValues={initialValues} onFinish={onSubmit}>
      <p className="label required">Private Key</p>
      <Form.Item name="privateKey" rules={[{ required: true, message: 'Please input password!' }]}>
        <Input.Password size="large" autoComplete="on" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-100" size="large" loading={isSubmitting}>
        Log in
      </Button>
      <p className="mt-3 mb-0 text-center">
        Don&apos;t have a private key yet? <Link to="/register">Create</Link>
      </p>
    </Form>
  );
}

export default LoginForm;
