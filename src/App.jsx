import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Waves, Menu, X, Ship, Fish, Heart, MessageCircle, Send, Instagram, MapPin } from 'lucide-react';

// Импортируем все ассеты, чтобы Vite обработал пути
import logoUrl from './assets/LOGO.png';
import heroPoster from './assets/Foto/2025-09-27_13-01-14_msg509.jpg';
import heroVideo from './assets/Video/2025-11-09_14-09-39_msg523.MOV';
import featureImg1 from './assets/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png';
import featureImg2 from './assets/Foto/2025-09-27_13-01-14_msg509.jpg';
import featureImg3 from './assets/Foto/Gemini_Generated_Image_5nvjjq5nvjjq5nvj.png';
import captainImg from './assets/Foto/2025-06-30_04-37-56_msg461.jpg';
import yachtImg from './assets/Foto/2025-09-27_13-01-14_msg509.jpg';
import protocolImg1 from './assets/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png';
import protocolImg2 from './assets/Foto/2025-09-27_13-01-14_msg510.jpg';
import protocolImg3 from './assets/Foto/Gemini_Generated_Image_5nvjjq5nvjjq5nvj.png';
import galleryImg1 from './assets/Foto/2025-09-27_13-01-14_msg510.jpg';
import galleryImg2 from './assets/Foto/2025-09-21_14-46-04_msg499.jpg';
import galleryImg3 from './assets/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png';
import galleryImg4 from './assets/Foto/2025-09-23_11-14-51_msg504.jpg';
import galleryImg5 from './assets/Foto/2025-09-27_13-01-14_msg511.jpg';
import galleryImg6 from './assets/Foto/2025-09-21_14-46-04_msg502.jpg';


gsap.registerPlugin(ScrollTrigger);

// ========================================== 
// SHARED CONSTANTS & COMPONENTS
// ========================================== 

const LogoImage = ({ className = "h-10 w-auto" }) => (
  <img 
    src={logoUrl} 
    alt="SPARTA" 
    className={`${className} object-contain`}
    style={{ 
      filter: 'drop-shadow(1px 0px 0px #fff) drop-shadow(-1px 0px 0px #fff) drop-shadow(0px 1px 0px #fff) drop-shadow(0px -1px 0px #fff)' 
    }} 
  />
);

const MagneticButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null);
  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.innerWidth < 768) return;
    let ctx = gsap.context(() => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2, y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.2, y: y * 0.2, scale: 1.05, duration: 0.6, ease: 'power3.out' });
      });
      button.addEventListener('mouseleave', () => gsap.to(button, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' }));
    }, button);
    return () => ctx.revert();
  }, []);
  return (
    <button ref={buttonRef} className={`relative overflow-hidden group rounded-full shrink-0 ${className}`} onClick={onClick}>
      <span className="relative z-10 flex items-center justify-center gap-2 text-center">{children}</span>
      <span className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></span>
    </button>
  );
};

// ========================================== 
// NAVIGATION
// ========================================== 

const ClassicAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const contacts = [
    { name: 'WhatsApp', handle: '+7 999 000 00 00', icon: <MessageCircle size={18} />, link: 'https://wa.me/79990000000', color: 'hover:bg-green-500' },
    { name: 'Telegram', handle: '@sparta_nakhodka', icon: <Send size={18} />, link: 'https://t.me/sparta_nakhodka', color: 'hover:bg-blue-500' },
    { name: 'Instagram', handle: '@sparta_sailing', icon: <Instagram size={18} />, link: 'https://instagram.com/sparta_sailing', color: 'hover:bg-pink-500' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-8 py-4 rounded-full transition-all duration-500 flex justify-between items-center text-primary ${scrolled ? 'bg-dark/95 backdrop-blur-xl shadow-2xl border border-white/10 mx-4 md:mx-auto' : 'bg-dark/40 backdrop-blur-md border border-white/10 mx-4 md:mx-auto'}`}> 
        <div className="flex items-center gap-4 cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <LogoImage className="h-8 md:h-10 w-auto" />
        </div>
        
        <nav className="hidden lg:flex items-center gap-10 font-heading text-[14px] lowercase tracking-[0.15em] font-medium text-white/90 px-6">
          <button onClick={() => scrollTo('captain')} className="hover:text-accent transition-colors shrink-0">шкипер</button>
          <button onClick={() => scrollTo('yacht')} className="hover:text-accent transition-colors shrink-0">яхта</button>
          <button onClick={() => scrollTo('protocol')} className="hover:text-accent transition-colors shrink-0">путь</button>
          <button onClick={() => scrollTo('gallery')} className="hover:text-accent transition-colors shrink-0">галерея</button>
          <button onClick={() => scrollTo('services')} className="hover:text-accent transition-colors shrink-0 text-accent font-bold">услуги</button>
        </nav>
        <div className="hidden md:block relative shrink-0">
          <MagneticButton className="bg-accent text-white px-8 py-3 font-heading text-xs font-bold uppercase tracking-widest shadow-lg" onClick={() => setShowContactMenu(!showContactMenu)}>
            написать капитану
          </MagneticButton>
          {showContactMenu && (
            <div ref={dropdownRef} className="absolute top-full right-0 mt-4 bg-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 w-72 shadow-2xl" onMouseLeave={() => setShowContactMenu(false)}>
              {contacts.map((c, i) => (
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${c.color} hover:text-white`}>
                  <div className="flex flex-col text-left">
                    <span className="font-heading font-bold text-[11px] md:text-[9px] uppercase tracking-widest opacity-50">{c.name}</span>
                    <span className="font-data text-xs tracking-tight">{c.handle}</span>
                  </div>
                  {c.icon}
                </a>
              ))}
            </div>
          )}
        </div>
        <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 font-heading text-xl uppercase tracking-widest text-primary z-[160]">
          <button onClick={() => scrollTo('captain')}>Шкипер</button>
          <button onClick={() => scrollTo('yacht')}>Яхта</button>
          <button onClick={() => scrollTo('protocol')}>Путь</button>
          <button onClick={() => scrollTo('gallery')}>Галерея</button>
          <button onClick={() => scrollTo('services')}>Услуги</button>
          <button className="absolute top-10 right-10 text-white" onClick={() => setIsOpen(false)}><X size={32} /></button>
        </div>
      )}
    </header>
  );
};

// ========================================== 
// SECTIONS
// ========================================== 

const Hero = () => (
  <section id="hero" className="relative h-[100dvh] w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-dark section-stack">
    <div className="absolute inset-0 z-0 img-container">
      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" poster={heroPoster}>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark"></div>
    </div>
    <div className="relative z-10 max-w-5xl">
      <div className="font-heading font-bold text-accent tracking-[0.4em] uppercase mb-8 text-xs md:text-base">Ваш билет к самым красивым местам Приморья</div>
      <h1 className="font-drama italic text-[clamp(2.5rem,15vw,9.5rem)] text-white leading-[0.85] mb-12 break-words uppercase text-contour">Окно в океан.</h1>
      <p className="font-data text-primary/70 max-w-2xl mx-auto uppercase text-xs md:text-sm tracking-widest leading-loose mb-16 px-4">Не просто аренда яхты — побег из города в тишину моря. Трёхозёрье, Лисий остров и Аскольд — увиденные с воды.</p>
      <MagneticButton className="bg-accent text-white px-10 md:px-14 py-5 md:py-6 text-xs md:text-sm font-heading font-bold uppercase tracking-widest shadow-2xl" onClick={() => window.open('https://t.me/sparta_nakhodka', '_blank')}>написать капитану</MagneticButton>
    </div>
  </section>
);

const Features = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Остров Аскольд', img: featureImg1 },
    { id: 2, title: 'Остров Лисий', img: featureImg2 },
    { id: 3, title: 'Бухта Трёхозёрье', img: featureImg3 },
  ]);
  const cycle = () => setCards(prev => { const n = [...prev]; n.push(n.shift()); return n; });
  const text = "> ШКИПЕР СЕМЕН ХВОРОСТУХИН\n> СТАТУС: НАДЕЖЕН\n> ЛИЦЕНЗИЯ: IYT YACHTMASTER...";
  const [disp, setDisp] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => { setDisp(text.substring(0, i)); i = (i + 1) % (text.length + 1); }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-24 px-6 md:px-16 bg-background relative z-10 border-b border-dark/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <div onClick={cycle} className="bg-primary p-8 md:p-10 rounded-[2.5rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl">
          <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-dark flex justify-between uppercase">локации <ArrowRight size={18} /></h3>
          <div className="relative h-32 md:h-40">
            {cards.map((c, i) => (
              <div key={c.id} className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg" style={{ transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`, opacity: 1 - i * 0.3, zIndex: 10 - i }}>
                <img src={c.img} className="w-full h-full object-cover" alt={c.title} />
                <div className="absolute inset-0 bg-dark/40 flex items-end p-4 font-heading font-bold text-[11px] md:text-[9px] text-white uppercase tracking-tighter">{c.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div onClick={() => document.getElementById('captain').scrollIntoView({behavior:'smooth'})} className="bg-dark p-8 md:p-10 rounded-[2.5rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl">
          <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-white uppercase uppercase">шкипер</h3>
          <div className="font-data text-xs md:text-[10px] leading-relaxed uppercase text-primary/70 whitespace-pre-wrap font-medium">{disp}</div>
          <div className="mt-auto text-accent font-heading font-bold text-[11px] md:text-[9px] uppercase flex items-center gap-2 tracking-widest font-bold">досье <ArrowRight size={14} /></div>
        </div>
        <div onClick={() => document.getElementById('yacht').scrollIntoView({behavior:'smooth'})} className="bg-primary p-8 md:p-10 rounded-[2.5rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl transition-all font-medium">
          <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-dark flex justify-between uppercase">яхта <Ship size={20} /></h3>
          <div className="font-data text-xs md:text-[10px] text-dark/60 uppercase tracking-widest leading-loose">Bavaria 38 / 12.13м / 8.5т<br/>Экипаж: 10 человек<br/>3 Каюты / WC / Камбуз</div>
          <div className="mt-auto border border-dark text-dark p-3 rounded-xl flex justify-between items-center font-heading font-bold text-[11px] md:text-[9px] uppercase tracking-widest font-bold">спецификация <ArrowRight size={14} /></div>
        </div>
      </div>
    </section>
  );
};

const CaptainSection = () => (
  <section id="captain" className="relative py-24 md:py-40 px-6 md:px-16 bg-dark text-white min-h-[100dvh] flex flex-col md:flex-row gap-12 md:gap-20 items-center section-stack border-t border-white/5">
    <div className="w-full md:w-1/2 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-2xl relative img-container">
      <img src={captainImg} className="w-full h-full object-cover transition-all duration-1000 grayscale-0" alt="Шкипер" />
    </div>
    <div className="w-full md:w-1/2 text-left text-white font-medium">
      <div className="font-heading font-bold text-accent uppercase tracking-[0.4em] mb-8 text-xs">командор</div>
      <h2 className="font-drama italic text-[clamp(2rem,10vw,7.5rem)] leading-[0.9] mb-10 break-words uppercase">Семен Хворостухин</h2>
      <p className="font-data text-sm md:text-base text-white/80 uppercase tracking-widest leading-loose mb-12 max-w-lg">Опытный яхтсмен. 15 лет стажа. Победитель крупнейших регат Приморья. С ним вы увидите то, что скрыто от глаз обычных туристов.</p>
      <blockquote className="border-l-4 border-accent pl-8 md:pl-10 italic font-drama text-xl md:text-3xl text-white leading-tight">&quot;Море не прощает ошибок, но дарит свободу.&quot;</blockquote>
    </div>
  </section>
);

const YachtSection = () => (
  <section id="yacht" className="relative py-24 md:py-40 px-6 md:px-16 bg-background text-dark min-h-[100dvh] flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center section-stack border-t border-dark/5">
    <div className="w-full md:w-1/2 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-video shadow-2xl img-container">
       <img src={yachtImg} className="w-full h-full object-cover grayscale-0 transition-all duration-1000" alt="Яхта SPARTA" />
    </div>
    <div className="w-full md:w-1/2">
      <div className="font-heading font-bold text-accent uppercase tracking-[0.4em] mb-10 text-xs text-left font-medium uppercase tracking-[0.2em]">яхта</div>
      <h2 className="font-drama italic text-[clamp(2.5rem,12vw,9rem)] leading-[0.9] mb-14 tracking-tighter uppercase break-words text-left">Sparta</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-left">
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Модель</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">Bavaria 38</div></div>
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Длина</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">12.13 М</div></div>
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Мачта</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">18 М</div></div>
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Паруса</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">4 / 95 М²</div></div>
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Гости</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">10 Чел</div></div>
        <div><div className="font-data text-xs md:text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Вес</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter text-dark font-medium">8.5 Т</div></div>
      </div>
      <p className="mt-12 font-data text-xs md:text-xs text-dark uppercase tracking-widest leading-loose text-left max-w-xl font-medium">
        На борту: 3 уютные каюты, гальюн (WC), душ на корме, полноценный камбуз с плитой и СВЧ, холодильник и аудиосистема Sony Marine. Полный комплект спасательных средств SOLAS.
      </p>
    </div>
  </section>
);

const ProtocolCards = () => {
  const routes = [
    { num: '01', title: 'Остров Аскольд', desc: 'Маяк, заброшенные базы и дикие олени. 4 часа хода.', img: protocolImg1 },
    { num: '02', title: 'Остров Лисий', desc: 'Заповедная жемчужина. Чистейшее море в самом центре залива.', img: protocolImg2 },
    { num: '03', title: 'Трёхозёрье', desc: 'Визитная карточка Приморья. Бирюзовая вода и белоснежный песок.', img: protocolImg3 },
  ];

  return (
    <div id="protocol">
      {routes.map((r, i) => (
        <section key={i} className="h-[100dvh] w-full flex items-center justify-center bg-background overflow-hidden border-t border-dark/5 section-stack">
          <div className="bg-primary w-full h-full flex flex-col md:flex-row relative">
            <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden shrink-0 img-container">
               <img src={r.img} className="w-full h-full object-cover transition-all duration-1000 grayscale-0" alt={r.title} />
            </div>
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-24 flex flex-col justify-center bg-primary text-left">
              <div className="font-data text-accent text-2xl mb-6 tracking-[0.5em] uppercase font-medium">путь {r.num}</div>
              <h2 className="font-drama italic text-[clamp(2.5rem,10vw,7rem)] text-dark mb-10 leading-[0.9] break-words uppercase">{r.title}</h2>
              <p className="font-data text-dark text-sm md:text-xl uppercase tracking-widest leading-relaxed max-w-md font-medium">{r.desc}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [lb, setLb] = useState(null);
  const [active, setActive] = useState(0);
  const photos = [galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6];
  
  useEffect(() => { const itv = setInterval(() => setActive(a => (a + 1) % photos.length), 2000); return () => clearInterval(itv); }, [photos.length]);

  return (
    <section id="gallery" className="relative py-24 md:py-40 px-6 md:px-16 bg-dark flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-drama italic text-[clamp(3rem,12vw,9rem)] mb-16 md:mb-24 text-center leading-none uppercase text-white">галерея.</h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((p, i) => (
            <div key={i} onClick={() => setLb(p)} className={`relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/5 transition-all duration-700 cursor-pointer ${active === i ? 'grayscale-0 scale-[1.03] shadow-2xl border-accent opacity-100' : 'grayscale opacity-30 scale-100'}`}>
              <img src={p} className="w-full h-auto object-cover" alt="Moment" />
            </div>
          ))}
        </div>
      </div>
      {lb && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10" onClick={() => setLb(null)}>
          <button className="absolute top-10 right-10 text-white hover:text-accent transition-colors"><X size={40} /></button>
          <img src={lb} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" alt="Lightbox" />
        </div>
      )}
    </section>
  );
};

const Services = () => (
  <section id="services" className="relative py-12 md:py-20 px-6 md:px-16 bg-background border-t border-dark/5">
    <div className="max-w-7xl mx-auto w-full text-center">
      <h2 className="font-drama italic text-[clamp(2rem,8vw,6rem)] text-dark mb-8 md:mb-12 leading-none uppercase tracking-tighter">услуги.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[ 
          { title: "базовые", items: ["Прогулки", "Рыбалка", "Острова"], icon: <Waves className="text-accent" /> },
          { title: "премиум", items: ["Фотосет", "Кейтеринг", "Саксофон"], icon: <Heart className="text-accent" />, featured: true },
          { title: "спец", items: ["Трофейная", "Ларги", "Туманы"], icon: <Fish className="text-accent" /> }
        ].map((s, i) => (
          <div key={i} className={`p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border transition-all flex flex-col ${s.featured ? 'bg-dark text-white border-accent shadow-xl scale-100 md:scale-105 z-10' : 'bg-primary border-dark/5 text-dark'}`}>
            <h3 className="font-heading font-bold text-lg md:text-xl uppercase mb-4 md:mb-6 tracking-tighter lowercase text-left font-medium">{s.title}</h3>
            <ul className="space-y-2 mb-8 flex-grow text-left text-current font-bold">
              {s.items.map((item, idx) => (
                <li key={idx} className="font-data text-xs md:text-xs uppercase tracking-widest flex items-center gap-2 font-bold"><span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>{item}</li>
              ))}
            </ul>
            <MagneticButton className={`w-full py-3 md:py-4 px-4 text-xs md:text-[10px] font-bold uppercase tracking-widest shadow-lg ${s.f ? 'bg-accent text-white' : 'bg-dark text-white'}`} onClick={() => window.open('https://t.me/sparta_nakhodka', '_blank')}>забронировать</MagneticButton>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => {
  const soc = [
    { n: 'WhatsApp', h: '+7 999 000 00 00', i: <MessageCircle size={18}/>, l: 'https://wa.me/79990000000' },
    { n: 'Telegram', h: '@sparta_nakhodka', i: <Send size={18}/>, l: 'https://t.me/sparta_nakhodka' },
    { n: 'Instagram', h: '@sparta_sailing', i: <Instagram size={18}/>, l: 'https://instagram.com/sparta_sailing' }
  ];
  return (
    <footer className="bg-dark text-white py-10 px-6 md:px-16 border-t border-white/10 z-[50] relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-white/10 pb-10">
          <div className="shrink-0">
            <LogoImage className="h-10 w-auto mb-6" />
            <div className="flex items-center gap-3 text-white font-data text-xs md:text-sm uppercase tracking-[0.3em] font-bold">
              <MapPin size={16} className="text-accent" /> Находка, Причал &quot;Восток&quot;
            </div>
          </div>
          <div className="flex flex-wrap gap-x-10 md:gap-x-16 gap-y-6">
            {soc.map((s, i) => (
              <a key={i} href={s.l} target="_blank" className="flex items-center gap-3 group">
                <span className="p-2 md:p-3 rounded-full bg-white/10 group-hover:bg-accent transition-colors font-bold">{s.i}</span>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-[11px] md:text-[9px] uppercase tracking-[0.4em] text-accent mb-0.5 font-bold">{s.n}</span>
                  <span className="font-data text-sm lowercase tracking-tight text-white group-hover:text-accent transition-colors font-bold">{s.h}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white font-data text-xs md:text-xs uppercase tracking-[0.5em] font-bold">
          <div className="opacity-40">© 2026 SPARTA SAILING</div>
          <div className="opacity-40 tracking-widest uppercase">Designed by VOID STUDIO</div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(containerRef);

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;
      const layers = gsap.utils.toArray('.section-stack');
      
      layers.forEach((layer) => {
        ScrollTrigger.create({
          trigger: layer,
          start: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const img = layer.querySelector('.img-container img, .img-container video');
            if (img && progress > 0) {
              // Только на десктопе применяем дорогой grayscale фильтр
              if (isDesktop) {
                gsap.to(img, { filter: `grayscale(${progress * 100}%)`, opacity: 1 - progress * 0.6, duration: 0.1 });
              } else {
                gsap.to(img, { opacity: 1 - progress * 0.6, duration: 0.1 });
              }
              gsap.to(layer, { scale: 1 - progress * 0.05, duration: 0.1 });
            }
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background min-h-screen overflow-x-hidden selection:bg-accent selection:text-white">
      <ClassicAppBar />
      <Hero />
      <Features />
      <CaptainSection />
      <YachtSection />
      <ProtocolCards />
      <Gallery />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
