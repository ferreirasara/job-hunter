import { Divider, Drawer, Grid, List, Space, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { renderListItems } from "./renderListItems"
import { RecusedButton } from "./RecusedButton"
import { NumberOfInterviewsInput } from "./NumberOfInterviewsInput"
import { NumberOfTestsInput } from "./NumberOfTestsInput"
import ReactMarkdown from "react-markdown"

type DetailsDrawerProps = {
  open: boolean
  onClose: () => void
  selectedJob?: JobsTableData
  fetchData: () => Promise<void>
}

export const DetailsDrawer = ({ fetchData, onClose, open, selectedJob }: DetailsDrawerProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);

  const commomProps = {
    uuid: selectedJob?.uuid,
    fetchData: fetchData,
    onFinish: onClose,
  }

  return <Drawer
    title={<Typography.Link href={selectedJob?.url} target="_blank" copyable>{selectedJob?.title}</Typography.Link>}
    placement="right"
    onClose={onClose}
    open={open}
    width={screens?.xl ? 700 : '100%'}
    bodyStyle={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingTop: 0,
      paddingBottom: 12,
      paddingLeft: screens?.xl ? 24 : 12,
      paddingRight: screens?.xl ? 24 : 12,
    }}
  >
    <List size="small">
      {renderListItems(selectedJob)}
      <List.Item key="buttons">
        <Space>
          <AppliedButton {...commomProps} disabled={!!selectedJob?.applied} />
          <DiscardedButton {...commomProps} disabled={!!selectedJob?.discarded} />
          {selectedJob?.applied ? <RecusedButton {...commomProps} disabled={!!selectedJob?.recused} /> : null}
        </Space>
      </List.Item>
      {selectedJob?.applied ? <List.Item key="inputs">
        <Space>
          <NumberOfInterviewsInput  {...commomProps} numberOfInterviews={selectedJob?.numberOfInterviews} />
          <NumberOfTestsInput  {...commomProps} numberOfTests={selectedJob?.numberOfTests} />
        </Space>
      </List.Item> : null}
    </List>
    <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
      Descrição
    </Divider>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {description?.map((cur, index) => <Typography.Paragraph key={'paragraph_' + index}>
        <ReactMarkdown key={'markdown_' + index}>
          {cur}
        </ReactMarkdown>
      </Typography.Paragraph>)}
    </div>
  </Drawer>
}