import { Drawer, List, Space } from "antd"
import { JobsTableData } from "./JobsTable"
import { renderMultipleTags } from "./renderMultipleTags"
import { Link } from "./Link"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { JobDescription } from "./JobDescription"

type DetailsDrawerProps = {
  open: boolean
  onClose: () => void
  selectedJob?: JobsTableData
  fetchData: () => Promise<void>
}

export const DetailsDrawer = ({ fetchData, onClose, open, selectedJob }: DetailsDrawerProps) => {
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);

  return <Drawer
    title={selectedJob?.title}
    placement="right"
    onClose={onClose}
    open={open}
    width={700}
    bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}
  >
    <List size="small">
      <List.Item><strong>uuid:</strong> {selectedJob?.uuid}</List.Item>
      {selectedJob?.platform ? <List.Item><strong>Plataforma:</strong> {selectedJob?.platform} ({selectedJob?.idInPlatform})</List.Item> : null}
      {selectedJob?.company ? <List.Item><strong>Empresa:</strong> {selectedJob?.company}</List.Item> : null}
      {(selectedJob?.country || selectedJob?.state || selectedJob?.city)
        ? <List.Item>
          <Space style={{ width: '100%' }}>
            <span><strong>País:</strong> {selectedJob?.country}</span>
            <span><strong>Estado:</strong> {selectedJob?.state}</span>
            <span><strong>Cidade:</strong> {selectedJob?.city}</span>
          </Space>
        </List.Item>
        : null}
      {selectedJob?.type ? <List.Item><strong>Tipo:</strong> {renderMultipleTags(selectedJob?.type)}</List.Item> : null}
      {selectedJob?.hiringRegime ? <List.Item><strong>Regime de contratação:</strong> {renderMultipleTags(selectedJob?.hiringRegime)}</List.Item> : null}
      {selectedJob?.salaryRange ? <List.Item><strong>Faixa salarial:</strong> {selectedJob?.salaryRange}</List.Item> : null}
      {selectedJob?.skills ? <List.Item><strong>Skills:</strong> {renderMultipleTags(selectedJob?.skills)}</List.Item> : null}
      {selectedJob?.benefits ? <List.Item><strong>Benefícios:</strong> {renderMultipleTags(selectedJob?.benefits)}</List.Item> : null}
      {(selectedJob?.skillsRating?.toString() || selectedJob?.benefitsRating?.toString() || selectedJob?.totalRating?.toString())
        ? <List.Item>
          <Space style={{ width: '100%' }}>
            <span><strong>SkillsRating:</strong> {selectedJob?.skillsRating || 0}</span>
            <span><strong>BeneftsRating:</strong> {selectedJob?.benefitsRating || 0}</span>
            <span><strong>TotalRating:</strong> {selectedJob?.totalRating || 0}</span>
          </Space>
        </List.Item>
        : null}
      {selectedJob?.url ? <List.Item><strong>Link:</strong> <Link url={selectedJob?.url} /></List.Item> : null}
      <List.Item>
        <Space>
          <AppliedButton uuid={selectedJob?.uuid} fetchData={fetchData} onFinish={onClose} disabled={!!selectedJob?.applied} />
          <DiscardedButton uuid={selectedJob?.uuid} fetchData={fetchData} onFinish={onClose} disabled={!!selectedJob?.applied} />
        </Space>
      </List.Item>
    </List>
    <JobDescription description={description} />
  </Drawer>
}