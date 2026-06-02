import { BarChartOutlined, FilterOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, message, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import DetailsDrawer from '../components/DetailsDrawer';
import FiltersDrawer from '../components/FiltersDrawer';
import JobsTable from '../components/JobsTable';
import { JobsTableData } from '../@types/types';
import { useGetJobs } from '../hooks/useGetJobs';
import { useShallow } from 'zustand/shallow';
import { useFilters } from '../store/filters.store';
import { calcLimit } from '../utils/utils';
import { useRunScrapers } from '../hooks/useRunScrapers';

export default function Root() {
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState<boolean>(false);
  const setLimit = useFilters(useShallow(state => state.setLimit));
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading, error, refetch } = useGetJobs();

  const handleSeeDetails = useCallback(
    (uuid: string) => {
      const job = data?.data?.find((cur) => cur?.uuid === uuid);
      setSelectedJob(job);
      setDetailsDrawerOpen(true);
    },
    [data],
  );

  const onCloseDrawer = useCallback(() => {
    setDetailsDrawerOpen(false);
    setSelectedJob(undefined);
  }, []);

  useEffect(() => {
    setLimit(calcLimit());
  }, []);

  const { mutateAsync, isPending: isRunningScrapers } = useRunScrapers();
  const handleRunScrapers = useCallback(async () => {
    await mutateAsync();
    messageApi.open({
      content: 'Scrapers executados com sucesso! Aguarde alguns minutos.',
      type: 'success',
      duration: 10,
    });
  }, [messageApi]);

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />;

  return (
    <div>
      {contextHolder}
      <Space orientation="vertical" style={{ padding: '0 16px' }}>
        <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
          Job Hunter
        </Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFiltersDrawerOpen(true)}
          >
            Filtrar vagas
          </Button>
          <NavLink to="/stats">
            <Button icon={<BarChartOutlined />}>Ver estatísticas</Button>
          </NavLink>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => refetch()}
            loading={isLoading}
          >
            Regarregar vagas
          </Button>
          <Button
            icon={<PlayCircleOutlined />}
            onClick={handleRunScrapers}
            loading={isRunningScrapers}
          >
            Executar scrapers
          </Button>
        </div>
        {error ? (
          <Alert type="error" showIcon message={error?.message} />
        ) : null}
        <JobsTable handleSeeDetails={(uuid) => handleSeeDetails(uuid)} />
      </Space>
      {!!selectedJob && detailsDrawerOpen && (
        <DetailsDrawer
          open={detailsDrawerOpen}
          onClose={onCloseDrawer}
          selectedJob={selectedJob}
        />
      )}
      {filtersDrawerOpen && (
        <FiltersDrawer
          open={filtersDrawerOpen}
          onClose={() => setFiltersDrawerOpen(false)}
          allSkills={data?.allSkills || []}
          allBenefits={data?.allBenefits || []}
          loading={isLoading}
        />
      )}
    </div>
  );
}
