import { BarChartOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Input, Space, Tooltip } from "antd"
import { useFilterStateValues } from "../state/filter.state"
import { useShowOnlyStateValues } from "../state/showOnly.state"
import { useDataStateValues } from "../state/data.state"

type FilterButtonsProps = { handleFetchData: () => Promise<void> }
export const FilterButtons = ({ handleFetchData }: FilterButtonsProps) => {
  const { loading, dataLength } = useDataStateValues();
  const { setTitleFilter, setCompanyFilter } = useFilterStateValues();
  const {
    setShowOnlyDiscarded, setShowOnlyNewJobs, setShowOnlyRecused,
    showOnlyDiscarded, showOnlyNewJobs, showOnlyRecused
  } = useShowOnlyStateValues();

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
      onSearch={(value) => setCompanyFilter(value)}
      style={{ width: 200 }}
    />
    <Input.Search
      placeholder="Filtrar por título"
      loading={loading}
      onSearch={(value) => setTitleFilter(value)}
      style={{ width: 200 }}
    />
    <Button
      block
      type={showOnlyDiscarded ? "primary" : "default"}
      icon={showOnlyDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
      onClick={() => setShowOnlyDiscarded(!showOnlyDiscarded)}
      loading={loading}
    >
      {showOnlyDiscarded ? "Não descartadas" : "Descartadas"}
    </Button>
    <Button
      block
      type={showOnlyRecused ? "primary" : "default"}
      icon={showOnlyRecused ? <EyeOutlined /> : <CloseCircleOutlined />}
      onClick={() => setShowOnlyNewJobs(!showOnlyNewJobs)}
      loading={loading}
    >
      {showOnlyRecused ? "Não recusadas" : "Recusadas"}
    </Button>
    <Tooltip title={showOnlyNewJobs ? "Exibe todas as vagas" : "Exibe apenas as vagas dos 2 últimos dias"}>
      <Button
        block
        type={showOnlyNewJobs ? "primary" : "default"}
        icon={showOnlyNewJobs ? <ClockCircleOutlined /> : <StarOutlined />}
        onClick={() => setShowOnlyRecused(!showOnlyRecused)}
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