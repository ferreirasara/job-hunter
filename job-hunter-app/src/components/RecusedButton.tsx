import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useUpdateRecused } from '../hooks/useUpdateRecused';
import { JobsTableData } from '../@types/types';

interface RecusedButtonProps {
  uuid?: string;
  job?: JobsTableData;
  onFinish: () => void;
}

const RecusedButton = ({
  uuid,
  job,
  onFinish,
}: RecusedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useUpdateRecused();
  const handleSetAsRecused = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, recused: !job?.recused }, {
      onError(error) {
        messageApi.open({
          content: `Erro ao atualizar vaga! Erro: ${error.message}`,
          type: 'error',
          duration: 10,
        });
      },
      onSuccess() {
        messageApi.open({
          content: `Vaga ${job?.recused ? 'não recusada' : 'recusada'}!`,
          type: 'success',
          duration: 10,
        });
        onFinish();
      }
    });
  }, [messageApi, onFinish, uuid]);

  return (
    <>
      {contextHolder}
      <Button
        size="small"
        icon={<CloseCircleOutlined />}
        onClick={handleSetAsRecused}
        loading={isPending}
      >
        {job?.recused ? 'Não recusar' : 'Recusar'}
      </Button>
    </>
  );
};

export default memo(RecusedButton);
