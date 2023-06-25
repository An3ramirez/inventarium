import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css';

const { Title } = Typography;

interface LoginFormComponentProps {
  username: string;
  password: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (values: any) => void;
  loading: boolean;
}

const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  loading,
}) => {
  return (
    <div className='container'>
      <div className="login-container">
        <Title level={2} className="login-title">
          Login
        </Title>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              prefix={<UserOutlined className="input-icon" />}
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-icon" />}
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button" loading={loading} disabled={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginFormComponent;
