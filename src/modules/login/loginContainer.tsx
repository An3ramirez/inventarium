import React, { lazy, useState } from 'react';
import LoginFormComponent from './loginFormComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const CompanyListContainer = lazy(() => import('../company/containers/companyContainer'));

const LoginContainer = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const domain = process.env.REACT_APP_DOMAIN;

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const response = await axios.post(domain + '/auth/sign-in', {
        email: values.username,
        password: values.password,
      });

      console.log('Login successful:', response.data);

      setUsername('');
      setPassword('');

      //Se guarda el token
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('rol_user', response.data.role.code);

      navigate('/company-list');
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }

    setLoading(false);
  };

  return (
    <LoginFormComponent
      username={username}
      password={password}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default LoginContainer;
