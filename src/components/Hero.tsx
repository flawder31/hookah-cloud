import { useEffect, useState } from 'react'
import heroBgDesktop from '@/imports/46fa8df0-b411-4e7e-b647-2e08c420ef14.png'
import heroBgMobile from '@/imports/6be5a78a-52a7-4b92-a7b8-95b76b74f2f7.png'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
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
    <section className="hero-section relative flex min-h-[100svh] flex-col overflow-hidden md:min-h-[100svh]">
      {/* Desktop background */}
      <img
        src={heroBgDesktop}
        alt="Зевс с кальяном"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        style={{ objectPosition: 'center 30%' }}
      />

      {/* Mobile background — absolute, не sticky */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroBgMobile}
          alt="Зевс с кальяном"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 20%' }}
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

      {/* Desktop overlay */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.65) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center">
        {/* LOUNGE tag */}
        <div
          className="mb-6 flex items-center gap-3"
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
            fontSize: 'clamp(34px, 9vw, 88px)',
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
            fontSize: 'clamp(34px, 9vw, 88px)',
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
          className="mb-6 flex items-center gap-3"
          style={{
            opacity: loaded ? 0.5 : 0,
            transition: 'opacity 0.6s ease 0.6s',
          }}
        >
          <span className="block h-px w-6 bg-[#C9A87C]" />
          <span className="block h-1.5 w-1.5 rotate-45 bg-[#C9A87C]" />
          <span className="block h-px w-6 bg-[#C9A87C]" />
        </div>

        {/* Slogan */}
        <p
          className="slogan-panel mb-10 max-w-sm px-5 py-4 font-cinzel text-[clamp(16px,4vw,26px)] font-semibold uppercase leading-snug tracking-[0.08em] text-gold-light md:max-w-xl"
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
        className="absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 md:bottom-8"
        style={{
          opacity: loaded ? 0.35 : 0,
          transition: 'opacity 0.6s ease 1.2s',
          animation: loaded ? 'fadeIn 0.6s ease 1.2s forwards, bounce 2s ease 1.8s infinite' : 'none',
        }}
      >
        <span className="block h-8 w-px bg-[#C9A87C]" />
        <span
          className="font-cinzel uppercase tracking-[0.3em]"
          style={{ fontSize: '8px', color: '#C9A87C' }}
        >
          SCROLL
        </span>
      </div>

      {/* Mobile sticky CTA — с safe-area */}
      <button
        onClick={scrollToBooking}
        className="safe-bottom fixed bottom-0 left-0 right-0 z-50 font-cinzel font-semibold uppercase tracking-widest transition-all duration-300 active:brightness-90 md:hidden"
        style={{
          minHeight: '56px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          background: '#C9A87C',
          color: '#0E0C0A',
          fontSize: '13px',
          letterSpacing: '0.2em',
          boxShadow: '0 -4px 20px rgba(201,168,124,0.3)',
          opacity: loaded && !footerVisible ? 1 : 0,
          pointerEvents: footerVisible ? 'none' : 'auto',
          transform: footerVisible ? 'translateY(100%)' : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          touchAction: 'manipulation',
        }}
      >
        Забронировать столик
      </button>
    </section>
  )
}