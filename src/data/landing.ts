export interface Stage {
  id: number
  short: string
  title: string
  description: string
  instruction?: string
  examples?: string[]
  /** custom visual block key handled inside StageCard */
  visual:
    | 'industry'
    | 'data-service'
    | 'investments'
    | 'production'
    | 'non-production'
    | 'sales'
    | 'staff'
    | 'financing'
    | 'results'
}

export const stages: Stage[] = [
  {
    id: 1,
    short: 'Название проекта и отрасль',
    title: 'Название проекта и отрасль',
    description: 'Создайте проект и выберите отрасль из справочника.',
    instruction: 'Отрасль задаёт преднастроенные параметры и структуру расчёта.',
    visual: 'industry',
  },
  {
    id: 2,
    short: 'Сбор исходных данных',
    title: 'Сбор исходных данных',
    description:
      'Соберите параметры проекта в единую структуру для корректного финансового моделирования.',
    instruction: 'Воспользуйтесь online сервисом сбора данных.',
    visual: 'data-service',
  },
  {
    id: 3,
    short: 'Инвестиции',
    title: 'Инвестиции',
    description: 'Планирование CAPEX, структуры вложений и графика финансирования.',
    examples: ['Оборудование', 'ERP', 'Недвижимость', 'Транспорт', 'Лицензии'],
    visual: 'investments',
  },
  {
    id: 4,
    short: 'Производственные затраты',
    title: 'Производственные затраты',
    description: 'Расчёт прямых и косвенных производственных затрат.',
    visual: 'production',
  },
  {
    id: 5,
    short: 'Непроизводственные затраты',
    title: 'Непроизводственные затраты',
    description: 'Административные и операционные расходы проекта.',
    examples: ['Маркетинг', 'IT', 'Аренда', 'Outsource', 'Банковские расходы'],
    visual: 'non-production',
  },
  {
    id: 6,
    short: 'Планирование продаж',
    title: 'Планирование продаж',
    description:
      'Моделирование роста продаж, выхода на номинальные объёмы и окупаемости.',
    visual: 'sales',
  },
  {
    id: 7,
    short: 'Персонал',
    title: 'Персонал',
    description: 'Планирование структуры персонала и фонда оплаты труда.',
    visual: 'staff',
  },
  {
    id: 8,
    short: 'Финансирование',
    title: 'Финансирование',
    description: 'Определение структуры финансирования проекта.',
    visual: 'financing',
  },
  {
    id: 9,
    short: 'Итоговые показатели',
    title: 'Итоговые показатели',
    description:
      'Автоматический расчёт отчётов и инвестиционных показателей по всем введённым данным.',
    visual: 'results',
  },
]

export interface KpiWidget {
  label: string
  value: string
  delta?: string
  positive?: boolean
}

export const heroKpis: KpiWidget[] = [
  { label: 'IRR', value: '34,8%', delta: '+4,2 п.п.', positive: true },
  { label: 'NPV', value: '128,4 млн ₽', delta: '+12,6%', positive: true },
  { label: 'Окупаемость', value: '2,4 года' },
]

export const reports = [
  { code: 'CF', name: 'Cash Flow', desc: 'Движение денежных средств' },
  { code: 'PL', name: 'Profit & Loss', desc: 'Отчёт о прибылях и убытках' },
  { code: 'BS', name: 'Balance', desc: 'Балансовый отчёт' },
]

export interface Kpi {
  code: string
  name: string
  hint: string
}

export const investmentKpis: Kpi[] = [
  { code: 'IRR', name: 'Внутренняя норма доходности', hint: 'Internal Rate of Return' },
  { code: 'NPV', name: 'Чистая приведённая стоимость', hint: 'Net Present Value' },
  { code: 'PI', name: 'Индекс прибыльности', hint: 'Profitability Index' },
  { code: 'PP', name: 'Срок окупаемости', hint: 'Payback Period' },
  { code: 'DPP', name: 'Дисконт. окупаемость', hint: 'Discounted Payback' },
  { code: 'ARR', name: 'Учётная норма прибыли', hint: 'Accounting Rate of Return' },
  { code: 'WACC', name: 'Средневзв. стоимость капитала', hint: 'Weighted Avg Cost of Capital' },
]

export interface Tool {
  icon: string
  title: string
  description: string
}

export const tools: Tool[] = [
  {
    icon: 'Calculator',
    title: 'Себестоимость',
    description:
      'Калькуляция себестоимости по статьям с автоматическим распределением затрат.',
  },
  {
    icon: 'LineChart',
    title: 'Планирование продаж',
    description: 'Сценарии роста, сезонность и выход на номинальные объёмы продаж.',
  },
  {
    icon: 'Network',
    title: 'Организационный план',
    description: 'Структура персонала, штатное расписание и фонд оплаты труда.',
  },
]

export interface Service {
  title: string
  price: string
  description: string
  popular?: boolean
}

export const services: Service[] = [
  {
    title: 'Помощь в сборе исходных данных',
    price: '11 000 ₽',
    description:
      'Помогаем структурировать исходные параметры проекта и подготовить данные для корректного моделирования.',
  },
  {
    title: 'Создание финансовой модели с описанием',
    price: '49 000 ₽',
    description:
      'Разрабатываем готовую финансовую модель проекта с описанием логики расчётов и инвестиционной аналитикой.',
    popular: true,
  },
  {
    title: 'Анализ полученных расчётов',
    price: '12 000 ₽',
    description:
      'Проводим экспертный анализ финансовых результатов и инвестиционных показателей проекта.',
  },
]
