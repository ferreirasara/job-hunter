import { CloseOutlined, FilterOutlined } from "@ant-design/icons"
import { Button, Drawer, Form, Grid, Input, Radio, Select } from "antd"
import { memo, useCallback } from 'react'
import { GetJobsFromAPIArgs } from "../utils/utils"
import { JobHiringRegime, JobPlatform, JobSeniority, JobType } from "./JobsTable"

interface FiltersDrawerProps {
  open: boolean
  onClose: () => void
  fetchData: (apiArgs: GetJobsFromAPIArgs) => Promise<void>
  loading: boolean
  allSkills: string[]
  allBenefits: string[]
  apiArgs: GetJobsFromAPIArgs
  onChangeApiArgs: (value: GetJobsFromAPIArgs) => void
}

const formItemStyle: React.CSSProperties = { marginBottom: 8 }

const FiltersDrawer = ({ fetchData, loading, onClose, open, allBenefits, allSkills, apiArgs, onChangeApiArgs }: FiltersDrawerProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [form] = Form.useForm<GetJobsFromAPIArgs>();

  const typeOptions = Object.keys(JobType);
  const hiringRegimeOptions = Object.keys(JobHiringRegime);
  const seniorityOptions = Object.keys(JobSeniority);
  const platformOptions = Object.keys(JobPlatform);

  const handleFilter = useCallback(async () => {
    await fetchData(apiArgs);
    onClose();
  }, [apiArgs, fetchData, onClose]);

  const initialValues: GetJobsFromAPIArgs = apiArgs;

  return <Drawer
    title="Filtrar vagas"
    placement="right"
    onClose={onClose}
    open={open}
    width={screens?.md ? 400 : '100%'}
    closable={false}
    extra={<div style={{ display: 'flex', gap: 8 }}>
      <Button icon={<CloseOutlined />} onClick={onClose}>
        Cancelar
      </Button>
      <Button type="primary" onClick={handleFilter} icon={<FilterOutlined />}>
        Filtrar
      </Button>
    </div>}
  >
    <Form form={form} initialValues={initialValues}>
      <Form.Item label="Plataforma" name="platformFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, platformFilter: value })}
          showSearch
          options={platformOptions?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Empresa" name="companyFilter" style={formItemStyle}>
        <Input
          disabled={loading}
          allowClear
          onChange={(event) => onChangeApiArgs({ ...apiArgs, companyFilter: event?.target?.value })}
        />
      </Form.Item>
      <Form.Item label="Título" name="titleFilter" style={formItemStyle}>
        <Input
          disabled={loading}
          allowClear
          onChange={(event) => onChangeApiArgs({ ...apiArgs, titleFilter: event?.target?.value })}
        />
      </Form.Item>
      <Form.Item label="Tipo" name="typeFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, typeFilter: value })}
          showSearch
          options={typeOptions?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Contratação" name="hiringRegimeFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, hiringRegimeFilter: value })}
          showSearch
          options={hiringRegimeOptions?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Senioridade" name="seniorityFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, seniorityFilter: value })}
          showSearch
          options={seniorityOptions?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Skill" name="skillFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, skillFilter: value })}
          showSearch
          options={allSkills?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Benefício" name="benefitFilter" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, benefitFilter: value })}
          showSearch
          options={allBenefits?.map(cur => ({ label: cur, value: cur }))}
        />
      </Form.Item>
      <Form.Item label="Ordenação (campo)" name="orderByField" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, orderBy: { field: value, order: apiArgs?.orderBy?.order || "descend" } })}
          showSearch
        >
          <Select.Option key={"createdAt"} value={"createdAt"}>Criada em</Select.Option>
          <Select.Option key={"platform"} value={"platform"}>Plataforma</Select.Option>
          <Select.Option key={"company"} value={"company"}>Empresa</Select.Option>
          <Select.Option key={"title"} value={"title"}>Título</Select.Option>
          <Select.Option key={"type"} value={"type"}>Tipo</Select.Option>
          <Select.Option key={"hiringRegime"} value={"hiringRegime"}>Contratação</Select.Option>
          <Select.Option key={"seniority"} value={"seniority"}>Senioridade</Select.Option>
          <Select.Option key={"yearsOfExperience"} value={"yearsOfExperience"}>Experiência</Select.Option>
          <Select.Option key={"totalRating"} value={"totalRating"}>Rating</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Ordenação (ordem)" name="orderByOrder" style={formItemStyle}>
        <Select
          loading={loading}
          allowClear
          onChange={(value) => onChangeApiArgs({ ...apiArgs, orderBy: { field: apiArgs?.orderBy?.field || "creadeAt", order: value } })}
          showSearch
        >
          <Select.Option key={"ascend"} value={"ascend"}>Ascendente</Select.Option>
          <Select.Option key={"descend"} value={"descend"}>Descendente</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="showOnlyNewJobs" style={formItemStyle}>
        <Radio.Group onChange={(event) => onChangeApiArgs({ ...apiArgs, showOnlyNewJobs: event?.target?.value })}>
          <Radio value={true}>Novas</Radio>
          <Radio value={false}>Todas</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="showOnlyApplied" style={formItemStyle}>
        <Radio.Group onChange={(event) => onChangeApiArgs({ ...apiArgs, showOnlyApplied: event?.target?.value })}>
          <Radio value={true}>Aplicadas</Radio>
          <Radio value={false}>Não aplicadas</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="showOnlyRecused" style={formItemStyle}>
        <Radio.Group onChange={(event) => onChangeApiArgs({ ...apiArgs, showOnlyRecused: event?.target?.value })}>
          <Radio value={true}>Recusadas</Radio>
          <Radio value={false}>Não recusadas</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="showOnlyDiscarded" style={formItemStyle}>
        <Radio.Group onChange={(event) => onChangeApiArgs({ ...apiArgs, showOnlyDiscarded: event?.target?.value })}>
          <Radio value={true}>Descartadas</Radio>
          <Radio value={false}>Não descartadas</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  </Drawer>
}

export default memo(FiltersDrawer);
