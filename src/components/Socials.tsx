import { useReveal } from '@/hooks/useReveal'
import vkLogo from '@/imports/vk.svg'
import instagramLogo from '@/imports/instagram.svg'
import telegramLogo from '@/imports/telegram.svg'

const socials = [
  { name: 'ВКонтакте', logo: vkLogo, href: 'https://vk.ru/po_lounge' },
  { name: 'Instagram', logo: instagramLogo, href: 'https://www.instagram.com/loungeoblaka?stkn=YXNtbHJ3bHNlOGRu' },
  { name: 'Telegram', logo: telegramLogo, href: 'https://t.me/wwhiteclouds31' },
]

export default function Socials() {
  const { ref, visible } = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-obsidian px-4 py-20 md:px-8">
      <div className={`reveal mx-auto max-w-4xl text-center ${visible ? 'visible' : ''}`}>
        <div className="ornament mb-4">
          <span className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold">НА СВЯЗИ</span>
        </div>
        <h2 className="mb-3 font-cinzel text-[clamp(20px,4vw,36px)] uppercase tracking-widest text-gold">
          Следите за облаками
        </h2>
        <p className="mb-10 font-inter text-sm text-mist">Новости, афиши и атмосфера лаунжа в социальных сетях</p>

        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3">
          {socials.map(({ name, logo, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="social-card group flex min-h-32 flex-col items-center justify-center rounded-2xl border border-stone bg-charcoal/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50"
            >
              <span className="flex h-13 w-13 items-center justify-center rounded-full border border-gold/25 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:border-gold/60">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="mt-4 font-inter text-xs text-mist transition-colors group-hover:text-marble">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
