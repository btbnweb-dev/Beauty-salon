export type Service = { id: string; name: string; english: string; description: string; price: number; duration: string; icon: 'hair' | 'makeup' | 'brow' | 'lashes' | 'nails' | 'skin' }

export const services: Service[] = [
  { id: 'hair', name: 'Үс засалт', english: 'HAIR & STYLING', description: 'Танд зохих, өдөр тутам арчлахад хялбар үс засалт.', price: 45000, duration: '45–60 минут', icon: 'hair' },
  { id: 'makeup', name: 'Будалт', english: 'MAKEUP', description: 'Өдөр тутмын хөнгөн будалт, онцгой өдрийн гоёл. Таны төрхийг зөөлөн тодотгоно.', price: 85000, duration: '60–90 минут', icon: 'makeup' },
  { id: 'brow', name: 'Хөмсөг', english: 'BROW DESIGN', description: 'Нүүрний төрхөд тань зохицсон хэлбэр, байгалийн мэт өнгө.', price: 30000, duration: '30–45 минут', icon: 'brow' },
  { id: 'lashes', name: 'Сормуус', english: 'LASH LIFT & EXTENSIONS', description: 'Харцыг тань тодотгох сормуусны дэрвийлгэлт, сунгалт.', price: 65000, duration: '60–90 минут', icon: 'lashes' },
  { id: 'nails', name: 'Маникюр', english: 'NAIL CARE', description: 'Хумсны нямбай арчилгаа, цэвэрхэн будалт. Дуртай өнгөө сонгоорой.', price: 45000, duration: '60–75 минут', icon: 'nails' },
  { id: 'skin', name: 'Арьс арчилгаа', english: 'FACIAL TREATMENTS', description: 'Арьсны онцлогт тань тохирсон цэвэрлэгээ, чийгшүүлэх арчилгаа.', price: 90000, duration: '60–90 минут', icon: 'skin' },
]
export const formatPrice = (price: number) => new Intl.NumberFormat('en-US').format(price) + '₮'
export const navigation = [
  { label: 'Нүүр', href: '#home' }, { label: 'Үйлчилгээ', href: '#services' },
  { label: 'Бидний тухай', href: '#about' }, { label: 'Галерей', href: '#gallery' }, { label: 'Холбоо барих', href: '#contact' },
]
export const gallery = [
  { image: '/images/hair.jpg', alt: 'Үсчин үйлчлүүлэгчийн үсийг сэнсээр хэлбэрт оруулж буй нь', label: 'Танд зохих засалт', category: 'ҮС ЗАСАЛТ', className: 'gallery-tall' },
  { image: '/images/nails.jpg', alt: 'Хар болон бор хээтэй, нямбай будсан хумс', label: 'Нямбай будалт', category: 'МАНИКЮР', className: '' },
  { image: '/images/makeup.jpg', alt: 'Зөөлөн өнгийн нүүр будалтын хэрэгслүүд', label: 'Танд зохих өнгө', category: 'БУДАЛТ', className: '' },
  { image: '/images/skin.jpg', alt: 'Нүүрэнд маск түрхэж, арьс арчилгаа хийж буй нь', label: 'Өөртөө зориулах мөч', category: 'АРЬС АРЧИЛГАА', className: 'gallery-wide' },
]
export const reviews = [
  { text: 'Үсээ яг хүссэнээрээ засууллаа. Гэртээ яаж янзлахыг зааж өгсөн нь их хэрэг болсон.', name: 'А. Номин', service: 'Үс засалт', initial: 'Н' },
  { text: 'Хумсыг минь их цэвэрхэн будсан. Өнгөө сонгох гэж удсан ч яаруулаагүй. Тухтай байлаа.', name: 'Б. Энхжин', service: 'Маникюр', initial: 'Э' },
  { text: 'Хэт тод биш, яг хүссэн шиг хөнгөн будсан. Өдөржин тогтоц сайтай байсан.', name: 'Д. Мишээл', service: 'Будалт', initial: 'М' },
]
export const studio = {
  address: 'Сүхбаатар дүүрэг, 1-р хороо', addressLine: 'Нарны гудамж, 12-р байр, 2-р давхар',
  phone: '7000 0000', phoneHref: 'tel:+97670000000',
  instagram: 'https://www.instagram.com/', facebook: 'https://www.facebook.com/',
  map: 'https://www.google.com/maps/search/?api=1&query=Ulaanbaatar%20Mongolia',
}
