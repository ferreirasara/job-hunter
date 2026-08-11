import { create } from 'zustand'
import { FiltersState } from '../@types/types';
import { persist } from 'zustand/middleware';
import { calcLimit } from '../utils/utils';
import { INITIAL_FILTERS_STATE } from '../utils/constants';

export const useFilters = create<FiltersState>()(persist((set) => ({
  benefitFilter: INITIAL_FILTERS_STATE.benefitFilter,
  companyFilter: INITIAL_FILTERS_STATE.companyFilter,
  hiringRegimeFilter: INITIAL_FILTERS_STATE.hiringRegimeFilter,
  platformFilter: INITIAL_FILTERS_STATE.platformFilter,
  skillFilter: INITIAL_FILTERS_STATE.skillFilter,
  skillsFilter: INITIAL_FILTERS_STATE.skillsFilter,
  titleFilter: INITIAL_FILTERS_STATE.titleFilter,
  typeFilter: INITIAL_FILTERS_STATE.typeFilter,
  seniorityFilter: INITIAL_FILTERS_STATE.seniorityFilter,
  orderBy: {
    field: INITIAL_FILTERS_STATE.orderByField,
    order: INITIAL_FILTERS_STATE.orderByOrder,
  },
  showOnlyDiscarded: INITIAL_FILTERS_STATE.showOnlyDiscarded,
  showOnlyRecused: INITIAL_FILTERS_STATE.showOnlyRecused,
  showOnlyNewJobs: INITIAL_FILTERS_STATE.showOnlyNewJobs,
  showOnlyApplied: INITIAL_FILTERS_STATE.showOnlyApplied,
  limit: calcLimit(),
  page: 0,
  setState: (partialState: Partial<FiltersState>) => set(partialState),
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}), { name: 'filters-storage' }));
