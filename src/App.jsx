import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Anchor, Target, Waves, Activity, ChevronLeft, ChevronRight, Menu, X, User, Ship, Camera, Fish, Music, Heart, MessageCircle, Send, Instagram, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// UTILS
// ==========================================
const useTilt = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const xc = rect.width / 2, yc = rect.height / 2;
      gsap.to(el, { rotateY: (x - xc) / 20, rotateX: -(y - yc) / 20, duration: 0.5, ease: 'power2.out' });
    };
    const onMouseLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5 });
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => { el.removeEventListener('mousemove', onMouseMove); el.removeEventListener('mouseleave', onMouseLeave); };
  }, [ref]);
};

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
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></span>
    </button>
  );
};

// ==========================================
// SHARED UI COMPONENTS
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

  const logoStyle = {
    filter: 'drop-shadow(0.8px 0px 0 white) drop-shadow(-0.8px 0px 0 white) drop-shadow(0px 0.8px 0 white) drop-shadow(0px -0.8px 0 white)'
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-8 py-4 rounded-full transition-all duration-500 flex justify-between items-center text-primary ${scrolled ? 'bg-dark/95 backdrop-blur-xl shadow-2xl border border-white/10 mx-4 md:mx-auto' : 'bg-dark/40 backdrop-blur-md border border-white/10 mx-4 md:mx-auto'}`}>
        <div className="flex items-center gap-4 cursor-pointer shrink-0" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <img src="/LOGO.png" alt="SPARTA" className="h-8 md:h-10 w-auto object-contain" style={logoStyle} />
        </div>
        
        <nav className="hidden lg:flex items-center gap-10 font-heading text-[14px] lowercase tracking-[0.15em] font-medium text-white/90">
          <button onClick={() => scrollTo('captain')} className="hover:text-accent transition-colors">шкипер</button>
          <button onClick={() => scrollTo('yacht')} className="hover:text-accent transition-colors">яхта</button>
          <button onClick={() => scrollTo('protocol')} className="hover:text-accent transition-colors">путь</button>
          <button onClick={() => scrollTo('gallery')} className="hover:text-accent transition-colors">галерея</button>
          <button onClick={() => scrollTo('services')} className="hover:text-accent transition-colors text-accent/80 font-bold">услуги</button>
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
                    <span className="font-heading font-bold text-[9px] uppercase tracking-widest opacity-50">{c.name}</span>
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
        <div className="lg:hidden fixed inset-0 bg-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 font-heading text-xl uppercase tracking-widest text-primary z-[110]">
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
      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" poster="/Foto/2025-09-27_13-01-14_msg509.jpg">
        <source src="/Video/2025-11-09_14-09-39_msg523.MOV" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark"></div>
    </div>
    <div className="relative z-10 max-w-5xl">
      <div className="font-heading font-bold text-accent tracking-[0.4em] uppercase mb-8 text-[10px] md:text-base">Ваш билет к самым красивым местам Приморья</div>
      <h1 className="font-drama italic text-[clamp(2.5rem,15vw,9.5rem)] text-white leading-[0.85] mb-12 break-words uppercase">Окно в океан.</h1>
      <p className="font-data text-primary/70 max-w-2xl mx-auto uppercase text-[10px] md:text-sm tracking-widest leading-loose mb-16 px-4">Не просто аренда яхты — побег из города в тишину моря. Трёхозёрье, Лисий остров и Аскольд — увиденные с воды.</p>
      <MagneticButton className="bg-accent text-white px-10 md:px-14 py-5 md:py-6 text-xs md:text-sm font-heading font-bold uppercase tracking-widest shadow-2xl" onClick={() => window.open('https://t.me/sparta_nakhodka', '_blank')}>написать капитану</MagneticButton>
    </div>
  </section>
);

const FeatureShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Остров Аскольд', img: '/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png' },
    { id: 2, title: 'Остров Лисий', img: '/Foto/2025-09-27_13-01-14_msg509.jpg' },
    { id: 3, title: 'Бухта Трёхозёрье', img: '/Foto/Gemini_Generated_Image_5nvjjq5nvjjq5nvj.png' },
  ]);
  const cycle = () => setCards(prev => { const n = [...prev]; n.push(n.shift()); return n; });
  return (
    <div onClick={cycle} className="bg-primary p-8 md:p-10 rounded-[2.5rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl">
      <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-dark flex justify-between uppercase">локации <ArrowRight size={18} /></h3>
      <div className="relative h-32 md:h-40">
        {cards.map((c, i) => (
          <div key={c.id} className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 shadow-lg" style={{ transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`, opacity: 1 - i * 0.3, zIndex: 10 - i }}>
            <img src={c.img} className="w-full h-full object-cover" alt={c.title} />
            <div className="absolute inset-0 bg-dark/40 flex items-end p-4 font-heading font-bold text-[9px] text-white uppercase tracking-tighter">{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CaptainSection = () => (
  <section id="captain" className="relative py-24 md:py-40 px-6 md:px-16 bg-dark text-white min-h-[100dvh] flex flex-col md:flex-row gap-12 md:gap-20 items-center section-stack border-t border-white/5">
    <div className="w-full md:w-1/2 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-[4/5] shadow-2xl relative img-container">
      <img src="/Foto/2025-06-30_04-37-56_msg461.jpg" className="w-full h-full object-cover transition-all duration-1000 grayscale-0" alt="Шкипер" />
    </div>
    <div className="w-full md:w-1/2 text-left">
      <div className="font-heading font-bold text-accent uppercase tracking-[0.4em] mb-8 text-xs">командор</div>
      <h2 className="font-drama italic text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.9] mb-10 break-words uppercase">Семен Хворостухин</h2>
      <p className="font-data text-sm md:text-base text-primary/60 uppercase tracking-widest leading-loose mb-12 max-w-lg">Опытный яхтсмен. 15 лет стажа. Победитель крупнейших регат Приморья. С ним вы увидите то, что скрыто от глаз обычных туристов.</p>
      <blockquote className="border-l-4 border-accent pl-8 md:pl-10 italic font-drama text-xl md:text-3xl text-white/90 leading-tight">"Море не прощает ошибок, но дарит свободу."</blockquote>
    </div>
  </section>
);

const YachtSection = () => (
  <section id="yacht" className="relative py-24 md:py-40 px-6 md:px-16 bg-background text-dark min-h-[100dvh] flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center section-stack border-t border-dark/5">
    <div className="w-full md:w-1/2 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden aspect-video shadow-2xl img-container">
       <img src="/Foto/2025-09-27_13-01-14_msg509.jpg" className="w-full h-full object-cover grayscale-0 transition-all duration-1000" alt="Яхта SPARTA" />
    </div>
    <div className="w-full md:w-1/2">
      <div className="font-heading font-bold text-accent uppercase tracking-[0.4em] mb-10 text-sm text-left">яхта</div>
      <h2 className="font-drama italic text-[clamp(3rem,12vw,9rem)] leading-[0.9] mb-14 tracking-tighter uppercase break-words text-left">Sparta</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 text-left">
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Модель</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">Bavaria 38</div></div>
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Длина</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">12.13 М</div></div>
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Мачта</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">18 М</div></div>
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Паруса</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">4 / 95 М²</div></div>
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Гости</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">10 Чел</div></div>
        <div><div className="font-data text-[10px] text-dark/30 uppercase mb-2 tracking-widest">Вес</div><div className="font-heading font-bold text-lg md:text-2xl uppercase tracking-tighter">8.5 Т</div></div>
      </div>
      <p className="mt-12 font-data text-[10px] md:text-xs text-dark/70 uppercase tracking-widest leading-loose text-left max-w-xl">
        На борту: 3 уютные каюты, гальюн (WC), душ на корме, полноценный камбуз с плитой и СВЧ, холодильник и аудиосистема Sony Marine. Полный комплект SOLAS.
      </p>
    </div>
  </section>
);

const ProtocolCards = () => {
  const routes = [
    { num: '01', title: 'Остров Аскольд', desc: 'Маяк, заброшенные базы и дикие олени. 4 часа хода.', img: '/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png' },
    { num: '02', title: 'Остров Лисий', desc: 'Заповедная тишина. Чистейшее море в самом центре залива.', img: '/Foto/2025-09-27_13-01-14_msg510.jpg' },
    { num: '03', title: 'Трёхозёрье', desc: 'Визитная карточка Приморья. Бирюзовая вода и белоснежный песок.', img: '/Foto/Gemini_Generated_Image_5nvjjq5nvjjq5nvj.png' },
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
              <div className="font-data text-accent text-2xl mb-6 tracking-[0.5em] uppercase">путь {r.num}</div>
              <h2 className="font-drama italic text-[clamp(2.5rem,10vw,7rem)] text-dark mb-10 leading-[0.9] break-words uppercase">{r.title}</h2>
              <p className="font-data text-dark/70 text-sm md:text-xl uppercase tracking-widest leading-relaxed max-w-md">{r.desc}</p>
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
  const photos = ['/Foto/2025-09-27_13-01-14_msg510.jpg', '/Foto/2025-09-21_14-46-04_msg499.jpg', '/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png', '/Foto/2025-09-23_11-14-51_msg504.jpg', '/Foto/2025-09-27_13-01-14_msg511.jpg', '/Foto/2025-09-21_14-46-04_msg502.jpg'];
  
  useEffect(() => { const itv = setInterval(() => setActive(a => (a + 1) % photos.length), 2000); return () => clearInterval(itv); }, [photos.length]);

  return (
    <section id="gallery" className="relative py-24 md:py-40 px-6 md:px-16 bg-dark min-h-[100dvh] flex flex-col justify-center section-stack border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-drama italic text-[clamp(3rem,12vw,9rem)] mb-16 md:mb-24 text-center leading-none uppercase">галерея.</h2>
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
  <section id="services" className="relative py-24 md:py-40 px-6 md:px-16 bg-background min-h-[100dvh] flex flex-col justify-center border-t border-dark/5 section-stack">
    <div className="max-w-7xl mx-auto w-full text-center">
      <h2 className="font-drama italic text-[clamp(2.5rem,12vw,8rem)] text-dark mb-16 md:mb-24 leading-none uppercase">услуги.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[ 
          { title: "базовые", items: ["Прогулки", "Рыбалка", "Острова"], icon: <Waves className="text-accent" /> },
          { title: "премиум", items: ["Фотосет", "Кейтеринг", "Саксофон"], icon: <Heart className="text-accent" />, featured: true },
          { title: "спец", items: ["Трофейная", "Ларги", "Туманы"], icon: <Fish className="text-accent" /> }
        ].map((s, i) => (
          <div key={i} className={`p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border transition-all flex flex-col ${s.featured ? 'bg-dark text-white border-accent shadow-2xl scale-100 md:scale-105 z-10' : 'bg-primary border-dark/5 text-dark'}`}>
            <h3 className="font-heading font-bold text-xl md:text-2xl uppercase mb-8 md:mb-10 tracking-tighter lowercase text-left">{s.title}</h3>
            <ul className="space-y-4 mb-10 flex-grow text-left">
              {s.items.map((item, idx) => (
                <li key={idx} className="font-data text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>{item}</li>
              ))}
            </ul>
            <MagneticButton className={`w-full py-4 md:py-5 px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg ${s.featured ? 'bg-accent text-white' : 'bg-dark text-white'}`} onClick={() => window.open('https://t.me/sparta_nakhodka', '_blank')}>забронировать</MagneticButton>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => {
  const soc = [
    { n: 'WhatsApp', h: '+7 999 000 00 00', i: <MessageCircle size={16}/>, l: 'https://wa.me/79990000000' },
    { n: 'Telegram', h: '@sparta_nakhodka', i: <Send size={16}/>, l: 'https://t.me/sparta_nakhodka' },
    { n: 'Instagram', h: '@sparta_sailing', i: <Instagram size={16}/>, l: 'https://instagram.com/sparta_sailing' }
  ];
  return (
    <footer className="bg-dark text-primary py-24 md:py-32 px-6 md:px-16 border-t border-white/10 z-[120] relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/5 pb-16 md:pb-24">
          <div className="shrink-0">
            <img src="/LOGO.png" alt="SPARTA" className="h-10 md:h-12 w-auto mb-8 md:mb-10" style={{filter:'drop-shadow(0.5px 0.5px 0 white) drop-shadow(-0.5px -0.5px 0 white)'}}/>
            <div className="flex items-center gap-3 text-primary/40 font-data text-[10px] md:text-xs uppercase tracking-[0.3em]">
              <MapPin size={14} className="text-accent" /> Находка, Причал "Восток"
            </div>
          </div>
          <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-8">
            {soc.map((s, i) => (
              <a key={i} href={s.l} target="_blank" className="flex items-center gap-3 group">
                <span className="p-2 md:p-3 rounded-full bg-white/5 group-hover:bg-accent transition-colors">{s.i}</span>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-[8px] uppercase tracking-[0.4em] opacity-30 mb-1">{s.n}</span>
                  <span className="font-data text-xs lowercase tracking-tight group-hover:text-accent transition-colors">{s.h}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-20 font-data text-[9px] uppercase tracking-[0.5em]">
          <div>© 2026 SPARTA</div>
          <div className="tracking-widest uppercase">Made by VOID STUDIO</div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const layers = gsap.utils.toArray('.section-stack');
      layers.forEach((layer, i) => {
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
              gsap.to(img, { filter: `grayscale(${progress * 100}%)`, opacity: 1 - progress * 0.6, duration: 0.1 });
              gsap.to(layer, { scale: 1 - progress * 0.05, duration: 0.1 });
            }
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background min-h-screen overflow-x-hidden selection:bg-accent selection:text-white">
      <ClassicAppBar />
      <Hero />
      <section id="features" className="relative py-16 md:py-24 px-6 md:px-16 bg-background z-[60] border-b border-dark/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureShuffler />
          <div onClick={() => document.getElementById('captain').scrollIntoView({behavior:'smooth'})} className="bg-dark p-8 rounded-[2rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl">
            <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-white uppercase">шкипер</h3>
            <div className="font-data text-[10px] leading-relaxed uppercase text-primary/70 whitespace-pre-wrap">Шкипер Семен Хворостухин. 15 лет в море. Лицензия IYT Yachtmaster. Директива: Безопасность и безупречный отдых.</div>
            <div className="mt-auto text-accent font-heading font-bold text-[9px] uppercase flex items-center gap-2 tracking-widest uppercase uppercase">досье <ArrowRight size={14} /></div>
          </div>
          <div onClick={() => document.getElementById('yacht').scrollIntoView({behavior:'smooth'})} className="bg-primary p-8 rounded-[2rem] h-72 md:h-80 relative overflow-hidden group cursor-pointer shadow-xl transition-all">
            <h3 className="font-heading font-bold text-xs uppercase mb-6 md:mb-8 tracking-widest text-dark flex justify-between uppercase uppercase">яхта <Ship size={20} /></h3>
            <div className="font-data text-[10px] text-dark/60 uppercase tracking-widest leading-loose">Bavaria 38 / 12.13м / 8.5т<br/>Экипаж: 10 человек<br/>3 Каюты / WC / Камбуз</div>
            <div className="mt-auto border border-dark text-dark p-3 rounded-xl flex justify-between items-center font-heading font-bold text-[9px] uppercase tracking-widest uppercase">спецификация <ArrowRight size={14} /></div>
          </div>
        </div>
      </section>
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
