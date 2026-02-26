import { useState, useEffect } from 'react';
import { ArrowRight, Ship } from 'lucide-react';

// Импортируем ассеты, которые использовались только в этом компоненте
import featureImg1 from '../assets/Foto/Gemini_Generated_Image_xvj8j5xvj8j5xvj8.png';
import featureImg2 from '../assets/Foto/2025-09-27_13-01-14_msg509.jpg';
import featureImg3 from '../assets/Foto/Gemini_Generated_Image_5nvjjq5nvjjq5nvj.png';

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

export default Features;
