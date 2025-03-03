import { difference, uniq } from "lodash";
import { stringContainsAny } from "../utils/utils";
import { BENEFITS_REGEX, HIRING_REGIMES_REGEX, SENIORITY_REGEX, SKILLS_REGEX, TYPES_REGEX, YEARS_OF_EXPERIENCE_REGEX } from "./regex";

type TestCase = {
  type: string,
  cases: {
    str: string,
    regex: RegExp[],
    toBe: boolean,
  }[]
}

const doTestCases = (testCases: TestCase[]) => {
  for (const testCase of testCases) {
    it(`should identify ${testCase?.cases?.length} ${testCase?.type} cases`, () => {
      for (const test of testCase?.cases) {
        expect(stringContainsAny(test?.str, test?.regex)).toBe(test?.toBe);
      }
    })
  }
}

describe('test SKILLS_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'AGILE',
      cases: [
        { str: "metodologia agil", regex: SKILLS_REGEX.AGILE, toBe: true },
        { str: "metodologias ageis", regex: SKILLS_REGEX.AGILE, toBe: true },
        { str: "desenvolvimento agil", regex: SKILLS_REGEX.AGILE, toBe: true },
        { str: "metodos ageis", regex: SKILLS_REGEX.AGILE, toBe: true },
      ]
    },
    {
      type: 'AJAX',
      cases: [
        { str: "ajax", regex: SKILLS_REGEX.AJAX, toBe: true },
      ]
    },
    {
      type: 'ANGULAR',
      cases: [
        { str: "angular", regex: SKILLS_REGEX.ANGULAR, toBe: true },
      ]
    },
    {
      type: 'ANTD',
      cases: [
        { str: 'antd', regex: SKILLS_REGEX.ANTD, toBe: true },
        { str: 'ant design', regex: SKILLS_REGEX.ANTD, toBe: true },
        { str: 'ant-design', regex: SKILLS_REGEX.ANTD, toBe: true },
      ]
    },
    {
      type: 'API',
      cases: [
        { str: 'api', regex: SKILLS_REGEX.API, toBe: true },
        { str: 'apis', regex: SKILLS_REGEX.API, toBe: true },
        { str: 'rest', regex: SKILLS_REGEX.API, toBe: true },
        { str: 'restful', regex: SKILLS_REGEX.API, toBe: true },
        { str: 'apiario', regex: SKILLS_REGEX.API, toBe: false },
        { str: 'PREST. DE SERVICO', regex: SKILLS_REGEX.API, toBe: false },
      ]
    },
    {
      type: 'ARTIFICIAL_INTELLIGENCE',
      cases: [
        { str: "inteligencia artificial", regex: SKILLS_REGEX.ARTIFICIAL_INTELLIGENCE, toBe: true },
        { str: "artificial intelligence", regex: SKILLS_REGEX.ARTIFICIAL_INTELLIGENCE, toBe: true },
      ]
    },
    {
      type: 'BACHELORS_DEGREE',
      cases: [
        { str: 'graduacao completa', regex: SKILLS_REGEX.BACHELORS_DEGREE, toBe: true },
        { str: 'ensino superior', regex: SKILLS_REGEX.BACHELORS_DEGREE, toBe: true },
        { str: 'superior completo', regex: SKILLS_REGEX.BACHELORS_DEGREE, toBe: true },
        { str: 'formacao superior', regex: SKILLS_REGEX.BACHELORS_DEGREE, toBe: true },
        { str: 'nao ter formacao superior na area de computacao e um plus', regex: SKILLS_REGEX.BACHELORS_DEGREE, toBe: false },
      ]
    },
    {
      type: 'CODE_VERSIONING',
      cases: [
        { str: 'git', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'github', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'git-hub', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'git hub', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'gitlab', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'git-lab', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'git lab', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: true },
        { str: 'digital', regex: SKILLS_REGEX.CODE_VERSIONING, toBe: false },
      ]
    },
    {
      type: 'CPLUSPLUS',
      cases: [
        { str: 'c++', regex: SKILLS_REGEX.CPLUSPLUS, toBe: true },
      ]
    },
    {
      type: 'CSHARP',
      cases: [
        { str: 'c#', regex: SKILLS_REGEX.CSHARP, toBe: true },
      ]
    },
    {
      type: 'CSS',
      cases: [
        { str: 'css', regex: SKILLS_REGEX.CSS, toBe: true },
        { str: 'scss', regex: SKILLS_REGEX.CSS, toBe: true },
        { str: 'css3', regex: SKILLS_REGEX.CSS, toBe: true },
      ]
    },
    {
      type: 'DB',
      cases: [
        { str: 'microsoft sql server', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'ms-sql server', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'sql server', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'sql-server', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'no-sql', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'nosql', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'postgre', regex: SKILLS_REGEX.DB, toBe: true },
        { str: 'postgres', regex: SKILLS_REGEX.DB, toBe: true },
      ]
    },
    {
      type: 'DEV_OPS',
      cases: [
        { str: "ci/cd", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "ci-cd", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "ci cd", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "cicd", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "github actions", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "git hub actions", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "git-hub actions", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "git actions", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
        { str: "git flow", regex: SKILLS_REGEX.DEV_OPS, toBe: true },
      ]
    },
    {
      type: 'ECOMMERCE',
      cases: [
        { str: "tray", regex: SKILLS_REGEX.ECOMMERCE, toBe: true },
        { str: "traycorp", regex: SKILLS_REGEX.ECOMMERCE, toBe: true },
        { str: "shopify", regex: SKILLS_REGEX.ECOMMERCE, toBe: true },
        { str: "shopfy", regex: SKILLS_REGEX.ECOMMERCE, toBe: true },
      ]
    },
    {
      type: 'FULL_STACK',
      cases: [
        { str: "full stack", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: "full-stack", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: "fullstack", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: "back-end, front-end", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: "front e back-end", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: "back e frontend", regex: SKILLS_REGEX.FULL_STACK, toBe: true },
        { str: 'back-end & front-end', regex: SKILLS_REGEX.FULL_STACK, toBe: true }
      ]
    },
    {
      type: 'GOOD_PRACTICES',
      cases: [
        { str: 'boas praticas', regex: SKILLS_REGEX.GOOD_PRACTICES, toBe: true },
      ]
    },
    {
      type: 'HTML',
      cases: [
        { str: 'html', regex: SKILLS_REGEX.HTML, toBe: true },
        { str: 'html5', regex: SKILLS_REGEX.HTML, toBe: true },
      ]
    },
    {
      type: 'JAVA',
      cases: [
        { str: 'java', regex: SKILLS_REGEX.JAVA, toBe: true },
        { str: 'java8+', regex: SKILLS_REGEX.JAVA, toBe: true },
        { str: 'springboot', regex: SKILLS_REGEX.JAVA, toBe: true },
        { str: 'spring boot', regex: SKILLS_REGEX.JAVA, toBe: true },
        { str: 'javascript', regex: SKILLS_REGEX.JAVA, toBe: false },
        { str: 'java script', regex: SKILLS_REGEX.JAVA, toBe: false },
      ]
    },
    {
      type: 'JAVASCRIPT',
      cases: [
        { str: 'javascript', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'java script', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'java-script', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'js', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'es6', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'js/Node', regex: SKILLS_REGEX.JAVASCRIPT, toBe: true },
        { str: 'next.js', regex: SKILLS_REGEX.JAVASCRIPT, toBe: false },
        { str: 'react-js', regex: SKILLS_REGEX.JAVASCRIPT, toBe: false },
        { str: 'java', regex: SKILLS_REGEX.JAVASCRIPT, toBe: false },
      ]
    },
    {
      type: 'LOW_CODE',
      cases: [
        { str: 'low code', regex: SKILLS_REGEX.LOW_CODE, toBe: true },
        { str: 'no code', regex: SKILLS_REGEX.LOW_CODE, toBe: true },
      ]
    },
    {
      type: 'LEAN',
      cases: [
        { str: 'lean', regex: SKILLS_REGEX.LEAN, toBe: true },
      ]
    },
    {
      type: 'MACHINE_LEARNING',
      cases: [
        { str: 'machine learning', regex: SKILLS_REGEX.MACHINE_LEARNING, toBe: true },
        { str: 'aprendizado de maquina', regex: SKILLS_REGEX.MACHINE_LEARNING, toBe: true },
      ]
    },
    {
      type: 'MATERIAL_UI',
      cases: [
        { str: 'mui', regex: SKILLS_REGEX.MATERIAL_UI, toBe: true },
        { str: 'materialui', regex: SKILLS_REGEX.MATERIAL_UI, toBe: true },
        { str: 'material ui', regex: SKILLS_REGEX.MATERIAL_UI, toBe: true },
        { str: 'material-ui', regex: SKILLS_REGEX.MATERIAL_UI, toBe: true },
        { str: 'Material Design', regex: SKILLS_REGEX.MATERIAL_UI, toBe: true },
        { str: 'muito', regex: SKILLS_REGEX.MATERIAL_UI, toBe: false },
      ]
    },
    {
      type: 'MENSAGERIA',
      cases: [
        { str: 'rabitmq', regex: SKILLS_REGEX.MENSAGERIA, toBe: true },
      ]
    },
    {
      type: 'MICRO_SERVICES',
      cases: [
        { str: 'microservices', regex: SKILLS_REGEX.MICRO_SERVICES, toBe: true },
      ]
    },
    {
      type: 'MOBILE_DEVELOPMENT',
      cases: [
        { str: 'desenvolvimento nativo', regex: SKILLS_REGEX.MOBILE_DEVELOPMENT, toBe: true },
        { str: 'desenvolvimento de aplicacoes mobile', regex: SKILLS_REGEX.MOBILE_DEVELOPMENT, toBe: true },
      ]
    },
    {
      type: 'NEST',
      cases: [
        { str: 'nest', regex: SKILLS_REGEX.NEST, toBe: true },
        { str: 'nest.js', regex: SKILLS_REGEX.NEST, toBe: true },
        { str: 'nest-js', regex: SKILLS_REGEX.NEST, toBe: true },
        { str: 'nest js', regex: SKILLS_REGEX.NEST, toBe: true },
        { str: 'nestjs', regex: SKILLS_REGEX.NEST, toBe: true },
      ]
    },
    {
      type: 'NEXT',
      cases: [
        { str: 'next', regex: SKILLS_REGEX.NEXT, toBe: true },
        { str: 'next.js', regex: SKILLS_REGEX.NEXT, toBe: true },
        { str: 'next-js', regex: SKILLS_REGEX.NEXT, toBe: true },
        { str: 'next js', regex: SKILLS_REGEX.NEXT, toBe: true },
        { str: 'nextjs', regex: SKILLS_REGEX.NEXT, toBe: true },
      ]
    },
    {
      type: 'NUXT',
      cases: [
        { str: 'nuxt', regex: SKILLS_REGEX.NUXT, toBe: true },
        { str: 'nuxt.js', regex: SKILLS_REGEX.NUXT, toBe: true },
        { str: 'nuxt-js', regex: SKILLS_REGEX.NUXT, toBe: true },
        { str: 'nuxt js', regex: SKILLS_REGEX.NUXT, toBe: true },
        { str: 'nuxtjs', regex: SKILLS_REGEX.NUXT, toBe: true },
      ]
    },
    {
      type: 'NODE',
      cases: [
        { str: 'node', regex: SKILLS_REGEX.NODE, toBe: true },
        { str: 'Node.js', regex: SKILLS_REGEX.NODE, toBe: true },
        { str: 'node-js', regex: SKILLS_REGEX.NODE, toBe: true },
        { str: 'node js', regex: SKILLS_REGEX.NODE, toBe: true },
        { str: 'nodejs', regex: SKILLS_REGEX.NODE, toBe: true },
      ]
    },
    {
      type: 'PERFORMANCE_OPTIMIZATION',
      cases: [
        { str: 'lazy loading', regex: SKILLS_REGEX.PERFORMANCE_OPTIMIZATION, toBe: true },
        { str: 'otimizacao de desempenho', regex: SKILLS_REGEX.PERFORMANCE_OPTIMIZATION, toBe: true },
        { str: 'otimizacao de performance', regex: SKILLS_REGEX.PERFORMANCE_OPTIMIZATION, toBe: true },
        { str: 'performance de front-end', regex: SKILLS_REGEX.PERFORMANCE_OPTIMIZATION, toBe: true },
      ]
    },
    {
      type: 'PERL',
      cases: [
        { str: 'perl', regex: SKILLS_REGEX.PERL, toBe: true },
      ]
    },
    {
      type: 'PENTEST',
      cases: [
        { str: 'pentest', regex: SKILLS_REGEX.PENTEST, toBe: true },
      ]
    },
    {
      type: 'PHONEGAP',
      cases: [
        { str: 'phonegap', regex: SKILLS_REGEX.PHONEGAP, toBe: true },
      ]
    },
    {
      type: 'PHP',
      cases: [
        { str: 'php', regex: SKILLS_REGEX.PHP, toBe: true },
      ]
    },
    {
      type: 'POSTMAN',
      cases: [
        { str: 'postman', regex: SKILLS_REGEX.POSTMAN, toBe: true },
      ]
    },
    {
      type: 'POWER_BI',
      cases: [
        { str: 'power bi', regex: SKILLS_REGEX.POWER_BI, toBe: true },
      ]
    },
    {
      type: 'PRISMA',
      cases: [
        { str: 'prisma', regex: SKILLS_REGEX.PRISMA, toBe: true },
      ]
    },
    {
      type: 'REACT',
      cases: [
        { str: 'react', regex: SKILLS_REGEX.REACT, toBe: true },
        { str: 'react.js', regex: SKILLS_REGEX.REACT, toBe: true },
        { str: 'react-js', regex: SKILLS_REGEX.REACT, toBe: true },
        { str: 'react js', regex: SKILLS_REGEX.REACT, toBe: true },
        { str: 'react native', regex: SKILLS_REGEX.REACT, toBe: false },
        { str: 'react hooks', regex: SKILLS_REGEX.REACT, toBe: false },
      ]
    },
    {
      type: 'REACT_NATIVE',
      cases: [
        { str: 'react native', regex: SKILLS_REGEX.REACT_NATIVE, toBe: true },
        { str: 'react-native', regex: SKILLS_REGEX.REACT_NATIVE, toBe: true },
      ]
    },
    {
      type: 'REACT_HOOKS',
      cases: [
        { str: 'react hook', regex: SKILLS_REGEX.REACT_HOOKS, toBe: true },
        { str: 'react hooks', regex: SKILLS_REGEX.REACT_HOOKS, toBe: true },
        { str: 'react hook form', regex: SKILLS_REGEX.REACT_HOOKS, toBe: false },
      ]
    },
    {
      type: 'RESPONSIVE_DESIGN',
      cases: [
        { str: 'site responsivo', regex: SKILLS_REGEX.RESPONSIVE_DESIGN, toBe: true },
        { str: 'sites responsivos', regex: SKILLS_REGEX.RESPONSIVE_DESIGN, toBe: true },
        { str: 'aplicacoes responsivas', regex: SKILLS_REGEX.RESPONSIVE_DESIGN, toBe: true },
        { str: 'projetos responsivos', regex: SKILLS_REGEX.RESPONSIVE_DESIGN, toBe: true },
        { str: 'interfaces de usuario interativas e responsivas', regex: SKILLS_REGEX.RESPONSIVE_DESIGN, toBe: true },
      ]
    },
    {
      type: 'RUBY',
      cases: [
        { str: 'ruby on rails', regex: SKILLS_REGEX.RUBY, toBe: true },
        { str: 'ruby-on-rails', regex: SKILLS_REGEX.RUBY, toBe: true },
        { str: 'ruby', regex: SKILLS_REGEX.RUBY, toBe: true },
      ]
    },
    {
      type: 'STATE_MANAGEMENT',
      cases: [
        { str: 'Gerenciamento de estados', regex: SKILLS_REGEX.STATE_MANAGEMENT, toBe: true },
      ]
    },
    {
      type: 'STYLED_COMPONENTS',
      cases: [
        { str: 'styled component', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
        { str: 'styled-component', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
        { str: 'styledcomponent', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
        { str: 'styled components', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
        { str: 'styled-components', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
        { str: 'styledcomponents', regex: SKILLS_REGEX.STYLED_COMPONENTS, toBe: true },
      ]
    },
    {
      type: 'TAILWIND',
      cases: [
        { str: 'tailwind', regex: SKILLS_REGEX.TAILWIND, toBe: true },
        { str: 'tailwindcss', regex: SKILLS_REGEX.TAILWIND, toBe: true },
        { str: 'tailwind-css', regex: SKILLS_REGEX.TAILWIND, toBe: true },
        { str: 'tailwind css', regex: SKILLS_REGEX.TAILWIND, toBe: true },
      ]
    },
    {
      type: 'TEST',
      cases: [
        { str: 'teste unitario', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes unitarios', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'teste functional', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes functionais', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'teste functional automatizado', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes functionais automatizados', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'teste automatizado', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes automatizados', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes de unidade', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes de integracao', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes de software', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes de performance', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes de depuracao', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testing library', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'automated unit-testing and test', regex: SKILLS_REGEX.TEST, toBe: true },
        { str: 'testes e qualidade', regex: SKILLS_REGEX.TEST, toBe: true },
      ]
    },
    {
      type: 'TYPESCRIPT',
      cases: [
        { str: 'typescript', regex: SKILLS_REGEX.TYPESCRIPT, toBe: true },
        { str: 'type script', regex: SKILLS_REGEX.TYPESCRIPT, toBe: true },
        { str: 'type-script', regex: SKILLS_REGEX.TYPESCRIPT, toBe: true },
        { str: 'ts', regex: SKILLS_REGEX.TYPESCRIPT, toBe: true },
        { str: 'requirements', regex: SKILLS_REGEX.TYPESCRIPT, toBe: false },
        { str: 'EvenTS', regex: SKILLS_REGEX.TYPESCRIPT, toBe: false },
        { str: 'EnvironmenTS', regex: SKILLS_REGEX.TYPESCRIPT, toBe: false },
      ]
    },
    {
      type: 'VANILLA',
      cases: [
        { str: 'javascript vanilla', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: 'js vanilla', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: 'vanilla', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: 'vanilla.js', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: 'vanilla-js', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: 'vanilla js', regex: SKILLS_REGEX.VANILLA, toBe: true },
        { str: '(vanilla)', regex: SKILLS_REGEX.VANILLA, toBe: true },
      ]
    },
    {
      type: 'VUE',
      cases: [
        { str: 'vue', regex: SKILLS_REGEX.VUE, toBe: true },
        { str: 'vue.js', regex: SKILLS_REGEX.VUE, toBe: true },
        { str: 'vue-js', regex: SKILLS_REGEX.VUE, toBe: true },
        { str: 'vue js', regex: SKILLS_REGEX.VUE, toBe: true },
        { str: 'vuejs', regex: SKILLS_REGEX.VUE, toBe: true },
      ]
    },
    {
      type: 'WEB_HOOKS',
      cases: [
        { str: 'webhook', regex: SKILLS_REGEX.WEB_HOOKS, toBe: true },
        { str: 'webhooks', regex: SKILLS_REGEX.WEB_HOOKS, toBe: true },
        { str: 'web hook', regex: SKILLS_REGEX.WEB_HOOKS, toBe: true },
        { str: 'web hooks', regex: SKILLS_REGEX.WEB_HOOKS, toBe: true },
      ]
    },
  ]

  doTestCases(testCases);

  const allSkills = Object.keys(SKILLS_REGEX);
  const skillsTested = uniq(testCases?.map(cur => cur?.type));
  const skillsNotTested = difference(allSkills, skillsTested);
  if (skillsNotTested?.length) console.log(`Skills not tested: ${skillsNotTested?.join(', ')}`);
})

describe('test BENEFITS_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'ANUAL_BONUS',
      cases: [
        { str: 'bonus anual', regex: BENEFITS_REGEX.ANUAL_BONUS, toBe: true },
        { str: 'annual bonus', regex: BENEFITS_REGEX.ANUAL_BONUS, toBe: true },
        { str: 'bonus per year', regex: BENEFITS_REGEX.ANUAL_BONUS, toBe: true },
      ]
    },
    {
      type: 'BIRTHDAY_DAYOFF',
      cases: [
        { str: 'day off no seu aniversario', regex: BENEFITS_REGEX.BIRTHDAY_DAYOFF, toBe: true },
        { str: 'dayoff no mes do seu aniversario', regex: BENEFITS_REGEX.BIRTHDAY_DAYOFF, toBe: true },
        { str: 'dia de folga na semana do seu aniversario', regex: BENEFITS_REGEX.BIRTHDAY_DAYOFF, toBe: true },
        { str: 'Folga no aniversario', regex: BENEFITS_REGEX.BIRTHDAY_DAYOFF, toBe: true },
        { str: 'day off de aniversario', regex: BENEFITS_REGEX.BIRTHDAY_DAYOFF, toBe: true },
      ]
    },
    {
      type: 'CHRISTMAS_BASKET',
      cases: [
        { str: 'cesta de natal', regex: BENEFITS_REGEX.CHRISTMAS_BASKET, toBe: true },
      ]
    },
    {
      type: 'COURSE_HELP',
      cases: [
        { str: 'incentivo para educacao', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'auxilio educacao', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'incentivo a estudos', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'investimento em cursos', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'subsidio para estudo', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'desconto com faculdades', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'desconto em cursos', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'incentivo a certificacoes', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
        { str: 'subvencao a estudos', regex: BENEFITS_REGEX.COURSE_HELP, toBe: true },
      ]
    },
    {
      type: 'FLEXIBLE_HOURS',
      cases: [
        { str: 'flexible working schedules', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
        { str: 'horario flexivel', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
        { str: 'horarios flexiveis', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
        { str: 'flexible hours', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
        { str: 'flexible schedule', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
        { str: 'nosso horario e flexivel', regex: BENEFITS_REGEX.FLEXIBLE_HOURS, toBe: true },
      ]
    },
    {
      type: 'FOURTEENTH_SALARY',
      cases: [
        { str: '14º salario', regex: BENEFITS_REGEX.FOURTEENTH_SALARY, toBe: true },
      ]
    },
    {
      type: 'GYMPASS',
      cases: [
        { str: 'gym pass', regex: BENEFITS_REGEX.GYMPASS, toBe: true },
        { str: 'gympass', regex: BENEFITS_REGEX.GYMPASS, toBe: true },
        { str: 'auxilio academia', regex: BENEFITS_REGEX.GYMPASS, toBe: true },
      ]
    },
    {
      type: 'HEALTH_OR_DENTAL_PLAN',
      cases: [
        { str: 'plano odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'convenio odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'convenio medico e odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'plano de saude e odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'assistencia medica e odontologica', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'assistencias medica e odontologica', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'assistencia odontologica', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'health insurance', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'health plan', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'health and dental plan', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'health care', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'assistencia medica', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'convenio medico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'servicos de telemedicina', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'com planos de saude e odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'convenio de saude', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'beneficio saude', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
        { str: 'beneficio odontologico', regex: BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN, toBe: true },
      ]
    },
    {
      type: 'HOME_OFFICE_VOUCHER',
      cases: [
        { str: 'auxilio home office', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'subsidio para trabalho remoto', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'auxilio home-office', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'auxilio para atuacao em home office', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'remote work allowance', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'auxilio para trabalho remoto', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
        { str: 'Ajuda de custo para Home Office', regex: BENEFITS_REGEX.HOME_OFFICE_VOUCHER, toBe: true },
      ]
    },
    {
      type: 'LIFE_INSURANCE',
      cases: [
        { str: 'seguro de vida', regex: BENEFITS_REGEX.LIFE_INSURANCE, toBe: true },
      ]
    },
    {
      type: 'MATERNITY_LEAVE',
      cases: [
        { str: 'licenca maternidade', regex: BENEFITS_REGEX.MATERNITY_LEAVE, toBe: true },
        { str: 'parental leave', regex: BENEFITS_REGEX.MATERNITY_LEAVE, toBe: true },
      ]
    },
    {
      type: 'MEAL_VOUCHER',
      cases: [
        { str: 'vale alimentacao', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'vale refeicao', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'flex food', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'to use with food', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'va', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'vr', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'va/vr', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'Ajuda de custo para alimentacao', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'v.a.', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'v.r.', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
        { str: 'vale refeicao/vale alimentacao', regex: BENEFITS_REGEX.MEAL_VOUCHER, toBe: true },
      ]
    },
    {
      type: 'PAID_VACATIONS',
      cases: [
        { str: 'ferias remuneradas', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'ferias anuais remuneradas', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'descanso anual', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'descanso remunerado', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'paid annual leave', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'ferias remunerada', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'ferias e feriados remunerados', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
        { str: 'Ferias de 12 dias uteis remuneradas.', regex: BENEFITS_REGEX.PAID_VACATIONS, toBe: true },
      ]
    },
    {
      type: 'PET_HELP',
      cases: [
        { str: 'licenca pet', regex: BENEFITS_REGEX.PET_HELP, toBe: true },
        { str: 'convenio pet', regex: BENEFITS_REGEX.PET_HELP, toBe: true },
      ]
    },
    {
      type: 'PHARMACY_AGREEMENT',
      cases: [
        { str: 'convenio farmacia', regex: BENEFITS_REGEX.PHARMACY_AGREEMENT, toBe: true },
      ]
    },
    {
      type: 'PLR',
      cases: [
        { str: 'participacao nos lucros', regex: BENEFITS_REGEX.PLR, toBe: true },
        { str: 'plr', regex: BENEFITS_REGEX.PLR, toBe: true },
        { str: 'lucros e resultados', regex: BENEFITS_REGEX.PLR, toBe: true },
      ]
    },
    {
      type: 'PRIVATE_PENSION',
      cases: [
        { str: 'previdencia privada', regex: BENEFITS_REGEX.PRIVATE_PENSION, toBe: true },
      ]
    },
    {
      type: 'PSYCHOLOGICAL_HELP',
      cases: [
        { str: 'auxilio psicologico', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'apoio psicologico', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'mental health', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'apoio a saude mental', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'cuidado com saude mental', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'auxilio saude emocional', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'auxilio bem estar', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'suporte social e psicologico', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'bem estar psicologico', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
        { str: 'desconto com psicoterapia', regex: BENEFITS_REGEX.PSYCHOLOGICAL_HELP, toBe: true },
      ]
    },
    {
      type: 'REFERRAL_BONUS',
      cases: [
        { str: 'bonus indicacao', regex: BENEFITS_REGEX.REFERRAL_BONUS, toBe: true },
        { str: 'program of indication', regex: BENEFITS_REGEX.REFERRAL_BONUS, toBe: true },
        { str: 'indicacao premiada', regex: BENEFITS_REGEX.REFERRAL_BONUS, toBe: true },
        { str: 'bonus por indicacao de talentos', regex: BENEFITS_REGEX.REFERRAL_BONUS, toBe: true },
      ]
    },
    {
      type: 'STOCK_OPTIONS',
      cases: [
        { str: 'stock options', regex: BENEFITS_REGEX.STOCK_OPTIONS, toBe: true },
      ]
    },
    {
      type: 'THIRTEENTH_SALARY',
      cases: [
        { str: '13 salario', regex: BENEFITS_REGEX.THIRTEENTH_SALARY, toBe: true },
        { str: '13º salario', regex: BENEFITS_REGEX.THIRTEENTH_SALARY, toBe: true },
        { str: 'decimo terceiro', regex: BENEFITS_REGEX.THIRTEENTH_SALARY, toBe: true },
      ]
    },
    {
      type: 'TRANSPORTATION_VOUCHER',
      cases: [
        { str: 'vale transporte', regex: BENEFITS_REGEX.TRANSPORTATION_VOUCHER, toBe: true },
        { str: 'auxilio combustivel', regex: BENEFITS_REGEX.TRANSPORTATION_VOUCHER, toBe: true },
      ]
    },
    {
      type: 'USD_SALARY',
      cases: [
        { str: 'salary in usd', regex: BENEFITS_REGEX.USD_SALARY, toBe: true },
        { str: 'pagamento em moeda estrangeira', regex: BENEFITS_REGEX.USD_SALARY, toBe: true },
      ]
    },
  ]

  doTestCases(testCases);

  const allBenefits = Object.keys(BENEFITS_REGEX);
  const benefitsTested = uniq(testCases?.map(cur => cur?.type));
  const benefitsNotTested = difference(allBenefits, benefitsTested);
  if (benefitsNotTested?.length) console.log(`Benefits not tested: ${benefitsNotTested?.join(', ')}`);
})

describe('test HIRING_REGIMES_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'CLT',
      cases: [
        { str: 'clt', regex: HIRING_REGIMES_REGEX.CLT, toBe: true },
      ]
    },
    {
      type: 'PJ',
      cases: [
        { str: 'pj', regex: HIRING_REGIMES_REGEX.PJ, toBe: true },
        { str: 'pessoa juridica', regex: HIRING_REGIMES_REGEX.PJ, toBe: true },
        { str: 'cooperado', regex: HIRING_REGIMES_REGEX.PJ, toBe: true },
      ]
    },
  ]

  doTestCases(testCases);

  const allHiringRegimes = Object.keys(HIRING_REGIMES_REGEX);
  const hiringRegimesTested = uniq(testCases?.map(cur => cur?.type));
  const hiringRegimesNotTested = difference(allHiringRegimes, hiringRegimesTested);
  if (hiringRegimesNotTested?.length) console.log(`HiringRegimes not tested: ${hiringRegimesNotTested?.join(', ')}`);
})

describe('test TYPES_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'FACE_TO_FACE',
      cases: [
        { str: 'presencial', regex: TYPES_REGEX.FACE_TO_FACE, toBe: true },
        { str: 'presencialmente', regex: TYPES_REGEX.FACE_TO_FACE, toBe: true },
      ]
    },
    {
      type: 'HYBRID',
      cases: [
        { str: 'hibrido', regex: TYPES_REGEX.HYBRID, toBe: true },
      ]
    },
    {
      type: 'REMOTE',
      cases: [
        { str: 'home office', regex: TYPES_REGEX.REMOTE, toBe: true },
        { str: 'anywhere office', regex: TYPES_REGEX.REMOTE, toBe: true },
        { str: 'teletrabalho', regex: TYPES_REGEX.REMOTE, toBe: true },
        { str: '100% remoto', regex: TYPES_REGEX.REMOTE, toBe: true },
        { str: 'remoto: nao', regex: TYPES_REGEX.REMOTE, toBe: false },
      ]
    },
  ]

  doTestCases(testCases);

  const allTypes = Object.keys(TYPES_REGEX);
  const typesTested = uniq(testCases?.map(cur => cur?.type));
  const typesNotTested = difference(allTypes, typesTested);
  if (typesNotTested?.length) console.log(`Types not tested: ${typesNotTested?.join(', ')}`);
})

describe('test SENIORITY_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'JUNIOR',
      cases: [
        { str: 'junior', regex: SENIORITY_REGEX.JUNIOR, toBe: true },
        { str: 'estagiario', regex: SENIORITY_REGEX.JUNIOR, toBe: true },
        { str: 'jr', regex: SENIORITY_REGEX.JUNIOR, toBe: true },
      ]
    },
    {
      type: 'MID_LEVEL',
      cases: [
        { str: 'pleno', regex: SENIORITY_REGEX.MID_LEVEL, toBe: true },
        { str: 'pl', regex: SENIORITY_REGEX.MID_LEVEL, toBe: true },
        { str: 'pleno conhecimento', regex: SENIORITY_REGEX.MID_LEVEL, toBe: false },
      ]
    },
    {
      type: 'SENIOR',
      cases: [
        { str: 'senior', regex: SENIORITY_REGEX.SENIOR, toBe: true },
        { str: 'sr', regex: SENIORITY_REGEX.SENIOR, toBe: true },
        { str: 'senioridade', regex: SENIORITY_REGEX.SENIOR, toBe: false },
      ]
    },
  ]

  doTestCases(testCases);

  const allSeniorities = Object.keys(SENIORITY_REGEX);
  const senioritiesTested = uniq(testCases?.map(cur => cur?.type));
  const senioritiesNotTested = difference(allSeniorities, senioritiesTested);
  if (senioritiesNotTested?.length) console.log(`Seniorities not tested: ${senioritiesNotTested?.join(', ')}`);
})

describe('test YEARS_OF_EXPERIENCE_REGEX cases', () => {
  const testCases: TestCase[] = [
    {
      type: 'YEARS_OF_EXPERIENCE_REGEX',
      cases: [
        { str: 'experiencia profissional minima de 3 anos', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'pelo menos 2 anos de experiencia', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'pelo menos dois anos de experiencia', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '2 ou mais anos de experiencia trabalhando', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'mais de 2 anos em contato', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'experiencia minima de 3 anos', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '3 anos trabalhando', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'experiencia comprovada de 4+ anos', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '5+ years of professional', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '4+ anos experiencia', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '3 anos +', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '4+ years of non-internship professional', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'experiencia de trabalho de 7+ anos', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: '5+ years with', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: true },
        { str: 'auxilio creche: para filhos(as) ate 5 anos de idade.', regex: YEARS_OF_EXPERIENCE_REGEX, toBe: false },
      ]
    },
  ]

  doTestCases(testCases);
})
