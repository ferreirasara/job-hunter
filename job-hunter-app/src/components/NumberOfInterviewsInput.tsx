import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Space } from 'antd';
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
  const [messageApi, contextHolder] = message.useMessage();
  const [newNumberOfInterviews, setNewNumberOfInterviews] = useState<number>(
    numberOfInterviews || 0,
  );

  const { mutateAsync, isPending } = useUpdateNumberOfInterviews();
  const handleUpdateNumberOfInterviews = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, numberOfInterviews: newNumberOfInterviews }, {
      onError(error) {
        messageApi.open({
          content: `Erro ao atualizar vaga! Erro: ${error.message}`,
          type: 'error',
          duration: 10,
        });
      },
      onSuccess() {
        messageApi.open({
          content: `Vaga atualizada!`,
          type: 'success',
          duration: 10,
        });
      }
    });
  }, [newNumberOfInterviews, uuid, messageApi]);

  return (
    <>
      {contextHolder}
      <Space.Compact>
        <InputNumber
          size="small"
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
    </>
  );
};

export default memo(NumberOfInterviewsInput);
