import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { setJobAsApplied } from "../utils/utils";

type AppliedButtonProps = {
  uuid?: string
  disabled?: boolean
  fetchData: () => Promise<void>
  onFinish: () => void
}
export const AppliedButton = ({ uuid, disabled, fetchData, onFinish }: AppliedButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetAsApplied = async () => {
    setLoading(true);
    if (uuid) await setJobAsApplied(uuid);
    await fetchData();
    setLoading(false);
    onFinish();
  }

  return <Button
    block
    size="small"
    icon={<FormOutlined />}
    onClick={handleSetAsApplied}
    loading={loading}
    disabled={disabled}
  >
    Marcar como aplicada
  </Button>
}