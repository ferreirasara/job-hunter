import { SaveOutlined } from "@ant-design/icons"
import { Button, InputNumber, Space } from "antd"
import { useState } from "react"
import { updateNumberOfTests } from "../utils/utils"

type NumberOfTestsInputProps = {
  uuid?: string
  numberOfTests?: number
  fetchData: () => Promise<void>
}
export const NumberOfTestsInput = ({ fetchData, numberOfTests, uuid }: NumberOfTestsInputProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newNumberOfTests, setNewNumberOfTests] = useState<number>(numberOfTests || 0);

  const handleUpdateNumberOfTests = async () => {
    setLoading(true);
    if (uuid) await updateNumberOfTests(uuid, newNumberOfTests);
    await fetchData();
    setLoading(false);
  }

  return <Space.Compact>
    <InputNumber
      size="small"
      style={{ width: 250 }}
      disabled={loading}
      value={newNumberOfTests}
      onChange={(value) => setNewNumberOfTests(value || 0)}
      addonBefore={"Nº de testes"}
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
}