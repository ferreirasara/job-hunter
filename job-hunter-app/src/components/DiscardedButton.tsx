import { DeleteOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useUpdateDiscarded } from '../hooks/useUpdateDiscarded';
import { JobsTableData } from '../@types/types';

interface DiscardedButtonProps {
  uuid?: string;
  job?: JobsTableData;
  onFinish?: () => void;
  onlyIcon?: boolean;
}
const DiscardedButton = ({
  uuid,
  job,
  onFinish,
  onlyIcon,
}: DiscardedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useUpdateDiscarded();
  const handleSetAsDiscarded = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, discarded: !job?.discarded }, {
      onError(error) {
        messageApi.open({
          content: `Erro ao atualizar vaga! Erro: ${error.message}`,
          type: 'error',
          duration: 10,
        });
      },
      onSuccess() {
        messageApi.open({
          content: `Vaga ${job?.discarded ? 'não descartada' : 'descartada'}!`,
          type: 'success',
          duration: 10,
        });
        onFinish?.();
      }
    });
  }, [messageApi, onFinish, uuid]);

  return (
    <>
      {contextHolder}
      <Button
        size="small"
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSetAsDiscarded();
        }}
        loading={isPending}
        type={onlyIcon ? 'text' : 'default'}
      >
        {!onlyIcon ? `${job?.discarded ? 'Não descartar' : 'Descartar'}` : null}
      </Button>
    </>
  );
};

export default memo(DiscardedButton);
