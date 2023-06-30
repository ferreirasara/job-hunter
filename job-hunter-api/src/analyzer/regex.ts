export const SKILLS_REGEX = {
  AGILE: [/agile/i, /scrum/i, /jira/i, /trello/i, /kanban/i, /pair programming/i, /clean architectures/i, /(metodo(logia(s)?)?|desenvolvimento|cultura) ag(eis|il)/i],
  ANGULAR: [/\bangular((.|-| )?js)?\b/i],
  ANTD: [/ant( |-)?(d(esign)?)/i, /biblioteca(s)? de ui/i],
  AJAX: [/\bajax\b/i],
  API: [/((\bapi(s)?\b )|\b)rest(ful|\b)(?!.)?( api(s)?)?/i, /\bapi(s)?\b/i, /soap/i, /graphql/, /\bexpress((.|-| )?js)?\b/i],
  APOLLO: [/apollo/i],
  BACHELORS_DEGREE: [/bachelor's degree/i, /computer science/i, /bacharelado/i, /ciencia(s)? da computacao/i, /(gradua(do|cao)|superior) complet(a|o)/i, /(ensino|formacao) superior/i, /possuir formacao/i],
  BOOTSTRAP: [/bootstrap/i, /biblioteca(s)? de ui/i],
  COBOL: [/cobol/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_VERSIONING: [/\bgit((-| )?(hub|lab)?)?\b/i, /bitbucket/i, /\bsvn\b/i, /controle de vers(ionamento|ao)/i, /version control/i],
  C: [/\bc\b/i],
  CLEAN_CODE: [/clean code/i],
  CPLUSPLUS: [/c\+\+/i],
  CSHARP: [/c#/i],
  CSS: [/\b(s)?css(3)?\b/i],
  DART: [/dart/i],
  DB: [/banco de dados/i, /mongo( )?db/i, /\b(ms-|microsoft )?sql(-| )?(server)?\b/i, /postgre(s)?/i, /my( )?sql/i, /firebase/i, /redis/i, /no( )?sql/i, /\borm\b/i, /oracle/i, /hibernate/i, /mariadb/i],
  DELPHI: [/delphi/i],
  DESIGN_PATTERNS: [/design patterns/i],
  DESIGN_SYSTEM: [/design system/i],
  DEV_OPS: [
    /docker/i, /\baws\b/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /ci(\/|-|\s|\\|\se\s)?cd/i,
    /container(s)?/i, /devops/i, /git(-| )?(hub)?(-| )(actions|flow)/i, /lambda(s)?/i, /\becs\b/i, /maven/i
  ],
  DJANGO: [/django/i],
  DOT_NET: [/\.net/i],
  DRUPAL: [/drupal/i],
  ECOMMERCE: [/shop(i)?fy/i, /\blinx\b/i, /\btray(corp)?\b/i, /\bvtex\b/i, /(oracle|sap) commerce/i, /magento/i],
  ENGLISH: [/ingles/i, /english/i],
  FIGMA: [/figma/i],
  FLUTTER: [/flutter/i],
  FRONTEND_BUILD_TOOLS: [/webpack/i, /babel/i, /\bnpm\b/i, /\byarn\b/i],
  FULL_STACK: [/full(-| )?stack/i, /back(-|\s)?end e fron(-|\s)?tend/i],
  GOLANG: [/golang/i],
  GRAPHQL: [/\bgraphql\b/i],
  HTML: [/html(5)?/i],
  IONIC: [/ionic/i],
  JAVA: [/\bjava\b(?! script)/i, /spring boot/i],
  JAVASCRIPT: [/java( |-)?script/i, /^(.|-)?js\b/i, /\bes(6|7)\b/i, /\bjs(6|7)\b/i],
  JQUERY: [/jquery/i],
  KOTLIN: [/kotlin/i],
  LIGHTHOUSE: [/lighthouse/i],
  LINUX: [/linux/i],
  MACHINE_LEARNING: [/machine learning/i],
  MATERIAL_UI: [/\bm(aterial)?(-| )?(ui|design)\b/i, /biblioteca(s)? de ui/i],
  MENSAGERIA: [/mensageria/i, /(spring )?kafka/i, /rabbitmq/i, /message brokers/i, /amazon sqs/i],
  NEST: [/\bnest((.|-| )?js)?\b/i],
  NEXT: [/\bnext((.|-| )?js)?\b/i],
  NUXT: [/\bnuxt((.|-| )?js)?\b/i],
  NODE: [/\bnode((.|-| )?js)?\b/i],
  OBJECTIVE_C: [/objective(-|\s)c/i],
  PHP: [/php/i, /laravel/i, /symfony/i],
  POWER_BI: [/power( )?bi/i],
  PYTHON: [/python/i, /phyton/i],
  PWA: [/pwa/i],
  REACT: [/\breact((.|-| )?js)?\b(?! native)(?! hooks)/i],
  REACT_HOOKS: [/react hook(s)?/i],
  REACT_NATIVE: [/react(-| )?native/i],
  REACT_ROUTER: [/react router/i],
  RESPONSIVE_DESIGN: [/(design|desenvolvimento) responsivo/i, /(site(s)?|aplicacoes) responsiv(o|a)(s?)/i, /responsividade/i, /mobile(-|\s)first/i],
  RUBY: [/\bruby((-| )on(-| )rails)?/i, /rails/i],
  RUST: [/\brust\b/i],
  SASS: [/\bsass\b/i],
  SALESFORCE: [/salesforce/i],
  SCALA: [/\bscala\b/i],
  STATE_MANAGEMENT: [/redux/i, /mobx/i, /ngrx/i, /rxjs/i, /state management/i, /(bibliotecas de )?gerencia(mento|dor) de estado(s)?/i, /recoil/i, /zustand/i],
  STORYBOOK: [/storybook/i, /documentacao de componentes/i],
  STYLED_COMPONENTS: [/styled(-| )?component(s)?/i],
  SWIFT: [/\bswift\b/i],
  TAILWIND: [/\btailwind(-| )?(css)?\b/i],
  TECH_LEAD: [/tech(\s|-)lead/i, /(gerenciar|coordenar) a equipe/i, /gerenciamento de projetos/i],
  TEST: [
    /jest/i, /selenium/i, /junit/i, /cypress/i, /\btdd\b/i, /\be2e\b/i, /enzyme/i, /mocha/i, /code coverage/i,
    /teste(s)? func(t)?iona(is|l)/i, /teste(s)? (unitario|automatizado)(s)?/i,
    /teste(s)? (d)?e (unidade|integracao|software|performance|depuracao)/i, /(react\s)?testing(-| )(library|practices)/i,
    /(unit|integration)( and integration)? testing/i, /testar (sistemas|apis e servicos)/i, /automated test(s)?/i
  ],
  TOMCAT: [/tomcat(\sserver)?/i],
  TYPESCRIPT: [/type( |-)?script/i, /\bts\b/i],
  VANILLA: [/((javascript|js) )?vanilla(.|-| )?(js|javascript)?/i],
  VUE: [/\bvue((.|-| )?js)?\b/i],
  WEB_HOOKS: [/web( )?hook(s)?/i],
  WORDPRESS: [/wordpress/i],
}

export const BENEFITS_REGEX = {
  ANUAL_BONUS: [/bonus (anual|per year)/i, /a(n)?nual bonus/i, /bonificacao anual/i],
  BIRTHDAY_DAYOFF: [/(day(-|\s)?off|(dia de )?folga)(( no| de| n(a|o) (semana|mes) do seu) aniversario)?/i],
  COURSE_HELP: [
    /curso de aperfeiçoamento profissional/i, /learning and development support/i, /programa de capacitacao/i,
    /alura/i, /(acesso|bolsa(s)?) (a|de) (cursos|estudos)/i, /aquisicao de livros e cursos/i, /desconto em cursos/i,
    /(auxilio|incentivo|investimento|subsidio) ((para|a|em) )?(educacao|estudo(s)?|curso(s)?)/i,
    /desconto em universidades e cursos/i, /acesso a plataformas de ensino/i, /parcerias educacionais/i
  ],
  FLEXIBLE_HOURS: [/(horario(s)?|carga horaria) (de trabalho )?flexive(is|l)/i, /flexible (working\s)?(hours|schedule(s)?)/i, /flexibilidade de (horario|jornada)/i],
  GYMPASS: [/gym(-|\s)?pass/i, /(auxilio\s)?academia/i, /totalpass/i],
  HEALTH_OR_DENTAL_PLAN: [
    /(plano|convenio|assistencia(s)?) ((medic(o|a)|de saude) e )?(odontologic(o|a)|medic(o|a))/i,
    /dental/i, /(plano( de)?|convenio) (saude|odontologico)/i, /health (and dental )?(insurance|plan|care)/i,
    /servico(s)? de telemedicina/i
  ],
  HOME_OFFICE_VOUCHER: [
    /(auxilio|subsidio|ajuda de custo) (para\s)?(atuacao em\s)?(home(-|\s)?office|trabalho remoto|montagem do seu escritorio)/i,
    /remote work allowance/i, /voucher home office/i, /equipamento/i
  ],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MEAL_VOUCHER: [/(vale|ajuda de custo para|auxilio)(-|\s)(alimentacao|refeicao)/i, /(caju|flash)/i, /\bv(\.)?a(\.)?\b/i, /\bv(\.)?r(\.)?\b/i, /(to use with|flex) food/i],
  PAID_VACATIONS: [
    /ferias ((anuais|e feriados)\s)?remunerad(a|o)(s)?/i, /descanso (anual|remunerado)/i,
    /paid (annual leave|vacation)/i, /ferias e feriados/i, /ferias de \d+ dias/i,
    /feriados nacionais(e regionais)?/i,
  ],
  PRIVATE_PENSION: [/previdencia privada/i],
  PSYCHOLOGICAL_HELP: [
    /(atendimento|auxilio|apoio|cuidado com|suporte social e) (psicologico|bem estar|(a\s)?saude (mental|emocional))/i,
    /mental health/i, /sessoes de terapia/i
  ],
  REFERRAL_BONUS: [
    /bonus (por\s)?indicacao/i, /program of indication/i, /indicacao premiada/i, /(premio|programa de) indicac(ao|oes)/i,
    /indique um colega e ganhe bonus/i
  ],
  STOCK_OPTIONS: [/stock option(s)?/i],
  TRANSPORTATION_VOUCHER: [/(vale|auxilio)(-|\s)transporte/i, /\bv(\.)?t(\.)?\b/i],
  USD_SALARY: [/salary in usd/i, /pagamento em moeda estrangeira/i],
}

export const HIRING_REGIMES_REGEX = {
  CLT: [/\bclt\b/i],
  PJ: [/\bpj\b/i, /pessoa juridica/i, /prest\. de servico/i],
}

export const TYPES_REGEX = {
  REMOTE: [
    /home(-| )?(office|work)/i, /\bremoto\b/i, /trabalhar de casa/i, /\bremote\b/i, /\bremota\b/i,
    /100\% home/i
  ],
  HYBRID: [/hibrido/i, /hybrid/i],
  FACE_TO_FACE: [/presencial/i],
}