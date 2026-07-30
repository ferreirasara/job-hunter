import {
  Alert,
  Button,
  Card,
  Empty,
  Spin,
  Statistic,
  Typography,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileSearchOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetStats } from '../hooks/useGetStats';

type ChartItem = {
  name: string;
  count: number;
};

type DashboardTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: { value?: string | number }[];
  total?: number;
};

const numberFormatter = new Intl.NumberFormat('pt-BR');

const formatPercentage = (value: number, total: number) =>
  total > 0 ? `${((value / total) * 100).toFixed(1)}%` : '0,0%';

function DashboardTooltip({
  active,
  label,
  payload,
  total,
}: DashboardTooltipProps) {
  if (!active || !payload?.length) return null;

  const value = Number(payload[0]?.value || 0);

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: 8,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
        padding: '10px 12px',
      }}
    >
      <strong>{label}</strong>
      <div>{numberFormatter.format(value)} vagas</div>
      {total !== undefined ? (
        <span style={{ color: '#8c8c8c', fontSize: 12 }}>
          {formatPercentage(value, total)} do total
        </span>
      ) : null}
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      title={title}
      styles={{ body: { padding: '16px 12px 12px' } }}
      style={{ borderRadius: 12, height: '100%' }}
    >
      {children}
    </Card>
  );
}

function HorizontalBarChart({
  data,
  total,
  color = '#1677ff',
}: {
  data: ChartItem[];
  total?: number;
  color?: string;
}) {
  if (!data.length) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sem dados" />;

  return (
    <ResponsiveContainer width="100%" height={Math.max(260, data.length * 36)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 18 }}>
        <CartesianGrid stroke="#f0f0f0" horizontal={false} />
        <XAxis type="number" allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={112}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<DashboardTooltip total={total} />} cursor={{ fill: '#f5f8ff' }} />
        <Bar dataKey="count" fill={color} radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Stats() {
  const { data, isLoading, error } = useGetStats();
  const navigate = useNavigate();

  const totalOfJobs = data?.totalOfJobs || 0;

  const applicationPipeline = useMemo(
    () => [
      { name: 'Total de vagas', count: totalOfJobs, color: '#1677ff' },
      { name: 'Vagas aplicadas', count: data?.totalOfAppliedJobs || 0, color: '#36cfc9' },
      { name: 'Vagas recusadas', count: data?.totalOfRecusedJobs || 0, color: '#ff7875' },
      {
        name: 'Recusadas sem entrevista',
        count: data?.totalOfRecusedJobsWithoutEnterview || 0,
        color: '#faad14',
      },
    ],
    [data, totalOfJobs],
  );

  const typeData = useMemo(
    () => data?.jobsPerType?.map((item) => ({ name: item.type, count: item.count })) || [],
    [data?.jobsPerType],
  );
  const hiringRegimeData = useMemo(
    () => data?.jobsPerHiringRegime?.map((item) => ({ name: item.hiringRegime, count: item.count })) || [],
    [data?.jobsPerHiringRegime],
  );
  const platformData = useMemo(
    () => (data?.jobsPerPlatform?.map((item) => ({ name: item.platform, count: item.count }))) || [],
    [data?.jobsPerPlatform],
  );
  const ratingData = useMemo(
    () => [...(data?.jobsPerRating || [])]
      .sort((a, b) => Number(a.totalRating) - Number(b.totalRating))
      .map((item) => ({ name: item.totalRating, count: item.count })),
    [data?.jobsPerRating],
  );

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace />;

  return (
    <main
      style={{
        background: 'linear-gradient(180deg, #f5f8ff 0, #fff 320px)',
        boxSizing: 'border-box',
        minHeight: '100dvh',
        padding: '32px clamp(16px, 5vw, 72px) 48px',
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <Typography.Title level={2} style={{ margin: 0 }}>
          Estatísticas
        </Typography.Title>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
          Voltar para vagas
        </Button>
      </div>

      {error ? <Alert type="error" showIcon message={error.message} style={{ marginBottom: 20 }} /> : null}

      {isLoading ? (
        <div style={{ display: 'grid', minHeight: 360, placeItems: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
          <>
            <section
              style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                marginBottom: 24,
              }}
            >
              <Card style={{ borderRadius: 12 }}><Statistic title="Total de vagas" value={totalOfJobs} prefix={<FileSearchOutlined />} /></Card>
              <Card style={{ borderRadius: 12 }}><Statistic title="Média de rating" value={data?.medianOfRatings || 0} precision={2} prefix={<StarOutlined />} /></Card>
              <Card style={{ borderRadius: 12 }}><Statistic title="Média de entrevistas" value={data?.medianOfInterviews || 0} precision={2} prefix={<CheckCircleOutlined />} /></Card>
              <Card style={{ borderRadius: 12 }}><Statistic title="Média de testes" value={data?.medianOfTests || 0} precision={2} /></Card>
              <Card style={{ borderRadius: 12 }}><Statistic title="Vagas descartadas" value={data?.totalOfDiscardedJobs || 0} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#cf1322' }} /></Card>
            </section>

            <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 16 }}>
              <ChartCard title="Funil de candidatura">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={applicationPipeline} margin={{ top: 12, right: 20, bottom: 4, left: 0 }}>
                    <CartesianGrid stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<DashboardTooltip total={totalOfJobs} />} cursor={{ fill: '#f5f8ff' }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {applicationPipeline.map((item) => <Cell key={item.name} fill={item.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Distribuição de ratings">
                {ratingData.length ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={ratingData} margin={{ top: 16, right: 20, bottom: 4, left: 0 }}>
                      <CartesianGrid stroke="#f0f0f0" />
                      <XAxis dataKey="name" tickLine={false} />
                      <YAxis allowDecimals={false} />
                      <Tooltip content={<DashboardTooltip total={totalOfJobs} />} />
                      <Line type="monotone" dataKey="count" stroke="#722ed1" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
              ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sem dados" />}
            </ChartCard>
          </section>

          <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 16 }}>
            <ChartCard title="Vagas por modalidade"><HorizontalBarChart data={typeData} total={totalOfJobs} color="#36cfc9" /></ChartCard>
            <ChartCard title="Vagas por regime de contratação"><HorizontalBarChart data={hiringRegimeData} total={totalOfJobs} color="#52c41a" /></ChartCard>
          </section>
          <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: 16 }}>
            <ChartCard title="Vagas por plataforma"><HorizontalBarChart data={platformData} total={totalOfJobs} color="#1677ff" /></ChartCard>
          </section>
        </>
      )}
    </main>
  );
}
