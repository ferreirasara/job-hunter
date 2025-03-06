import {
  Alert,
  Collapse,
  Descriptions,
  Divider,
  Grid,
  Space,
  Spin,
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getStatsFromAPI } from '../utils/utils';

type ContType = {
  name: string;
  cont: number;
};
type StatsResponse = {
  message?: string;
  jobsPerPlatform: { platform: string; count: number }[];
  jobsPerCompany: { company: string; count: number }[];
  jobsPerRating: { totalRating: string; count: number }[];
  jobsPerType: { type: string; count: number }[];
  jobsPerHiringRegime: { hiringRegime: string; count: number }[];
  totalOfJobs: number;
  totalOfAppliedJobs: number;
  totalOfDiscardedJobs: number;
  totalOfRecusedJobs: number;
  totalOfRecusedJobsWithoutEnterview: number;
  medianOfInterviews: number;
  medianOfTests: number;
  medianOfRatings: number;
  skillsContType: ContType[];
  benefitsContType: ContType[];
};

export default function Stats() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<StatsResponse>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const labelStyle: React.CSSProperties = { fontWeight: 600, color: 'black' };
  const contentStyle: React.CSSProperties = {
    fontWeight: 300,
    color: 'black',
    fontStyle: 'oblique',
    wordBreak: 'keep-all',
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: StatsResponse = await getStatsFromAPI();
      if (response?.message) {
        setErrorMessage(response?.message);
      } else {
        setData(response);
      }
    } catch (e) {
      setErrorMessage(e?.toString() || '');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const calcPerc = useCallback(
    (num1: number | undefined, num2: number | undefined) => {
      const perc = ((num1 || 0) / (num2 || 1)) * 100;
      return `(${perc.toFixed(2)}%)`;
    },
    [],
  );

  const totalOfSkills = useMemo(
    () => data?.skillsContType?.reduce((acc, cur) => acc + cur.cont, 0) || 0,
    [data?.skillsContType],
  );

  const totalOfBenefits = useMemo(
    () => data?.benefitsContType?.reduce((acc, cur) => acc + cur.cont, 0) || 0,
    [data?.benefitsContType],
  );

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />;

  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 64px',
        width: 'calc(100% - 128px)',
      }}
    >
      <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
        Job Hunter - Estatísticas
      </Divider>
      {errorMessage ? (
        <Alert type="error" showIcon message={errorMessage} />
      ) : null}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <Spin />
        ) : (
          <Space direction="vertical">
            <Collapse defaultActiveKey={'geralStats'} destroyInactivePanel>
              <Collapse.Panel
                header={<strong>Estatísticas gerais</strong>}
                key="geralStats"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                >
                  <Descriptions.Item label="Total de vagas">
                    {data?.totalOfJobs}
                  </Descriptions.Item>
                  <Descriptions.Item label="Média de rating">
                    {data?.medianOfRatings?.toFixed(2)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vagas aplicadas">
                    {data?.totalOfAppliedJobs}{' '}
                    {calcPerc(data?.totalOfAppliedJobs, data?.totalOfJobs)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vagas descartadas">
                    {data?.totalOfDiscardedJobs}{' '}
                    {calcPerc(data?.totalOfDiscardedJobs, data?.totalOfJobs)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vagas recusadas">
                    {data?.totalOfRecusedJobs}{' '}
                    {calcPerc(
                      data?.totalOfRecusedJobs,
                      data?.totalOfAppliedJobs,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vagas recusadas sem nenhuma entrevista">
                    {data?.totalOfRecusedJobsWithoutEnterview}{' '}
                    {calcPerc(
                      data?.totalOfRecusedJobsWithoutEnterview,
                      data?.totalOfAppliedJobs,
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Média de entrevistas">
                    {data?.medianOfInterviews?.toFixed(2)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Média de testes">
                    {data?.medianOfTests?.toFixed(2)}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Contagem de skills</strong>}
                key="skillsContType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.skillsContType?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.name}
                    >
                      {cur?.cont} {calcPerc(cur.cont, totalOfSkills)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Contagem de benefícios</strong>}
                key="benefitsContType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.benefitsContType?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.name}
                    >
                      {cur?.cont} {calcPerc(cur.cont, totalOfBenefits)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por tipo</strong>}
                key="jobsPerType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.jobsPerType?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.type}
                    >
                      {cur?.count} {calcPerc(cur.count, data?.totalOfJobs)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por regime de contrato</strong>}
                key="jobsPerHiringRegime"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.jobsPerHiringRegime?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.hiringRegime}
                    >
                      {cur?.count} {calcPerc(cur.count, data?.totalOfJobs)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por plataforma</strong>}
                key="jobsPerPlatform"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.jobsPerPlatform?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.platform}
                    >
                      {cur?.count} {calcPerc(cur.count, data?.totalOfJobs)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por empresa</strong>}
                key="jobsPerCompany"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  labelStyle={labelStyle}
                  contentStyle={contentStyle}
                >
                  {data?.jobsPerCompany?.map((cur, index) => (
                    <Descriptions.Item
                      key={`${cur}-${index}`}
                      label={cur?.company}
                    >
                      {cur?.count} {calcPerc(cur.count, data?.totalOfJobs)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por rating</strong>}
                key="jobsPerRating"
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ minHeight: 300, width: '100%' }}>
                    <ResponsiveContainer>
                      <LineChart
                        data={data?.jobsPerRating
                          ?.slice()
                          ?.sort(
                            (a, b) =>
                              parseInt(a.totalRating) - parseInt(b.totalRating),
                          )}
                      >
                        <XAxis dataKey="totalRating" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid />
                        <Line type="monotone" dataKey="count" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </Space>
        )}
      </div>
    </Space>
  );
}
