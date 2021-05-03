import { Card, Form } from 'antd';
import LoginForm, { ILoginValues } from 'features/Auth/components/LoginForm';
import 'features/Auth/pages/Login/styles.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Login(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dispatch = useDispatch();

  const [loginForm] = Form.useForm();

  const handleLogin = (values: ILoginValues) => {
    setIsSubmitting(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
      <Card className="container-auth__card">
        <h2 className="font-weight-bold text-center">Login</h2>
        <LoginForm form={loginForm} isSubmitting={isSubmitting} onSubmit={handleLogin} />
      </Card>
    </div>
  );
}

export default Login;
