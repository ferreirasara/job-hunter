import { createContext, useState } from "react";

type TShowOnlyContext = {
  showOnlyDiscarded: boolean
  showOnlyRecused: boolean
  showOnlyNewJobs: boolean
  showOnlyApplied: boolean
  onChangeShowOnlyDiscarded: () => void,
  onChangeShowOnlyRecused: () => void,
  onChangeShowOnlyNewJobs: () => void,
  onChangeShowOnlyApplied: () => void,
}

export const ShowOnlyContext = createContext<TShowOnlyContext>({
  showOnlyDiscarded: false,
  showOnlyRecused: false,
  showOnlyNewJobs: false,
  showOnlyApplied: false,
  onChangeShowOnlyDiscarded: () => { },
  onChangeShowOnlyRecused: () => { },
  onChangeShowOnlyNewJobs: () => { },
  onChangeShowOnlyApplied: () => { },
});

export const ShowOnlyContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showOnlyDiscarded, setShowOnlyDiscarded] = useState<boolean>(false);
  const [showOnlyRecused, setShowOnlyRecused] = useState<boolean>(false);
  const [showOnlyNewJobs, setShowOnlyNewJobs] = useState<boolean>(false);
  const [showOnlyApplied, setShowOnlyApplied] = useState<boolean>(false);

  return <ShowOnlyContext.Provider value={{
    showOnlyDiscarded: showOnlyDiscarded,
    showOnlyRecused: showOnlyRecused,
    showOnlyNewJobs: showOnlyNewJobs,
    showOnlyApplied: showOnlyApplied,
    onChangeShowOnlyDiscarded: () => setShowOnlyDiscarded(!showOnlyDiscarded),
    onChangeShowOnlyRecused: () => setShowOnlyRecused(!showOnlyRecused),
    onChangeShowOnlyNewJobs: () => setShowOnlyNewJobs(!showOnlyNewJobs),
    onChangeShowOnlyApplied: () => setShowOnlyApplied(!showOnlyApplied),
  }}>
    {children}
  </ShowOnlyContext.Provider >
}
