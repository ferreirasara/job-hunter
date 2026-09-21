import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { memo, useCallback } from 'react';
import { useUpdateUnwanted } from '../hooks/useUpdateUnwanted';
import { JobsTableData } from '../@types/types';

interface UnwantedButtonProps {
  uuid?: string;
  job?: JobsTableData;
  onFinish: () => void;
}

const UnwantedButton = ({
  uuid,
  job,
  onFinish,
}: UnwantedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutateAsync, isPending } = useUpdateUnwanted();
  const handleSetAsUnwanted = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, unwanted: !job?.unwanted }, {
      onError(error) {
        messageApi.open({
          content: `Erro ao atualizar vaga! Erro: ${error.message}`,
          type: 'error',
          duration: 10,
        });
      },
      onSuccess() {
        messageApi.open({
          content: `Vaga ${job?.unwanted ? 'não indesejada' : 'indesejada'}!`,
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
        onClick={handleSetAsUnwanted}
        loading={isPending}
      >
        {job?.unwanted ? 'Não indesejar' : 'Indesejar'}
      </Button>
    </>
  );
};

export default memo(UnwantedButton);
