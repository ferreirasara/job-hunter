export const SKILLS_REGEX = {
  AGILE: [
    /agile/i, /scrum/i, /jira/i, /trello/i, /kanban/i, /pair programming/i, /praticas ageis/i,
    /clean architectures/i, /(metodo(logia(s)?)?(s)?|desenvolvimento|cultura|framework(s)?) ag(eis|il)/i
  ],
  AJAX: [/\bajax\b/i],
  ANGULAR: [/angular(( |-|.)?js)?/i],
  ANTD: [/ant( |-|.)?(d(esign)?)/i, /biblioteca(s)? de ui/i, /ui( |-|.)?kit/i],
  API: [
    /((\bapi(s)?\b )|\b)rest(ful|\b)(?!.)?( api(s)?)?/i, /\bapi(s)?\b/i, /soap/i,
    /graphql/, /\bexpress(( |-|.)?js)?\b/i, /fast( |-|.)?api/i
  ],
  APOLLO: [/apollo/i],
  ARTIFICIAL_INTELLIGENCE: [/inteligencia artificial/i, /artificial intelligence/i, /nlp/i, /watson/i],
  BACHELORS_DEGREE: [
    /bachelor's degree/i, /computer science/i, /bacharelado/i, /ciencia(s)? da computacao/i,
    /(gradua(do|cao)|superior)(\s|\s-\s)complet(a|o)/i, /(?<!nao ter )(ensino|formacao) (superior| na area de tecnologia)/i,
    /possuir formacao/i, /grau de cs/i
  ],
  BACKBONE: [/backbone/i],
  BASIC: [/real( |-|.)?basic/i, /\bbasic(?! programming)\b/i],
  BLAZOR: [/blazor/i],
  BOOTSTRAP: [/bootstrap/i, /biblioteca(s)? de ui/i],
  C: [/\bc\b/i],
  CERTIFICATIONS: [/\b(?!reembolso por )certificações\b/i, /certification(s)?/i, /certificacoes relevantes/i],
  CHARTS: [/recharts/, /bizcharts/],
  COBOL: [/cobol/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_REVIEW: [/code( |-|.)?review/i],
  CODE_VERSIONING: [
    /\bgit(( |-|.)?(hub|lab)?)?\b/i, /bitbucket/i, /\bsvn\b/i, /(controle|padrao) de vers(ionamento|ao)/i,
    /version control/i, /(versionamento|versionamiento) de codigo(s)?/i,
  ],
  CLEAN_CODE: [/clean code/i],
  CPLUSPLUS: [/c\+\+/i, /c(\s|-)?plus(\s|-)?plus/i],
  CSHARP: [/c#/i, /csharp/i, /\blinq\b/i],
  CSS: [/\b(s)?css(3)?\b/i, /flexbox/i, /\bless\b/i],
  DART: [/dart/i],
  DB: [
    /(banco|base)(s)? de dados/i, /mongo( )?db/i, /(ms-|microsoft )?sql( |-|.)?(server)?/i, /conteinerizacao/i,
    /postgre(s)?(ql)?/i, /my(\s|-)?sql/i, /firebase/i, /redis/i, /no( |-|.)?sql/i, /\bmssql\b/i, /dynamodb/i,
    /\borm\b/i, /oracle/i, /hibernate/i, /mariadb/i, /sqlite/i, /bases relacionais e nao relacionais/i, /sequelize/i,
  ],
  DELPHI: [/delphi/i],
  DESIGN: [/design de interfaces/i, /photoshop/i, /illustrator/i, /sketch/i],
  DESIGN_SYSTEM: [/design system/i],
  DEV_OPS: [
    /docker/i, /\baws\b/i, /kubern(e|a)t(e)?s/i, /terraform/i, /azure/i, /jenkins/i, /\bci(\/|-|\s|\\|\se\s)?cd\b/i,
    /container(s)?/i, /devops/i, /git( |-|.)?(hub)?(-| )(actions|flow)/i, /lambda(s)?/i, /\becs\b/i, /\bec2\b/i,
    /maven/i, /cloudwatch/i, /amazon documentdb/i, /\brds\b/i, /kibana/i, /graphana/i, /apache/i, /nginx/i, /\bgcp\b/i,
    /websphere/i, /\btfs\b/i, /fortify/i, /sonar/i, /fagarte/i, /google cloud/i, /circleci/i, /hospedagem em nuvem/i
  ],
  DJANGO: [/django/i],
  DOT_NET: [/asp(.\s|\s.)?net/i, /\b(\.)?net\b/i, /dot( |-|.)?net/i, /\basp\b/i],
  DRUPAL: [/drupal/i],
  ECOMMERCE: [/shop(i)?fy/i, /linx/i, /tray(corp)?/i, /vtex/i, /(oracle|sap) commerce/i, /magento/i],
  ELASTIC_SEARCH: [/elastic(\s)?search/i],
  ELECTRON: [/electron(?!ica)/i],
  ELIXIR: [/elixir/i],
  EMBER: [/\bember\b/i],
  ENGLISH: [/ingles/i, /english/i],
  FLASK: [/flask/i],
  FLUTTER: [/flutter/i],
  FRONTEND_BUILD_TOOLS: [/webpack/i, /babel/i, /\vite/i],
  FULL_STACK: [
    /full( |-|.)?stack/i, /(back|front)( |-|.)?(end)?( (e|ao|quanto o) |, )(back|front)( |-|.)?(end)?/i,
    /(back|front)( |-|.)?end & (front|back)( |-|.)?end/i
  ],
  GAME_ENGINE: [/unity/],
  GATSBY: [/gatsby/],
  GOOD_PRACTICES: [
    /clean(\s)?(code|architecture)/i, /\bdry\b/i, /mvc/i, /mvvm/i, /(boas|melhores) praticas( de desenvolvimento)?/i,
    /orientacao a objetos/i, /padroes de (desenvolvimento|design|projeto)/i, /domain driven design/i, /\bddd\b/i, /\buml\b/i,
    /codigo (limpo|seguro)/i, /design(er)? patterns/i, /\bsolid\b/i, /documentacao/i, /\boop\b/i, /\bpoo\b/i, /desing partners/i,
    /componentizacao/i, /qualidade de codigo/i
  ],
  GOLANG: [/go( |-|.)?lang/i, /\bgo\b/i],
  GRAPHQL: [/graph( |-|.)?ql/i],
  HTML: [/htm(l)?(5)?/i],
  INTEGRATIONS: [/integracoes (de|com) (servico|api)(s)? de terceiros/i],
  IONIC: [/ionic/i],
  JAVA: [
    /java(?!( |-|.)?script)/i, /java\d/i, /spring(( |-|.)?boot)?/i, /eclipse/i, /struts/i,
    /mockmvc/i, /groovy/i, /jasper/i
  ],
  JAVASCRIPT: [/java( |-|.)?script/i, /^(.|-)?js\b/i, /es(5|6|7)/i, /js(5|6|7)/i],
  JQUERY: [/jquery/i],
  KOTLIN: [/kotlin/i],
  LIGHTHOUSE: [/lighthouse/i],
  LINUX: [/linux/i],
  LOW_CODE: [/low( |-|.)?code/i, /no( |-|.)?code/i, /cronapp/i],
  LEAN: [/\blean\b/i],
  MACHINE_LEARNING: [/machine learning/i, /aprendizado de maquina/i],
  MAGENTO: [/magento/i],
  MARKETING: [/google analytics/i, /google tag manager/i, /inbound marketing/i],
  MATERIAL_UI: [/\bmui\b/i, /\bmaterial?( |-|.)?(ui|design)\b/i, /biblioteca(s)? de ui/i, /ui( |-|.)?kit/i],
  MENSAGERIA: [
    /mensageria/i, /(spring )?kafka/i, /rab(b)?it(t)?mq/i, /message brokers/i, /amazon sqs/i,
    /pub(\/|-|\s)?sub/i, /activemq/i
  ],
  MICRO_FRONTENDS: [/micro( |-|.)?front( |-|.)?end(s)?/i],
  MICRO_SERVICES: [/micro( |-|.)?servic(o|e)(s)?/i],
  MOBILE_DEVELOPMENT: [
    /(desenvolvimento|conhecimento em) (de (aplicativos|aplicacoes) )?(mobile|nativo)/i, /(mobile|programacao) (development|nativ(o|a))/i,
    /\bios\b/i, /android/i, /mobile and web/i, /jetpack/, /ml( |-|.)?kit/
  ],
  NEST: [/\bnest(( |-|.)?js)?/i],
  NEXT: [/\bnext(( |-|.)?js)?/i],
  NETWORK: [/\bcpe\b/i, /\bgpon\b/i, /wi( |-|.)?fi/i, /dhcp/i, /\bnat\b/i],
  NUXT: [/nuxt(( |-|.)?js)?/i],
  NODE: [/node(( |-|.)?js)?/i],
  OBJECTIVE_C: [/objective( |-|.)?c/i],
  ORM: [/typeorm/i, /prisma/i],
  PACKAGE_MANAGER: [/npm/i, /yarn/i],
  PENTEST: [/burp( suite)?/i, /checkmarx/i, /pentest/i],
  PERFORMANCE_OPTIMIZATION: [
    /code( |-|.)?splitting/i, /lazy( |-|.)?loading/i, /optimize applications/i, /baixa latencia/i, /\bseo\b/i,
    /(alta disponibilidade|otimizacao) (d)?e (desempenho|performance)/i, /solucoes (consistentes )?em performance/i,
    /(seguranca e )?performance (para|na|de) (web|front( |-|.)?end)/i, /performance e tempo de carregamento/,
  ],
  PERL: [/\bperl\b/],
  PHONEGAP: [/phonegap/i],
  PHP: [/php/i, /laravel/i, /symfony/i, /codeigniter/i, /slim/i, /twig/i, /zend/],
  POSTMAN: [/postman/i],
  POWER_BI: [/power( |-|.)?bi/i],
  PRISMA: [/prisma/i],
  PRODUCT_MANAGER: [/product manager/i],
  PROGRAMMING_LOGIC: [/logica de programacao/i, /programming logic/i],
  PROTOTYPING: [/figma/i, /adobe( |-|.)?xd/, /photo( |-|.)?shop/, /prototipo(s)?/],
  PYTHON: [/python/i, /phyton/i],
  PWA: [/pwa/i],
  RAZOR: [/razor/i],
  REACT: [/react(( |-|.)?js)?(?! native)(?! hooks)/i, /reacjs/i],
  REACT_HOOKS: [/react( |-|.)?hook(s)?(?! form)/i],
  REACT_NATIVE: [/react( |-|.)?native/i],
  REACT_ROUTER: [/react router/i],
  REASONML: [/reasonml/i],
  RESPONSIVE_DESIGN: [
    /(design|desenvolvimento) (respons|adaptat)ivo/i, /responsive design/i,
    /(site(s)?|aplicac(oes|ao)|pagina(s)?|layout(s)?|interface(s)?( de usuario)?|projeto(s)?|) (interativas e |web )?(responsiv|adaptativ)(o|a)(s?)/i,
    /responsividade/i, /mobile( |-|.)?(first|friendly)/i, /diferentes dimensoes de dispositivos/i,
    /altamente responsivas/i, /responsivas/i, /responsive/i
  ],
  RUBY: [/ruby((-| )on(-| )rails)?/i, /rails/i],
  RUST: [/rust/i],
  SALESFORCE: [/salesforce/i],
  SAP: [/\bsap\b/i, /hybris/i],
  SAS: [/\bsas\b/i],
  SASS: [/\bsass\b/i],
  SCALA: [/\bscala\b/i],
  SCRIPT: [/powershell/, /bash( script)?/, /automatizacao de processos/],
  SPANISH: [/espanhol/i, /spanish/i],
  STATE_MANAGEMENT: [
    /redux/i, /mobx/i, /ngrx/i, /rxjs/i, /state management/i, /use( |-|.)?context/i,
    /(bibliotecas de )?gerencia(mento|dor) de estado(s)?/i, /recoil/i, /zustand/i
  ],
  STORYBOOK: [/storybook/i, /documentacao de componentes/i],
  STRAPI: [/strapi/i],
  STYLED_COMPONENTS: [/styled( |-|.)?component(s)?/i],
  SWAGGER: [/swag(g)?e(r)?/i],
  SWIFT: [/swift/i],
  TAILWIND: [/tailwind( |-|.)?(css)?/i],
  TECH_LEAD: [
    /te(ch|am)(\s|-)lead/i, /(gerenciar|coordenar) (a )?equipe/i, /(gerenciamento|lideranca) de projetos/i,
    /lideranca de equipe(s)?/i
  ],
  TELECOMMUNICATIONS: [/vonage/, /voip/, /chime/],
  TEST: [
    /jest/i, /selenium/i, /junit/i, /cypress/i, /\btdd\b/i, /\be2e\b/i, /enzyme/i, /mocha/i, /code coverage/i,
    /teste(s)? func(t)?iona(is|l)/i, /teste(s)? (unitario|automatizado|integrado)(s)?/i,
    /(ferramenta(s)?|automa(tiza)?cao) de teste(s)?/i, /karma/i, /jasmine/i, /cucumber/i,
    /teste(s)? (d)?e (qualidade|unidade|integracao|software|performance|depuracao|interface(s)?|componente(s)?|aplicac(oes|ao))/i,
    /(react\s)?testing(-| )(library|practices)/i, /(unit|integration|end-to-end)( and integration)? test(ing)?/i,
    /testar (sistemas|apis e servicos)/i, /automated (unit( |-|.)?)?test(s)?/i, /testing (scenarios|coverage)/i
  ],
  TOMCAT: [/tomcat(\sserver)?/i],
  TOTVS: [/totvs/i, /advpl/i, /protheus/i],
  TYPESCRIPT: [/type( |-|.)?script/i, /\bts\b/i, /typeschipt/i, /typscript/i],
  UI: [/\bui\b/i, /uiux/i, /uxui/i, /user interface/i],
  UTILITY_LIBRARY: [/lodash/i],
  UX: [/\bux\b/i, /uiux/i, /uxui/i, /usabilidade/i, /user experience/i],
  VANILLA: [/((javascript|js) )?vanilla(( |-|.)?(js|javascript)|\b)/i],
  VITE: [/vite/i],
  VUE: [/\bvue(( |-|.)?js)?\b/i, /vuetify/i],
  WEB_HOOKS: [/web( )?hook(s)?/i],
  WEBRTC: [/webrtc/, /daily.co/],
  WINDOWS_FORMS: [/(windows|web)( |-|.)?forms/i],
  WORDPRESS: [/wo(r)?d( |-|.)?press/i, /elementor/i],
}

export const BENEFITS_REGEX = {
  ANUAL_BONUS: [/bonus (anual|per year)/i, /a(n)?nual bonus/i, /bonificacao anual/i],
  BIRTHDAY_DAYOFF: [/(day( |-|.)?off|(dia de )?folga)(( no| de| n(a|o) (semana|mes) do seu) aniversario)?/i],
  COURSE_HELP: [
    /curso de aperfeiçoamento profissional/i, /learning and development support/i, /programa de capacitacao/i,
    /alura/i, /(acesso|bolsa(s)?) (a|de) (cursos|estudos)/i, /aquisicao de livros e cursos/i, /desconto (em|com) (cursos|faculdade(s)?)/i,
    /(auxilio|incentivo|investimento|subsidio|subvencao) ((para|a|em) )?(educacao|certificac(ao|oes)|estudo(s)?|curso(s)?)/i,
    /reembolso (educacao|por certificac(ao|oes))/i, /desconto em universidades e cursos/i, /bolsa de estudo/i,
    /acesso a plataformas de ensino/i, /parcerias educacionais/i, /fg academy/i,
    /parceria com (instituicoes de ensino|universidades)/i, /programa(s)? de incentivo a aprendizado(s)?/
  ],
  CHRISTMAS_BASKET: [/cesta de natal/i],
  FLEXIBLE_HOURS: [
    /(horario(s)?|carga horaria|jornada) (de trabalho )?flexive(is|l)/i,
    /flexible (working\s)?(hours|schedule(s)?)/i, /flexibilidade de (horario|jornada)/i,
    /nosso horario e flexivel/i, /flexibilidade/i
  ],
  FOURTEENTH_SALARY: [/14. salario/i],
  GYMPASS: [/(gym|total)( |-|.)?pass/i, /(auxilio )?(academia|atividade fisica)/i],
  HEALTH_OR_DENTAL_PLAN: [
    /(plano(s)?|convenio|assistencia(s)?) ((medic(o|a)|de saude) e )?(odontologic(o|a)|medic(o|a)|odonto)/i,
    /dental/i, /(plano|auxilio|convenio|beneficio) (de )?(saude|odontologico)/i,
    /health (and dental )?(insurance|plan|care)/i,
    /(servico(s)? de )?telemedicina/i, /assist\. (medica|odontologica)/i
  ],
  HOME_OFFICE_VOUCHER: [
    /(auxilio|subsidio|ajuda de custo) (para\s)?(atuacao em\s)?(home( |-|.)?office|trabalho remoto|montagem do seu escritorio)/i,
    /remote work allowance/i, /voucher (home( |-|.)?office|para kit setup)/i, /equipamento/i, /hardware setup/i
  ],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MATERNITY_LEAVE: [/licenca maternidade/i, /(paid )?parental leave/i],
  MEAL_VOUCHER: [
    /(vale|ajuda de custo para|auxilio)( |-|.)?(alimentacao|refeicao)/i,
    /(caju|flash)/i, /\bv(\.)?a(\.)?\b/i, /\bv(\.)?r(\.)?\b/i, /(to use with|flex) food/i
  ],
  PAID_VACATIONS: [
    /ferias ((anuais|e feriados)\s)?remunerad(a|o)(s)?/i, /(descanso|recesso) (anual|remunerado)/i,
    /paid (annual leave|vacation)/i, /ferias e feriados/i, /ferias de \d+ dias/i,
    /feriados nacionais(e regionais)?/i, /vacation & holidays/i
  ],
  PET_HELP: [/(licenca|convenio) pet/i],
  PHARMACY_AGREEMENT: [/convenio farmacia/i],
  PLR: [/\bplr\b/i, /(lucros|participacao) (e|ou|nos|de) (resultados|lucros)/i, /\bppr\b/i],
  PRIVATE_PENSION: [/previdencia privada/i],
  PSYCHOLOGICAL_HELP: [
    /(atendimento|auxilio|apoio|(cuidado|desconto) com|suporte social e|orientacao|bem estar) (psicologic(o|a)|bem estar|psicoterapia|(a\s)?saude (mental|emocional))/i,
    /mental health/i, /sessoes de terapia/i, /psicoterapia online/i, /saude mental/i, /zenklub/i, /equilibrium/i,
    /psicologia viva/i, /moodar/i, /vittude/i
  ],
  REFERRAL_BONUS: [
    /(bonus|premiacao) (por\s)?indicacao/i, /program of indication/i, /indicacao premiada/i,
    /(premio|programa de) indicac(ao|oes)/i, /indique um colega e ganhe bonus/i
  ],
  STOCK_OPTIONS: [/stock option(s)?/i],
  THIRTEENTH_SALARY: [/13(.|º)? salario/i, /decimo terceiro/i],
  TRANSPORTATION_VOUCHER: [/(vale|auxilio)( |-|.)?(transporte|combustivel|estacionamento)/i, /\bv(\.)?t(\.)?\b/i],
  USD_SALARY: [/salary in usd/i, /pagamento em moeda estrangeira/i],
}

export const HIRING_REGIMES_REGEX = {
  CLT: [/\bclt\b/i],
  PJ: [/\bpj\b/i, /pessoa juridica/i, /prest\. de servico/i, /cooperado/i],
}

export const TYPES_REGEX = {
  REMOTE: [
    /(home|anywhere)( |-|.)?(office|work)/i, /remoto(?!: nao)/i, /trabalhar de casa/i, /remote/i, /remota/i,
    /100\% home/i, /teletrabalho/i, /trabalho digital/i
  ],
  HYBRID: [/hibrid(o|a)/i, /hybrid/i, /disponibilidade para mudanca/i],
  FACE_TO_FACE: [/presencial(mente)?/i, /remoto: nao/i, /residir em/i, /vale transporte/],
}

export const SENIORITY_REGEX = {
  JUNIOR: [/junior/i, /estagiario/i, /estagio(?! s)/i, /\bjn\b/i, /\bjr\b/i],
  MID_LEVEL: [/pleno(?! conhecimento)/i, /\bmid\b/i, /\bpl\b/i],
  SENIOR: [/senior(?!idade)/i, /\bsr\b/],
}

export const YEARS_OF_EXPERIENCE_REGEX = [
  /experiencia (profissional )?(minima )?de (\d+|\w+) (anos|meses)/i,
  /experiencia (com desenvolvimento )?(ha|de) pelo menos (\d+|\w+) (anos|meses)/i,
  /(temos ((aproximadamente )?)?!)(\d+|\w+) (anos|meses) de experiencia/i,
  /((no )?minimo|pelo menos|ao menos) (de )?(\d+|\w+) (anos|meses)/i,
  /(\d+|\w+)(\+| ou mais) ((anos|meses) )?(de )?(experiencia|trabalhando)/i,
  /(profissional com )?(\d+|\w+) (anos|meses) de experiencia/i,
  /(experiencia|atuacao) de (\d+|\w+) a (\d+|\w+) (anos|meses)/i,
  /conhecimento de (\d+|\w+) (anos|meses) ou mais/i,
  /(minimo|mais) de (\d+|\w+) (anos|meses)(?! de mercado)/i,
  /experiencia (acima|minima) de (\d+|\w+) (anos|meses)/i,
  /entre (\d+|\w+) e (\d+|\w+) anos/i,
  /experiencia (comprovada|de trabalho) de (\d+|\w+)(\+)? (anos|meses)/i,
  /(\d+|\w+) (anos|meses) (\+ )?(trabalhando)?/i,

  /(\d+|\w+)\+ years(’)? ((of|demonstrated) )?(software development )?(experience|professional|non\-internship professional|with)/i,
  /at least (\d+|\w+) years of experience/i,
  /more than (\d+|\w+) years/i,
  /minimum (of )?(\d+|\w+) years/i,
  /(\d+|\w+)\+ of background/i,
  /(\d+|\w+)-(\d+|\w+) years of experience/i,
]