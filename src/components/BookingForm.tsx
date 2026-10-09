import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  phone: string
  date: string
  time: string
  guests: string
}

const RATE_LIMIT_KEY = 'clouds_booking_attempts'
const RATE_LIMIT_WINDOW = 15 * 60 * 1000
const RATE_LIMIT_MAX = 3

const inputStyle: React.CSSProperties = {
  minHeight: '52px',
  borderRadius: '12px',
  background: '#F0EDE9',
  border: '1.5px solid transparent',
  color: '#1A1714',
  fontSize: '16px',          // 16px обязателен, иначе iOS Safari зумит при фокусе
  lineHeight: 1.2,
  paddingLeft: '16px',
  paddingRight: '16px',
  width: '100%',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
  WebkitAppearance: 'none',
  appearance: 'none',
}

export default function BookingForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit = async (data: FormData) => {
    const now = Date.now()
    const attempts = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]') as number[]
    const recentAttempts = attempts.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW)

    if (recentAttempts.length >= RATE_LIMIT_MAX) {
      const waitMinutes = Math.ceil((RATE_LIMIT_WINDOW - (now - recentAttempts[0])) / 60000)
      setSubmitError(`Слишком много заявок. Повторите через ${waitMinutes} мин.`)
      return
    }

    setSubmitError('')
    setLoading(true)
    const text =
      `*Новая бронь — Парящие Облака*\n` +
      `Имя: ${data.name}\n` +
      `Телефон: ${data.phone}\n` +
      `Дата: ${data.date}\n` +
      `Время: ${data.time}\n` +
      `Персон: ${data.guests}`

    try {
      const TOKEN = 'YOUR_BOT_TOKEN'
      const CHAT_ID = 'YOUR_CHAT_ID'

      if (TOKEN !== 'YOUR_BOT_TOKEN' && CHAT_ID !== 'YOUR_CHAT_ID') {
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
        })
        if (!response.ok) throw new Error('Telegram request failed')
      }
    } catch {
      setLoading(false)
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.')
      return
    }

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify([...recentAttempts, now]))
    setLoading(false)
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="booking" className="bg-[#12100D] px-4 pb-28 pt-16 md:px-8 md:py-20 md:pb-20">
      <div className="mx-auto max-w-xl">
        <div className="ornament mb-4">
          <span className="text-[10px] tracking-[0.4em] uppercase font-cinzel" style={{ color: '#C9A87C' }}>БРОНИРОВАНИЕ</span>
        </div>

        <h2
          className="font-cinzel text-center uppercase tracking-widest mb-3"
          style={{ fontSize: 'clamp(20px, 4vw, 36px)', color: '#C9A87C' }}
        >
          Забронировать столик
        </h2>
        <p className="text-center font-inter mb-8 md:mb-10" style={{ fontSize: '13px', color: '#6B6560' }}>
          Ответим в течение 15 минут
        </p>

        {sent ? (
          <div className="bg-[#1A1714] border border-[#C9A87C44] rounded-2xl p-8 text-center">
            <p className="font-cinzel text-[#C9A87C] text-lg mb-2">✦ Заявка принята</p>
            <p className="font-inter text-[#8C8580] text-sm">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input
                {...register('name', {
                  required: 'Введите имя',
                  minLength: { value: 2, message: 'Минимум 2 символа' },
                  maxLength: { value: 20, message: 'Не более 20 символов' },
                  pattern: { value: /^[A-Za-zА-Яа-яЁё -]+$/, message: 'Используйте только буквы, пробел и дефис' },
                })}
                id="booking-name"
                placeholder="Ваше имя"
                maxLength={20}
                autoComplete="name"
                style={inputStyle}
              />
              {errors.name && (
                <p className="mt-1 font-inter" style={{ fontSize: '11px', color: '#C9A87C' }}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register('phone', {
                  required: 'Введите телефон',
                  validate: value => {
                    const digits = value.replace(/\D/g, '')
                    return (digits.length >= 10 && digits.length <= 15) || 'Введите корректный номер телефона'
                  },
                })}
                id="booking-phone"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                style={inputStyle}
              />
              {errors.phone && (
                <p className="mt-1 font-inter" style={{ fontSize: '11px', color: '#C9A87C' }}>{errors.phone.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  {...register('date', { required: 'Выберите дату' })}
                  id="booking-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  style={{ ...inputStyle, paddingLeft: '12px', paddingRight: '12px' }}
                />
              </div>
              <div>
                <input
                  {...register('time', { required: 'Выберите время' })}
                  id="booking-time"
                  type="time"
                  style={{ ...inputStyle, paddingLeft: '12px', paddingRight: '12px' }}
                />
              </div>
            </div>
            {(errors.date || errors.time) && (
              <p className="-mt-3 font-inter text-[11px] text-gold">Укажите дату и время бронирования</p>
            )}

            <div>
              <select
                {...register('guests', { required: 'Выберите кол-во' })}
                id="booking-guests"
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="">Количество персон</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'персона' : n < 5 ? 'персоны' : 'персон'}</option>
                ))}
                <option value="9+">9+ персон</option>
              </select>
              {errors.guests && (
                <p className="mt-1 font-inter" style={{ fontSize: '11px', color: '#C9A87C' }}>{errors.guests.message}</p>
              )}
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl border border-gold/30 bg-gold/5 p-3 text-center font-inter text-xs text-gold">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-cinzel font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#A8854F] active:scale-[0.98] disabled:opacity-60"
              style={{
                minHeight: '56px',
                borderRadius: '16px',
                background: '#C9A87C',
                fontSize: '13px',
                letterSpacing: '0.2em',
                width: '100%',
                cursor: loading ? 'not-allowed' : 'pointer',
                touchAction: 'manipulation',
              }}
            >
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}