import { List, Space, Typography } from "antd";
import { JobsTableData } from "./JobsTable";
import { renderMultipleTags } from "./renderMultipleTags";

export const renderListItems = (selectedJob?: JobsTableData) => {
  const items = [
    <List.Item><strong>Empresa:</strong> {selectedJob?.company}</List.Item>,
    <List.Item><strong>uuid:</strong> <Typography.Text copyable>{selectedJob?.uuid}</Typography.Text></List.Item>,
    <List.Item>
      <Space style={{ width: '100%' }}>
        <span><strong>Plataforma:</strong> {selectedJob?.platform} ({selectedJob?.idInPlatform})</span>
        <span><strong>Tipo:</strong> {renderMultipleTags(selectedJob?.type)}</span>
        <span><strong>Regime de contratação:</strong> {renderMultipleTags(selectedJob?.hiringRegime)}</span>
      </Space>
    </List.Item>,
  ];
  if (selectedJob?.country || selectedJob?.state || selectedJob?.city) items.push(<List.Item>
    <Space style={{ width: '100%' }}>
      <span><strong>País:</strong> {selectedJob?.country}</span>
      <span><strong>Estado:</strong> {selectedJob?.state}</span>
      <span><strong>Cidade:</strong> {selectedJob?.city}</span>
    </Space>
  </List.Item>)
  if (selectedJob?.skillsRating?.toString() || selectedJob?.benefitsRating?.toString() || selectedJob?.totalRating?.toString()) items.push(<List.Item>
    <Space style={{ width: '100%' }}>
      <span><strong>SkillsRating:</strong> {selectedJob?.skillsRating || 0}</span>
      <span><strong>BeneftsRating:</strong> {selectedJob?.benefitsRating || 0}</span>
      <span><strong>TotalRating:</strong> {selectedJob?.totalRating || 0}</span>
    </Space>
  </List.Item>)
  if (selectedJob?.skills) items.push(<List.Item><strong>Skills:</strong> {renderMultipleTags(selectedJob?.skills)}</List.Item>)
  if (selectedJob?.benefits) items.push(<List.Item><strong>Benefícios:</strong> {renderMultipleTags(selectedJob?.benefits)}</List.Item>)

  return items;
}