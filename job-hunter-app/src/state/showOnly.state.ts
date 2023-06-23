import { RecoilState, atom, useRecoilState } from "recoil";

const showOnlyDiscardedState: RecoilState<boolean> = atom({ key: 'showOnlyDiscardedState', default: false });
const showOnlyRecusedState: RecoilState<boolean> = atom({ key: 'showOnlyRecusedState', default: false });
const showOnlyNewJobsState: RecoilState<boolean> = atom({ key: 'showOnlyNewJobsState', default: false });

export const useShowOnlyStateValues = () => {
  const [showOnlyDiscarded, setShowOnlyDiscarded] = useRecoilState(showOnlyDiscardedState);
  const [showOnlyRecused, setShowOnlyRecused] = useRecoilState(showOnlyRecusedState);
  const [showOnlyNewJobs, setShowOnlyNewJobs] = useRecoilState(showOnlyNewJobsState);

  return {
    showOnlyDiscarded, setShowOnlyDiscarded,
    showOnlyRecused, setShowOnlyRecused,
    showOnlyNewJobs, setShowOnlyNewJobs,
  }
}