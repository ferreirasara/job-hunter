import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
  const { mutateAsync, isPending } = useUpdateRecused();
  const handleSetAsRecused = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, recused: !job?.recused });
    onFinish?.();
  }, [onFinish, uuid]);

  return (
    <Button
      size="small"
      icon={<CloseCircleOutlined />}
      onClick={handleSetAsRecused}
      loading={isPending}
    >
      {job?.recused ? 'Não recusar' : 'Recusar'}
    </Button>
  );
};

export default memo(RecusedButton);
