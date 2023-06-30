import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import { setJobAsRecused } from "../utils/utils";

type RecusedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: () => Promise<void>
  onFinish: () => void
}
export const RecusedButton = ({ uuid, disabled, fetchData, onFinish }: RecusedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsRecused = async () => {
    setLoading(true);
    if (uuid) await setJobAsRecused(uuid);
    await fetchData();
    setLoading(false);
    messageApi.open({ content: "Vaga recusada!", type: "success", duration: 10 });
    onFinish();
  }

  return <>
    {contextHolder}
    <Button
      block
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