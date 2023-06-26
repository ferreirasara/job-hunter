import { BarChartOutlined, CheckSquareOutlined, ClockCircleOutlined, CloseCircleOutlined, CloseSquareOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Input, Space, Tooltip } from "antd"

type FilterButtonsProps = {
  loading: boolean
  showOnlyDiscarded: boolean
  showOnlyRecused: boolean
  showOnlyNewJobs: boolean
  showOnlyApplied: boolean
  dataLength?: number
  handleFetchData: () => Promise<void>
  onChangeCompanyFilter: (value: string) => void
  onChangeTitleFilter: (value: string) => void
  onChangeShowOnlyDiscarded: () => void
  onChangeShowOnlyRecused: () => void
  onChangeShowOnlyNewJobs: () => void
  onChangeShowOnlyApplied: () => void
}
export const FilterButtons = ({
  loading,
  showOnlyDiscarded,
  showOnlyRecused,
  showOnlyNewJobs,
  showOnlyApplied,
  handleFetchData,
  onChangeCompanyFilter,
  onChangeTitleFilter,
  onChangeShowOnlyDiscarded,
  onChangeShowOnlyNewJobs,
  onChangeShowOnlyRecused,
  onChangeShowOnlyApplied,
  dataLength
}: FilterButtonsProps) => {
  return <Space>
    <Button
      block
      icon={<ReloadOutlined />}
      onClick={handleFetchData}
      loading={loading}
    >
      {dataLength ? "Recarregar" : "Carregar"} dados
    </Button>
    <Input.Search
      placeholder="Filtrar por empresa"
      loading={loading}
      onSearch={(value) => onChangeCompanyFilter(value)}
      style={{ width: 200 }}
    />
    <Input.Search
      placeholder="Filtrar por título"
      loading={loading}
      onSearch={(value) => onChangeTitleFilter(value)}
      style={{ width: 200 }}
    />
    <Button
      block
      type={showOnlyApplied ? "primary" : "default"}
      icon={showOnlyApplied ? <CloseSquareOutlined /> : <CheckSquareOutlined />}
      onClick={onChangeShowOnlyApplied}
      loading={loading}
    >
      {showOnlyApplied ? "Não aplicadas" : "Aplicadas"}
    </Button>
    {!showOnlyApplied ? <Button
      block
      type={showOnlyDiscarded ? "primary" : "default"}
      icon={showOnlyDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
      onClick={onChangeShowOnlyDiscarded}
      loading={loading}
    >
      {showOnlyDiscarded ? "Não descartadas" : "Descartadas"}
    </Button> : null}
    {showOnlyApplied ? <Button
      block
      type={showOnlyRecused ? "primary" : "default"}
      icon={showOnlyRecused ? <EyeOutlined /> : <CloseCircleOutlined />}
      onClick={onChangeShowOnlyRecused}
      loading={loading}
    >
      {showOnlyRecused ? "Não recusadas" : "Recusadas"}
    </Button> : null}
    <Tooltip title={showOnlyNewJobs ? "Exibe todas as vagas" : "Exibe apenas as vagas dos 2 últimos dias"}>
      <Button
        block
        type={showOnlyNewJobs ? "primary" : "default"}
        icon={showOnlyNewJobs ? <ClockCircleOutlined /> : <StarOutlined />}
        onClick={onChangeShowOnlyNewJobs}
        loading={loading}
      >
        {showOnlyNewJobs ? "Todas" : "Novas"}
      </Button>
    </Tooltip>
    <Button
      block
      icon={<BarChartOutlined />}
      href="/stats"
    >
      Ver estatísticas
    </Button>
  </Space>
}