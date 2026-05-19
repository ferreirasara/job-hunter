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
      state.setCompanyFilter(value);
    }, 300);
  }, [state]);

  const debouncedSetTitleFilter = useCallback((value: string) => {
    if (titleFilterTimeoutRef.current) {
      clearTimeout(titleFilterTimeoutRef.current);
    }
    titleFilterTimeoutRef.current = setTimeout(() => {
      state.setTitleFilter(value);
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
    orderBy: state.orderBy,
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
      <Form form={form} initialValues={initialValues}>
        <Form.Item
          label="Plataforma"
          name="platformFilter"
          style={formItemStyle}
        >
          <Select
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) => state.setPlatformFilter(value)}
            showSearch
            options={platformOptions?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
          />
        </Form.Item>
        <Form.Item label="Empresa" name="companyFilter" style={formItemStyle}>
          <Input
            disabled={isLoading}
            allowClear
            onChange={(event) => debouncedSetCompanyFilter(event?.target?.value)}
          />
        </Form.Item>
        <Form.Item label="Título" name="titleFilter" style={formItemStyle}>
          <Input
            disabled={isLoading}
            allowClear
            onChange={(event) => debouncedSetTitleFilter(event?.target?.value)}
          />
        </Form.Item>
        <Form.Item label="Tipo" name="typeFilter" style={formItemStyle}>
          <Select
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) => state.setTypeFilter(value)}
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
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) =>
              state.setHiringRegimeFilter(value)
            }
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
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) =>
              state.setSeniorityFilter(value)
            }
            showSearch
            options={seniorityOptions?.map((cur) => ({
              label: cur,
              value: cur,
            }))}
          />
        </Form.Item>
        <Form.Item label="Skill" name="skillFilter" style={formItemStyle}>
          <Select
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) =>
              state.setSkillFilter(value)
            }
            showSearch
            options={data?.allSkills?.map((cur) => ({ label: cur, value: cur }))}
          />
        </Form.Item>
        <Form.Item label="Benefício" name="benefitFilter" style={formItemStyle}>
          <Select
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) =>
              state.setBenefitFilter(value)
            }
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
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) => state.setOrderBy({
              field: value,
              order: state?.orderBy?.order || 'descend',
            })}
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
            loading={isLoading}
            disabled={isLoading}
            allowClear
            onChange={(value) => state.setOrderBy({
              field: state?.orderBy?.field || 'createdAt',
              order: value,
            })}
            showSearch
            options={[
              { label: 'Ascendente', value: 'ascend' },
              { label: 'Descendente', value: 'descend' },
            ]}
          />
        </Form.Item>
        <Form.Item name="showOnlyNewJobs" style={formItemStyle}>
          <Radio.Group onChange={(event) => state.setShowOnlyNewJobs(event?.target?.value)} disabled={isLoading}>
            <Radio value={true}>Novas</Radio>
            <Radio value={false}>Todas</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="showOnlyApplied" style={formItemStyle}>
          <Radio.Group onChange={(event) => state.setShowOnlyApplied(event?.target?.value)} disabled={isLoading}>
            <Radio value={true}>Aplicadas</Radio>
            <Radio value={false}>Não aplicadas</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="showOnlyRecused" style={formItemStyle}>
          <Radio.Group onChange={(event) => state.setShowOnlyRecused(event?.target?.value)} disabled={isLoading}>
            <Radio value={true}>Recusadas</Radio>
            <Radio value={false}>Não recusadas</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="showOnlyDiscarded" style={formItemStyle}>
          <Radio.Group onChange={(event) => state.setShowOnlyDiscarded(event?.target?.value)} disabled={isLoading}>
            <Radio value={true}>Descartadas</Radio>
            <Radio value={false}>Não descartadas</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(FiltersDrawer);
