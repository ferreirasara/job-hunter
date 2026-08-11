import { Button, Drawer, Form, Grid, Input, Radio, Select, Space } from 'antd';
import { memo } from 'react';
import { GetJobsFromAPIArgs, JobHiringRegime, JobPlatform, JobSeniority, JobType } from '../@types/types';
import { useFilters } from '../store/filters.store';
import { useGetJobs } from '../hooks/useGetJobs';
import { ClearOutlined, FilterOutlined } from '@ant-design/icons';
import { INITIAL_FILTERS_STATE } from '../utils/constants';

interface FiltersDrawerProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  allSkills: string[];
  allBenefits: string[];
}

const formItemStyle: React.CSSProperties = { marginBottom: 8 };

const FiltersDrawer = ({
  onClose,
  open,
}: FiltersDrawerProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [form] = Form.useForm<GetJobsFromAPIArgs>();
  const state = useFilters((state) => state);
  const { data, isLoading } = useGetJobs();

  const typeOptions = Object.keys(JobType);
  const hiringRegimeOptions = Object.keys(JobHiringRegime);
  const seniorityOptions = Object.keys(JobSeniority);
  const platformOptions = Object.keys(JobPlatform);

  const initialValues: GetJobsFromAPIArgs = {
    benefitFilter: state.benefitFilter,
    companyFilter: state.companyFilter,
    hiringRegimeFilter: state.hiringRegimeFilter,
    platformFilter: state.platformFilter,
    skillFilter: state.skillFilter,
    titleFilter: state.titleFilter,
    typeFilter: state.typeFilter,
    seniorityFilter: state.seniorityFilter,
    showOnlyApplied: state.showOnlyApplied,
    showOnlyDiscarded: state.showOnlyDiscarded,
    showOnlyNewJobs: state.showOnlyNewJobs,
    showOnlyRecused: state.showOnlyRecused,
    page: state.page,
    limit: state.limit,
    orderByOrder: state.orderByOrder,
    orderByField: state.orderByField,
    skillsFilter: state.skillsFilter,
  };

  const handleReset = () => {
    form.setFields([
      { name: 'benefitFilter', value: INITIAL_FILTERS_STATE.benefitFilter },
      { name: 'companyFilter', value: INITIAL_FILTERS_STATE.companyFilter },
      { name: 'hiringRegimeFilter', value: INITIAL_FILTERS_STATE.hiringRegimeFilter },
      { name: 'platformFilter', value: INITIAL_FILTERS_STATE.platformFilter },
      { name: 'skillFilter', value: INITIAL_FILTERS_STATE.skillFilter },
      { name: 'titleFilter', value: INITIAL_FILTERS_STATE.titleFilter },
      { name: 'typeFilter', value: INITIAL_FILTERS_STATE.typeFilter },
      { name: 'seniorityFilter', value: INITIAL_FILTERS_STATE.seniorityFilter },
      { name: 'showOnlyApplied', value: INITIAL_FILTERS_STATE.showOnlyApplied },
      { name: 'showOnlyDiscarded', value: INITIAL_FILTERS_STATE.showOnlyDiscarded },
      { name: 'showOnlyNewJobs', value: INITIAL_FILTERS_STATE.showOnlyNewJobs },
      { name: 'showOnlyRecused', value: INITIAL_FILTERS_STATE.showOnlyRecused },
      { name: 'orderByOrder', value: INITIAL_FILTERS_STATE.orderByOrder },
      { name: 'orderByField', value: INITIAL_FILTERS_STATE.orderByField },
    ]);
    state.setState({
      benefitFilter: INITIAL_FILTERS_STATE.benefitFilter,
      companyFilter: INITIAL_FILTERS_STATE.companyFilter,
      hiringRegimeFilter: INITIAL_FILTERS_STATE.hiringRegimeFilter,
      platformFilter: INITIAL_FILTERS_STATE.platformFilter,
      skillFilter: INITIAL_FILTERS_STATE.skillFilter,
      titleFilter: INITIAL_FILTERS_STATE.titleFilter,
      typeFilter: INITIAL_FILTERS_STATE.typeFilter,
      seniorityFilter: INITIAL_FILTERS_STATE.seniorityFilter,
      showOnlyApplied: INITIAL_FILTERS_STATE.showOnlyApplied,
      showOnlyDiscarded: INITIAL_FILTERS_STATE.showOnlyDiscarded,
      showOnlyNewJobs: INITIAL_FILTERS_STATE.showOnlyNewJobs,
      showOnlyRecused: INITIAL_FILTERS_STATE.showOnlyRecused,
      orderByOrder: INITIAL_FILTERS_STATE.orderByOrder,
      orderByField: INITIAL_FILTERS_STATE.orderByField,
      skillsFilter: INITIAL_FILTERS_STATE.skillsFilter,
    });
  };

  return (
    <Drawer
      title="Filtrar vagas"
      placement="right"
      onClose={onClose}
      open={open}
      size={screens?.md ? 400 : '100%'}
    >
      <Form
        form={form}
        initialValues={initialValues}
        disabled={isLoading}
        onFinish={(values) => state.setState({ ...values, page: 0 })}
      >
        <Form.Item
          label="Plataforma"
          name="platformFilter"
          style={formItemStyle}
        >
          <Select
            allowClear
            showSearch
            options={platformOptions?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
          />
        </Form.Item>
        <Form.Item label="Empresa" name="companyFilter" style={formItemStyle}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Título" name="titleFilter" style={formItemStyle}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="Tipo" name="typeFilter" style={formItemStyle}>
          <Select
            allowClear
            showSearch
            options={typeOptions?.map((cur) => ({ label: cur, value: cur }))}
          />
        </Form.Item>
        <Form.Item
          label="Contratação"
          name="hiringRegimeFilter"
          style={formItemStyle}
        >
          <Select
            allowClear
            showSearch
            options={hiringRegimeOptions?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Senioridade"
          name="seniorityFilter"
          style={formItemStyle}
        >
          <Select
            allowClear
            showSearch
            options={seniorityOptions?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
          />
        </Form.Item>
        <Form.Item label="Skill" name="skillFilter" style={formItemStyle}>
          <Select
            allowClear
            showSearch
            options={data?.allSkills?.map((cur) => ({ label: cur, value: cur }))}
          />
        </Form.Item>
        <Form.Item label="Benefício" name="benefitFilter" style={formItemStyle}>
          <Select
            allowClear
            showSearch
            options={data?.allBenefits?.map((cur) => ({ label: cur, value: cur }))}
          />
        </Form.Item>
        <Form.Item
          label="Ordenação (campo)"
          name="orderByField"
          style={formItemStyle}
        >
          <Select
            allowClear
            showSearch
            options={[
              { label: 'Criada em', value: 'createdAt' },
              { label: 'Plataforma', value: 'platform' },
              { label: 'Empresa', value: 'company' },
              { label: 'Título', value: 'title' },
              { label: 'Tipo', value: 'type' },
              { label: 'Contratação', value: 'hiringRegime' },
              { label: 'Senioridade', value: 'seniority' },
              { label: 'Rating', value: 'totalRating' }
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Ordenação (ordem)"
          name="orderByOrder"
          style={formItemStyle}
        >
          <Select
            allowClear
            showSearch
            options={[
              { label: 'Ascendente', value: 'ascend' },
              { label: 'Descendente', value: 'descend' },
            ]}
          />
        </Form.Item>
        <Form.Item name="showOnlyNewJobs" style={formItemStyle}>
          <Radio.Group options={[{ value: true, label: 'Novas' }, { value: false, label: 'Todas' }]} />
        </Form.Item>
        <Form.Item name="showOnlyApplied" style={formItemStyle}>
          <Radio.Group options={[{ value: true, label: 'Aplicadas' }, { value: false, label: 'Não aplicadas' }]} />
        </Form.Item>
        <Form.Item name="showOnlyRecused" style={formItemStyle}>
          <Radio.Group options={[{ value: true, label: 'Recusadas' }, { value: false, label: 'Não recusadas' }]} />
        </Form.Item>
        <Form.Item name="showOnlyDiscarded" style={formItemStyle}>
          <Radio.Group options={[{ value: true, label: 'Descartadas' }, { value: false, label: 'Não descartadas' }]} />
        </Form.Item>
        <Space>
          <Button
            icon={<FilterOutlined />}
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            Filtrar
          </Button>
          <Button
            icon={<ClearOutlined />}
            loading={isLoading}
            type="default"
            onClick={handleReset}
          >
            Resetar
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default memo(FiltersDrawer);
