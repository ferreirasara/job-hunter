import { Divider, Drawer, Grid, List, Space, Tabs, TabsProps, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { RecusedButton } from "./RecusedButton"
import { NumberOfInterviewsInput } from "./NumberOfInterviewsInput"
import { NumberOfTestsInput } from "./NumberOfTestsInput"
import ReactMarkdown from "react-markdown"
import { renderMultipleTags } from "./renderMultipleTags"

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

  const tabItems: TabsProps['items'] = [
    {
      key: 'general',
      label: `Geral`,
      children: <List size="small">
        <List.Item key="company"><strong>Empresa:</strong> {selectedJob?.company}</List.Item>
        <List.Item key="platform_type_hiringRegime">
          <Space style={{ width: '100%' }} size={'small'}>
            <span><strong>Plataforma:</strong> {selectedJob?.platform}</span>
            <span><strong>Tipo:</strong> {renderMultipleTags(selectedJob?.type)}</span>
            <span><strong>Contratação:</strong> {renderMultipleTags(selectedJob?.hiringRegime)}</span>
            <span><strong>Senioridade:</strong> {renderMultipleTags(selectedJob?.seniority)}</span>
          </Space>
        </List.Item>
        <List.Item key="ratings">
          <Space style={{ width: '100%' }} size={'small'}>
            <span><strong>SkillsRating:</strong> {selectedJob?.skillsRating || 0}</span>
            <span><strong>BeneftsRating:</strong> {selectedJob?.benefitsRating || 0}</span>
            <span><strong>TotalRating:</strong> {selectedJob?.totalRating || 0}</span>
          </Space>
        </List.Item>
        <List.Item key="skills"><strong>Skills:</strong> {renderMultipleTags(selectedJob?.skills)}</List.Item>
        <List.Item key="benefits"><strong>Benefícios:</strong> {renderMultipleTags(selectedJob?.benefits)}</List.Item>
      </List>,
    },
    {
      key: 'details',
      label: `Detalhes`,
      children: <List size="small">
        <List.Item key="uuid"><strong>uuid:</strong> <Typography.Text copyable>{selectedJob?.uuid}</Typography.Text></List.Item>
        <List.Item key="address">
          <Space style={{ width: '100%' }} size={'small'}>
            <span><strong>País:</strong> {selectedJob?.country}</span>
            <span><strong>Estado:</strong> {selectedJob?.state}</span>
            <span><strong>Cidade:</strong> {selectedJob?.city}</span>
          </Space>
        </List.Item>
      </List>,
    },
    {
      key: 'actions',
      label: `Ações`,
      children: <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
          <AppliedButton {...commomProps} disabled={!!selectedJob?.applied} />
          <DiscardedButton {...commomProps} disabled={!!selectedJob?.discarded} />
          {selectedJob?.applied ? <RecusedButton {...commomProps} disabled={!!selectedJob?.recused} /> : null}
        </div>
        {selectedJob?.applied ?
          <div style={{ display: 'flex', gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
            <NumberOfInterviewsInput  {...commomProps} numberOfInterviews={selectedJob?.numberOfInterviews} />
            <NumberOfTestsInput  {...commomProps} numberOfTests={selectedJob?.numberOfTests} />
          </div> : null}
      </div>,
    },
  ];

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
    <Tabs defaultActiveKey="1" items={tabItems} />
    <Divider style={{ fontSize: '20px', fontWeight: '600', marginTop: 8, marginBottom: 8 }}>
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