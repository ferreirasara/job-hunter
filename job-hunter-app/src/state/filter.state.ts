import { RecoilState, atom, useRecoilState, useRecoilValue } from "recoil";

const platformFilterState: RecoilState<string[]> = atom({ key: 'platformFilterState' });
const companyFilterState: RecoilState<string> = atom({ key: 'companyFilterState', default: '' });
const titleFilterState: RecoilState<string> = atom({ key: 'titleFilterState', default: '' });
const typeFilterState: RecoilState<string[]> = atom({ key: 'typeFilterState' });
const hiringRegimeFilterState: RecoilState<string[]> = atom({ key: 'hiringRegimeFilterState' });
const skillFilterState: RecoilState<string[]> = atom({ key: 'skillFilterState' });
const benefitFilterState: RecoilState<string[]> = atom({ key: 'benefitFilterState' });
const appliedFilterState: RecoilState<string[]> = atom({ key: 'appliedFilterState' });

export const useFilterStateValues = () => {
  const [platformFilter, setPlatformFilter] = useRecoilState(platformFilterState);
  const [companyFilter, setCompanyFilter] = useRecoilState(companyFilterState);
  const [titleFilter, setTitleFilter] = useRecoilState(titleFilterState);
  const [typeFilter, setTypeFilter] = useRecoilState(typeFilterState);
  const [hiringRegimeFilter, setHiringRegimeFilter] = useRecoilState(hiringRegimeFilterState);
  const [skillFilter, setSkillFilter] = useRecoilState(skillFilterState);
  const [benefitFilter, setBenefitFilter] = useRecoilState(benefitFilterState);
  const [appliedFilter, setAppliedFilter] = useRecoilState(appliedFilterState);

  return {
    platformFilter, setPlatformFilter,
    companyFilter, setCompanyFilter,
    titleFilter, setTitleFilter,
    typeFilter, setTypeFilter,
    hiringRegimeFilter, setHiringRegimeFilter,
    skillFilter, setSkillFilter,
    benefitFilter, setBenefitFilter,
    appliedFilter, setAppliedFilter,
  }
}