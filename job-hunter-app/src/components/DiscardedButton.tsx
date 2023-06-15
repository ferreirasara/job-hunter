import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { setJobAsDiscarded } from "../utils/utils";

type DiscardedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: () => Promise<void>
  onFinish: () => void
}
export const DiscardedButton = ({ uuid, disabled, fetchData, onFinish }: DiscardedButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsDiscarded = async () => {
    setLoading(true);
    if (uuid) await setJobAsDiscarded(uuid);
    await fetchData();
    setLoading(false);
    onFinish();
  }

  return <Button
    block
    size="small"
    icon={<DeleteOutlined />}
    onClick={handleSetAsDiscarded}
    loading={loading}
    disabled={disabled}
  >
    Descartar
  </Button>
}