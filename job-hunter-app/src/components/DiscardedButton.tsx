import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import { setJobAsDiscarded } from "../utils/utils";

type DiscardedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: () => Promise<void>
  onFinish: () => void
  onlyIcon?: boolean
}
export const DiscardedButton = ({ uuid, disabled, fetchData, onFinish, onlyIcon }: DiscardedButtonProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsDiscarded = async () => {
    setLoading(true);
    if (uuid) await setJobAsDiscarded(uuid);
    await fetchData();
    setLoading(false);
    messageApi.open({ content: "Vaga descartada!", type: "success", duration: 10 });
    onFinish();
  }

  return <>
    {contextHolder}
    <Button
      block
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