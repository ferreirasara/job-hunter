import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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
  const { mutateAsync, isPending } = useUpdateUnwanted();
  const handleSetAsUnwanted = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, unwanted: !job?.unwanted });
    onFinish?.();
  }, [onFinish, uuid]);

  return (
    <Button
      size="small"
      icon={<CloseCircleOutlined />}
      onClick={handleSetAsUnwanted}
      loading={isPending}
    >
      {job?.unwanted ? 'Não indesejar' : 'Indesejar'}
    </Button>
  );
};

export default memo(UnwantedButton);
