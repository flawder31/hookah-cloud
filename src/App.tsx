import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import BookingForm from './components/BookingForm'
import Events from './components/Events'
import Socials from './components/Socials'

export default function App() {
  return (
    <main className="min-h-screen" style={{ background: '#0E0C0A' }}>
      <Hero />
      <About />
      <Events />
      <Menu />
      <BookingForm />
      <Socials />

      <footer className="border-t border-[#1A1714] bg-[#0A0907] text-center">
        <div className="px-4 py-8">
          <p className="mb-1 font-cinzel uppercase tracking-widest text-[#C9A87C]" style={{ fontSize: '13px' }}>
            Парящие Облака Lounge
          </p>
          <p className="mb-1 font-inter" style={{ fontSize: '11px', color: '#4A4540' }}>
            Кальяны · Еда · Напитки
          </p>
          <p className="font-inter" style={{ fontSize: '11px', color: '#3A3530' }}>
            © 2026 · г. Старый Оскол, мкр. Олимпийский, 62
          </p>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="safe-bottom block w-full bg-gold py-4 font-cinzel text-xs font-semibold uppercase tracking-[0.22em] text-obsidian md:hidden"
        >
          Забронировать столик
        </button>
      </footer>
    </main>
  )
}