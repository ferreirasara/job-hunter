import { Drawer, List, Space, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { renderListItems } from "./renderListItems"
import { RecusedButton } from "./RecusedButton"
import { NumberOfInterviewsInput } from "./NumberOfInterviewsInput"
import { NumberOfTestsInput } from "./NumberOfTestsInput"
import { LinkOutlined } from "@ant-design/icons"

type DetailsDrawerProps = {
  open: boolean
  onClose: () => void
  selectedJob?: JobsTableData
  fetchData: () => Promise<void>
}

export const DetailsDrawer = ({ fetchData, onClose, open, selectedJob }: DetailsDrawerProps) => {
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);

  const commomProps = {
    uuid: selectedJob?.uuid,
    fetchData: fetchData,
    onFinish: onClose,
  }

  return <Drawer
    title={<Typography.Link href={selectedJob?.url} target="_blank">{selectedJob?.title} <LinkOutlined /></Typography.Link>}
    placement="right"
    onClose={onClose}
    open={open}
    width={700}
    bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0px 24px 12px' }}
  >
    <List size="small">
      {renderListItems(selectedJob)}
      <List.Item>
        <Space>
          <AppliedButton {...commomProps} disabled={!!selectedJob?.applied} />
          <DiscardedButton {...commomProps} disabled={!!selectedJob?.discarded} />
          {selectedJob?.applied ? <RecusedButton {...commomProps} disabled={!!selectedJob?.recused} /> : null}
        </Space>
      </List.Item>
      {selectedJob?.applied ? <List.Item>
        <Space>
          <NumberOfInterviewsInput {...commomProps} numberOfInterviews={selectedJob?.numberOfInterviews} />
          <NumberOfTestsInput {...commomProps} numberOfTests={selectedJob?.numberOfTests} />
        </Space>
      </List.Item> : null}
    </List>
    <Typography.Title level={2}>Descrição</Typography.Title>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {description?.map(cur => <Typography.Paragraph>{cur}</Typography.Paragraph>)}
    </div>
  </Drawer>
}