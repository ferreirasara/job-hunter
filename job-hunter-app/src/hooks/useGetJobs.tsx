import { useQuery } from '@tanstack/react-query'
import { JobsResponse } from '../@types/types'
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import { useFilters } from '../store/filters.store';

export const useGetJobs = () => {
  const {
    page,
    limit,
    platformFilter,
    typeFilter,
    hiringRegimeFilter,
    skillFilter,
    benefitFilter,
    skillsFilter,
    titleFilter,
    companyFilter,
    seniorityFilter,
    orderByOrder,
    orderByField,
    showOnlyDiscarded,
    showOnlyRecused,
    showOnlyNewJobs,
    showOnlyApplied,
  } = useFilters((state) => state);

  return useQuery({
    queryKey: ['jobs', page, limit, platformFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitFilter, skillsFilter, titleFilter, companyFilter, seniorityFilter, orderByField, orderByOrder, showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs, showOnlyApplied],
    queryFn: async (): Promise<JobsResponse> => {
      const searchParams: any = {};

      if (limit) searchParams.limit = limit?.toString();
      if (page || page === 0) searchParams.page = page?.toString();
      if (platformFilter) searchParams.platformFilter = platformFilter;
      if (skillsFilter) searchParams.skillsFilter = skillsFilter;
      if (typeFilter) searchParams.typeFilter = typeFilter;
      if (hiringRegimeFilter) searchParams.hiringRegimeFilter = hiringRegimeFilter;
      if (skillFilter) searchParams.skillFilter = skillFilter;
      if (benefitFilter) searchParams.benefitFilter = benefitFilter;
      if (titleFilter) searchParams.titleFilter = titleFilter;
      if (companyFilter) searchParams.companyFilter = companyFilter;
      if (seniorityFilter) searchParams.seniorityFilter = seniorityFilter;
      if (showOnlyDiscarded) searchParams.showOnlyDiscarded = showOnlyDiscarded;
      if (showOnlyRecused) searchParams.showOnlyRecused = showOnlyRecused;
      if (showOnlyNewJobs) searchParams.showOnlyNewJobs = showOnlyNewJobs;
      if (showOnlyApplied) searchParams.showOnlyApplied = showOnlyApplied;
      if (orderByField) searchParams.orderByField = orderByField;
      if (orderByOrder) searchParams.orderByOrder = orderByOrder;

      const qs = new URLSearchParams(searchParams);

      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY) || '';
      const response = await fetch(
        encodeURI(`${API_URL}/jobs?${qs.toString()}`),
        { headers: { Authorization: secretToken } },
      );

      return await response.json()
    },
  })
}
