import { stringContainsAny } from "../utils/utils"
import { SKILLS_REGEX } from "./regex";

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
    const wrongStrings = ["apiario"];
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
    const correctStrings = ["ci/cd", "ci-cd", "ci cd", "cicd", "github actions", "git hub actions", "git-hub actions", "git actions"];
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
    const wrongStrings = ["javascript"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVA)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVA)).toBeFalsy();
    }
  });
  it("should identify JAVASCRIPT cases", () => {
    const correctStrings = ["javascript", "java script", "java-script", "js", "es6"];
    const wrongStrings = ["next.js", "react-js", "java"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVASCRIPT)).toBeTruthy();
    }
    for (const str of wrongStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.JAVASCRIPT)).toBeFalsy();
    }
  });
  it("should identify MATERIAL_UI cases", () => {
    const correctStrings = ["mui", "materialui", "material ui", "material-ui"];
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
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.REACT)).toBeTruthy();
    }
  });
  it("should identify REACT_NATIVE cases", () => {
    const correctStrings = ["react native", "react-native"];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.REACT_NATIVE)).toBeTruthy();
    }
  });
  it("should identify RESPONSIVE_DESIGN cases", () => {
    const correctStrings = ["site responsivo", "sites responsivos"];
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
      "testes de integracao", "testes de software", "testes de performance", "testes de depuracao"
    ];
    for (const str of correctStrings) {
      expect(stringContainsAny(str, SKILLS_REGEX.TEST)).toBeTruthy();
    }
  });
  it("should identify TYPESCRIPT cases", () => {
    const correctStrings = ["typescript", "type script", "type-script", "ts"];
    const wrongStrings = ["requirements"];
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