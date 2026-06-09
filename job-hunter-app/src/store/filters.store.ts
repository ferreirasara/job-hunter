import { create } from 'zustand'
import { FiltersState } from '../@types/types';
import { persist } from 'zustand/middleware';
import { calcLimit } from '../utils/utils';

export const useFilters = create<FiltersState>()(persist((set) => ({
  benefitFilter: '',
  companyFilter: '',
  hiringRegimeFilter: '',
  platformFilter: '',
  skillFilter: '',
  skillsFilter: '',
  titleFilter: '',
  typeFilter: '',
  seniorityFilter: '',
  orderBy: { field: 'rating', order: 'ascend' },
  showOnlyDiscarded: false,
  showOnlyRecused: false,
  showOnlyNewJobs: false,
  showOnlyApplied: false,
  limit: calcLimit(),
  page: 0,
  setState: (partialState: Partial<FiltersState>) => set(partialState),
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}), { name: 'filters-storage' }));
