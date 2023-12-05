import { createContext, useState } from "react";

type TPaginationContext = {
  page: number
  limit: number
  onChangePage: (value: number) => void,
  onChangeLimit: (value: number) => void,
}

export const PaginationContext = createContext<TPaginationContext>({
  page: 0,
  limit: 10,
  onChangePage: () => { },
  onChangeLimit: () => { },
});

export const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  return <PaginationContext.Provider value={{
    page: page,
    limit: limit,
    onChangePage: (value: number) => setPage(value),
    onChangeLimit: (value: number) => setLimit(value),
  }}>
    {children}
  </PaginationContext.Provider >
}