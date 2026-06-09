import { Drawer, Form, Grid, Input, Radio, Select } from 'antd';
import { memo, useCallback, useRef } from 'react';
import { GetJobsFromAPIArgs, JobHiringRegime, JobPlatform, JobSeniority, JobType } from '../@types/types';
import { useFilters } from '../store/filters.store';
import { useGetJobs } from '../hooks/useGetJobs';

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

  const companyFilterTimeoutRef = useRef<number | undefined>(undefined);
  const titleFilterTimeoutRef = useRef<number | undefined>(undefined);

  const debouncedSetCompanyFilter = useCallback((value: string) => {
    if (companyFilterTimeoutRef.current) {
      clearTimeout(companyFilterTimeoutRef.current);
    }
    companyFilterTimeoutRef.current = setTimeout(() => {
      state.setState({ companyFilter: value });
    }, 300);
  }, [state]);

  const debouncedSetTitleFilter = useCallback((value: string) => {
    if (titleFilterTimeoutRef.current) {
      clearTimeout(titleFilterTimeoutRef.current);
    }
    titleFilterTimeoutRef.current = setTimeout(() => {
      state.setState({ titleFilter: value });
    }, 300);
  }, [state]);

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
        onValuesChange={(values) => {
          if (values.companyFilter) {
            debouncedSetCompanyFilter(values.companyFilter);
          } else if (values.titleFilter) {
            debouncedSetTitleFilter(values.titleFilter);
          } else {
            state.setState({ ...values, page: 0 })
          }

        }
        }
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
              { label: 'Experiência', value: 'yearsOfExperience' },
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
      </Form>
    </Drawer>
  );
};

export default memo(FiltersDrawer);
