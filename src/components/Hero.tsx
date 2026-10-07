import { useEffect, useState } from 'react'
import heroBgDesktop from '@/imports/46fa8df0-b411-4e7e-b647-2e08c420ef14.png'
import heroBgMobile from '@/imports/6be5a78a-52a7-4b92-a7b8-95b76b74f2f7.png'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    // Small delay so fonts are ready before animating
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px 56px 0px' },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[140svh] overflow-clip md:flex md:min-h-[100svh] md:items-center md:justify-center">
      {/* ── Backgrounds ── */}
      {/* Desktop: landscape — face is left-center; object-position keeps head visible */}
      <img
        src={heroBgDesktop}
        alt="Зевс с кальяном"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        style={{ objectPosition: 'center 30%' }}
      />
      {/* On mobile the image stays while the content scrolls away, then follows the section. */}
      <div className="sticky top-0 h-[100svh] md:hidden">
        <img
          src={heroBgMobile}
          alt="Зевс с кальяном"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 18%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% 40%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.72) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.7) 100%)
            `,
          }}
        />
      </div>

      {/* Overlay: vignette darkens edges, centre stays partially clear to show Zeus */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.65) 100%)
          `,
        }}
      />

      {/* ── Content — centred ── */}
      <div className="relative z-10 -mt-[100svh] flex h-[100svh] flex-col items-center justify-center px-6 py-20 text-center md:mt-0 md:h-auto">

        {/* LOUNGE tag */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            animation: loaded ? 'fadeIn 0.5s ease 0.1s forwards' : 'none',
          }}
        >
          <span
            className="block h-px bg-[#C9A87C]"
            style={{
              width: loaded ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s',
              opacity: 0.7,
            }}
          />
          <span
            className="font-cinzel uppercase tracking-[0.45em]"
            style={{ fontSize: '11px', color: '#C9A87C', opacity: 0.9 }}
          >
            LOUNGE
          </span>
          <span
            className="block h-px bg-[#C9A87C]"
            style={{
              width: loaded ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Title line 1 */}
        <h1
          className="gold-shimmer font-cinzel font-black uppercase leading-none tracking-[0.1em] mb-1"
          style={{
            fontSize: 'clamp(38px, 10vw, 88px)',
            textShadow: 'none',
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.25s',
          }}
        >
          ПАРЯЩИЕ
        </h1>

        {/* Title line 2 */}
        <h1
          className="gold-shimmer font-cinzel font-black uppercase leading-none tracking-[0.1em] mb-8"
          style={{
            fontSize: 'clamp(38px, 10vw, 88px)',
            filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.9))',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s',
          }}
        >
          ОБЛАКА
        </h1>

        {/* Divider */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{
            opacity: loaded ? 0.5 : 0,
            transition: 'opacity 0.6s ease 0.6s',
          }}
        >
          <span className="block w-6 h-px bg-[#C9A87C]" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-[#C9A87C]" />
          <span className="block w-6 h-px bg-[#C9A87C]" />
        </div>

        {/* Slogan */}
        <p
          className="slogan-panel mb-10 max-w-sm px-5 py-4 font-cinzel text-[clamp(18px,4vw,26px)] font-semibold uppercase leading-snug tracking-[0.08em] text-gold-light md:max-w-xl"
          style={{
            textShadow: '0 1px 8px rgba(0,0,0,0.95)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s ease 0.65s, transform 0.65s ease 0.65s',
          }}
        >
          Новая архитектура вашего отдыха
        </p>

        {/* Desktop CTA */}
        <button
          onClick={scrollToBooking}
          className="hidden md:block font-cinzel font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: '#C9A87C',
            color: '#0E0C0A',
            fontSize: '12px',
            letterSpacing: '0.22em',
            padding: '16px 40px',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(201,168,124,0.35)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.85s, transform 0.6s ease 0.85s, background 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 32px rgba(201,168,124,0.55)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,168,124,0.35)')}
        >
          Забронировать столик
        </button>
      </div>

      {/* Scroll nudge */}
      <div
        className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{
          opacity: loaded ? 0.35 : 0,
          transition: 'opacity 0.6s ease 1.2s',
          animation: loaded ? 'fadeIn 0.6s ease 1.2s forwards, bounce 2s ease 1.8s infinite' : 'none',
        }}
      >
        <span className="block w-px h-8 bg-[#C9A87C]" />
        <span
          className="font-cinzel uppercase tracking-[0.3em]"
          style={{ fontSize: '8px', color: '#C9A87C' }}
        >
          SCROLL
        </span>
      </div>

      {/* Mobile sticky CTA */}
      <button
        onClick={scrollToBooking}
        className="fixed bottom-0 left-0 right-0 z-50 font-cinzel font-semibold uppercase tracking-widest transition-all duration-300 active:brightness-90 md:hidden"
        style={{
          height: '56px',
          borderRadius: '16px 16px 0 0',
          background: '#C9A87C',
          color: '#0E0C0A',
          fontSize: '12px',
          letterSpacing: '0.22em',
          boxShadow: '0 -4px 20px rgba(201,168,124,0.3)',
          opacity: loaded && !footerVisible ? 1 : 0,
          pointerEvents: footerVisible ? 'none' : 'auto',
          transform: footerVisible ? 'translateY(100%)' : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        Забронировать столик
      </button>
    </section>
  )
}
