import { BarChartOutlined, FilterOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, Space } from 'antd';
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

export default function Root() {
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState<boolean>(false);
  const setLimit = useFilters(useShallow(state => state.setLimit));

  const { data, isLoading, error } = useGetJobs();

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

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />;

  return (
    <div>
      <Space direction="vertical" style={{ padding: '0 16px' }}>
        <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
          Job Hunter
        </Divider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            flexWrap: 'wrap',
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
