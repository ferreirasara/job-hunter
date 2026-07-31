import { BarChartOutlined, CopyOutlined, FilePdfOutlined, FilterOutlined, LinkOutlined, MoreOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, Dropdown, MenuProps, message, Space } from 'antd';
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
import { COVER_LETTER } from '../utils/constants';

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

  const { mutateAsync } = useRunScrapers();
  const handleRunScrapers = useCallback(async () => {
    await mutateAsync();
    messageApi.open({
      content: 'Scrapers executados com sucesso! Aguarde alguns minutos.',
      type: 'success',
      duration: 10,
    });
  }, [messageApi]);

  const handleCopyCoverLetter = useCallback(() => {
    navigator.clipboard.writeText(COVER_LETTER);
    messageApi.open({
      content: 'Carta de apresentação copiada para a área de transferencia.',
      type: 'success',
      duration: 10,
    });
  }, []);

  const items: MenuProps['items'] = [
    {
      key: 'stats',
      label: (
        <NavLink to="/stats">
          Ver estatísticas
        </NavLink>
      ),
      icon: <BarChartOutlined />,
    },
    {
      key: 'refetch',
      label: 'Regarregar vagas',
      onClick: () => refetch(),
      icon: <ReloadOutlined />,
    },
    {
      key: 'run-scrapers',
      label: 'Executar scrapers',
      onClick: () => handleRunScrapers(),
      icon: <PlayCircleOutlined />,
    },
    {
      key: 'copy-cover-letter',
      label: 'Copiar carta de apresentação',
      onClick: () => handleCopyCoverLetter(),
      icon: <CopyOutlined />,
    },
    {
      key: 'online-curriculum',
      label: <a href="https://ferreirasara.github.io/curriculum-vitae/" target='_blank'>Currículo on-line</a>,
      icon: <LinkOutlined />,
    },
    {
      key: 'online-curriculum-pdf',
      label: <a href="https://github.com/ferreirasara/curriculum-vitae/blob/a692d9cb7cc3558410e31d169fa051b1fb46a636/curriculum-vitae-sara-ferreira.pdf" target='_blank'>Currículo on-line em pdf</a>,
      icon: <FilePdfOutlined />,
    },
  ];

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />;

  return (
    <div>
      {contextHolder}
      <Space orientation="vertical" style={{ padding: '0 16px' }}>
        <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
          Job Hunter
        </Divider>
        <Space.Compact>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFiltersDrawerOpen(true)}
          >
            Filtrar vagas
          </Button>
          <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </Space.Compact>
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
