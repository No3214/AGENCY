import type { Locale } from './types';

export const locales: Locale[] = ['en', 'tr'];
export const defaultLocale: Locale = 'en';

export function isLocale(x: string): x is Locale {
  return (locales as string[]).includes(x);
}

export const dict = {
  en: {
    nav: { roster: 'Roster', dates: 'Dates', book: 'Book', about: 'About' },
    cta: { book: 'Book an artist', roster: 'See the roster', listen: 'Listen' },
    hero: {
      kicker: 'Boutique booking & events — Afro / Melodic House · Techno',
      sub: 'We book the selectors that move the floor after midnight. From İzmir to the world.',
    },
    sections: {
      next: 'Next departures',
      nextSub: 'Upcoming shows across the network',
      roster: 'The roster',
      rosterSub: 'Selectors, not playlists',
      sound: 'The sound',
      soundSub: 'Recent sets & mixes — swap in your own links',
      venues: 'Selected rooms & stages',
      bookband: 'Have a date in mind?',
      bookbandSub: 'Tell us the city, the date, the room. We handle the rest.',
    },
    board: { city: 'City', date: 'Date', artist: 'Artist', venue: 'Venue', status: 'Status', empty: 'New dates dropping soon.' },
    status: { confirmed: 'Confirmed', holding: 'On hold', limited: 'Limited', sold: 'Sold out', past: 'Played' },
    artist: { based: 'Based in', genres: 'Genres', bio: 'Biography', mixes: 'Sets & mixes', dates: 'Upcoming dates', book: 'Book this artist', back: 'All artists', formats: 'Formats', press: 'Press', watch: 'Watch', rider: 'Technical rider' },
    book: {
      title: 'Book an artist',
      sub: 'Real inquiries only — we reply within 48 hours.',
      name: 'Your name',
      email: 'Email',
      org: 'Company / promoter',
      artist: 'Artist',
      city: 'City',
      country: 'Country',
      date: 'Event date',
      budget: 'Budget range (EUR)',
      type: 'Event type',
      message: 'Tell us about the event',
      any: 'Any / not sure',
      send: 'Send inquiry',
      sending: 'Sending…',
      ok: 'Inquiry received. We will be in touch shortly.',
      err: 'Could not send. Please email bookings@afterhouse.agency directly.',
      types: ['Club night', 'Festival', 'Private / brand', 'Open air', 'Other'],
    },
    about: {
      title: 'A booking studio for the after-hours sound',
      body: [
        'AFTERHOUSE is a boutique booking and event studio built around one idea: the night belongs to the selectors who understand it. We represent and route a focused roster across Afro house, melodic house and techno.',
        'We do not sell playlists. We build dates — the right artist, the right room, the right city — and we manage everything from the first hold to the last record: contracts, deposits, logistics, and the press kit promoters actually open.',
        'Founded out of İzmir, working worldwide.',
      ],
      statShows: 'Shows routed',
      statCities: 'Cities',
      statRoster: 'Artists',
    },
    footer: { tag: 'Boutique DJ booking & event curation.', built: 'Worldwide bookings', rights: 'All rights reserved.' },
    meta: {
      home: 'AFTERHOUSE — Boutique DJ booking & events',
      homeDesc: 'Boutique booking and event studio for Afro house, melodic house and techno. Book artists worldwide.',
    },
  },
  tr: {
    nav: { roster: 'Kadro', dates: 'Tarihler', book: 'Booking', about: 'Hakkında' },
    cta: { book: 'Sanatçı booking', roster: 'Kadroyu gör', listen: 'Dinle' },
    hero: {
      kicker: 'Butik booking & etkinlik — Afro / Melodic House · Techno',
      sub: 'Gece yarısından sonra pisti taşıyan selektörleri biz buluşturuyoruz. İzmir’den dünyaya.',
    },
    sections: {
      next: 'Sıradaki kalkışlar',
      nextSub: 'Ağdaki yaklaşan etkinlikler',
      roster: 'Kadro',
      rosterSub: 'Playlist değil, selektör',
      sound: 'Ses',
      soundSub: 'Son setler & mixler — kendi linklerini ekle',
      venues: 'Seçili mekânlar & sahneler',
      bookband: 'Aklında bir tarih mi var?',
      bookbandSub: 'Şehri, tarihi, mekânı söyle. Gerisini biz hallederiz.',
    },
    board: { city: 'Şehir', date: 'Tarih', artist: 'Sanatçı', venue: 'Mekân', status: 'Durum', empty: 'Yeni tarihler çok yakında.' },
    status: { confirmed: 'Onaylı', holding: 'Opsiyon', limited: 'Sınırlı', sold: 'Tükendi', past: 'Çaldı' },
    artist: { based: 'Üs', genres: 'Türler', bio: 'Biyografi', mixes: 'Setler & mixler', dates: 'Yaklaşan tarihler', book: 'Bu sanatçıyı booking yap', back: 'Tüm sanatçılar', formats: 'Formatlar', press: 'Basın', watch: 'İzle', rider: 'Teknik rider' },
    book: {
      title: 'Sanatçı booking',
      sub: 'Sadece gerçek talepler — 48 saat içinde dönüyoruz.',
      name: 'Adın',
      email: 'E-posta',
      org: 'Şirket / organizatör',
      artist: 'Sanatçı',
      city: 'Şehir',
      country: 'Ülke',
      date: 'Etkinlik tarihi',
      budget: 'Bütçe aralığı (EUR)',
      type: 'Etkinlik türü',
      message: 'Etkinliği anlat',
      any: 'Fark etmez / emin değilim',
      send: 'Talebi gönder',
      sending: 'Gönderiliyor…',
      ok: 'Talebin alındı. Kısa süre içinde dönüş yapacağız.',
      err: 'Gönderilemedi. Lütfen doğrudan bookings@afterhouse.agency adresine yaz.',
      types: ['Kulüp gecesi', 'Festival', 'Özel / marka', 'Open air', 'Diğer'],
    },
    about: {
      title: 'After-hours sesi için bir booking stüdyosu',
      body: [
        'AFTERHOUSE, tek bir fikir üzerine kurulu butik bir booking ve etkinlik stüdyosu: gece, onu anlayan selektörlere aittir. Afro house, melodic house ve techno ekseninde odaklı bir kadroyu temsil eder ve yönlendiririz.',
        'Playlist satmıyoruz. Tarih kuruyoruz — doğru sanatçı, doğru mekân, doğru şehir — ve ilk opsiyondan son plağa kadar her şeyi yönetiyoruz: sözleşme, depozito, lojistik ve organizatörlerin gerçekten açtığı press kit.',
        'İzmir’de kuruldu, dünya genelinde çalışır.',
      ],
      statShows: 'Yönlendirilen etkinlik',
      statCities: 'Şehir',
      statRoster: 'Sanatçı',
    },
    footer: { tag: 'Butik DJ booking & etkinlik küratörlüğü.', built: 'Dünya geneli booking', rights: 'Tüm hakları saklıdır.' },
    meta: {
      home: 'AFTERHOUSE — Butik DJ booking & etkinlik',
      homeDesc: 'Afro house, melodic house ve techno için butik booking ve etkinlik stüdyosu. Dünya genelinde sanatçı booking.',
    },
  },
} as const;

export function getDict(lang: Locale) {
  return dict[lang] ?? dict.en;
}
