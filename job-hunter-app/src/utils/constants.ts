import { GetJobsFromAPIArgs } from '../@types/types'

export const COVER_LETTER = 'Sou bacharel em Ciência da Computação e pós-graduada em User Experience (UX), contando com 6 anos de experiência em desenvolvimento de software. Minha principal força e foco de atuação estão no ecossistema Front-end, no qual possuo sólido domínio de tecnologias como React, Next.js, TypeScript, testes automatizados e arquitetura de interfaces intuitivas e de alta performance. Embora minha clara preferência seja o Front-end, também tenho bagagem consistente em Back-end (com Node.js, Nest.js, APIs e bancos de dados) e experiência prévia atuando como desenvolvedora Full Stack. Além da bagagem técnica, destacam-se como minhas principais soft skills a comunicação clara e empática, a organização rigorosa com código e entregas, e uma elevada autonomia para conduzir projetos do início ao fim.'

export const INITIAL_FILTERS_STATE: Partial<GetJobsFromAPIArgs> = {
  titleFilter: undefined,
  typeFilter: undefined,
  seniorityFilter: undefined,
  showOnlyApplied: false,
  showOnlyDiscarded: false,
  showOnlyNewJobs: false,
  showOnlyRecused: false,
  orderByOrder: 'ascend',
  orderByField: 'totalRating',
  skillsFilter: undefined,
}
