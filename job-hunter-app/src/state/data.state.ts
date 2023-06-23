import { RecoilState, atom, useRecoilState } from "recoil";
import { JobsTableData } from "../components/JobsTable";

const loadingState: RecoilState<boolean> = atom({ key: 'loadingState', default: false });
const dataState: RecoilState<JobsTableData[]> = atom({ key: 'dataState' });
const dataLengthState: RecoilState<number> = atom({ key: 'dataLengthState', default: 0 });
const totalOfJobsState: RecoilState<number> = atom({ key: 'totalOfJobsState', default: 0 });
const allSkillsState: RecoilState<string[]> = atom({ key: 'allSkillsState' });
const allBenefitsState: RecoilState<string[]> = atom({ key: 'allBenefitsState' });
const allPlatformsState: RecoilState<string[]> = atom({ key: 'allPlatformsState' });
const allRatingsState: RecoilState<number[]> = atom({ key: 'allRatingsState' });

export const useDataStateValues = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [data, setData] = useRecoilState(dataState);
  const [dataLength, setDataLength] = useRecoilState(dataLengthState);
  const [totalOfJobs, setTotalOfJobs] = useRecoilState(totalOfJobsState);
  const [allSkills, setAllSkills] = useRecoilState(allSkillsState);
  const [allBenefits, setAllBenefits] = useRecoilState(allBenefitsState);
  const [allPlatforms, setAllPlatforms] = useRecoilState(allPlatformsState);
  const [allRatings, setAllRatings] = useRecoilState(allRatingsState);

  return {
    loading, setLoading,
    data, setData,
    dataLength, setDataLength,
    totalOfJobs, setTotalOfJobs,
    allSkills, setAllSkills,
    allBenefits, setAllBenefits,
    allPlatforms, setAllPlatforms,
    allRatings, setAllRatings,
  }
}