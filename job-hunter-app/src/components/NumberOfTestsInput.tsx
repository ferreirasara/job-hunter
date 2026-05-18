import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
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
  const [newNumberOfTests, setNewNumberOfTests] = useState<number>(
    numberOfTests || 0,
  );

  const { mutateAsync, isPending } = useUpdateNumberOfTests();
  const handleUpdateNumberOfTests = useCallback(async () => {
    if (!uuid) return;
    await mutateAsync({ uuid, numberOfTests: newNumberOfTests });
  }, [newNumberOfTests, uuid]);

  return (
    <Space.Compact>
      <InputNumber
        size="small"
        style={{ width: 250 }}
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
  );
};

export default memo(NumberOfTestsInput);
