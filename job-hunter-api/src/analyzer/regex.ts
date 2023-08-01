export const SKILLS_REGEX = {
  AGILE: [
    /agile/i, /scrum/i, /jira/i, /trello/i, /kanban/i, /pair programming/i,
    /clean architectures/i, /(metodo(logia(s)?)?|desenvolvimento|cultura) ag(eis|il)/i
  ],
  ANGULAR: [/\bangular((.|-| )?js)?\b/i],
  ANTD: [/ant( |-)?(d(esign)?)/i, /biblioteca(s)? de ui/i],
  AJAX: [/\bajax\b/i],
  API: [
    /((\bapi(s)?\b )|\b)rest(ful|\b)(?!.)?( api(s)?)?/i, /\bapi(s)?\b/i, /soap/i,
    /graphql/, /\bexpress((.|-| )?js)?\b/i, /fast(-|\s)?api/i
  ],
  APOLLO: [/apollo/i],
  BACHELORS_DEGREE: [
    /bachelor's degree/i, /computer science/i, /bacharelado/i, /ciencia(s)? da computacao/i,
    /(gradua(do|cao)|superior)(\s|\s-\s)complet(a|o)/i, /(ensino|formacao) (superior| na area de tecnologia)/i,
    /possuir formacao/i
  ],
  BACKBONE: [/backbone/i],
  BLAZOR: [/blazor/i],
  BOOTSTRAP: [/bootstrap/i, /biblioteca(s)? de ui/i],
  CERTIFICATIONS: [/\b(?!reembolso por )certificações\b/i, /certification(s)?/i],
  COBOL: [/cobol/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_VERSIONING: [
    /\bgit((-| )?(hub|lab)?)?\b/i, /bitbucket/i, /\bsvn\b/i, /(controle|padrao) de vers(ionamento|ao)/i,
    /version control/i, /versionamento de codigo(s)?/i
  ],
  C: [/\bc\b/i],
  CLEAN_CODE: [/clean code/i],
  CPLUSPLUS: [/c\+\+/i],
  CSHARP: [/c#/i, /csharp/i],
  CSS: [/\b(s)?css(3)?\b/i, /flexbox/i, /\bless\b/i],
  DART: [/dart/i],
  DB: [
    /(banco|base) de dados/i, /mongo( )?db/i, /\b(ms-|microsoft )?sql(-| )?(server)?\b/i,
    /postgres?(ql)?/i, /\bmy( )?sql\b/i, /firebase/i, /redis/i, /\bno( )?sql\b/i,
    /\borm\b/i, /oracle/i, /hibernate/i, /mariadb/i, /sqlite/i, /bases relacionais e nao relacionais/i
  ],
  DELPHI: [/delphi/i],
  DESIGN: [/design de interfaces/i, /photoshop/i, /illustrator/i, /sketch/i],
  DESIGN_SYSTEM: [/design system/i],
  DEV_OPS: [
    /docker/i, /\baws\b/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /\bci(\/|-|\s|\\|\se\s)?cd\b/i,
    /container(s)?/i, /devops/i, /git(-| )?(hub)?(-| )(actions|flow)/i, /lambda(s)?/i, /\becs\b/i, /\bec2\b/i,
    /maven/i, /cloudwatch/i, /amazon documentdb/i, /\brds\b/i, /\bkibana\b/i, /graphana/i, /apache/i, /nginx/i
  ],
  DJANGO: [/django/i],
  DOT_NET: [/asp(.\s|\s.)?net/i, /\b(\.)?net\b/i, /dot(-|\s)?net/i],
  DRUPAL: [/drupal/i],
  ECOMMERCE: [/shop(i)?fy/i, /\blinx\b/i, /\btray(corp)?\b/i, /\bvtex\b/i, /(oracle|sap) commerce/i, /magento/i],
  ELASTIC_SEARCH: [/elastic search/i],
  EMBER: [/ember/i],
  ENGLISH: [/ingles/i, /english/i],
  FIGMA: [/figma/i],
  FLASK: [/flask/i],
  FLUTTER: [/flutter/i],
  FRONTEND_BUILD_TOOLS: [/webpack/i, /babel/i, /\vite\b/i],
  FULL_STACK: [/full(-| )?stack/i, /(back|front)(-|\s)?(end)?( (e|ao|quanto o) |, )(back|front)(-|\s)?(end)?/i],
  GOOD_PRACTICES: [
    /clean (code|architecture)/i, /\bdry\b/i, /\bmvc\b/i, /\bmvvm\b/i, /(boas|melhores) praticas( de desenvolvimento)?/i,
    /orientacao a objetos/i, /padroes de (desenvolvimento|design|projeto)/i, /domain driven design/i, /\bddd\b/i,
    /codigo (limpo|seguro)/i, /design patterns/i, /solid\b/i, /documentacao/i
  ],
  GOLANG: [/golang/i],
  GRAPHQL: [/\bgraphql\b/i],
  HTML: [/html(5)?/i],
  INTEGRATIONS: [/integracoes (de|com) (servico|api)(s)? de terceiros/i],
  IONIC: [/ionic/i],
  JAVA: [/\bjava\b(?! script)/i, /spring boot/i, /eclipse/i],
  JAVASCRIPT: [/java( |-)?script/i, /^(.|-)?js\b/i, /\bes(6|7)\b/i, /\bjs(6|7)\b/i],
  JQUERY: [/jquery/i],
  KOTLIN: [/kotlin/i],
  LIGHTHOUSE: [/lighthouse/i],
  LINUX: [/linux/i],
  LOW_CODE: [/low(-|\s)code/i, /no(-|\s)code/i, /cronapp/i],
  MACHINE_LEARNING: [/machine learning/i],
  MATERIAL_UI: [/\bm(aterial)?(-| )?(ui|design)\b/i, /biblioteca(s)? de ui/i],
  MENSAGERIA: [/mensageria/i, /(spring )?kafka/i, /rabbitmq/i, /message brokers/i, /amazon sqs/i],
  MICRO_FRONTENDS: [/micro(-|\s|s)?front(-|\s)?end(s)?/i],
  MICRO_SERVICES: [/micro(-|\s|s)?servic(o|e)(s)?/i],
  MOBILE_DEVELOPMENT: [/(desenvolvimento|conhecimento em) mobile/i, /mobile (development|nativo)/i],
  NEST: [/\bnest((.|-| )?js)?\b/i],
  NEXT: [/\bnext((.|-| )?js)?\b/i],
  NUXT: [/\bnuxt((.|-| )?js)?\b/i],
  NODE: [/\bnode((.|-| )?js)?\b/i],
  OBJECTIVE_C: [/objective(-|\s)c/i],
  PACKAGE_MANAGER: [/\bnpm\b/i, /\byarn\b/i],
  PENTEST: [/burp( suite)?/i, /checkmarx/i, /pentest/i],
  PERFORMANCE_OPTIMIZATION: [
    /code(-|\s)splitting/i, /lazy(-|\s)loading/i, /optimize applications/i, /baixa latencia/i,
    /alta disponibilidade e desempenho/i, /solucoes (consistentes )?em performance/i
  ],
  PHONEGAP: [/phonegap/i],
  PHP: [/php/i, /laravel/i, /symfony/i, /codeigniter/i, /\bslim\b/i],
  POSTMAN: [/postman/i],
  POWER_BI: [/power(-|\s)?bi/i],
  PRISMA: [/prisma/i],
  PYTHON: [/python/i, /phyton/i],
  PWA: [/pwa/i],
  RAZOR: [/razor/i],
  REACT: [/\breact((.|-| )?js)?\b(?! native)(?! hooks)/i],
  REACT_HOOKS: [/react hook(s)?/i],
  REACT_NATIVE: [/react(-| )?native/i],
  REACT_ROUTER: [/react router/i],
  REASONML: [/reasonml/i],
  RESPONSIVE_DESIGN: [
    /(design|desenvolvimento) (respons|adaptat)ivo/i,
    /(site(s)?|aplicac(oes|ao)|pagina(s)?|layout(s)?|interface(s)?( de usuario)?|projeto(s)?) (interativas e )?(responsiv|adaptativ)(o|a)(s?)/i,
    /responsividade/i, /mobile(-|\s)(first|friendly)/i, /diferentes dimensoes de dispositivos/i,
    /altamente responsivas/i
  ],
  RUBY: [/\bruby((-| )on(-| )rails)?/i, /rails/i],
  RUST: [/\brust\b/i],
  SALESFORCE: [/salesforce/i],
  SAP: [/\bsap\b/i, /\bhybris\b/i],
  SASS: [/\bsass\b/i],
  SCALA: [/\bscala\b/i],
  SPANISH: [/espanhol/i, /spanish/i],
  STATE_MANAGEMENT: [
    /redux/i, /mobx/i, /ngrx/i, /rxjs/i, /state management/i,
    /(bibliotecas de )?gerencia(mento|dor) de estado(s)?/i, /recoil/i, /zustand/i
  ],
  STORYBOOK: [/storybook/i, /documentacao de componentes/i],
  STRAPI: [/\bstrapi\b/i],
  STYLED_COMPONENTS: [/styled(-| )?component(s)?/i],
  SWAGGER: [/swagger/i],
  SWIFT: [/\bswift\b/i],
  TAILWIND: [/\btailwind(-| )?(css)?\b/i],
  TECH_LEAD: [/tech(\s|-)lead/i, /(gerenciar|coordenar) a equipe/i, /gerenciamento de projetos/i],
  TEST: [
    /jest/i, /selenium/i, /junit/i, /cypress/i, /\btdd\b/i, /\be2e\b/i, /enzyme/i, /mocha/i, /code coverage/i,
    /teste(s)? func(t)?iona(is|l)/i, /teste(s)? (unitario|automatizado|integrado)(s)?/i, /ferramenta(s)? de teste/i,
    /teste(s)? (d)?e (unidade|integracao|software|performance|depuracao|interface(s)?)/i,
    /(react\s)?testing(-| )(library|practices)/i, /(unit|integration|end-to-end)( and integration)? test(ing)?/i,
    /testar (sistemas|apis e servicos)/i, /automated (unit(-|\s))??test(s)?/i, /testing (scenarios|coverage)/i
  ],
  TOMCAT: [/tomcat(\sserver)?/i],
  TOTVS: [/totvs/i],
  TYPESCRIPT: [/type( |-)?script/i, /\bts\b/i],
  UI: [/\bui\b/i, /uiux/i, /uxui/i],
  UX: [/\bux\b/i, /uiux/i, /uxui/i],
  VANILLA: [/((javascript|js) )?vanilla((.|-| )?(js|javascript)|\b)/i],
  VITE: [/vite/i],
  VUE: [/\bvue((.|-| )?js)?\b/i],
  WEB_HOOKS: [/web( )?hook(s)?/i],
  WINDOWS_FORMS: [/(windows|web)(-|\s)?forms/i],
  WORDPRESS: [/word(-|\s)?press/i],
}

export const BENEFITS_REGEX = {
  ANUAL_BONUS: [/bonus (anual|per year)/i, /a(n)?nual bonus/i, /bonificacao anual/i],
  BIRTHDAY_DAYOFF: [/(day(-|\s)?off|(dia de )?folga)(( no| de| n(a|o) (semana|mes) do seu) aniversario)?/i],
  COURSE_HELP: [
    /curso de aperfeiçoamento profissional/i, /learning and development support/i, /programa de capacitacao/i,
    /alura/i, /(acesso|bolsa(s)?) (a|de) (cursos|estudos)/i, /aquisicao de livros e cursos/i, /desconto em cursos/i,
    /(auxilio|incentivo|investimento|subsidio) ((para|a|em) )?(educacao|estudo(s)?|curso(s)?)/i,
    /reembolso (educacao|por certificac(ao|oes))/i, /desconto em universidades e cursos/i,
    /acesso a plataformas de ensino/i, /parcerias educacionais/i,
    /parceria com instituicoes de ensino/i
  ],
  CHRISTMAS_BASKET: [/cesta de natal/i],
  FLEXIBLE_HOURS: [
    /(horario(s)?|carga horaria|jornada) (de trabalho )?flexive(is|l)/i,
    /flexible (working\s)?(hours|schedule(s)?)/i, /flexibilidade de (horario|jornada)/i,
    /nosso horario e flexivel/i
  ],
  FOURTEENTH_SALARY: [/14. salario/i],
  GYMPASS: [/(gym|total)(-|\s)?pass/i, /(auxilio\s)?academia/i],
  HEALTH_OR_DENTAL_PLAN: [
    /(plano(s)?|convenio|assistencia(s)?) ((medic(o|a)|de saude) e )?(odontologic(o|a)|medic(o|a))/i,
    /dental/i, /(plano( de)?|convenio|beneficio) (de )?(saude|odontologico)/i, /health (and dental )?(insurance|plan|care)/i,
    /(servico(s)? de )?telemedicina/i
  ],
  HOME_OFFICE_VOUCHER: [
    /(auxilio|subsidio|ajuda de custo) (para\s)?(atuacao em\s)?(home(-|\s)?office|trabalho remoto|montagem do seu escritorio)/i,
    /remote work allowance/i, /voucher (home(-|\s)office|para kit setup)/i, /equipamento/i,
  ],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MEAL_VOUCHER: [
    /(vale|ajuda de custo para|auxilio)(-|\s)(alimentacao|refeicao)/i,
    /(caju|flash)/i, /\bv(\.)?a(\.)?\b/i, /\bv(\.)?r(\.)?\b/i, /(to use with|flex) food/i
  ],
  PAID_VACATIONS: [
    /ferias ((anuais|e feriados)\s)?remunerad(a|o)(s)?/i, /(descanso|recesso) (anual|remunerado)/i,
    /paid (annual leave|vacation)/i, /ferias e feriados/i, /ferias de \d+ dias/i,
    /feriados nacionais(e regionais)?/i,
  ],
  PLR: [/\bplr\b/i, /(lucros|participaxao) (e|ou|nos) resultados/i, /\bppr\b/i],
  PRIVATE_PENSION: [/previdencia privada/i],
  PSYCHOLOGICAL_HELP: [
    /(atendimento|auxilio|apoio|(cuidado|desconto) com|suporte social e|orientacao|bem estar) (psicologic(o|a)|bem estar|psicoterapia|(a\s)?saude (mental|emocional))/i,
    /mental health/i, /sessoes de terapia/i, /psicoterapia online/i, /saude mental/i, /zenklub/i, /equilibrium/i,
    /psicologia viva/i, /moodar/i
  ],
  REFERRAL_BONUS: [
    /(bonus|premiacao) (por\s)?indicacao/i, /program of indication/i, /indicacao premiada/i,
    /(premio|programa de) indicac(ao|oes)/i, /indique um colega e ganhe bonus/i
  ],
  STOCK_OPTIONS: [/stock option(s)?/i],
  THIRTEENTH_SALARY: [/13. salario/i],
  TRANSPORTATION_VOUCHER: [/(vale|auxilio)(-|\s)(transporte|combustivel|estacionamento)/i, /\bv(\.)?t(\.)?\b/i],
  USD_SALARY: [/salary in usd/i, /pagamento em moeda estrangeira/i],
}

export const HIRING_REGIMES_REGEX = {
  CLT: [/\bclt\b/i],
  PJ: [/\bpj\b/i, /pessoa juridica/i, /prest\. de servico/i, /cooperado/i],
}

export const TYPES_REGEX = {
  REMOTE: [
    /(home|anywhere)(-| )?(office|work)/i, /\bremoto(?!: nao)\b/i, /trabalhar de casa/i, /\bremote\b/i, /\bremota\b/i,
    /100\% home/i, /teletrabalho/i
  ],
  HYBRID: [/hibrido/i, /hybrid/i, /disponibilidade para mudanca/i],
  FACE_TO_FACE: [/presencial(mente)?/i],
}

export const SENIORITY_REGEX = {
  JUNIOR: [/junior/i, /estagiario/i, /estagio/i, /\bjn\b/i],
  MID_LEVEL: [/pleno(?! conhecimento)/i, /\bmid\b/i, /\bpl\b/i],
  SENIOR: [/senior/i, /\bsr\b/],
}

export const YEARS_OF_EXPERIENCE_REGEX = [
  /experiencia (profissional )?(minima )?de \d+ anos/i, /at least \d+ years of experience/i,
  /experiencia (com desenvolvimento )?(ha|de) pelo menos \d+ anos/i,
  /(temos ((aproximadamente )?)?!)\d+ anos de experiencia/i, /(no minimo|pelo menos) \d+ anos/i,
  /\d+\+ years(’)? of experience/i, /\d+\+ de experiencia/i
]