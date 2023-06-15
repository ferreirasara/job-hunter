import { Drawer, List, Space } from "antd"
import { JobsTableData } from "./JobsTable"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { JobDescription } from "./JobDescription"
import { renderListItems } from "./renderListItems"

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
      {renderListItems(selectedJob)}
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