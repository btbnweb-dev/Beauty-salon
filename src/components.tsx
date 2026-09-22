import { useEffect, useRef, useState } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { navigation, services, formatPrice, studio } from './data'
import type { Service } from './data'

type IconName = Service['icon'] | 'arrow' | 'menu' | 'close' | 'moon' | 'spark' | 'leaf' | 'heart' | 'pin' | 'phone' | 'clock' | 'plus' | 'chevron' | 'instagram'
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    moon: <path d="M20 14.2A9 9 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />,
    spark: <path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z" />,
    leaf: <><path d="M20 3C10 1 3 7 4 14c2 8 16 8 16-11ZM3 22 15 9" /><path d="M9 16h6M9 16v-6" /></>,
    heart: <path d="m12 20-8-8a5.4 5.4 0 0 1 8-7 5.4 5.4 0 0 1 8 7Z" />,
    hair: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8.5 7.5 12 12m-12-3 12-12M12 12l2-2" /></>,
    makeup: <path d="m7 13 7-7 5 5-7 7ZM7 13l-4 8 9-3M14 6l2-2c4-4 8 0 4 4l-1 3" />,
    brow: <path d="M3 11c5-7 13-7 18-2M3 14c5-5 12-5 18-3M7 17h10" />,
    lashes: <path d="M3 9c5 6 13 6 18 0M4 10l-2 4m6-1-1 4m5-3v5m5-6 1 4m2-7 2 4" />,
    nails: <path d="M7 20V8a5 5 0 0 1 10 0v12ZM7 11h10M9 7v2M5 21h14" />,
    skin: <path d="M8 3C5 7 4 12 7 18c3 5 7 4 10-1M8 3c5-2 10 1 10 6v3l3 3-4 1M11 8h3M10 16h4" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="m7 3 3 5-3 3a17 17 0 0 0 6 6l3-3 5 3-1 4C10 22 2 14 3 4l4-1Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    plus: <path d="M12 4v16M4 12h16" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  }
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
export function Logo() {
  return <a className="logo" href="#home" aria-label="LUNE Beauty Studio — Нүүр"><span>LUNE<span className="logo-star">✧</span></span><small>BEAUTY STUDIO</small></a>
}
export function Action({ children, href, onClick, light = false, className = '', external = false }: { children: ReactNode; href?: string; onClick?: () => void; light?: boolean; className?: string; external?: boolean }) {
  const props = { className: `action ${light ? 'action-light' : ''} ${className}`, onClick }
  const inner = <>{children}<Icon name="arrow" /></>
  return href ? <a {...props} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a> : <button {...props} type="button">{inner}</button>
}
export function Label({ children, number }: { children: ReactNode; number?: string }) {
  return <p className="section-label">{number && <span>{number} /</span>}{children}</p>
}
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!media.matches && node.getBoundingClientRect().top > window.innerHeight) node.classList.add('reveal-pending')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.remove('reveal-pending'); observer.disconnect() }
    }, { threshold: .08 })
    observer.observe(node)
    const onPreference = () => { if (media.matches) node.classList.remove('reveal-pending') }
    media.addEventListener('change', onPreference)
    return () => { observer.disconnect(); media.removeEventListener('change', onPreference) }
  }, [])
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>
}
export function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let previous: boolean | undefined
    const scroll = () => {
      const next = window.scrollY > 24
      if (previous !== next) { previous = next; setScrolled(next) }
    }
    scroll()
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const resize = () => { if (media.matches) setOpen(false) }
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
    }
    media.addEventListener('change', resize)
    window.addEventListener('keydown', escape)
    return () => { media.removeEventListener('change', resize); window.removeEventListener('keydown', escape) }
  }, [open])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
    <div className="shell nav-shell">
      <Logo />
      <nav className="desktop-nav hidden lg:flex" aria-label="Үндсэн цэс">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div className="nav-actions"><button type="button" className="nav-book" onClick={() => { setOpen(false); onBook() }}>Цаг захиалах<Icon name="arrow" /></button><button ref={toggle} className="menu-toggle lg:hidden" aria-label={open ? 'Цэс хаах' : 'Цэс нээх'} aria-controls="mobile-nav" aria-expanded={open} onClick={() => setOpen(!open)} type="button"><Icon name={open ? 'close' : 'menu'} /></button></div>
    </div>
    <nav id="mobile-nav" className="mobile-nav lg:hidden" hidden={!open} aria-label="Гар утасны цэс">
      {navigation.map((item, i) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}<Icon name="arrow" /></a>)}
      <p>Тайван тухлаарай. Энэ цаг зөвхөн таных.</p>
    </nav>
  </header>
}
export function Modal({ children, labelId, onClose, className = '', onKeyDown }: { children: ReactNode; labelId: string; onClose: () => void; className?: string; onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  return <dialog ref={ref} className={`modal ${className}`} aria-labelledby={labelId} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }} onKeyDown={event => {
    onKeyDown?.(event)
    if (event.key !== 'Tab') return
    const nodes = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], select, input, [tabindex="0"]'))
    const first = nodes[0], last = nodes[nodes.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }}>
    <button className="modal-close" type="button" onClick={onClose} aria-label="Цонх хаах" autoFocus><Icon name="close" /></button>
    {children}
  </dialog>
}
export function BookingModal({ initialService, onClose }: { initialService: string; onClose: () => void }) {
  const [selected, setSelected] = useState(initialService)
  const service = services.find(item => item.id === selected)!
  return <Modal labelId="booking-title" onClose={onClose} className="booking-modal">
    <Label>ЗӨВХӨН ТАНД ЗОРИУЛСАН ЦАГ</Label>
    <h2 id="booking-title">Өөртөө цаг<br /><em>гаргаарай.</em></h2>
    <p className="modal-intro">Үйлчилгээгээ сонгоод, утсаар холбогдож өөрт тохирох цагаа товлоорой.</p>
    <label className="select-label" htmlFor="booking-service">Үйлчилгээгээ сонгоорой</label>
    <select id="booking-service" value={selected} onChange={event => setSelected(event.target.value)}>{services.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
    <div className="booking-summary"><span><Icon name="clock" />{service.duration}</span><strong>{formatPrice(service.price)}<small>Эхлэх үнэ</small></strong></div>
    <p className="booking-description">{service.description}</p>
    <a className="booking-call" href={studio.phoneHref}><Icon name="phone" /><span><small>Утсаар холбогдох · жишээ дугаар</small>{studio.phone}</span><Icon name="arrow" /></a>
    <a className="text-link booking-location" href="#contact" onClick={onClose}>Хаяг, ажиллах цаг<Icon name="arrow" /></a>
    <p className="demo-note">Энэ загвар сайтаар бодит захиалга авахгүй. Үйлчилгээ, үнэ, холбоо барих мэдээллийг жишээ болгон оруулав.</p>
  </Modal>
}
export function LocationMap() {
  return <div className="location-map">
    <svg viewBox="0 0 600 360" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">LUNE Beauty Studio — байршлын жишээ зураг</title><desc id="map-desc">Студийн байршлыг жишээгээр харуулсан тойм зураг. Бодит газрын зураг биш.</desc>
      <rect width="600" height="360" fill="#eee9e2" />
      <g fill="#e2dbd1"><rect x="18" y="20" width="138" height="102" rx="8" /><rect x="192" y="20" width="157" height="102" rx="8" /><rect x="388" y="20" width="192" height="102" rx="8" /><rect x="18" y="163" width="138" height="81" rx="8" /><rect x="192" y="163" width="157" height="81" rx="8" /><rect x="18" y="282" width="331" height="58" rx="8" /><rect x="388" y="282" width="192" height="58" rx="8" /></g>
      <rect x="390" y="164" width="190" height="80" rx="8" fill="#d5d7c9" />
      <path d="M416 229q30-64 67-27t69-24" stroke="#ecece2" strokeWidth="12" fill="none" />
      <path d="M0 143h600M0 264h600M175 0v360M369 0v360" stroke="#faf7f1" strokeWidth="22" />
      <g fill="#756961" fontFamily="Arial,sans-serif" fontSize="10" letterSpacing="2"><text x="205" y="146">НАРНЫ ГУДАМЖ</text><text x="429" y="224" fontSize="8">ЦЭЦЭРЛЭГТ ХҮРЭЭЛЭН</text></g>
      <circle cx="278" cy="192" r="44" fill="#966f6b" opacity=".12" /><circle cx="278" cy="192" r="29" fill="#966f6b" opacity=".15" />
      <path d="M278 217s-19-17-19-31a19 19 0 0 1 38 0c0 14-19 31-19 31Z" fill="#815b58" />
      <circle cx="278" cy="184" r="5" fill="#faf6ef" />
      <rect x="221" y="230" width="114" height="32" rx="2" fill="#faf6ef" /><text x="278" y="250" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fill="#453632" letterSpacing="4">LUNE</text>
    </svg>
    <span className="map-north" aria-hidden="true">↑<small>Х</small></span>
    <span className="map-note">БАЙРШЛЫН ЖИШЭЭ ЗУРАГ</span>
  </div>
}
