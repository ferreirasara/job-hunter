import { Button, Divider, Drawer, Grid, List, Typography } from "antd"
import { JobsTableData } from "./JobsTable"
import { AppliedButton } from "./AppliedButton"
import { DiscardedButton } from "./DiscardedButton"
import { RecusedButton } from "./RecusedButton"
import { NumberOfInterviewsInput } from "./NumberOfInterviewsInput"
import { NumberOfTestsInput } from "./NumberOfTestsInput"
import { renderMultipleTags } from "./renderMultipleTags"
import { useMemo, useState } from "react"
import { GetJobsFromAPIArgs } from "../utils/utils"
import Highlighter from "react-highlight-words"

type DetailsDrawerProps = {
  open: boolean
  onClose: () => void
  selectedJob?: JobsTableData
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  apiArgs: GetJobsFromAPIArgs
}

type ListItemInnerProps = {
  children: React.ReactNode
  title: string
}
const ListItemInner = ({ children, title }: ListItemInnerProps) => {
  return <span>
    <strong>{title}:</strong> {children}
  </span>
}

export const DetailsDrawer = ({ fetchData, onClose, open, selectedJob, apiArgs }: DetailsDrawerProps) => {
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
  const [showAllBenefits, setShowAllBenefits] = useState<boolean>(false);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const descriptionSplit = selectedJob?.description?.split('\n');
  const description = descriptionSplit?.filter(cur => !!cur);
  const allRegex = selectedJob?.regex?.map(cur => new RegExp(cur?.replace('/', '')?.replace('/i', '')));

  const commomProps = {
    uuid: selectedJob?.uuid,
    fetchData: fetchData,
    onFinish: onClose,
    apiArgs,
  }

  const skillTags = useMemo(() => renderMultipleTags(selectedJob?.skills) || [], [selectedJob?.skills]);
  const benefitTags = useMemo(() => renderMultipleTags(selectedJob?.benefits) || [], [selectedJob?.benefits]);

  const skillTagsToShow = useMemo(() => {
    return showAllSkills ? skillTags : skillTags?.slice(0, 5)
  }, [showAllSkills, skillTags]);

  const benefitTagsToShow = useMemo(() => {
    return showAllBenefits ? benefitTags : benefitTags?.slice(0, 3)
  }, [showAllBenefits, benefitTags]);

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
      <List.Item key="company">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ListItemInner title="Empresa">{selectedJob?.company}</ListItemInner>
          <ListItemInner title="uuid"><Typography.Text copyable>{selectedJob?.uuid}</Typography.Text></ListItemInner>
        </div>
      </List.Item>
      <List.Item key="platform_type_hiringRegime">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <ListItemInner title="Plataforma">{selectedJob?.platform}</ListItemInner>
          <ListItemInner title="Tipo">{renderMultipleTags(selectedJob?.type)}</ListItemInner>
          <ListItemInner title="Contratação">{renderMultipleTags(selectedJob?.hiringRegime)}</ListItemInner>
          <ListItemInner title="Senioridade">{renderMultipleTags(selectedJob?.seniority)}</ListItemInner>
          {selectedJob?.yearsOfExperience ? <ListItemInner title="Anos de experiencia">{selectedJob?.yearsOfExperience}</ListItemInner> : null}
        </div>
      </List.Item>
      {skillTagsToShow?.length ? <List.Item key="skills">
        <ListItemInner title={`Skills (${selectedJob?.skillsRating})`}>
          {skillTagsToShow}
          {skillTags?.length > 5 ? <Button size="small" onClick={() => setShowAllSkills(!showAllSkills)}>Ver {showAllSkills ? "menos" : "mais"}</Button> : null}
        </ListItemInner>
      </List.Item> : null}
      {benefitTagsToShow?.length ? <List.Item key="benefits">
        <ListItemInner title={`Benefícios (${selectedJob?.benefitsRating})`}>
          {benefitTagsToShow}
          {benefitTags?.length > 3 ? <Button size="small" onClick={() => setShowAllBenefits(!showAllBenefits)}>Ver {showAllBenefits ? "menos" : "mais"}</Button> : null}
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