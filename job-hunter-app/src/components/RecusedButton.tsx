import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import { GetJobsFromAPIArgs, setJobAsRecused } from "../utils/utils";

type RecusedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  onFinish: () => void
  apiArgs: GetJobsFromAPIArgs
}
export const RecusedButton = ({ uuid, disabled, fetchData, onFinish, apiArgs }: RecusedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsRecused = async () => {
    setLoading(true);
    if (uuid) await setJobAsRecused(uuid);
    await fetchData(apiArgs);
    setLoading(false);
    messageApi.open({ content: "Vaga recusada!", type: "success", duration: 10 });
    onFinish();
  }

  return <>
    {contextHolder}
    <Button
      size="small"
      icon={<CloseCircleOutlined />}
      onClick={handleSetAsRecused}
      loading={loading}
      disabled={disabled}
    >
      Marcar como recusada
    </Button>
  </>
}