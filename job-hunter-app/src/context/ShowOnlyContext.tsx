import { createContext, useState } from "react";

type TShowOnlyContext = {
  showOnlyDiscarded: boolean
  showOnlyRecused: boolean
  showOnlyNewJobs: boolean
  showOnlyApplied: boolean
  onChangeShowOnlyDiscarded: (value: boolean) => void,
  onChangeShowOnlyRecused: (value: boolean) => void,
  onChangeShowOnlyNewJobs: (value: boolean) => void,
  onChangeShowOnlyApplied: (value: boolean) => void,
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
    onChangeShowOnlyDiscarded: (value) => setShowOnlyDiscarded(value),
    onChangeShowOnlyRecused: (value) => setShowOnlyRecused(value),
    onChangeShowOnlyNewJobs: (value) => setShowOnlyNewJobs(value),
    onChangeShowOnlyApplied: (value) => setShowOnlyApplied(value),
  }}>
    {children}
  </ShowOnlyContext.Provider >
}
