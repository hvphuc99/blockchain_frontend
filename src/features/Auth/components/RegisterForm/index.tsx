import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

function RegisterForm(props: IProps): JSX.Element {
  const { isSubmitting, onSubmit } = props;

  return (
    <>
      <Button type="primary" htmlType="submit" className="w-100" size="large" loading={isSubmitting} onClick={onSubmit}>
        Create new private key
      </Button>
      <p className="mt-3 mb-0 text-center">
        Already have a private key? <Link to="/login">Access Wallet</Link>
      </p>
    </>
  );
}

export default RegisterForm;
