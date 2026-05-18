import { create } from 'zustand'

interface PaginationState {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const usePagination = create<PaginationState>()((set) => ({
  page: 1,
  limit: 10,
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
