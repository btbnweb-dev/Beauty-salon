import { useState } from 'react'
import { Action, BookingModal, Icon, Label, LocationMap, Logo, Modal, Navbar, Reveal } from './components'
import { formatPrice, gallery, navigation, reviews, services, studio } from './data'

function Hero({ onBook }: { onBook: () => void }) {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="shell hero-grid">
      <div className="hero-copy">
        <Label>ULAANBAATAR · BEAUTY & SELF-CARE</Label>
        <h1 id="hero-title">Өөрийнхөөрөө<br /><em>гэрэлтээрэй.</em></h1>
        <p className="hero-description">Танд зохих өнгө, таныг тодотгох төрх.<br className="hidden sm:block" /> Тайван тухлаарай. Энэ цаг зөвхөн таных.</p>
        <div className="hero-actions"><Action onClick={onBook}>Цаг захиалах</Action><a href="#services" className="text-link">Үйлчилгээ үзэх<Icon name="arrow" /></a></div>
        <div className="hero-footnote"><span className="fine-line" /><p>Өдрийн завгүй хэмнэл дунд<br /><strong>өөртөө цаг гаргаарай.</strong></p><Icon name="spark" /></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-frame"><img src="/images/portrait.jpg" alt="Зөөлөн будалт, долгионтой үсээр өөрийн төрхөө тодотгосон эмэгтэй" width="1400" height="2100" fetchPriority="high" /></div>
        <div className="hero-image-note"><span>THE ART OF FEELING GOOD</span><span>01 / LUNE</span></div>
        <div className="hero-seal" aria-hidden="true"><Icon name="moon" /><span>BEAUTY,<br />AT YOUR PACE.</span></div>
      </div>
    </div>
    <div className="shell hero-bottom"><span>НЯМБАЙ АРЧИЛГАА</span><Icon name="spark" /><span>ТАЙВАН ОРЧИН</span><Icon name="spark" /><span>ТАНЫ ХЭВ МАЯГ</span><a href="#services" aria-label="Үйлчилгээтэй танилцах">ДООШ ГҮЙЛГЭЭРЭЙ<span aria-hidden="true">↓</span></a></div>
  </section>
}
function Services({ onBook }: { onBook: (id: string) => void }) {
  return <section id="services" className="section-space services" aria-labelledby="services-title">
    <div className="shell">
      <Reveal className="section-heading"><div><Label number="01">ҮЙЛЧИЛГЭЭ</Label><h2 id="services-title">Танд тохирсон<br /><em>арчилгаа.</em></h2></div><p>Өдөр тутмын арчилгаа, онцгой өдрийн гоёл.<br className="hidden md:block" /> Өөрт хэрэгтэй үйлчилгээгээ сонгоорой.</p></Reveal>
      <div className="service-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => <Reveal key={service.id}><article className="service-card">
          <div className="service-top"><Icon name={service.icon} /><span>0{i + 1}</span></div>
          <p className="service-english">{service.english}</p><h3>{service.name}</h3><p className="service-description">{service.description}</p>
          <div className="service-bottom"><span>{formatPrice(service.price)}<small>Эхлэх үнэ</small></span><button className="circle-button" onClick={() => onBook(service.id)} type="button" aria-label={service.name + ' — цаг захиалах'}><Icon name="arrow" /></button></div>
        </article></Reveal>)}
      </div>
      <p className="price-note">Үнэ нь үйлчилгээний төрөл, зарцуулах хугацаанаас хамаарна. Эхлэхийн өмнө үнийг тантай тохиролцоно.</p>
    </div>
  </section>
}
function About() {
  return <section id="about" className="about section-space" aria-labelledby="about-title">
    <div className="shell about-grid">
      <Reveal className="about-images"><div className="about-main-image"><img src="/images/studio.jpg" alt="Том цонх, тухтай сандал, цэвэрхэн ажлын хэсэгтэй салон" width="1100" height="825" loading="lazy" /></div><div className="about-inset"><img src="/images/makeup.jpg" alt="Арчилгаа, будалтад зориулан нямбай бэлтгэсэн хэрэгслүүд" width="850" height="556" loading="lazy" /></div><span className="image-index">THE STUDIO / A LITTLE SPACE FOR YOU</span></Reveal>
      <Reveal className="about-copy"><Label number="02">LUNE-ИЙН ТУХАЙ</Label><h2 id="about-title">Өөртөө<br /><em>зориулах цаг.</em></h2>
        <p className="about-lead">Завгүй өдрөөсөө түр завсарлаж, өөртөө цаг гаргаарай.</p>
        <p>LUNE-д та тайван тухалж, өөртөө анхаарах цагтай. Таны хүсэл, өдөр тутмын хэв маягт тохирсон арчилгааг хамтдаа сонгоно.</p>
        <p>Бид чанартай бүтээгдэхүүн сонгож, хэрэгслийн цэвэрлэгээ, ариутгалд анхаардаг. Үйлчилгээний алхам бүрд нямбай хандаж, таны тав тухыг эрхэмлэнэ.</p>
        <a href="#contact" className="text-link">Студид зочлох<Icon name="arrow" /></a>
        <div className="about-signature"><span>Lune.</span><small>ТАЙВАН ОРЧИН. НЯМБАЙ ҮЙЛЧИЛГЭЭ.</small></div>
      </Reveal>
    </div>
  </section>
}
function Benefits() {
  const benefits = [
    { icon: 'spark' as const, title: 'Мэргэжлийн үйлчилгээ', text: 'Таны хүсэлд нийцүүлэн зөвлөж, ажилбар бүрийг нямбай хийнэ.' },
    { icon: 'leaf' as const, title: 'Чанартай бүтээгдэхүүн', text: 'Үс, арьсны тань онцлогт тохирсон бүтээгдэхүүн хэрэглэнэ.' },
    { icon: 'moon' as const, title: 'Тав тухтай орчин', text: 'Намуухан хөгжим, тухтай суудал. Түр амсхийгээд аваарай.' },
    { icon: 'heart' as const, title: 'Танд тохирсон арчилгаа', text: 'Таны төрх, хэв маягт зохих өнгө, хэлбэрийг хамтдаа сонгоно.' },
  ]
  return <section className="benefits" aria-label="Бидний эрхэмлэдэг зүйлс"><div className="shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(item => <Reveal className="benefit" key={item.title}><Icon name={item.icon} /><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div></section>
}
function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  return <section id="gallery" className="gallery section-space" aria-labelledby="gallery-title"><div className="shell">
    <Reveal className="section-heading"><div><Label number="03">LUNE MOMENTS</Label><h2 id="gallery-title">Жижиг зүйлсэд<br /><em>шингэсэн гоо.</em></h2></div><p>Зөөлөн өнгө, нямбай ажиллагаа.<br />Манай студийн өнгө төрхтэй танилцаарай.</p></Reveal>
    <div className="gallery-grid">{gallery.map((item, i) => <Reveal className={`gallery-item ${item.className}`} key={item.image}><button type="button" onClick={() => onOpen(i)} aria-label={item.label + ' — зураг томруулах'}><img src={item.image} alt={item.alt} width="900" height="900" loading="lazy" /><span className="gallery-overlay"><span><small>{item.category}</small><strong>{item.label}</strong></span><span className="gallery-plus"><Icon name="plus" /></span></span></button></Reveal>)}</div>
    <div className="gallery-footer"><p>Өөртөө таалагдах тэр мэдрэмж.</p><a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="text-link" aria-label="Instagram — жишээ холбоос, шинэ цонхонд">Instagram<Icon name="instagram" /></a></div>
  </div></section>
}
function Testimonials() {
  return <section className="testimonials section-space" aria-labelledby="reviews-title"><div className="shell">
    <Reveal className="reviews-heading"><Label>ҮЙЛЧЛҮҮЛЭГЧДИЙН СЭТГЭГДЭЛ</Label><h2 id="reviews-title">Дахин ирэх<br /><em>шалтгаан.</em></h2></Reveal>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">{reviews.map(review => <Reveal key={review.name}><figure className="review"><div className="review-top"><span className="quote-mark" aria-hidden="true">“</span><span className="stars" role="img" aria-label="5-аас 5 од">★★★★★</span></div><blockquote>{review.text}</blockquote><figcaption><span className="review-initial" aria-hidden="true">{review.initial}</span><span><strong>{review.name}</strong><small>{review.service}</small></span></figcaption></figure></Reveal>)}</div>
  </div></section>
}
function BookingCta({ onBook }: { onBook: () => void }) {
  return <section className="booking-cta" aria-labelledby="booking-cta-title"><div className="shell booking-cta-inner"><div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" /><Reveal><Label>ЗӨВХӨН ӨӨРТӨӨ ЗОРИУЛАХ МӨЧ</Label><h2 id="booking-cta-title">Өөртөө цаг<br /><em>гаргаарай.</em></h2><p>Өдөр тутмын ажлаа түр азнаад, өөрийгөө халамжлаарай.<br className="hidden sm:block" /> Тайван орчин, нямбай арчилгаа таныг хүлээж байна.</p><Action onClick={onBook} light>Цаг захиалах</Action></Reveal><span className="cta-flower" aria-hidden="true">✳</span></div></section>
}
function Contact() {
  return <section id="contact" className="contact section-space" aria-labelledby="contact-title"><div className="shell contact-grid">
    <Reveal><Label number="04">ХОЛБОО БАРИХ</Label><h2 id="contact-title">Ороод<br /><em>тухлаарай.</em></h2><p className="contact-intro">Хотын төвд байрлах манай студид тавтай морил.</p>
      <div className="contact-detail"><Icon name="pin" /><div><h3>Манай хаяг</h3><address>{studio.address}<br />{studio.addressLine}</address></div></div>
      <div className="contact-detail"><Icon name="clock" /><div><h3>Ажиллах цаг</h3><dl><div><dt>Даваа – Бямба</dt><dd>10:00 – 20:00</dd></div><div><dt>Ням</dt><dd>11:00 – 18:00</dd></div></dl></div></div>
      <div className="contact-detail"><Icon name="phone" /><div><h3>Утас</h3><a href={studio.phoneHref}>{studio.phone}</a></div></div>
      <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="text-link contact-instagram" aria-label="Instagram — жишээ холбоос, шинэ цонхонд">Instagram үзэх<Icon name="instagram" /></a>
    </Reveal>
    <Reveal className="contact-map"><LocationMap /><div className="map-bottom"><span>УЛААНБААТАР · МОНГОЛ</span><a href={studio.map} target="_blank" rel="noopener noreferrer" className="text-link">Хотын газрын зураг<Icon name="arrow" /></a></div><p className="contact-note">Хаяг, утас, ажиллах цагийг жишээ болгон оруулав.</p></Reveal>
  </div></section>
}
function Footer() {
  return <footer className="footer"><div className="shell">
    <div className="footer-top"><div><Logo /><p>Өөрийнхөөрөө гэрэлтээрэй.</p></div><nav aria-label="Хуудасны доод цэс">{navigation.slice(1).map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="footer-contact"><a href={studio.phoneHref}>{studio.phone}</a><span>Улаанбаатар, Монгол</span><div><a href={studio.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram — жишээ холбоос">Instagram ↗</a><a href={studio.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook — жишээ холбоос">Facebook ↗</a></div></div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} LUNE Beauty Studio</p><p>Танилцуулгын загвар · Бодит салон биш.</p><a href="#home">Эхлэл рүү ↑</a></div>
  </div></footer>
}
export default function App() {
  const [booking, setBooking] = useState<string | null>(null)
  const [photo, setPhoto] = useState<number | null>(null)
  const changePhoto = (direction: number) => setPhoto(index => index === null ? null : (index + direction + gallery.length) % gallery.length)
  return <>
    <a className="skip-link" href="#main">Үндсэн агуулга руу очих</a>
    <Navbar onBook={() => setBooking('hair')} />
    <main id="main"><Hero onBook={() => setBooking('hair')} /><Services onBook={setBooking} /><About /><Benefits /><Gallery onOpen={setPhoto} /><Testimonials /><BookingCta onBook={() => setBooking('hair')} /><Contact /></main>
    <Footer />
    {booking !== null && <BookingModal initialService={booking} onClose={() => setBooking(null)} />}
    {photo !== null && <Modal labelId="gallery-modal-title" onClose={() => setPhoto(null)} className="gallery-modal" onKeyDown={event => { if (event.key === 'ArrowRight') changePhoto(1); if (event.key === 'ArrowLeft') changePhoto(-1) }}>
      <img src={gallery[photo].image} alt={gallery[photo].alt} />
      <div className="lightbox-bottom"><div><span>{String(photo + 1).padStart(2, '0')} / 04</span><h2 id="gallery-modal-title">{gallery[photo].label}</h2></div><div><button type="button" className="circle-button previous" aria-label="Өмнөх зураг" onClick={() => changePhoto(-1)}><Icon name="chevron" /></button><button type="button" className="circle-button" aria-label="Дараагийн зураг" onClick={() => changePhoto(1)}><Icon name="chevron" /></button></div></div>
    </Modal>}
  </>
}
