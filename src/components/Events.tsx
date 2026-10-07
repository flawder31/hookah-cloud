import { useReveal } from '@/hooks/useReveal'

const eventModules = import.meta.glob('/src/imports/events*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const eventImage = Object.values(eventModules)[0]

export default function Events() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-obsidian px-4 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="ornament mb-4">
            <span className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold">АФИША</span>
          </div>
          <h2 className="mb-10 text-center font-cinzel text-[clamp(20px,4vw,36px)] uppercase tracking-widest text-gold">
            События в облаках
          </h2>
        </div>

        <div className={`reveal event-frame mx-auto max-w-3xl overflow-hidden rounded-3xl ${visible ? 'visible' : ''}`}>
          {eventImage ? (
            <img className="h-auto w-full object-cover" src={eventImage} alt="Афиша мероприятий Парящих Облаков" />
          ) : (
            <div className="event-placeholder flex aspect-[16/9] flex-col items-center justify-center px-6 text-center">
              <span className="font-cinzel text-xs uppercase tracking-[0.4em] text-gold/60">Парящие Облака</span>
              <p className="mt-4 font-cinzel text-2xl uppercase tracking-widest text-gold">Афиша скоро</p>
              <p className="mt-3 max-w-sm font-inter text-xs leading-relaxed text-mist">
                Следите за анонсами наших вечеров и специальных событий
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
