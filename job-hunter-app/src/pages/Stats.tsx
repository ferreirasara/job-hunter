import { Alert, Collapse, Descriptions, Divider, Grid, Space, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { getStatsFromAPI } from "../utils/utils";

type ContType = {
  name: string
  cont: number
}
type StatsResponse = {
  message?: string
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

export default function Stats() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StatsResponse>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const labelStyle: React.CSSProperties = { fontWeight: 600, color: 'black' }
  const contentStyle: React.CSSProperties = { fontWeight: 300, color: 'black', fontStyle: 'oblique', wordBreak: 'keep-all' }

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: StatsResponse = await getStatsFromAPI();
      if (response?.message) {
        setErrorMessage(response?.message)
      } else {
        setData(response);
      }
    } catch (e) {
      setErrorMessage(e?.toString() || "");
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />

  return <Space direction="vertical" style={{ display: 'flex', flexDirection: 'column', padding: '0 64px', width: 'calc(100% - 128px)' }}>
    <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
      Job Hunter - Estatísticas
    </Divider>
    {errorMessage ? <Alert type="error" showIcon message={errorMessage} /> : null}
    <div style={{ width: '100%', display: 'flex', flexDirection: "column" }}>
      {loading ? <Spin /> : <Space direction="vertical">
        <Collapse defaultActiveKey={"geralStats"}>
          <Collapse.Panel header={<strong>Estatísticas gerais</strong>} key="geralStats">
            <Descriptions column={screens?.lg ? 5 : 1} styles={{ label: labelStyle, content: contentStyle }}>
              <Descriptions.Item label="Total de vagas">{data?.totalOfJobs}</Descriptions.Item>
              <Descriptions.Item label="Vagas aplicadas">{data?.totalOfAppliedJobs}</Descriptions.Item>
              <Descriptions.Item label="Vagas descartadas">{data?.totalOfDiscardedJobs}</Descriptions.Item>
              <Descriptions.Item label="Vagas recusadas">{data?.totalOfRecusedJobs}</Descriptions.Item>
              <Descriptions.Item label="Vagas recusadas sem nenhuma entrevista">{data?.totalOfRecusedJobsWithoutEnterview}</Descriptions.Item>
              <Descriptions.Item label="Média de entrevistas">{data?.medianOfInterviews?.toPrecision(2)}</Descriptions.Item>
              <Descriptions.Item label="Média de testes">{data?.medianOfTests?.toPrecision(2)}</Descriptions.Item>
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Contagem de skills</strong>} key="skillsContType">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.skillsContType?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.name}>{cur?.cont}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Contagem de benefícios</strong>} key="benefitsContType">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.benefitsContType?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.name}>{cur?.cont}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por tipo</strong>} key="jobsPerType">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.jobsPerType?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.type}>{cur?.count}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por regime de contrato</strong>} key="jobsPerHiringRegime">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.jobsPerHiringRegime?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.hiringRegime}>{cur?.count}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por plataforma</strong>} key="jobsPerPlatform">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.jobsPerPlatform?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.platform}>{cur?.count}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por empresa</strong>} key="jobsPerCompany">
            <Descriptions column={screens?.lg ? 5 : 1} labelStyle={labelStyle} contentStyle={contentStyle}>
              {data?.jobsPerCompany?.map((cur, index) => <Descriptions.Item key={`${cur}-${index}`} label={cur?.company}>{cur?.count}</Descriptions.Item>)}
            </Descriptions>
          </Collapse.Panel>
          <Collapse.Panel header={<strong>Vagas por rating</strong>} key="jobsPerRating">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ maxWidth: 600, padding: 8 }}>
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryLine
                    data={data?.jobsPerRating}
                    x="totalRating"
                    y="count"
                    labels={({ datum }: { datum: { totalRating: string, count: number } }) => datum.count}
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
