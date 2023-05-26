import { Button, List, Modal, Space, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { isUpperCase, setJobAsApplied, setJobAsDiscarded } from "../utils/utils"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import { Link } from "./Link"
import { useState } from "react"

type DetailsModalProps = {
  open: boolean
  onCancel: () => void
  selectedJob?: JobsTableData
  fetchData: () => Promise<void>
}

export const DetailsModal = ({ onCancel, open, selectedJob, fetchData }: DetailsModalProps) => {
  const [appliedLoading, setAppliedLoading] = useState<boolean>(false);
  const [discardedLoading, setDiscardedLoading] = useState<boolean>(false);
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);

  const handleSetAsApplied = async () => {
    setAppliedLoading(true);
    if (selectedJob?.uuid) await setJobAsApplied(selectedJob?.uuid);
    await fetchData();
    setAppliedLoading(false);
    onCancel();
  }

  const handleSetAsDiscarded = async () => {
    setDiscardedLoading(true);
    if (selectedJob?.uuid) await setJobAsDiscarded(selectedJob?.uuid);
    await fetchData();
    setDiscardedLoading(false);
    onCancel();
  }

  return <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    title={<Typography.Title level={3}>{selectedJob?.title}</Typography.Title>}
  >
    <List>
      <List.Item><strong>uuid:</strong> {selectedJob?.uuid}</List.Item>
      <List.Item><strong>Empresa:</strong> {selectedJob?.company}</List.Item>
      <List.Item><strong>País:</strong> {selectedJob?.country}</List.Item>
      <List.Item><strong>Estado:</strong> {selectedJob?.state}</List.Item>
      <List.Item><strong>Cidade:</strong> {selectedJob?.city}</List.Item>
      <List.Item><strong>Link:</strong> <Link url={selectedJob?.url} /></List.Item>
      <List.Item>
        <Space>
          <Button
            size="small"
            icon={<FormOutlined />}
            onClick={handleSetAsApplied}
            loading={appliedLoading}
            disabled={selectedJob?.applied}
          >
            Marcar como aplicada
          </Button>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleSetAsDiscarded}
            loading={discardedLoading}
            disabled={selectedJob?.discarded}
          >
            Descartar
          </Button>
        </Space>
      </List.Item>
    </List>
    {description?.map(cur => isUpperCase(cur) ? <Typography.Title level={4}>{cur}</Typography.Title> : <Typography.Paragraph>{cur}</Typography.Paragraph>)}
  </Modal>
}