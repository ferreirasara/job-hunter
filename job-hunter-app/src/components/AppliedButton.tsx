import { FormOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useSetJobAsApplied } from '../hooks/useSetJobAsApplied';

interface AppliedButtonProps {
  uuid?: string;
  disabled?: boolean;
  onFinish: () => void;
}
const AppliedButton = ({
  uuid,
  disabled,
  onFinish,
}: AppliedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useSetJobAsApplied();
  const handleSetAsApplied = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid });
    messageApi.open({
      content: 'Vaga aplicada!',
      type: 'success',
      duration: 10,
    });
    onFinish();
  }, [messageApi, onFinish, uuid]);

  return (
    <>
      {contextHolder}
      <Button
        size="small"
        icon={<FormOutlined />}
        onClick={handleSetAsApplied}
        loading={isPending}
        disabled={disabled}
      >
        Marcar como aplicada
      </Button>
    </>
  );
};

export default memo(AppliedButton);
