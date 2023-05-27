import { Alert, Button, Divider, Space, Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { formatDateHour, getJobsFromAPI, isNewJob } from "../utils/utils";
import { DetailsModal } from "./DetailsModal";
import { CheckSquareTwoTone, CloseSquareTwoTone, ZoomInOutlined } from "@ant-design/icons";
import "../style/JobsTable.css"
import { Link } from "./Link";
import castArray from 'lodash/castArray';
import { uniq } from "lodash";

export enum Platform {
  GUPY = "GUPY",
  INDEED = "INDEED",
  LINKEDIN = "LINKEDIN",
}

export type JobsTableData = {
  uuid: string
  idInPlatform: string
  company: string
  platform: Platform
  title: string
  description: string
  url: string
  country: string
  state: string
  city: string
  applied: boolean
  discarded: boolean
  createdAt: Date
}

export type JobsResponse = {
  totalOfJobs: number,
  data: JobsTableData[],
  allCities: { city: string }[],
  allCountries: { country: string }[],
  allStates: { state: string }[],
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

export const JobsTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(18);

  const [platformFilter, setPlatformFilter] = useState<string[]>();
  const [countryFilter, setCountryFilter] = useState<string[]>();
  const [stateFilter, setStateFilter] = useState<string[]>();
  const [cityFilter, setCityFilter] = useState<string[]>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>();

  const [orderBy, setOrderBy] = useState<OrderBy>();

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);
  const [allCities, setAllCities] = useState<string[]>();
  const [allStates, setAllStates] = useState<string[]>();
  const [allCountries, setAllCountries] = useState<string[]>();

  const handleError = (message: string) => setErrorMessage(message);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: JobsResponse = await getJobsFromAPI({
        limit,
        page,
        platformFilter,
        countryFilter,
        stateFilter,
        cityFilter,
        appliedFilter,
        orderBy,
      });
      if (response) {
        setTotalOfJobs(response?.totalOfJobs);
        setData(response?.data?.filter(cur => !cur?.discarded));
        setAllCities(uniq(response?.allCities?.map(cur => cur?.city)))
        setAllStates(uniq(response?.allStates?.map(cur => cur?.state)))
        setAllCountries(uniq(response?.allCountries?.map(cur => cur?.country)))
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);

  }, [appliedFilter, cityFilter, countryFilter, limit, orderBy, page, platformFilter, stateFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleSeeDetails = (uuid: string) => {
    const job = data?.find(cur => cur?.uuid === uuid)
    setSelectedJob(job);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(undefined);
  }


  const platformOptions = Object.keys(Platform);
  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: 100,
      align: 'center',
      sorter: (a, b) => 0,
    },
    {
      title: "Plataforma",
      dataIndex: 'platform',
      key: 'platform',
      width: 130,
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      filters: platformOptions.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Empresa",
      dataIndex: 'company',
      key: 'company',
      width: 200,
      ellipsis: true,
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Título",
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Descrição",
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "URL",
      dataIndex: 'url',
      key: 'url',
      width: 72,
      align: 'center',
      ellipsis: true,
      render: (url) => <Link url={url} />,
    },
    {
      title: "Aplicada?",
      dataIndex: 'applied',
      key: 'applied',
      width: 110,
      align: 'center',
      render: (applied) => applied ? <CheckSquareTwoTone twoToneColor="#52c41a" /> : <CloseSquareTwoTone twoToneColor="#eb2f96" />,
      filters: [{ text: "Sim", value: true }, { text: "Não", value: false }],
      filterSearch: true,
    },
    {
      title: "País",
      dataIndex: 'country',
      key: 'country',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => a.country.localeCompare(b.country),
      filters: allCountries?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Estado",
      dataIndex: 'state',
      key: 'state',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => a.state.localeCompare(b.state),
      filters: allStates?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Cidade",
      dataIndex: 'city',
      key: 'city',
      width: 100,
      ellipsis: true,
      sorter: (a, b) => a.city.localeCompare(b.city),
      filters: allCities?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: 'uuid',
      key: 'uuid',
      width: 56,
      align: 'center',
      render: (uuid) => <Button size="small" onClick={() => handleSeeDetails(uuid)} icon={<ZoomInOutlined />} />
    },
  ]

  return <Space direction="vertical">
    <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
      Job Hunter
    </Divider>
    {/* <Space style={{ width: '100%' }}>
      <Input
        disabled={loading}
        addonAfter={<Button
          type="text"
          size="small"
          icon={<SearchOutlined />}
          loading={loading}
          onClick={handleTextSearch}
        >
          Pesquisar
        </Button>}
        onChange={(e) => setInputValue(e?.target?.value)}
        placeholder="Pesquisar por empresa, título ou descrição"
      />
    </Space> */}
    {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={'uuid'}
      rowClassName={(record) => isNewJob(record) ? 'new-job' : ''}
      size="small"
      pagination={{
        onChange: (page, pageSize) => {
          setPage(page - 1);
          setLimit(pageSize);
        },
        total: totalOfJobs || 0,
        current: page + 1,
        pageSize: limit,
      }}
      onChange={(pagination, filters, sorter) => {
        const sorter2 = sorter && castArray(sorter)[0];
        if (sorter) setOrderBy({ field: sorter2?.field as string, order: sorter2?.order as "descend" | "ascend" })

        setPlatformFilter(filters?.platform as string[]);
        setCountryFilter(filters?.country as string[]);
        setStateFilter(filters?.state as string[]);
        setCityFilter(filters?.city as string[]);
        setAppliedFilter(filters?.applied as string[]);
      }}
    />
    <DetailsModal
      open={modalOpen}
      onCancel={handleCloseModal}
      selectedJob={selectedJob}
      fetchData={fetchData}
    />
  </Space>
}
