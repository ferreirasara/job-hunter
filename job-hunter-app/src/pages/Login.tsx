import { LoginOutlined } from '@ant-design/icons';
import { Alert, Button, Grid, Input, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useValidateSecretToken } from '../hooks/useValidateSecretToken';
import { LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';

const Login = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [token, setToken] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutateAsync, isPending } = useValidateSecretToken();
  const handleLogin = useCallback(async () => {
    const response = await mutateAsync({ token });
    if (response?.success) {
      localStorage.setItem(LOCAL_STORAGE_SECRET_TOKEN_KEY, token);
      setLoggedIn(true);
    } else {
      setErrorMessage(response?.message);
    }
  }, [token]);

  return loggedIn ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Space direction="vertical" style={{ width: screens?.xl ? 500 : '90%' }}>
        <Input.Password
          placeholder="Secret Token"
          value={token}
          onChange={(e) => setToken(e?.target?.value)}
          disabled={isPending}
        />
        {errorMessage ? (
          <Alert type="error" showIcon message={errorMessage} />
        ) : null}
        <Button
          type="primary"
          block
          onClick={handleLogin}
          icon={<LoginOutlined />}
          loading={isPending}
        >
          Login
        </Button>
      </Space>
    </div>
  );
};

export default memo(Login);
