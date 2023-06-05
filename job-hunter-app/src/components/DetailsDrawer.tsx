import { Button, Descriptions, Drawer, List, Space, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { renderMultipleTags } from "./renderMultipleTags"
import { Link } from "./Link"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import { setJobAsApplied, setJobAsDiscarded } from "../utils/utils"
import { useState } from "react"


type DetailsDrawerProps = {
  open: boolean
  onCancel: () => void
  selectedJob?: JobsTableData
  fetchData: () => Promise<void>
}

export const DetailsDrawer = ({ fetchData, onCancel, open, selectedJob }: DetailsDrawerProps) => {
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

  return <Drawer
    title={selectedJob?.title}
    placement="right"
    onClose={onCancel}
    open={open}
    width={700}
    bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}
  >
    <List>
      <List.Item><strong>uuid:</strong> {selectedJob?.uuid}</List.Item>
      {selectedJob?.company ? <List.Item><strong>Empresa:</strong> {selectedJob?.company}</List.Item> : null}
      {selectedJob?.country ? <List.Item><strong>País:</strong> {selectedJob?.country}</List.Item> : null}
      {selectedJob?.state ? <List.Item><strong>Estado:</strong> {selectedJob?.state}</List.Item> : null}
      {selectedJob?.city ? <List.Item><strong>Cidade:</strong> {selectedJob?.city}</List.Item> : null}
      {selectedJob?.type ? <List.Item><strong>Tipo:</strong> {selectedJob?.type}</List.Item> : null}
      {selectedJob?.salaryRange ? <List.Item><strong>Faixa salarial:</strong> {selectedJob?.salaryRange}</List.Item> : null}
      {selectedJob?.skills ? <List.Item><strong>Skills:</strong> {renderMultipleTags(selectedJob?.skills)}</List.Item> : null}
      {selectedJob?.benefits ? <List.Item><strong>Benefícios:</strong> {renderMultipleTags(selectedJob?.benefits)}</List.Item> : null}
      {(selectedJob?.skillsRating && selectedJob?.benefitsRating && selectedJob?.totalRating)
        ? <List.Item><strong>Rating:</strong> Skills={selectedJob?.skillsRating} | Benefícios={selectedJob?.benefitsRating} | Total={selectedJob?.totalRating}</List.Item>
        : null}
      {selectedJob?.url ? <List.Item><strong>Link:</strong> <Link url={selectedJob?.url} /></List.Item> : null}
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
    <Typography.Title level={2}>Descrição</Typography.Title>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {description?.map(cur => <Typography.Paragraph>{cur}</Typography.Paragraph>)}
    </div>
  </Drawer>
}