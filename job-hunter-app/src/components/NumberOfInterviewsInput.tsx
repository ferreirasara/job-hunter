import { SaveOutlined } from "@ant-design/icons"
import { Button, InputNumber, Space } from "antd"
import { useState } from "react"
import { GetJobsFromAPIArgs, updateNumberOfInterviews } from "../utils/utils"

type NumberOfInterviewsInputProps = {
  uuid?: string
  numberOfInterviews?: number
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  apiArgs: GetJobsFromAPIArgs
}
export const NumberOfInterviewsInput = ({ fetchData, numberOfInterviews, uuid, apiArgs }: NumberOfInterviewsInputProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newNumberOfInterviews, setNewNumberOfInterviews] = useState<number>(numberOfInterviews || 0);

  const handleUpdateNumberOfInterviews = async () => {
    setLoading(true);
    if (uuid) await updateNumberOfInterviews(uuid, newNumberOfInterviews);
    await fetchData(apiArgs);
    setLoading(false);
  }

  return <Space.Compact>
    <InputNumber
      size="small"
      style={{ width: 250 }}
      disabled={loading}
      value={newNumberOfInterviews}
      onChange={(value) => setNewNumberOfInterviews(value || 0)}
      addonBefore={"Nº de entrevistas"}
      addonAfter={
        <Button
          icon={<SaveOutlined />}
          loading={loading}
          onClick={handleUpdateNumberOfInterviews}
          type="text"
          size="small"
        />
      }
    />
  </Space.Compact>
}