import { DeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useSetJobAsDiscarded } from '../hooks/useSetJobAsDiscarded';

interface DiscardedButtonProps {
  uuid?: string;
  disabled?: boolean;
  onFinish: () => void;
  onlyIcon?: boolean;
}
const DiscardedButton = ({
  uuid,
  disabled,
  onFinish,
  onlyIcon,
}: DiscardedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useSetJobAsDiscarded();
  const handleSetAsDiscarded = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid });
    messageApi.open({
      content: 'Vaga descartada!',
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
        icon={<DeleteOutlined />}
        onClick={handleSetAsDiscarded}
        loading={isPending}
        disabled={disabled}
      >
        {!onlyIcon ? 'Descartar' : null}
      </Button>
    </>
  );
};

export default memo(DiscardedButton);
