import { Card } from 'antd';
import authApi from 'api/authApi';
import RegisterForm from 'features/Auth/components/RegisterForm';
import 'features/Auth/pages/Login/styles.scss';
import React, { useState } from 'react';

function Register(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRegister = () => {
    setIsSubmitting(true);

    authApi.register().then((res: string) => {
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'privateKey.txt');
      document.body.appendChild(link);
      link.click();
      setIsSubmitting(false);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 container-auth">
      <Card className="container-auth__card">
        <h2 className="font-weight-bold text-center">Register</h2>
        <RegisterForm isSubmitting={isSubmitting} onSubmit={handleRegister} />
      </Card>
    </div>
  );
}

export default Register;
