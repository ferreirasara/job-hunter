import { stringContainsAny } from "../utils/utils"
import { BENEFITS_REGEX, SKILLS_REGEX } from "./regex";

describe("test SKILLS_REGEX", () => {
  it("should identify AGILE cases", () => {
    const correctStrings = ["metodologia agil", "metodologias ageis", "desenvolvimento agil"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.AGILE)).toBeTruthy();
    }
  });
  it("should identify ANTD cases", () => {
    const correctStrings = ["antd", "ant design", "ant-design"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.ANTD)).toBeTruthy();
    }
  });
  it("should identify API cases", () => {
    const correctStrings = ["api", "apis", "api rest", "apis rest", "api restful", "apis restful", "rest api", "rest apis", "restful api", "restful apis", "rest", "restful"];
    const wrongStrings = ["apiario", "PREST. DE SERVICO"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.API)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.API)).toBeFalsy();
    }
  });
  it("should identify BACHELORS_DEGREE cases", () => {
    const correctStrings = ["graduacao completa", "ensino superior", "superior completo", "formacao superior"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.BACHELORS_DEGREE)).toBeTruthy();
    }
  });
  it("should identify CODE_VERSIONING cases", () => {
    const correctStrings = ["git", "github", "git-hub", "git hub", "gitlab", "git-lab", "git lab"];
    const wrongStrings = ["digital"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.CODE_VERSIONING)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.CODE_VERSIONING)).toBeFalsy();
    }
  });
  it("should identify CPLUSPLUS and CSHARP cases", () => {
    expect(stringContainsAny("c++", SKILLS_REGEX.CPLUSPLUS)).toBeTruthy();
    expect(stringContainsAny("c#", SKILLS_REGEX.CSHARP)).toBeTruthy();
  });
  it("should identify CSS cases", () => {
    const correctStrings = ["css", "scss", "css3"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.CSS)).toBeTruthy();
    }
  });
  it("should identify DB cases", () => {
    const correctStrings = ["microsoft sql server", "ms-sql server", "sql server", "sql-server", "no-sql", "nosql", "postgre", "postgres"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.DB)).toBeTruthy();
    }
  });
  it("should identify DEV_OPS cases", () => {
    const correctStrings = ["ci/cd", "ci-cd", "ci cd", "cicd", "github actions", "git hub actions", "git-hub actions", "git actions", "git flow"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.DEV_OPS)).toBeTruthy();
    }
  });
  it("should identify ECOMMERCE cases", () => {
    const correctStrings = ["tray", "traycorp", "shopify", "shopfy"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.ECOMMERCE)).toBeTruthy();
    }
  });
  it("should identify FULL_STACK cases", () => {
    const correctStrings = ["full stack", "full-stack", "fullstack"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.FULL_STACK)).toBeTruthy();
    }
  });
  it("should identify HTML cases", () => {
    const correctStrings = ["html", "html5"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.HTML)).toBeTruthy();
    }
  });
  it("should identify JAVA cases", () => {
    const correctStrings = ["java"];
    const wrongStrings = ["javascript", "java script"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVA)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVA)).toBeFalsy();
    }
  });
  it("should identify JAVASCRIPT cases", () => {
    const correctStrings = ["javascript", "java script", "java-script", "js", "es6", "js/Node"];
    const wrongStrings = ["next.js", "react-js", "java"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVASCRIPT)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVASCRIPT)).toBeFalsy();
    }
  });
  it("should identify MATERIAL_UI cases", () => {
    const correctStrings = ["mui", "materialui", "material ui", "material-ui", "Material Design"];
    const wrongStrings = ["muito"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.MATERIAL_UI)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.MATERIAL_UI)).toBeFalsy();
    }
  });
  it("should identify NEXT cases", () => {
    const correctStrings = ["next", "next.js", "next-js", "next js"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.NEXT)).toBeTruthy();
    }
  });
  it("should identify NUXT cases", () => {
    const correctStrings = ["nuxt", "nuxt.js", "nuxt-js", "nuxt js"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.NUXT)).toBeTruthy();
    }
  });
  it("should identify NODE cases", () => {
    const correctStrings = ["node", "node.js", "node-js", "node js"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.NODE)).toBeTruthy();
    }
  });
  it("should identify REACT cases", () => {
    const correctStrings = ["react", "react.js", "react-js", "react js"];
    const wrongStrings = ["react native", "react hooks"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.REACT)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.REACT)).toBeFalsy();
    }
  });
  it("should identify REACT_NATIVE cases", () => {
    const correctStrings = ["react native", "react-native"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.REACT_NATIVE)).toBeTruthy();
    }
  });
  it("should identify RESPONSIVE_DESIGN cases", () => {
    const correctStrings = ["site responsivo", "sites responsivos", "aplicacoes responsivas"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.RESPONSIVE_DESIGN)).toBeTruthy();
    }
  });
  it("should identify RUBY cases", () => {
    const correctStrings = ["ruby on rails", "ruby-on-rails", "ruby"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.RUBY)).toBeTruthy();
    }
  });
  it("should identify STATE_MANAGEMENT cases", () => {
    const correctStrings = ["Gerenciamento de estados"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.STATE_MANAGEMENT)).toBeTruthy();
    }
  });
  it("should identify STYLED_COMPONENTS cases", () => {
    const correctStrings = ["styled component", "styled-component", "styledcomponent", "styled components", "styled-components", "styledcomponents"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.STYLED_COMPONENTS)).toBeTruthy();
    }
  });
  it("should identify TAILWIND cases", () => {
    const correctStrings = ["tailwind", "tailwindcss", "tailwind-css", "tailwind css"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.TAILWIND)).toBeTruthy();
    }
  });
  it("should identify TEST cases", () => {
    const correctStrings = [
      "teste unitario", "testes unitarios", "teste functional", "testes functionais", "teste functional automatizado",
      "testes functionais automatizados", "teste automatizado", "testes automatizados", "testes de unidade",
      "testes de integracao", "testes de software", "testes de performance", "testes de depuracao", "testing library"
    ];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.TEST)).toBeTruthy();
    }
  });
  it("should identify TYPESCRIPT cases", () => {
    const correctStrings = ["typescript", "type script", "type-script", "ts"];
    const wrongStrings = ["requirements", "EvenTS", "EnvironmenTS"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.TYPESCRIPT)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.TYPESCRIPT)).toBeFalsy();
    }
  });
  it("should identify VANILLA cases", () => {
    const correctStrings = ["javascript vanilla", "js vanilla", "vanilla", "vanilla.js", "vanilla-js", "vanilla js"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.VANILLA)).toBeTruthy();
    }
  });
  it("should identify VUE cases", () => {
    const correctStrings = ["vue", "vue.js", "vue-js", "vue js"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.VUE)).toBeTruthy();
    }
  });
  it("should identify WEB_HOOKS cases", () => {
    const correctStrings = ["webhook", "webhooks", "web hook", "web hooks"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.WEB_HOOKS)).toBeTruthy();
    }
  });
})

describe("test BENEFITS_REGEX", () => {
  it("should identify ANUAL_BONUS cases", () => {
    const correctStrings = ["bonus anual", "annual bonus", "bonus per year"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.ANUAL_BONUS)).toBeTruthy();
    }
  });
  it("should identify BIRTHDAY_DAYOFF cases", () => {
    const correctStrings = ["day off no seu aniversario", "dayoff no mes do seu aniversario", "dia de folga na semana do seu aniversario", "Folga no aniversario"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.BIRTHDAY_DAYOFF)).toBeTruthy();
    }
  });
  it("should identify COURSE_HELP cases", () => {
    const correctStrings = ["incentivo para educacao", "auxilio educacao", "incentivo a estudos", "investimento em cursos", "subsidio para estudo"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.COURSE_HELP)).toBeTruthy();
    }
  });
  it("should identify FLEXIBLE_HOURS cases", () => {
    const correctStrings = ["flexible working schedules", "horario flexivel", "horarios flexiveis", "flexible hours", "flexible schedule"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.FLEXIBLE_HOURS)).toBeTruthy();
    }
  });
  it("should identify GYMPASS cases", () => {
    const correctStrings = ["gym pass", "gympass", "auxilio academia"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.GYMPASS)).toBeTruthy();
    }
  });
  it("should identify HEALTH_OR_DENTAL_PLAN cases", () => {
    const correctStrings = [
      "plano odontologico", "convenio odontologico", "convenio medico e odontologico", "plano de saude e odontologico", "assistencia medica e odontologica",
      "assistencias medica e odontologica", "assistencia odontologica", "health insurance", "health plan", "health and dental plan", "health care",
      "assistencia medica", "convenio medico"
    ];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.HEALTH_OR_DENTAL_PLAN)).toBeTruthy();
    }
  });
  it("should identify HOME_OFFICE_VOUCHER cases", () => {
    const correctStrings = [
      "auxilio home office", "subsidio para trabalho remoto", "auxilio home-office", "auxilio para atuacao em home office",
      "remote work allowance", "auxilio para trabalho remoto", "Ajuda de custo para Home Office"
    ];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.HOME_OFFICE_VOUCHER)).toBeTruthy();
    }
  });
  it("should identify MEAL_VOUCHER cases", () => {
    const correctStrings = [
      "vale alimentacao", "vale refeicao", "flex food", "to use with food",
      "va", "vr", "va/vr", "Ajuda de custo para alimentacao", "v.a.", "v.r.",
      "vale refeicao/vale alimentacao",
    ];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.MEAL_VOUCHER)).toBeTruthy();
    }
  });
  it("should identify PAID_VACATIONS cases", () => {
    const correctStrings = ["ferias remuneradas", "ferias anuais remuneradas", "descanso anual", "descanso remunerado", "paid annual leave", "ferias remunerada", "ferias e feriados remunerados"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.PAID_VACATIONS)).toBeTruthy();
    }
  });
  it("should identify PSYCHOLOGICAL_HELP cases", () => {
    const correctStrings = ["auxilio psicologico", "apoio psicologico", "mental health", "apoio a saude mental", "cuidado com saude mental", "auxilio saude emocional", "auxilio bem estar", "suporte social e psicologico"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.PSYCHOLOGICAL_HELP)).toBeTruthy();
    }
  });
  it("should identify REFERRAL_BONUS cases", () => {
    const correctStrings = ["bonus indicacao", "program of indication", "indicacao premiada", "bonus por indicacao de talentos"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, BENEFITS_REGEX.REFERRAL_BONUS)).toBeTruthy();
    }
  });
})