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
  orderBy: { field: 'createdAt', order: 'descend' },
  showOnlyDiscarded: false,
  showOnlyRecused: false,
  showOnlyNewJobs: false,
  showOnlyApplied: false,
  limit: calcLimit(),
  page: 0,
  setShowOnlyDiscarded: (showOnlyDiscarded) => set({ showOnlyDiscarded }),
  setShowOnlyRecused: (showOnlyRecused) => set({ showOnlyRecused }),
  setShowOnlyNewJobs: (showOnlyNewJobs) => set({ showOnlyNewJobs }),
  setShowOnlyApplied: (showOnlyApplied) => set({ showOnlyApplied }),
  setBenefitFilter: (benefitFilter: string) => set({ benefitFilter }),
  setCompanyFilter: (companyFilter: string) => set({ companyFilter }),
  setHiringRegimeFilter: (hiringRegimeFilter: string) => set({ hiringRegimeFilter }),
  setPlatformFilter: (platformFilter: string) => set({ platformFilter }),
  setSkillFilter: (skillFilter: string) => set({ skillFilter }),
  setSkillsFilter: (skillsFilter: string) => set({ skillsFilter }),
  setTitleFilter: (titleFilter: string) => set({ titleFilter }),
  setTypeFilter: (typeFilter: string) => set({ typeFilter }),
  setSeniorityFilter: (seniorityFilter: string) => set({ seniorityFilter }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}), { name: 'filters-storage' }));
