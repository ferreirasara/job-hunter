import { Alert, Collapse, Divider, List, Space, Spin } from "antd"
import { useCallback, useEffect, useState } from "react";
import { getStatsFromAPI } from "../utils/utils";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

type StatsResponse = {
  jobsPerPlatform: { platform: string; count: number }[]
  jobsPerCompany: { company: string; count: number }[]
  jobsPerRating: { totalRating: string; count: number }[]
  totalOfJobs: number
  totalOfAppliedJobs: number
  totalOfDiscardedJobs: number
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
            </List>
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