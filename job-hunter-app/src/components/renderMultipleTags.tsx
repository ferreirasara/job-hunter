import { Tag } from "antd"

export const renderMultipleTags = (field: string) => {
  return field?.split(',')?.map(cur => <Tag color={getTagColor(cur?.trim())} style={{ margin: 1 }}>{cur?.trim()}</Tag>)
}

const getTagColor = (tag: string) => {
  switch (tag) {
    case ("ANGULAR"): return "red";
    case ("AJAX"): return "orange";
    case ("API"): return "orange";
    case ("CODE_MAINTAINABILITY"): return "green";
    case ("CSHARP"): return "red";
    case ("CSS"): return "green";
    case ("DB"): return "orange";
    case ("DEV_OPS"): return "red";
    case ("DOT_NET"): return "red";
    case ("ECOMMERCE"): return "orange";
    case ("ENGLISH"): return "orange";
    case ("FIGMA"): return "green";
    case ("FLUTTER"): return "red";
    case ("CODE_VERSIONING"): return "green";
    case ("HTML"): return "green";
    case ("IONIC"): return "red";
    case ("JAVA"): return "red";
    case ("JAVASCRIPT"): return "green";
    case ("JQUERY"): return "red";
    case ("NEXT"): return "green";
    case ("NUXT"): return "orange";
    case ("NODE"): return "orange";
    case ("PHP"): return "red";
    case ("PYTHON"): return "orange";
    case ("PWA"): return "orange";
    case ("REACT"): return "green";
    case ("REACT_NATIVE"): return "red";
    case ("RESPONSIVE_DESIGN"): return "green";
    case ("RUBY"): return "red";
    case ("SASS"): return "green";
    case ("STATE_MANAGEMENT"): return "green";
    case ("STORYBOOK"): return "green";
    case ("STYLED_COMPONENTS"): return "green";
    case ("TAILWIND"): return "orange";
    case ("TEST"): return "green";
    case ("TYPESCRIPT"): return "green";
    case ("VANILLA"): return "red";
    case ("VUE"): return "orange";
    case ("WEB_HOOKS"): return "orange";
    case ("WORDPRESS"): return "red";

    case ("ANUAL_BONUS"): return "purple";
    case ("BIRTHDAY_DAYOFF"): return "geekblue";
    case ("CLT"): return "purple";
    case ("COURSE_HELP"): return "geekblue";
    case ("DENTAL_PLAN"): return "purple";
    case ("FLEXIBLE_HOURS"): return "purple";
    case ("GYMPASS"): return "purple";
    case ("HEALTH_PLAN"): return "purple";
    case ("HOME_OFFICE"): return "purple";
    case ("HOME_OFFICE_VOUCHER"): return "purple";
    case ("LIFE_INSURANCE"): return "blue";
    case ("MEAL_VOUCHER"): return "purple";
    case ("PAID_VACATIONS"): return "geekblue";
    case ("PJ"): return "blue";
    case ("PRIVATE_PENSION"): return "geekblue";
    case ("PSYCHOLOGICAL_HELP"): return "geekblue";
    case ("REFERRAL_BONUS"): return "blue";
    case ("STOCK_OPTIONS"): return "blue";
    case ("TRANSPORTATION_VOUCHER"): return "blue";
  }
}
