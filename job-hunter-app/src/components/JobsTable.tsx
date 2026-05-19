import { ZoomInOutlined } from '@ant-design/icons';
import { Button, Grid, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { memo, useMemo } from 'react';
import { formatDateHour } from '../utils/utils';
import MultipleTags from './MultipleTags';
import Rating from './Rating';
import { JobsTableData } from '../@types/types';
import { useFilters } from '../store/filters.store';
import { useGetJobs } from '../hooks/useGetJobs';
import DiscardedButton from './DiscardedButton';

interface JobsTableProps {
  handleSeeDetails: (uuid: string) => void;
}

const JobsTable = ({
  handleSeeDetails,
}: JobsTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { limit, page, setLimit, setPage } = useFilters((state) => state);
  const { data, isLoading, isFetching } = useGetJobs();

  const columns: ColumnsType<JobsTableData> = useMemo(
    () => [
      {
        title: 'Criada em',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt) => formatDateHour(createdAt),
        width: screens?.xl ? 115 : undefined,
        align: 'center',
        showSorterTooltip: false,
        responsive: ['xl', 'xxl'],
      },
      {
        title: 'Plataforma',
        dataIndex: 'platform',
        key: 'platform',
        width: screens?.xl ? 125 : undefined,
        ellipsis: true,
        showSorterTooltip: false,
        align: 'center',
        responsive: ['xl', 'xxl'],
      },
      {
        title: 'Empresa',
        dataIndex: 'company',
        key: 'company',
        width: screens?.xl ? 170 : undefined,
        ellipsis: true,
        showSorterTooltip: false,
        responsive: ['xl', 'xxl'],
      },
      {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        width: screens?.xxl ? 400 : undefined,
        ellipsis: true,
        showSorterTooltip: false,
        render: (title, record) =>
          record.url ? (
            <Typography.Link href={record.url} target="_blank">
              {title}
            </Typography.Link>
          ) : (
            <Typography.Text>{title}</Typography.Text>
          ),
      },
      {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        width: screens?.xxl ? 110 : undefined,
        align: 'center',
        showSorterTooltip: false,
        render: (type: string) => <MultipleTags field={type} />,
        responsive: ['xxl'],
      },
      {
        title: 'Contratação',
        dataIndex: 'hiringRegime',
        key: 'hiringRegime',
        width: screens?.xxl ? 130 : undefined,
        align: 'center',
        showSorterTooltip: false,
        render: (type: string) => <MultipleTags field={type} />,
        responsive: ['xxl'],
      },
      {
        title: 'Senioridade',
        dataIndex: 'seniority',
        key: 'seniority',
        width: screens?.xxl ? 130 : undefined,
        align: 'center',
        showSorterTooltip: false,
        render: (type: string) => <MultipleTags field={type} />,
        responsive: ['xxl'],
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        ellipsis: true,
        render: (skills: string) => <MultipleTags field={skills} />,
        responsive: ['xl', 'xxl'],
      },
      {
        title: 'Benefícios',
        dataIndex: 'benefits',
        key: 'benefits',
        ellipsis: true,
        render: (benefits: string) => <MultipleTags field={benefits} />,
        responsive: ['xl', 'xxl'],
      },
      {
        title: 'Rating',
        dataIndex: 'totalRating',
        key: 'totalRating',
        width: screens?.xl ? 75 : undefined,
        align: 'center',
        render: (rating) => (
          <Rating
            rating={rating}
            indexOf={data?.allRatings?.indexOf(rating)}
            length={data?.allRatings?.length || 0}
          />
        ),
        showSorterTooltip: false,
        responsive: ['xl', 'xxl'],
      },
      {
        title: '',
        dataIndex: 'uuid',
        key: 'uuid',
        width: 70,
        align: 'center',
        render: (uuid) => (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Button
              size="small"
              onClick={() => handleSeeDetails(uuid)}
              icon={<ZoomInOutlined />}
              type="text"
            />
            <DiscardedButton
              uuid={uuid}
              onlyIcon
            />
          </div>
        ),
      },
    ],
    [data?.allRatings, handleSeeDetails, screens?.xl, screens?.xxl],
  );

  return (
    <Table
      bordered
      loading={isLoading || isFetching}
      columns={columns}
      dataSource={data?.data || []}
      rowKey={'uuid'}
      size="small"
      pagination={{
        position: ['bottomCenter'],
        onChange: (page, pageSize) => {
          setPage(page - 1);
          setLimit(pageSize);
        },
        total: data?.totalOfJobs || 0,
        current: page + 1,
        pageSize: limit,
      }}
    />
  );
};

export default memo(JobsTable);
