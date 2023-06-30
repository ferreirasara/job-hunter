import { Alert, Collapse, Divider, List, Space, Spin } from "antd"
import { useCallback, useEffect, useState } from "react";
import { getStatsFromAPI } from "../utils/utils";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

type ContType = {
  name: string
  cont: number
}
type StatsResponse = {
  jobsPerPlatform: { platform: string; count: number }[]
  jobsPerCompany: { company: string; count: number }[]
  jobsPerRating: { totalRating: string; count: number }[]
  jobsPerType: { type: string; count: number }[]
  jobsPerHiringRegime: { hiringRegime: string; count: number }[]
  totalOfJobs: number
  totalOfAppliedJobs: number
  totalOfDiscardedJobs: number
  totalOfRecusedJobs: number
  totalOfRecusedJobsWithoutEnterview: number
  medianOfInterviews: number
  medianOfTests: number
  skillsContType: ContType[]
  benefitsContType: ContType[]
}

export const Stats = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StatsResponse>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = (message: string) => setErrorMessage(message);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: StatsResponse = await getStatsFromAPI();
      if (response) setData(response);
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return <Space direction="vertical" style={{ display: 'flex', flexDirection: 'column', padding: '0 64px', width: 'calc(100% - 128px)' }}>
    <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
      Job Hunter - Estatísticas
    </Divider>
    {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
    <div style={{ width: '100%', display: 'flex', flexDirection: "column" }}>
      {loading ? <Spin /> : <Space direction="vertical">
        <Collapse defaultActiveKey={"geralStats"}>
          <Collapse.Panel header={<strong>Estatísticas gerais</strong>} key="geralStats">
            <List size="small">
              <List.Item><strong>Total de vagas:</strong> {data?.totalOfJobs}</List.Item>
              <List.Item><strong>Vagas aplicadas:</strong> {data?.totalOfAppliedJobs}</List.Item>
              <List.Item><strong>Vagas descartadas:</strong> {data?.totalOfDiscardedJobs}</List.Item>
              <List.Item><strong>Vagas recusadas:</strong> {data?.totalOfRecusedJobs}</List.Item>
              <List.Item><strong>Vagas recusadas sem nenhuma entrevista:</strong> {data?.totalOfRecusedJobsWithoutEnterview}</List.Item>
              <List.Item><strong>Média de entrevistas:</strong> {data?.medianOfInterviews?.toPrecision(2)}</List.Item>
              <List.Item><strong>Média de testes:</strong> {data?.medianOfTests?.toPrecision(2)}</List.Item>
            </List>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Contagem de skills</strong>} key="skillsContType">
            <List
              size="small"
              dataSource={data?.skillsContType}
              renderItem={(item) => <List.Item><strong>{item?.name}:</strong> {item?.cont}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Contagem de benefícios</strong>} key="benefitsContType">
            <List
              size="small"
              dataSource={data?.benefitsContType}
              renderItem={(item) => <List.Item><strong>{item?.name}:</strong> {item?.cont}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por tipo</strong>} key="jobsPerType">
            <List
              size="small"
              dataSource={data?.jobsPerType}
              renderItem={(item) => <List.Item><strong>{item?.type}:</strong> {item?.count}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por regime de contrato</strong>} key="jobsPerHiringRegime">
            <List
              size="small"
              dataSource={data?.jobsPerHiringRegime}
              renderItem={(item) => <List.Item><strong>{item?.hiringRegime}:</strong> {item?.count}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por plataforma</strong>} key="jobsPerPlatform">
            <List
              size="small"
              dataSource={data?.jobsPerPlatform}
              renderItem={(item) => <List.Item><strong>{item?.platform}:</strong> {item?.count}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por empresa</strong>} key="jobsPerCompany">
            <List
              size="small"
              dataSource={data?.jobsPerCompany}
              renderItem={(item) => <List.Item><strong>{item?.company}:</strong> {item?.count}</List.Item>}
            />
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por rating</strong>} key="jobsPerRating">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ maxWidth: 600, padding: 8 }}>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryLine
                    data={data?.jobsPerRating}
                    x="totalRating"
                    y="count"
                    labels={({ datum }) => datum.count}
                  />
                </VictoryChart>
              </div>
            </div>
          </Collapse.Panel>
        </Collapse>
      </Space>
      }
    </div>
  </Space>
}