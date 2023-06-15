import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { setJobAsRecused } from "../utils/utils";

type RecusedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: () => Promise<void>
  onFinish: () => void
}
export const RecusedButton = ({ uuid, disabled, fetchData, onFinish }: RecusedButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsRecused = async () => {
    setLoading(true);
    if (uuid) await setJobAsRecused(uuid);
    await fetchData();
    setLoading(false);
    onFinish();
  }

  return <Button
    block
    size="small"
    icon={<CloseCircleOutlined />}
    onClick={handleSetAsRecused}
    loading={loading}
    disabled={disabled}
  >
    Marcar como recusada
  </Button>
}