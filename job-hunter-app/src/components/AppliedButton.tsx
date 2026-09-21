import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo, useCallback } from 'react';
import { useUpdateApplied } from '../hooks/useUpdateApplied';
import { JobsTableData } from '../@types/types';

interface AppliedButtonProps {
  uuid?: string;
  job?: JobsTableData;
  onFinish: () => void;
}
const AppliedButton = ({
  uuid,
  job,
  onFinish,
}: AppliedButtonProps) => {
  const { mutateAsync, isPending } = useUpdateApplied();
  const handleSetAsApplied = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, applied: !job?.applied });
    onFinish?.();
  }, [onFinish, uuid]);

  return (
    <Button
      size="small"
      icon={<FormOutlined />}
      onClick={handleSetAsApplied}
      loading={isPending}
    >
      {job?.applied ? 'Não aplicar' : 'Aplicar'}
    </Button>
  );
};

export default memo(AppliedButton);
