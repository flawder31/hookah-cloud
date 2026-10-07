import { useMemo, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

type Item = { name: string; detail?: string; price: string; featured?: boolean }
type Group = { title: string; items: Item[] }

const groups: Record<string, Group[]> = {
  popular: [
    {
      title: 'Выбор гостей',
      items: [
        { name: 'Медальоны из говядины', detail: '350 г · с брусничным соусом', price: '900 ₽', featured: true },
        { name: 'Шеф-бургер', detail: '350/100/30 г', price: '900 ₽', featured: true },
        { name: 'Цезарь с креветкой', detail: '200 г', price: '600 ₽', featured: true },
        { name: 'Креветки в персиковом соусе', detail: '180/50 г', price: '650 ₽', featured: true },
        { name: 'Грозовое облако', detail: 'фирменный лимонад · 1 л', price: '450 ₽', featured: true },
        { name: 'Манго-маракуйя', detail: 'авторский чай', price: '550 ₽', featured: true },
      ],
    },
  ],
  kitchen: [
    {
      title: 'Облако свежести',
      items: [
        { name: 'Цезарь с курицей', detail: '200 г', price: '550 ₽' },
        { name: 'Цезарь с креветкой', detail: '200 г', price: '600 ₽' },
        { name: 'Цезарь с лососем', detail: '200 г', price: '600 ₽' },
        { name: 'Тёплый салат с говядиной', detail: '250 г', price: '700 ₽' },
        { name: 'Хрустящий баклажан', detail: '250 г', price: '550 ₽' },
      ],
    },
    {
      title: 'Горячая коллекция',
      items: [
        { name: 'Медальоны из говядины', detail: '350 г · брусничный соус', price: '900 ₽' },
        { name: 'Куриная грудка', detail: '350 г · апельсиновый соус и рис', price: '650 ₽' },
        { name: 'Стир-фрай из свинины', detail: '300 г · с овощами', price: '600 ₽' },
        { name: 'Карбонара', detail: '200 г', price: '550 ₽' },
        { name: 'Костный мозг', detail: '300/100/30 г', price: '1 000 ₽' },
      ],
    },
    {
      title: 'Закуски',
      items: [
        { name: 'Тар-тар из говядины', detail: '150/30/40 г', price: '600 ₽' },
        { name: 'Тар-тар из лосося', detail: '150/40 г', price: '600 ₽' },
        { name: 'Куриные стрипсы', detail: '150 г', price: '300 ₽' },
        { name: 'Картофель фри', detail: '100 г', price: '250 ₽' },
        { name: 'Креветки в персиковом соусе', detail: '180/50 г', price: '650 ₽' },
        { name: 'Сырные палочки', detail: '150/30 г · сладкий чили', price: '600 ₽' },
        { name: 'Пивная тарелка', detail: '500/30/30 г', price: '1 000 ₽' },
        { name: 'Шеф-бургер', detail: '350/100/30 г', price: '900 ₽' },
      ],
    },
    {
      title: 'На компанию',
      items: [
        { name: 'Сырная тарелка к вину', detail: '350 г', price: '1 100 ₽' },
        { name: 'Мясное ассорти', detail: '260 г', price: '1 000 ₽' },
        { name: 'Вителло-тоннато', detail: '230 г', price: '700 ₽' },
        { name: 'Сет брускетт', detail: '480 г', price: '900 ₽' },
        { name: 'Пивная тарелка', detail: '500/30/30 г', price: '1 000 ₽' },
      ],
    },
    {
      title: 'Брускетты и гриль',
      items: [
        { name: 'Брускетта с лососем', detail: '170 г · луковый песто', price: '550 ₽' },
        { name: 'Брускетта с креветкой', detail: '150 г · сливочный соус', price: '500 ₽' },
        { name: 'Брускетта с ростбифом', detail: '160 г · вителло-тоннато', price: '500 ₽' },
        { name: 'Свиные рёбра', detail: 'за 100 г · выход от 300 г', price: '440 ₽' },
        { name: 'Куриные чупа-чупсы', detail: 'за 100 г · выход от 300 г', price: '340 ₽' },
      ],
    },
    {
      title: 'Десерты',
      items: [
        { name: 'Чизкейк классический', detail: '150 г · соус на выбор', price: '300 ₽' },
        { name: 'Медовик', detail: '120 г', price: '350 ₽' },
        { name: 'Прага', detail: '120 г', price: '350 ₽' },
        { name: 'Мороженое', detail: '1 шарик · вкус на выбор', price: '100 ₽' },
      ],
    },
    {
      title: 'Дополнения',
      items: [
        { name: 'Орешки ассорти', detail: '100 г', price: '400 ₽' },
        { name: 'Фисташки', detail: '100 г', price: '400 ₽' },
        { name: 'Арахис', detail: '100 г', price: '200 ₽' },
        { name: 'Оливки', detail: '100 г', price: '200 ₽' },
        { name: 'Мясные чипсы', detail: '100 г', price: '700 ₽' },
        { name: 'Хлебная корзина с маслом', price: '250 ₽' },
        { name: 'Соус на выбор', detail: '50 г', price: '50 ₽' },
      ],
    },
  ],
  bar: [
    {
      title: 'Фирменные лимонады',
      items: ['Грозовое облако', 'Клубничный апельсин', 'Мохито', 'Клубничный мохито', 'Ягодный бум'].map(name => ({
        name,
        detail: '1 л',
        price: '450 ₽',
      })),
    },
    {
      title: 'Авторский чай',
      items: ['Манго-маракуйя', 'Клюква-можжевельник', 'Вишня', 'Облепиха', 'Смородина', 'Травяной'].map(name => ({
        name,
        price: '550 ₽',
      })),
    },
    {
      title: 'Классика и Китай',
      items: [
        { name: 'Чай чёрный / зелёный', price: '400 ₽' },
        { name: 'Чай чёрный с малиной', price: '400 ₽' },
        { name: 'Да Хун Пао', price: '450 ₽' },
        { name: 'Шу Пуэр', price: '450 ₽' },
        { name: 'Молочный Улун', price: '450 ₽' },
      ],
    },
    {
      title: 'Кофе и молочные коктейли',
      items: [
        { name: 'Эспрессо', price: '150 ₽' },
        { name: 'Американо', price: '150 ₽' },
        { name: 'Капучино', price: '200 ₽' },
        { name: 'Латте', price: '250 ₽' },
        { name: 'Молочный коктейль', detail: '0,33 л · вкус на выбор', price: '300 ₽' },
      ],
    },
    {
      title: 'Безалкогольные напитки',
      items: [
        { name: 'Добрый Cola', detail: '0,5 л · классика или без сахара', price: '250 ₽' },
        { name: 'Добрый Лимон-Лайм', detail: '0,5 л', price: '250 ₽' },
        { name: 'Серноводская', detail: '0,5 л · газ / негаз', price: '200 ₽' },
        { name: 'Rich Тоник', detail: '1 л', price: '350 ₽' },
        { name: 'Сок в ассортименте', detail: '0,5 / 1 л', price: '180 / 360 ₽' },
      ],
    },
  ],
  cocktails: [
    {
      title: 'Облачные приключения',
      items: [
        ['Sweet Kiss', '0,2 л', '500 ₽'], ['Тропик', '0,3 л', '550 ₽'], ['Дайкири клубничный', '0,2 л', '450 ₽'],
        ['Джин-тоник', '0,2 л', '450 ₽'], ['Ежевичный ром', '0,2 л', '500 ₽'], ['MILF', '0,2 л', '500 ₽'],
        ['Лонг-Айленд', '0,3 л', '550 ₽'], ['Мохито', '0,3 л', '500 ₽'], ['Пина Колада', '0,3 л', '500 ₽'],
        ['Ведьмин коктейль', '0,3 л', '550 ₽'], ['Голубая лагуна', '0,3 л', '500 ₽'], ['Виски-кола', '0,2 л', '450 ₽'],
        ['Текила Санрайз', '0,25 л', '500 ₽'],
      ].map(([name, detail, price]) => ({ name, detail, price })),
    },
    {
      title: 'Шоты и сеты',
      items: [
        { name: 'Шот средней крепости', price: '200 ₽' },
        { name: 'Шот высокой крепости', price: '300 ₽' },
        { name: 'Сет «Мерлин»', detail: 'лёгкий', price: '900 ₽' },
        { name: 'Сет «Геракл»', detail: 'средний', price: '1 000 ₽' },
        { name: 'Сет «Бойцовский»', detail: 'крепкий', price: '1 400 ₽' },
        { name: 'Сет «В облаках»', price: '3 100 ₽' },
      ],
    },
    {
      title: 'Вино и крепкое',
      items: [
        { name: 'Mondoro Asti', detail: '0,75 л · игристое сладкое белое', price: '4 100 ₽' },
        { name: 'Martini Prosecco', detail: '0,75 л · игристое сухое белое', price: '3 100 ₽' },
        { name: 'Matsu El Picaro', detail: '0,75 л · сухое красное', price: '3 800 ₽' },
        { name: 'Bialoni Алазани', detail: '0,75 л · полусладкое белое', price: '1 100 ₽' },
        { name: 'Bialoni Киндзмараули', detail: '0,75 л · полусладкое красное', price: '1 600 ₽' },
        { name: 'Pinot Grigio', detail: '0,75 л · сухое белое', price: '2 700 ₽' },
        { name: 'Jack Daniel’s', detail: '0,75 л', price: '4 600 ₽' },
        { name: 'William Lawson’s', detail: '0,5 л', price: '2 000 ₽' },
        { name: 'Macallan Double Cask 12', detail: '0,7 л', price: '21 000 ₽' },
        { name: 'Хаски', detail: '0,5 л', price: '1 100 ₽' },
        { name: 'Finlandia', detail: '0,7 л', price: '2 600 ₽' },
        { name: 'Старейшина 5 лет', detail: '0,5 л', price: '2 000 ₽' },
      ],
    },
    {
      title: 'Пиво и энергетики',
      items: [
        { name: 'Burn', detail: '0,45 л', price: '250 ₽' },
        ...['Bud', 'Spaten', 'Hoegaarden грейпфрут', 'Hoegaarden пшеничное', 'Kozel тёмный', 'Stella Artois', 'Stella Artois б/а'].map(
          name => ({ name, detail: '0,5 л', price: '300 ₽' }),
        ),
      ],
    },
  ],
}

const tabs = [
  { key: 'popular', label: 'Главное' },
  { key: 'kitchen', label: 'Кухня' },
  { key: 'bar', label: 'Напитки' },
  { key: 'cocktails', label: 'Бар 18+' },
] as const

export default function Menu() {
  const [tab, setTab] = useState<keyof typeof groups>('popular')
  const [query, setQuery] = useState('')
  const { ref, visible } = useReveal()

  const shownGroups = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('ru')
    if (!normalized) return groups[tab]
    return Object.values(groups)
      .flat()
      .map(group => ({
        ...group,
        items: group.items.filter(item => `${item.name} ${item.detail ?? ''}`.toLocaleLowerCase('ru').includes(normalized)),
      }))
      .filter(group => group.items.length)
  }, [query, tab])

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#12100D] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="ornament mb-4">
            <span className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold">МЕНЮ</span>
          </div>
          <h2 className="mb-3 text-center font-cinzel text-[clamp(20px,4vw,36px)] uppercase tracking-widest text-gold">
            Выберите свой вкус
          </h2>
          <p className="mb-8 text-center font-inter text-xs text-mist">Сначала — любимые позиции гостей, затем полная карта</p>
        </div>

        <div className="sticky top-3 z-20 mb-10 rounded-2xl border border-stone bg-charcoal/95 p-2 shadow-2xl backdrop-blur-xl">
          <div className="scroll-hide flex gap-1 overflow-x-auto">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setTab(key)
                  setQuery('')
                }}
                className={`min-w-fit flex-1 rounded-xl px-4 py-3 font-cinzel text-[10px] font-semibold uppercase tracking-widest transition-all ${
                  tab === key && !query ? 'bg-gold text-obsidian' : 'text-mist hover:text-gold'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="mt-2 flex items-center gap-3 rounded-xl border border-stone bg-obsidian/70 px-4">
            <span className="text-gold/60" aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Найти блюдо или напиток"
              className="h-11 w-full bg-transparent font-inter text-sm text-marble outline-none placeholder:text-mist/50"
            />
          </label>
        </div>

        <div className="space-y-10">
          {shownGroups.map(group => (
            <div key={group.title}>
              <div className="mb-4 flex items-center gap-4">
                <h3 className="font-cinzel text-sm uppercase tracking-[0.18em] text-gold-light">{group.title}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {group.items.map(item => (
                  <article
                    key={`${group.title}-${item.name}`}
                    className={`menu-item group flex items-start justify-between gap-5 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 ${
                      item.featured ? 'border-gold/25 bg-gold/5' : 'border-stone bg-charcoal/65'
                    }`}
                  >
                    <div>
                      <p className="font-cinzel text-[13px] font-semibold text-gold-light">{item.name}</p>
                      {item.detail && <p className="mt-1 font-inter text-[11px] text-mist">{item.detail}</p>}
                    </div>
                    <p className="shrink-0 font-cinzel text-sm font-bold text-gold">{item.price}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
          {!shownGroups.length && (
            <div className="rounded-2xl border border-stone bg-charcoal/60 p-8 text-center font-inter text-sm text-mist">
              По вашему запросу ничего не найдено
            </div>
          )}
        </div>

        <p className="mt-10 text-center font-inter text-[10px] leading-relaxed text-mist/70">
          Пробковый сбор — 700 ₽ · Караоке — 300 ₽ · вне очереди — 1 500 ₽ · продление работы — 15 000 ₽
        </p>
      </div>
    </section>
  )
}
