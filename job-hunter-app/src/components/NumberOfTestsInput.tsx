import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, message, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useUpdateNumberOfTests } from '../hooks/useUpdateNumberOfTests';

interface NumberOfTestsInputProps {
  uuid?: string;
  numberOfTests?: number;
}

const NumberOfTestsInput = ({
  numberOfTests,
  uuid,
}: NumberOfTestsInputProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [newNumberOfTests, setNewNumberOfTests] = useState<number>(
    numberOfTests || 0,
  );

  const { mutateAsync, isPending } = useUpdateNumberOfTests();
  const handleUpdateNumberOfTests = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, numberOfTests: newNumberOfTests }, {
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
  }, [newNumberOfTests, uuid, messageApi]);

  return (
    <>
      {contextHolder}
      <Space.Compact>
      <InputNumber
        size="small"
        disabled={isPending}
        value={newNumberOfTests}
        onChange={(value) => setNewNumberOfTests(value || 0)}
        addonBefore={'Nº de testes'}
        addonAfter={
          <Button
            icon={<SaveOutlined />}
            loading={isPending}
            onClick={handleUpdateNumberOfTests}
            type="text"
            size="small"
          />
        }
      />
      </Space.Compact>
    </>
  );
};

export default memo(NumberOfTestsInput);
