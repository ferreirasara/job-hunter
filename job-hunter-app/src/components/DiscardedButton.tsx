import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
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

  const { mutateAsync, isPending } = useUpdateDiscarded();
  const handleSetAsDiscarded = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, discarded: !job?.discarded });
    onFinish?.();
  }, [onFinish, uuid]);

  return (
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
  );
};

export default memo(DiscardedButton);
