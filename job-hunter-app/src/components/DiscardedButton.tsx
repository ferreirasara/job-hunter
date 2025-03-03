import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { memo, useCallback, useState } from "react";
import { GetJobsFromAPIArgs, setJobAsDiscarded } from "../utils/utils";

interface DiscardedButtonProps {
  uuid?: string
  disabled?: boolean
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  onFinish: () => void
  apiArgs: GetJobsFromAPIArgs
  onlyIcon?: boolean
}
const DiscardedButton = ({ uuid, disabled, fetchData, onFinish, onlyIcon, apiArgs }: DiscardedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsDiscarded = useCallback(async () => {
    setLoading(true);
    if (uuid) await setJobAsDiscarded(uuid);
    await fetchData(apiArgs);
    setLoading(false);
    messageApi.open({ content: "Vaga descartada!", type: "success", duration: 10 });
    onFinish();
  }, [apiArgs, fetchData, messageApi, onFinish, uuid]);

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

export default memo(DiscardedButton);
