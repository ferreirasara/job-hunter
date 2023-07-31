import { createContext, useState } from "react";
import { OrderBy } from "../components/JobsTable";

export const ORDER_BY_DEFAULT: OrderBy = { field: "createdAt", order: "descend" }

type TPaginationContext = {
  page: number
  limit: number
  orderBy: OrderBy
  onChangePage: (value: number) => void,
  onChangeLimit: (value: number) => void,
  onChangeOrderBy: (value: OrderBy) => void,
}

export const PaginationContext = createContext<TPaginationContext>({
  page: 0,
  limit: 10,
  orderBy: ORDER_BY_DEFAULT,
  onChangePage: () => { },
  onChangeLimit: () => { },
  onChangeOrderBy: () => { },
});

export const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<OrderBy>(ORDER_BY_DEFAULT);

  return <PaginationContext.Provider value={{
    page: page,
    limit: limit,
    orderBy: orderBy,
    onChangePage: (value: number) => setPage(value),
    onChangeLimit: (value: number) => setLimit(value),
    onChangeOrderBy: (value: OrderBy) => setOrderBy(value),
  }}>
    {children}
  </PaginationContext.Provider >
}
