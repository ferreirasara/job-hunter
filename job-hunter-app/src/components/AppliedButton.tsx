import { FormOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import { GetJobsFromAPIArgs, setJobAsApplied } from "../utils/utils";

type AppliedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  onFinish: () => void
  apiArgs: GetJobsFromAPIArgs
}
export const AppliedButton = ({ uuid, disabled, fetchData, onFinish, apiArgs }: AppliedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsApplied = async () => {
    setLoading(true);
    if (uuid) await setJobAsApplied(uuid);
    await fetchData(apiArgs);
    setLoading(false);
    messageApi.open({ content: "Vaga aplicada!", type: "success", duration: 10 });
    onFinish();
  }

  return <>
    {contextHolder}
    <Button
      size="small"
      icon={<FormOutlined />}
      onClick={handleSetAsApplied}
      loading={loading}
      disabled={disabled}
    >
      Marcar como aplicada
    </Button>
  </>
}