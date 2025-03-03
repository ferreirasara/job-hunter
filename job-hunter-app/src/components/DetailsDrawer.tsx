import { Divider, Drawer, Grid, List, Typography } from "antd"
import { memo, useMemo } from "react"
import Highlighter from "react-highlight-words"
import { GetJobsFromAPIArgs } from "../utils/utils"
import AppliedButton from "./AppliedButton"
import DiscardedButton from "./DiscardedButton"
import { JobsTableData } from "./JobsTable"
import MultipleTags from "./MultipleTags"
import NumberOfInterviewsInput from "./NumberOfInterviewsInput"
import NumberOfTestsInput from "./NumberOfTestsInput"
import RecusedButton from "./RecusedButton"

interface DetailsDrawerProps {
  open: boolean
  onClose: () => void
  selectedJob?: JobsTableData
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  apiArgs: GetJobsFromAPIArgs
}

interface ListItemInnerProps {
  children: React.ReactNode
  title: string
}
const ListItemInner = memo(({ children, title }: ListItemInnerProps) => {
  return <span>
    <strong>{title}:</strong> {children}
  </span>
})

const DetailsDrawer = ({ fetchData, onClose, open, selectedJob, apiArgs }: DetailsDrawerProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);
  const allRegex = useMemo(() => selectedJob?.regex?.map(cur => new RegExp(cur?.replace('/', '')?.replace('/i', ''))), [selectedJob?.regex]);

  const commomProps = {
    uuid: selectedJob?.uuid,
    fetchData: fetchData,
    onFinish: onClose,
    apiArgs,
  }

  return <Drawer
    title={<Typography.Link href={selectedJob?.url} target="_blank" copyable>{selectedJob?.title}</Typography.Link>}
    placement="right"
    onClose={onClose}
    open={open}
    width={screens?.xl ? 700 : '100%'}
    styles={{
      body: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: 0,
        paddingBottom: 12,
        paddingLeft: screens?.xl ? 24 : 12,
        paddingRight: screens?.xl ? 24 : 12,
      }
    }}
  >
    <List size="small">
      <List.Item key="company">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ListItemInner title="Empresa">{selectedJob?.company}</ListItemInner>
          <ListItemInner title="uuid"><Typography.Text copyable>{selectedJob?.uuid}</Typography.Text></ListItemInner>
        </div>
      </List.Item>
      <List.Item key="platform_type_hiringRegime">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ListItemInner title="Plataforma">{selectedJob?.platform}</ListItemInner>
          <ListItemInner title="Tipo">
            <MultipleTags field={selectedJob?.type} />
          </ListItemInner>
          <ListItemInner title="Contratação">
            <MultipleTags field={selectedJob?.hiringRegime} />
          </ListItemInner>
          <ListItemInner title="Senioridade">
            <MultipleTags field={selectedJob?.seniority} />
          </ListItemInner>
          {selectedJob?.yearsOfExperience ? <ListItemInner title="Anos de experiencia">{selectedJob?.yearsOfExperience}</ListItemInner> : null}
        </div>
      </List.Item>
      {selectedJob?.skills?.length ? <List.Item key="skills">
        <ListItemInner title={`Skills (${selectedJob?.skillsRating})`}>
          <MultipleTags field={selectedJob?.skills} />
        </ListItemInner>
      </List.Item> : null}
      {selectedJob?.benefits?.length ? <List.Item key="benefits">
        <ListItemInner title={`Benefícios (${selectedJob?.benefitsRating})`}>
          <MultipleTags field={selectedJob?.benefits} />
        </ListItemInner>
      </List.Item> : null}
      {selectedJob?.country || selectedJob?.state || selectedJob?.city ? <List.Item key="address">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {selectedJob?.country ? <ListItemInner title="País">{selectedJob?.country}</ListItemInner> : null}
          {selectedJob?.state ? <ListItemInner title="Estado">{selectedJob?.state}</ListItemInner> : null}
          {selectedJob?.city ? <ListItemInner title="Cidade">{selectedJob?.city}</ListItemInner> : null}
        </div>
      </List.Item> : null}
      <List.Item>
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
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
        </div>
      </List.Item>
    </List>
    <Divider style={{ fontSize: '20px', fontWeight: '600', marginTop: 8, marginBottom: 8 }}>
      Descrição
    </Divider>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {description?.map((cur, index) => <Typography.Paragraph key={'paragraph_' + index}>
        <Highlighter
          searchWords={allRegex || []}
          textToHighlight={cur}
        />
      </Typography.Paragraph>)}
    </div>
  </Drawer>
}

export default memo(DetailsDrawer);
