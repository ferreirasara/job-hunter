import { RecoilState, atom, useRecoilState } from "recoil";
import { OrderBy } from "../components/JobsTable";

const windowHeight = window.innerHeight;
const tableMaxSixe = windowHeight - 280;
const maxRows = Math.ceil(tableMaxSixe / 43);

const pageState: RecoilState<number> = atom({ key: 'pageState', default: 0 });
const limitState: RecoilState<number> = atom({ key: 'limitState', default: maxRows });
const orderByState: RecoilState<OrderBy> = atom({ key: 'orderByState' });

export const usePaginationStateValues = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [limit, setLimit] = useRecoilState(limitState);
  const [orderBy, setOrderBy] = useRecoilState(orderByState);

  return {
    page, setPage,
    limit, setLimit,
    orderBy, setOrderBy,
  }
}