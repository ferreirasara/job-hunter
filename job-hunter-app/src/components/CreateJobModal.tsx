import { Alert, Button, Form, Input, Modal, Select, Space, Typography } from "antd"
import { JobType, Platform } from "./JobsTable"
import { useState } from "react"
import { SaveOutlined } from "@ant-design/icons"
import TextArea from "antd/es/input/TextArea"
import { createNewJob } from "../utils/utils"

type CreateJobModalProps = {
  open: boolean
  onCancel: () => void
  fetchData: () => Promise<void>
}
enum JobSkills {
  ANGULAR = "ANGULAR",
  AJAX = "AJAX",
  API = "API",
  CODE_MAINTAINABILITY = "CODE_MAINTAINABILITY",
  CSHARP = "CSHARP",
  CPLUSPLUS = "CPLUSPLUS",
  CSS = "CSS",
  DB = "DB",
  DEV_OPS = "DEV_OPS",
  DOT_NET = "DOT_NET",
  ECOMMERCE = "ECOMMERCE",
  ENGLISH = "ENGLISH",
  FIGMA = "FIGMA",
  FLUTTER = "FLUTTER",
  CODE_VERSIONING = "CODE_VERSIONING",
  HTML = "HTML",
  IONIC = "IONIC",
  JAVA = "JAVA",
  JAVASCRIPT = "JAVASCRIPT",
  JQUERY = "JQUERY",
  LINUX = "LINUX",
  NEXT = "NEXT",
  NUXT = "NUXT",
  NODE = "NODE",
  PHP = "PHP",
  PYTHON = "PYTHON",
  PWA = "PWA",
  REACT = "REACT",
  REACT_NATIVE = "REACT_NATIVE",
  RESPONSIVE_DESIGN = "RESPONSIVE_DESIGN",
  RUBY = "RUBY",
  SASS = "SASS",
  STATE_MANAGEMENT = "STATE_MANAGEMENT",
  STORYBOOK = "STORYBOOK",
  STYLED_COMPONENTS = "STYLED_COMPONENTS",
  TAILWIND = "TAILWIND",
  TEST = "TEST",
  TYPESCRIPT = "TYPESCRIPT",
  VANILLA = "VANILLA",
  VUE = "VUE",
  WEB_HOOKS = "WEB_HOOKS",
  WORDPRESS = "WORDPRESS",
}
enum JobBenefits {
  ANUAL_BONUS = "ANUAL_BONUS",
  BIRTHDAY_DAYOFF = "BIRTHDAY_DAYOFF",
  CLT = "CLT",
  COURSE_HELP = "COURSE_HELP",
  DENTAL_PLAN = "DENTAL_PLAN",
  FLEXIBLE_HOURS = "FLEXIBLE_HOURS",
  GYMPASS = "GYMPASS",
  HEALTH_PLAN = "HEALTH_PLAN",
  HOME_OFFICE = "HOME_OFFICE",
  HOME_OFFICE_VOUCHER = "HOME_OFFICE_VOUCHER",
  LIFE_INSURANCE = "LIFE_INSURANCE",
  MEAL_VOUCHER = "MEAL_VOUCHER",
  PAID_VACATIONS = "PAID_VACATIONS",
  PJ = "PJ",
  PRIVATE_PENSION = "PRIVATE_PENSION",
  PSYCHOLOGICAL_HELP = "PSYCHOLOGICAL_HELP",
  REFERRAL_BONUS = "REFERRAL_BONUS",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  TRANSPORTATION_VOUCHER = "TRANSPORTATION_VOUCHER",
}

export const CreateJobModal = ({ onCancel, open, fetchData }: CreateJobModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [form] = Form.useForm();
  const platformOptions = Object.keys(Platform);
  const typeOptions = Object.keys(JobType);
  const benefitsOptions = Object.keys(JobBenefits);
  const skillsOptions = Object.keys(JobSkills);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await createNewJob(values);
      if (!response?.success) {
        setErrorMessage(response?.message || "");
      } else {
        await fetchData();
        setErrorMessage("");
        form.resetFields();
        onCancel();
      }
    } catch (e) {
      setErrorMessage(String(e));
    }
    setLoading(false);
  };

  return <Modal
    open={open}
    onCancel={onCancel}
    footer={null}
    title={"Adicionar Job"}
    centered
    bodyStyle={{ margin: "16px 0px" }}
  >
    {errorMessage ? <Alert message={"Error: " + errorMessage} type="error" style={{ margin: '8px 0px' }} /> : null}
    <Form
      form={form}
      name="create-job"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
    >
      <Form.Item name="company" label="Empresa" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="title" label="Título" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="description" label="Descrição" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item>
      <Form.Item name="platform" label="Plataforma" rules={[{ required: true }]}>
        <Select>
          {platformOptions?.map(cur => <Select.Option value={cur}>{cur}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item name="url" label="URL" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="benefits" label="Benefícios">
        <Select mode="multiple">
          {benefitsOptions?.map(cur => <Select.Option value={cur}>{cur}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item name="skills" label="Skills">
        <Select mode="multiple">
          {skillsOptions?.map(cur => <Select.Option value={cur}>{cur}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item name="city" label="Cidade"><Input /></Form.Item>
      <Form.Item name="state" label="Estado"><Input /></Form.Item>
      <Form.Item name="country" label="País"><Input /></Form.Item>
      <Form.Item name="salaryRange" label="Faixa salarial"><Input /></Form.Item>
      <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
        <Select>
          {typeOptions?.map(cur => <Select.Option value={cur}>{cur}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={loading}
        >
          Salvar
        </Button>
      </Form.Item>
    </Form>
  </Modal >
}