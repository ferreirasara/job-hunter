import { SaveOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import { memo, useCallback, useState } from 'react';
import { GetJobsFromAPIArgs, updateNumberOfTests } from '../utils/utils';

interface NumberOfTestsInputProps {
  uuid?: string;
  numberOfTests?: number;
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>;
  apiArgs: GetJobsFromAPIArgs;
}

const NumberOfTestsInput = ({
  fetchData,
  numberOfTests,
  uuid,
  apiArgs,
}: NumberOfTestsInputProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newNumberOfTests, setNewNumberOfTests] = useState<number>(
    numberOfTests || 0,
  );

  const handleUpdateNumberOfTests = useCallback(async () => {
    setLoading(true);
    if (uuid) await updateNumberOfTests(uuid, newNumberOfTests);
    await fetchData(apiArgs);
    setLoading(false);
  }, [apiArgs, fetchData, newNumberOfTests, uuid]);

  return (
    <Space.Compact>
      <InputNumber
        size="small"
        style={{ width: 250 }}
        disabled={loading}
        value={newNumberOfTests}
        onChange={(value) => setNewNumberOfTests(value || 0)}
        addonBefore={'Nº de testes'}
        addonAfter={
          <Button
            icon={<SaveOutlined />}
            loading={loading}
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
