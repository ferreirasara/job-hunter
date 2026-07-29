import {
  Alert,
  Collapse,
  Descriptions,
  Divider,
  Grid,
  Space,
  Spin,
  Tag,
} from 'antd';
import { useCallback, useMemo } from 'react';
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
import { useGetStats } from '../hooks/useGetStats';
import { getBenefitRating, getSkillRating, getTagColor } from '../utils/utils';

export default function Stats() {
  const { data, isLoading, error } = useGetStats();

  const labelStyle: React.CSSProperties = { fontWeight: 600, color: 'black' };
  const contentStyle: React.CSSProperties = {
    fontWeight: 300,
    color: 'black',
    fontStyle: 'oblique',
    wordBreak: 'keep-all',
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

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
      orientation="vertical"
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
      {error ? (
        <Alert type="error" showIcon title={error?.message} />
      ) : null}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {isLoading ? (
          <Spin />
        ) : (
          <Space orientation="vertical">
            <Collapse defaultActiveKey={'geralStats'} destroyOnHidden size='small'>
              <Collapse.Panel
                header={<strong>Estatísticas gerais</strong>}
                key="geralStats"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={[
                    { label: 'Total de vagas', children: data?.totalOfJobs },
                    { label: 'Média de rating', children: data?.medianOfRatings?.toFixed(2) },
                    { label: 'Vagas aplicadas', children: `${data?.totalOfAppliedJobs} ${calcPerc(data?.totalOfAppliedJobs, data?.totalOfJobs)}` },
                    { label: 'Vagas descartadas', children: `${data?.totalOfDiscardedJobs} ${calcPerc(data?.totalOfDiscardedJobs, data?.totalOfJobs)}` },
                    { label: 'Vagas recusadas', children: `${data?.totalOfRecusedJobs} ${calcPerc(data?.totalOfRecusedJobs, data?.totalOfAppliedJobs)}` },
                    { label: 'Vagas recusadas sem nenhuma entrevista', children: `${data?.totalOfRecusedJobsWithoutEnterview} ${calcPerc(data?.totalOfRecusedJobsWithoutEnterview, data?.totalOfAppliedJobs)}` },
                    { label: 'Média de entrevistas', children: data?.medianOfInterviews?.toFixed(2) },
                    { label: 'Média de testes', children: data?.medianOfTests?.toFixed(2) },
                  ]}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Contagem de skills</strong>}
                key="skillsContType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.skillsContType?.map((cur, index) => ({
                    label: (
                      <Tag color={getTagColor(cur?.name, getSkillRating(cur?.name))}>
                        {cur?.name}
                      </Tag>
                    ),
                    children: `${cur?.cont} ${calcPerc(cur.cont, totalOfSkills)}`,
                    key: index,
                  }))}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Contagem de benefícios</strong>}
                key="benefitsContType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.benefitsContType?.map((cur, index) => ({
                    label: (
                      <Tag color={getTagColor(cur?.name, undefined, getBenefitRating(cur?.name))}>
                        {cur?.name}
                      </Tag>
                    ),
                    children: `${cur?.cont} ${calcPerc(cur.cont, totalOfBenefits)}`,
                    key: index,
                  }))}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por tipo</strong>}
                key="jobsPerType"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.jobsPerType?.map((cur, index) => ({
                    label: (
                      <Tag color={getTagColor(cur?.type)}>
                        {cur?.type}
                      </Tag>
                    ),
                    children: `${cur?.count} ${calcPerc(cur.count, data?.totalOfJobs)}`,
                    key: index,
                  }))}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por regime de contrato</strong>}
                key="jobsPerHiringRegime"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.jobsPerHiringRegime?.map((cur, index) => ({
                    label: (
                      <Tag color={getTagColor(cur?.hiringRegime)}>
                        {cur?.hiringRegime}
                      </Tag>
                    ),
                    children: `${cur?.count} ${calcPerc(cur.count, data?.totalOfJobs)}`,
                    key: index,
                  }))}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por plataforma</strong>}
                key="jobsPerPlatform"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.jobsPerPlatform?.map((cur, index) => ({
                    label: cur?.platform,
                    children: `${cur?.count} ${calcPerc(cur.count, data?.totalOfJobs)}`,
                    key: index,
                  }))}
                />
              </Collapse.Panel>
              <Collapse.Panel
                header={<strong>Vagas por empresa</strong>}
                key="jobsPerCompany"
              >
                <Descriptions
                  column={screens?.lg ? 5 : 1}
                  styles={{ label: labelStyle, content: contentStyle }}
                  size='small'
                  items={data?.jobsPerCompany?.map((cur, index) => ({
                    label: cur?.company,
                    children: `${cur?.count} ${calcPerc(cur.count, data?.totalOfJobs)}`,
                    key: index,
                  }))}
                />
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
