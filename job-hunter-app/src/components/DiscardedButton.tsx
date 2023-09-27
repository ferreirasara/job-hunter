import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import { GetJobsFromAPIArgs, setJobAsDiscarded } from "../utils/utils";

type DiscardedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  onFinish: () => void
  apiArgs: GetJobsFromAPIArgs
  onlyIcon?: boolean
}
export const DiscardedButton = ({ uuid, disabled, fetchData, onFinish, onlyIcon, apiArgs }: DiscardedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsDiscarded = async () => {
    setLoading(true);
    if (uuid) await setJobAsDiscarded(uuid);
    await fetchData(apiArgs);
    setLoading(false);
    messageApi.open({ content: "Vaga descartada!", type: "success", duration: 10 });
    onFinish();
  }

  return <>
    {contextHolder}
    <Button
      size="small"
      icon={<DeleteOutlined />}
      onClick={handleSetAsDiscarded}
      loading={loading}
      disabled={disabled}
    >
      {!onlyIcon ? "Descartar" : null}
    </Button>
  </>
}