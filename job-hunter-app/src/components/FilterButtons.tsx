import { BarChartOutlined, CheckSquareOutlined, ClockCircleOutlined, CloseCircleOutlined, CloseSquareOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined, StarOutlined } from "@ant-design/icons"
import { Button, Grid, Input, Tooltip } from "antd"
import { useContext } from "react"
import { FiltersContext } from "../context/FiltersContext"
import { ShowOnlyContext } from "../context/ShowOnlyContext"

type FilterButtonsProps = {
  loading: boolean
  dataLength?: number
  handleFetchData: () => Promise<void>
}
export const FilterButtons = ({
  loading,
  handleFetchData,
  dataLength
}: FilterButtonsProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { onChangeCompanyFilter, onChangeTitleFilter } = useContext(FiltersContext);
  const {
    showOnlyApplied, showOnlyDiscarded, showOnlyNewJobs, showOnlyRecused,
    onChangeShowOnlyApplied, onChangeShowOnlyDiscarded, onChangeShowOnlyNewJobs, onChangeShowOnlyRecused
  } = useContext(ShowOnlyContext);

  return <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap' }}>
    <Input.Search
      placeholder="Filtrar por empresa"
      loading={loading}
      onSearch={(value) => onChangeCompanyFilter(value)}
      style={{ width: screens?.xl ? 200 : '100%' }}
      allowClear
    />
    <Input.Search
      placeholder="Filtrar por título"
      loading={loading}
      onSearch={(value) => onChangeTitleFilter(value)}
      style={{ width: screens?.xl ? 200 : '100%' }}
      allowClear
    />
    <Button
      type={showOnlyApplied ? "primary" : "default"}
      icon={showOnlyApplied ? <CloseSquareOutlined /> : <CheckSquareOutlined />}
      onClick={onChangeShowOnlyApplied}
      loading={loading}
    >
      {showOnlyApplied ? "Não aplicadas" : "Aplicadas"}
    </Button>
    {!showOnlyApplied ? <Button
      type={showOnlyDiscarded ? "primary" : "default"}
      icon={showOnlyDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
      onClick={onChangeShowOnlyDiscarded}
      loading={loading}
    >
      {showOnlyDiscarded ? "Não descartadas" : "Descartadas"}
    </Button> : null}
    {showOnlyApplied ? <Button
      type={showOnlyRecused ? "primary" : "default"}
      icon={showOnlyRecused ? <EyeOutlined /> : <CloseCircleOutlined />}
      onClick={onChangeShowOnlyRecused}
      loading={loading}
    >
      {showOnlyRecused ? "Não recusadas" : "Recusadas"}
    </Button> : null}
    <Tooltip title={showOnlyNewJobs ? "Exibe todas as vagas" : "Exibe apenas as vagas dos 2 últimos dias"}>
      <Button
        type={showOnlyNewJobs ? "primary" : "default"}
        icon={showOnlyNewJobs ? <ClockCircleOutlined /> : <StarOutlined />}
        onClick={onChangeShowOnlyNewJobs}
        loading={loading}
      >
        {showOnlyNewJobs ? "Todas" : "Novas"}
      </Button>
    </Tooltip>
    <Button
      icon={<ReloadOutlined />}
      onClick={handleFetchData}
      loading={loading}
    >
      {dataLength ? "Recarregar" : "Carregar"}
    </Button>
    <Button
      icon={<BarChartOutlined />}
      href="/stats"
    >
      Ver estatísticas
    </Button>
  </div>
}