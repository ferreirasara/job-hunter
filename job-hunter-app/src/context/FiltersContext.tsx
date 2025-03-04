/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

type TFiltersContextContext = {
  platformFilter: string;
  typeFilter: string;
  hiringRegimeFilter: string;
  skillFilter: string;
  benefitFilter: string;
  titleFilter: string;
  companyFilter: string;
  seniorityFilter: string;
  onChangePlatformFilter: (filter: string) => void;
  onChangeTypeFilter: (filter: string) => void;
  onChangeHiringRegimeFilter: (filter: string) => void;
  onChangeSkillFilter: (filter: string) => void;
  onChangeBenefitFilter: (filter: string) => void;
  onChangeTitleFilter: (filter: string) => void;
  onChangeCompanyFilter: (filter: string) => void;
  onChangeSeniorityFilter: (filter: string) => void;
};

export const FiltersContext = createContext<TFiltersContextContext>({
  platformFilter: '',
  typeFilter: '',
  hiringRegimeFilter: '',
  skillFilter: '',
  benefitFilter: '',
  titleFilter: '',
  companyFilter: '',
  seniorityFilter: '',
  onChangeBenefitFilter: () => {},
  onChangeCompanyFilter: () => {},
  onChangeHiringRegimeFilter: () => {},
  onChangePlatformFilter: () => {},
  onChangeSkillFilter: () => {},
  onChangeTitleFilter: () => {},
  onChangeTypeFilter: () => {},
  onChangeSeniorityFilter: () => {},
});

export const FiltersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [platformFilter, setPlatformFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [hiringRegimeFilter, setHiringRegimeFilter] = useState<string>('');
  const [skillFilter, setSkillFilter] = useState<string>('');
  const [benefitFilter, setBenefitFilter] = useState<string>('');
  const [titleFilter, setTitleFilter] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [seniorityFilter, setSeniorityFilter] = useState<string>('');

  return (
    <FiltersContext.Provider
      value={{
        platformFilter: platformFilter,
        typeFilter: typeFilter,
        hiringRegimeFilter: hiringRegimeFilter,
        skillFilter: skillFilter,
        benefitFilter: benefitFilter,
        titleFilter: titleFilter,
        companyFilter: companyFilter,
        seniorityFilter: seniorityFilter,
        onChangePlatformFilter: (value: string) => setPlatformFilter(value),
        onChangeTypeFilter: (value: string) => setTypeFilter(value),
        onChangeHiringRegimeFilter: (value: string) =>
          setHiringRegimeFilter(value),
        onChangeSkillFilter: (value: string) => setSkillFilter(value),
        onChangeBenefitFilter: (value: string) => setBenefitFilter(value),
        onChangeTitleFilter: (value: string) => setTitleFilter(value),
        onChangeCompanyFilter: (value: string) => setCompanyFilter(value),
        onChangeSeniorityFilter: (value: string) => setSeniorityFilter(value),
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
