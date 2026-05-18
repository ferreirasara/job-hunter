import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useSetJobAsRecused } from '../hooks/useSetJobAsRecused';

interface RecusedButtonProps {
  uuid?: string;
  disabled?: boolean;
  onFinish: () => void;
}

const RecusedButton = ({
  uuid,
  disabled,
  onFinish,
}: RecusedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useSetJobAsRecused();
  const handleSetAsRecused = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid });
    messageApi.open({
      content: 'Vaga recusada!',
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
        icon={<CloseCircleOutlined />}
        onClick={handleSetAsRecused}
        loading={isPending}
        disabled={disabled}
      >
        Marcar como recusada
      </Button>
    </>
  );
};

export default memo(RecusedButton);
