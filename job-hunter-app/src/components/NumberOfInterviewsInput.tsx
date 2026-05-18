import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useUpdateNumberOfInterviews } from '../hooks/useUpdateNumberOfInterviews';

interface NumberOfInterviewsInputProps {
  uuid?: string;
  numberOfInterviews?: number;
}

const NumberOfInterviewsInput = ({
  numberOfInterviews,
  uuid,
}: NumberOfInterviewsInputProps) => {
  const [newNumberOfInterviews, setNewNumberOfInterviews] = useState<number>(
    numberOfInterviews || 0,
  );

  const { mutateAsync, isPending } = useUpdateNumberOfInterviews();
  const handleUpdateNumberOfInterviews = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, numberOfInterviews: newNumberOfInterviews });
  }, [newNumberOfInterviews, uuid]);

  return (
    <Space.Compact>
      <InputNumber
        size="small"
        style={{ width: 250 }}
        disabled={isPending}
        value={newNumberOfInterviews}
        onChange={(value) => setNewNumberOfInterviews(value || 0)}
        addonBefore={'Nº de entrevistas'}
        addonAfter={
          <Button
            icon={<SaveOutlined />}
            loading={isPending}
            onClick={handleUpdateNumberOfInterviews}
            type="text"
            size="small"
          />
        }
      />
    </Space.Compact>
  );
};

export default memo(NumberOfInterviewsInput);
