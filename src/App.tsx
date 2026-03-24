/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Star, 
  ChevronDown, 
  Gift, 
  Heart, 
  Users, 
  BookOpen, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white border border-brand-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-sm font-bold text-brand-text">{question}</span>
        <ChevronDown 
          className={`text-brand-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={18} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-xs text-brand-text-muted leading-relaxed border-t border-brand-border pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('offer_countdown');
    if (savedTime) {
      const parsed = parseInt(savedTime, 10);
      return isNaN(parsed) ? 12 * 60 + 28 : parsed;
    }
    return 12 * 60 + 28;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem('offer_countdown', next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-primary selection:text-white font-sans overflow-x-hidden pt-[52px]">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-brand-accent/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[35%] rounded-full bg-brand-secondary/5 blur-[110px]" />
      </div>

      {/* TOP BAR / COUNTDOWN */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[9999] bg-[#FCFCFC]/90 backdrop-blur-md py-4 text-center border-b border-brand-border shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
          A OFERTA ENCERRA EM: <span id="countdown" className="bg-brand-primary text-white px-3 py-1 rounded-full ml-1 shadow-sm">{formatTime(timeLeft)}</span>
        </p>
      </motion.div>

      {/* HERO SECTION */}
      <header className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-[10px] font-bold text-brand-text-muted uppercase shadow-sm">
            <div className="flex gap-0.5 text-brand-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
            </div>
            <span>+2.500 mulheres impactadas</span>
          </div>
          
          <h1 className="mb-8 text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl text-brand-text">
            Um eBook silencioso… mas capaz de <span className="text-brand-primary">transformar sua vida</span> e sua família <span className="text-brand-primary">de dentro para fora.</span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-3xl text-base text-brand-text-muted md:text-lg font-medium leading-relaxed">
            Histórias reais de 14 mulheres que enfrentaram desafios familiares, reconstruíram a autoestima e descobriram um novo jeito de viver — mesmo começando do zero.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Sem experiência anterior",
              "Sem precisar aparecer",
              "Usando o que você já tem"
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-brand-border py-4 px-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CheckCircle2 size={18} className="text-brand-primary" />
                <span className="text-xs font-bold text-brand-text">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* VIDEO SECTION */}
      <section className="relative z-10 py-24 px-6 bg-white/30 backdrop-blur-sm border-y border-brand-border">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-xs font-bold tracking-[0.3em] text-brand-primary uppercase">
            Assista esse vídeo antes que saia do ar
          </h2>
          
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[2.5rem] bg-white border border-brand-border shadow-2xl group cursor-pointer hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/5 transition-colors z-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary text-white shadow-2xl shadow-brand-primary/40 group-hover:scale-110 transition-transform duration-300">
                <Play fill="currentColor" size={28} />
              </div>
            </div>
            <img 
              src="https://picsum.photos/seed/women-story/600/1067" 
              alt="Video Thumbnail" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-16">
            <button 
              onClick={scrollToOffer}
              className="w-full max-w-md rounded-2xl bg-brand-primary py-6 text-sm font-bold text-white shadow-xl shadow-brand-primary/30 transition-all hover:bg-brand-warm active:scale-95 uppercase tracking-wider"
            >
              QUERO COMEÇAR MINHA TRANSFORMAÇÃO HOJE
            </button>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-primary" />
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-primary" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-brand-primary" />
                <span>Leitura no celular</span>
              </div>
            </div>

            <p className="mt-10 text-xs italic text-brand-text-muted font-medium max-w-lg mx-auto leading-relaxed">
              "Esse método simples está fazendo mulheres recuperarem sua autoestima com baixo investimento"
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (WHATSAPP STYLE) */}
      <section className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center text-xs font-bold tracking-[0.2em] text-brand-primary uppercase">
            Mulheres comuns, vivendo transformações reais:
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-brand-text">
            O que nossas <span className="text-brand-primary">leitoras estão dizendo</span>
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Mariana S.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
                text: "Olha eu comprei achando que era mais um eBook de autoajuda. Mas a parte da reconstrução me abriu o olho. Comecei a aplicar as técnicas de silêncio e paciência. O clima em casa mudou completamente. O marido percebe o valor antes mesmo de eu falar.",
                date: "23/02/2026"
              },
              {
                name: "Ana Paula",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
                text: "Fiz o que o eBook sugeriu e postei um vídeo do meu novo hobby. Aquele verde do jardim é ridículo de fotogênico. Em 4 dias fui de 340 pra quase 3 mil seguidores. E esgotei tudo que eu tinha produzido antes do vídeo completar 24h. Tô com lista de espera agora 😂",
                date: "08/03/2026"
              },
              {
                name: "Carla Oliveira",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
                text: "Tenho 54 anos e achei que não ia conseguir. Mas as histórias são tão reais que não precisam de complicação, é exatamente como o guia explica. Fiz o exercício de perdão na primeira semana. Vendi 18 ideias só pra vizinhos e família. Agora tô partindo pro próximo nível 🤩",
                date: "11/03/2026"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-6 shadow-sm border border-brand-border hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4 border-b border-brand-border pb-3">
                  <div className="h-10 w-10 rounded-full bg-brand-secondary/20 overflow-hidden border border-brand-border">
                    <img src={card.avatar} alt={card.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-brand-text">{card.name}</p>
                    <p className="text-[10px] text-green-600 font-bold">online</p>
                  </div>
                  <div className="flex gap-2 text-brand-text-muted/40">
                    <Users size={14} />
                    <Clock size={14} />
                  </div>
                </div>
                <div className="bg-[#E7F3EF] p-4 rounded-2xl rounded-tl-none mb-2 shadow-inner">
                  <p className="text-[11px] text-brand-text leading-relaxed">
                    {card.text}
                  </p>
                  <p className="text-[9px] text-brand-text-muted text-right mt-2 font-medium">{card.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM VS SOLUTION */}
      <section className="relative z-10 bg-white/50 backdrop-blur-sm py-32 px-6 border-y border-brand-border">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-text md:text-4xl">
            Por que você ainda <span className="text-brand-primary">não vive seu propósito?</span>
          </h2>
          <p className="mb-16 text-sm text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
            A maioria das mulheres falha porque tenta reinventar a roda ou complica o que deveria ser simples.
          </p>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            {/* Problema */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-lg font-bold text-brand-text uppercase tracking-wider">
                <XCircle size={20} className="text-brand-primary/40" /> O problema atual
              </h3>
              <div className="space-y-4">
                {[
                  "Não sabe por onde começar",
                  "Acha que precisa de muito tempo para si",
                  "Não tem ideia de como se valorizar",
                  "Tem medo de falhar e ser julgada",
                  "Gasta horas em rotinas que não dão certo"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-white border border-brand-border p-5 text-xs text-brand-text-muted shadow-sm">
                    <XCircle size={16} className="text-brand-text-muted/30" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Solução */}
            <div>
              <h3 className="mb-8 flex items-center gap-3 text-lg font-bold text-brand-primary uppercase tracking-wider">
                <CheckCircle2 size={20} /> Nossa Solução
              </h3>
              <div className="space-y-4">
                {[
                  "Método passo a passo simples e direto",
                  "Histórias reais, testadas e aprovadas",
                  "Estratégias validadas para mudar rápido",
                  "Guia de reconexão com melhor custo-benefício",
                  "Suporte para tirar todas as suas dúvidas"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-white border border-brand-primary/20 p-5 text-xs text-brand-text font-bold shadow-sm hover:shadow-md transition-shadow">
                    <CheckCircle2 size={16} className="text-brand-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={scrollToOffer}
            className="mt-16 inline-flex items-center gap-3 text-xs font-bold text-brand-text-muted hover:text-brand-primary transition-all uppercase tracking-widest group"
          >
            <Play size={14} className="fill-brand-primary text-brand-primary group-hover:scale-125 transition-transform" />
            Veja tudo o que você recebe hoje
          </button>
        </div>
      </section>

      {/* WHO IT'S FOR / NOT FOR */}
      <section className="relative z-10 py-32 px-6 bg-white/30 backdrop-blur-sm border-t border-brand-border">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-3xl bg-white border border-brand-border p-10 shadow-sm">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-brand-text uppercase tracking-wider">
                <CheckCircle2 size={24} className="text-green-500" /> Para quem é:
              </h3>
              <ul className="space-y-6">
                {[
                  "Mulheres que querem se reencontrar",
                  "Mães que querem melhorar a relação com os filhos",
                  "Quem busca crescimento emocional real"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-brand-text-muted font-medium">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white border border-brand-border p-10 shadow-sm">
              <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-brand-text uppercase tracking-wider">
                <XCircle size={24} className="text-brand-primary/40" /> Para quem não é:
              </h3>
              <ul className="space-y-6">
                {[
                  "Quem quer solução rápida",
                  "Quem não gosta de leitura",
                  "Quem não quer refletir"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm text-brand-text-muted font-medium">
                    <div className="h-2 w-2 rounded-full bg-brand-primary/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER CARDS */}
      <section className="relative z-10 py-32 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-20 text-3xl font-bold text-brand-text">
            Você leva <span className="text-brand-primary">tudo isso hoje:</span>
          </h2>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-24">
            {[
              { title: "eBook Principal", desc: "O passo a passo definitivo para sua transformação.", label: "PRINCIPAL", icon: <BookOpen /> },
              { title: "Histórias Extras", desc: "Relatos mais profundos que garantem inspiração.", label: "BÔNUS #1", icon: <Users /> },
              { title: "Guia de Leitura", desc: "Curadoria especial de 5 eBooks para 2026.", label: "BÔNUS #2", icon: <Star /> },
              { title: "Comunidade VIP", desc: "Acesso a grupo exclusivo para troca de experiências.", label: "BÔNUS #3", icon: <Heart /> }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center p-8 rounded-[2rem] bg-white border border-brand-border text-left shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="absolute top-6 right-6 bg-brand-bg px-3 py-1 rounded-full text-[8px] font-bold text-brand-primary tracking-widest border border-brand-border">
                  {item.label}
                </div>
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="mb-4 font-bold text-xl text-brand-text leading-tight">{item.title}</h4>
                <p className="text-xs text-brand-text-muted mb-8 leading-relaxed">{item.desc}</p>
                <div className="mt-auto pt-6 border-t border-brand-border w-full flex justify-between items-center">
                  <span className="text-[10px] text-brand-text-muted line-through font-medium">De R$ 47,00</span>
                  <span className="text-sm font-bold text-brand-primary">GRÁTIS</span>
                </div>
              </div>
            ))}
          </div>

          <div id="offer" className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-border group">
                <img 
                  src="https://i.imgur.com/8kCH0G9.png" 
                  alt="Product Mockup" 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-brand-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  OFERTA EXCLUSIVA
                </div>
              </div>

              <div className="text-left space-y-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-brand-text-muted uppercase tracking-[0.2em]">
                    EBOOK COMPLETO: R$ 97,00 <br /> BÔNUS INCLUSOS: R$ 133,00
                  </p>
                  <p className="text-sm font-bold text-brand-primary/60 line-through">Valor Total: R$ 230,00</p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-widest leading-relaxed">
                    Por menos do que o valor de um livro físico, você acessa este eBook com histórias que podem mudar sua forma de enxergar sua própria vida.
                  </p>
                  <h3 className="text-lg font-bold text-brand-text uppercase tracking-widest">Você leva tudo por apenas</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-brand-primary">R$</span>
                    <span className="text-8xl font-black text-brand-primary tracking-tighter">37,90</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <button className="w-full rounded-2xl bg-brand-primary py-7 text-sm font-bold text-white shadow-2xl shadow-brand-primary/30 transition-all hover:bg-brand-warm active:scale-95 uppercase tracking-widest">
                    QUERO COMEÇAR MINHA TRANSFORMAÇÃO HOJE
                  </button>
                  
                  <div className="text-center space-y-1">
                    <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Acesso imediato após a compra</p>
                    <p className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest opacity-60">Disponível por tempo limitado nesta condição</p>
                  </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                      <ShieldCheck size={16} className="text-brand-primary" />
                      <span>Pagamento 100% seguro e criptografado</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                      <Gift size={16} className="text-brand-primary" />
                      <span>Todos os bônus inclusos na oferta</span>
                    </div>
                  </div>
                </div>
              </div>

            {/* GUARANTEE BLOCK */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl rounded-[2rem] bg-white border border-brand-border p-10 shadow-sm text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary/20" />
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/5 text-brand-primary border border-brand-primary/10">
                <ShieldCheck size={40} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-brand-text">Garantia incondicional de 7 dias</h3>
              <p className="mb-8 text-sm text-brand-text-muted max-w-xl mx-auto leading-relaxed">
                Se você não sentir que esse conteúdo te ajudou de alguma forma, basta solicitar o reembolso. Sem perguntas, sem burocracia.
              </p>
              <div className="inline-block bg-brand-primary/10 text-brand-primary px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                Risco zero para você
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-32 px-6 bg-white/50 backdrop-blur-sm border-t border-brand-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-brand-text">
            Dúvidas <span className="text-brand-primary">Frequentes</span>
          </h2>
          <div className="space-y-6">
            <FAQItem 
              question="Preciso ter experiência com leitura?" 
              answer="Não! O eBook foi escrito de forma leve e fluida, justamente para quem tem dificuldade em manter o hábito da leitura. Você vai se sentir conversando com uma amiga."
            />
            <FAQItem 
              question="Funciona pra qualquer mulher?" 
              answer="Sim. As histórias abordam temas universais como autoestima, família, filhos e propósito, conectando-se com mulheres em diferentes fases da vida."
            />
            <FAQItem 
              question="Como recebo o acesso?" 
              answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para download do eBook e do bônus exclusivo."
            />
            <FAQItem 
              question="E se eu não gostar?" 
              answer="Oferecemos uma garantia de 7 dias. Se por qualquer motivo você sentir que o conteúdo não é para você, devolvemos 100% do seu investimento sem perguntas."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-white border-t border-brand-border py-20 px-6 text-center text-brand-text-muted/60 text-[10px] font-bold tracking-widest uppercase">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8">© 2026 14 Mulheres e um Propósito. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-12 mb-12">
            <a href="#" className="hover:text-brand-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Contato</a>
          </div>
          <p className="text-[8px] max-w-3xl mx-auto leading-relaxed opacity-60 font-medium">
            Este site não faz parte do Google Inc. ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Google ou pelo Facebook de nenhuma maneira. Google e Facebook são marcas comerciais de suas respectivas empresas.
          </p>
        </div>
      </footer>
    </div>
  );
}
