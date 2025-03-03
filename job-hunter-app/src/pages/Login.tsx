import { LoginOutlined } from "@ant-design/icons";
import { Alert, Button, Grid, Input, Space } from "antd";
import { memo, useCallback, useState } from "react";
import { Navigate } from 'react-router-dom';
import { validateSecretToken } from "../utils/utils";

const Login = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const [secretToken, setSecretToken] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = useCallback(async () => {
    setLoading(true);
    const response = await validateSecretToken(secretToken);
    if (response?.success) {
      localStorage.setItem('secret_token', secretToken);
      setLoggedIn(true);
    } else {
      setErrorMessage(response?.message);
    }
    setLoading(false);
  }, [secretToken]);

  return loggedIn ? <Navigate to="/" replace={true} /> : <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
    <Space direction="vertical" style={{ width: screens?.xl ? 500 : '90%' }}>
      <Input.Password
        placeholder="Secret Token"
        value={secretToken}
        onChange={(e) => setSecretToken(e?.target?.value)}
        disabled={loading}
      />
      {errorMessage ? <Alert type="error" showIcon message={errorMessage} /> : null}
      <Button
        type="primary"
        block
        onClick={handleLogin}
        icon={<LoginOutlined />}
        loading={loading}
      >
        Login
      </Button>
    </Space>
  </div>
}

export default memo(Login);
