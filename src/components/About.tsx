import { useReveal } from '@/hooks/useReveal'

const videoModules = import.meta.glob('/src/imports/video*.{mp4,webm,mov}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const findVideo = (name: string) =>
  Object.entries(videoModules).find(([path]) => path.toLowerCase().includes(name))?.[1]

const pillars = [
  {
    num: 'I',
    title: 'Уютная атмосфера',
    text: 'Мягкий приглушённый свет, удобные диваны и никакой спешки. Место, куда хочется возвращаться.',
    video: findVideo('video1'),
  },
  {
    num: 'II',
    title: 'Авторские кальяны',
    text: 'Собственные миксы, отобранные кальянным мастером. Только качественные табаки, проверенные угли и подача без ожиданий.',
    video: findVideo('video2'),
  },
  {
    num: 'III',
    title: 'Наслаждайтесь дольше',
    text: 'Время в лаунж «Парящие Облака» пролетает незаметно. Продлите свой отдых за отдельную плату.',
    video: findVideo('video3'),
  },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-obsidian py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="ornament mb-4">
            <span className="text-[10px] tracking-[0.4em] uppercase font-cinzel" style={{ color: '#C9A87C' }}>О НАС</span>
          </div>
          <h2
            className="font-cinzel text-center uppercase tracking-widest mb-16"
            style={{ fontSize: 'clamp(20px, 4vw, 36px)', color: '#C9A87C' }}
          >
            Всё для хорошего вечера
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="reveal group rounded-3xl border border-stone bg-charcoal/55 p-3 pb-7 text-center transition-colors duration-500 hover:border-gold/40"
              style={{
                transitionDelay: visible ? `${i * 0.12}s` : '0s',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div className="video-frame mb-7 aspect-[4/5] overflow-hidden rounded-2xl bg-stone">
                {p.video ? (
                  <video
                    src={p.video}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={p.title}
                  />
                ) : (
                  <div className="video-placeholder flex h-full flex-col items-center justify-center px-6">
                    <span className="font-cinzel text-4xl text-gold/20">{p.num}</span>
                    <span className="mt-4 font-inter text-[10px] uppercase tracking-[0.28em] text-mist/50">
                      Видеоряд
                    </span>
                  </div>
                )}
              </div>
              <span
                className="font-cinzel font-bold mb-4"
                style={{ fontSize: '28px', color: '#C9A87C', opacity: 0.35 }}
              >
                {p.num}
              </span>
              <div
                className="h-px bg-[#C9A87C] mb-5 transition-all duration-500"
                style={{ width: visible ? '48px' : '0px', opacity: 0.4 }}
              />
              <h3
                className="font-cinzel font-semibold uppercase tracking-wider mb-3"
                style={{ fontSize: '14px', color: '#E2C99A' }}
              >
                {p.title}
              </h3>
              <p
                className="mx-auto font-inter leading-relaxed"
                style={{ fontSize: '12px', color: '#8C8580', maxWidth: '260px' }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
