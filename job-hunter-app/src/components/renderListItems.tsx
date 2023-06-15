import { List, Space, Typography } from "antd";
import { JobsTableData } from "./JobsTable";
import { renderMultipleTags } from "./renderMultipleTags";
import { LinkOutlined } from "@ant-design/icons";

export const renderListItems = (selectedJob?: JobsTableData) => {
  const items = [
    <List.Item><strong>uuid:</strong> {selectedJob?.uuid}</List.Item>
  ];

  if (selectedJob?.platform) items.push(<List.Item><strong>Plataforma:</strong> {selectedJob?.platform} ({selectedJob?.idInPlatform})</List.Item>)
  if (selectedJob?.company) items.push(<List.Item><strong>Empresa:</strong> {selectedJob?.company}</List.Item>)
  if (selectedJob?.country || selectedJob?.state || selectedJob?.city) items.push(<List.Item>
    <Space style={{ width: '100%' }}>
      <span><strong>País:</strong> {selectedJob?.country}</span>
      <span><strong>Estado:</strong> {selectedJob?.state}</span>
      <span><strong>Cidade:</strong> {selectedJob?.city}</span>
    </Space>
  </List.Item>)
  if (selectedJob?.type) items.push(<List.Item><strong>Tipo:</strong> {renderMultipleTags(selectedJob?.type)}</List.Item>)
  if (selectedJob?.hiringRegime) items.push(<List.Item><strong>Regime de contratação:</strong> {renderMultipleTags(selectedJob?.hiringRegime)}</List.Item>)
  if (selectedJob?.salaryRange) items.push(<List.Item><strong>Faixa salarial:</strong> {selectedJob?.salaryRange}</List.Item>)
  if (selectedJob?.skills) items.push(<List.Item><strong>Skills:</strong> {renderMultipleTags(selectedJob?.skills)}</List.Item>)
  if (selectedJob?.benefits) items.push(<List.Item><strong>Benefícios:</strong> {renderMultipleTags(selectedJob?.benefits)}</List.Item>)
  if (selectedJob?.skillsRating?.toString() || selectedJob?.benefitsRating?.toString() || selectedJob?.totalRating?.toString()) items.push(<List.Item>
    <Space style={{ width: '100%' }}>
      <span><strong>SkillsRating:</strong> {selectedJob?.skillsRating || 0}</span>
      <span><strong>BeneftsRating:</strong> {selectedJob?.benefitsRating || 0}</span>
      <span><strong>TotalRating:</strong> {selectedJob?.totalRating || 0}</span>
    </Space>
  </List.Item>)
  if (selectedJob?.url) items.push(<List.Item><strong>Link:</strong> <Typography.Link href={selectedJob?.url} target="_blank"><LinkOutlined /></Typography.Link></List.Item>)

  return items;
}