import { useEffect, useRef, useState } from 'react';

/**
 * ORU HELLO — Page 02.
 * Standalone React component (JSX + scoped CSS). No extra dependencies.
 * Place after Page 01 in the page flow. The story is intentionally editable.
 * All story content is based only on the original song/story supplied.
 */
const STORY = [
  'Thanimaiyae thunaiyaa irundha oru paiyan. Veliyila sirichuttu irundhaalum, ullukkulla kashtathoda vaazhnthuttu irundhaan.',
  'Thoongadha iravugal la, oru application la theriyadha pala per kooda pesuvaan. Konjam pesuvaan... appuram thoongiduvaan. Idhuvae avanoda vazhakkama poittu irundhuchu.',
  'Appadi oru naal, vidiyara neram nerungikittu irundhuchu. Andha iravum mudinjidumnu ninaicha nerathula, edhirpaarkadha oru call connect aachu.',
  'Andha pakkam oru ponnu. Ava mudhal la “Hello” sonnaa. Ivanum “Hello” sonnaan. Andha chinna kural kettadhum, yen nu theriyaama avan manasula edho oru maattram.',
  'Mugam paakkaama aarambicha andha pechu, avan mugathula oru sirippu kondu vandhuchu. Ava kural ketta appuram, avan thanimai konjam konjama marandhu pochu.',
  'Naalgal mella nagarndhuchu. Avanga pechum thodarndhuchu. Avaloda pesura neram pathaadhunnu avanukku thonuchu. Avaloda sirippum vaarthaigalum avanukku oru nimmadhiya irundhuchu.',
  'Aana avan manasula oru thayakkam. Avanukku mattum dhaan idhu special aa irukkaa? Avalukkum idhae maadhiri thonudhaa?',
  'Naalaikku ava pesaama poittaa enna aagumnu oru chinna bayam. Aana avala pidichu vaikka avan urimai ketkala. Avalukku viruppam illaadha paadhaila nadakka avan ninaikkala.',
  'Adhanaala dhaan avan oru chinna kelvi kekka ninaikkiraan...',
  'Ippadiyae thodaralaamaa? Innum konjam pesalaamaa? Sirippu vandhaa pagirndhukalaamaa? Sogam vandhaa kettukkalaamaa?',
  'Avaloda badhilukku avan avasaram kaattala. Ava manasula thonura varaikkum amaidhiyaa kaathiruppaan. Avalukkum viruppam irundhaa, indha payanam thodarattum.'
];

const TOTAL = STORY.reduce((n, paragraph) => n + paragraph.length, 0);

export default function StoryOfNight() {
  const sectionRef = useRef(null);
  const frameRef = useRef(0);
  const paperTextRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      frameRef.current = 0;
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      // Paper stays centered while writing appears as the visitor scrolls.
      const amount = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(amount);
    };
    const handleScroll = () => {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Reserve the beginning/end of the scroll for the page's natural entrance/exit.
  const writingProgress = Math.min(1, Math.max(0, (progress - 0.035) / 0.88));
  const visibleCount = Math.ceil(TOTAL * writingProgress);
  // Move the handwriting upward inside the page when its lines fill the paper.
  useEffect(() => {
    const paper = paperTextRef.current;
    if (paper) paper.scrollTop = Math.max(0, paper.scrollHeight - paper.clientHeight);
  }, [visibleCount]);

  let remaining = visibleCount;
  const visibleParagraphs = STORY.map((part) => {
    const portion = part.slice(0, Math.max(0, remaining));
    remaining -= part.length;
    return portion;
  });

  return (
    <section className="ohn-story-scroll" ref={sectionRef} aria-label="The Story of That Night">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap');
        .ohn-story-scroll { --ohn-gold:#bc9460; --ohn-ink:#604b40; position:relative; height:440svh; min-height:2100px; isolation:isolate; background:radial-gradient(ellipse at 10% 10%,#fffefa 0%,transparent 48%),radial-gradient(ellipse at 90% 80%,#efe6d8 0%,transparent 50%),linear-gradient(135deg,#f6f0e6,#fffdf8 48%,#f0e8dc); }
        .ohn-story-scroll * { box-sizing:border-box; }
        .ohn-story-scroll .ohn-fixed { position:sticky; top:0; height:100svh; min-height:530px; width:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; padding:22px 16px 28px; overflow:hidden; }
        .ohn-story-scroll .ohn-title { margin:0 0 3px; text-align:center; font-family:'Playfair Display',Georgia,serif; font-weight:500; font-size:clamp(27px,4.3vw,48px); color:#634a3f; letter-spacing:.01em; }
        .ohn-story-scroll .ohn-rule { width:92px; height:1px; background:linear-gradient(90deg,transparent,var(--ohn-gold),transparent); margin:9px 0 17px; }
        .ohn-story-scroll .ohn-paper { position:relative; width:min(100%,610px); height:min(71svh,660px); min-height:310px; padding:28px clamp(19px,4vw,47px) 30px clamp(32px,6vw,67px); background:repeating-linear-gradient(to bottom,transparent 0px,transparent 33px,#dce5e5a9 34px,#dce5e5a9 35px),linear-gradient(115deg,#fffdfb,#fffaf5); border:1px solid #eee7df; box-shadow:0 18px 50px #67544322,0 3px 12px #67544310; transform:rotate(-.35deg); overflow:hidden; }
        .ohn-story-scroll .ohn-paper:before { content:''; position:absolute; top:0; bottom:0; left:clamp(20px,4.4vw,44px); width:1px; background:#e7b6af9c; pointer-events:none; }
        .ohn-story-scroll .ohn-paper-content { height:100%; overflow:hidden; color:var(--ohn-ink); font-family:'Caveat','Segoe Print',cursive; font-size:clamp(20px,2.5vw,27px); font-weight:500; line-height:35px; white-space:pre-wrap; overflow-wrap:anywhere; }
        .ohn-story-scroll .ohn-paper p { margin:0 0 13px; min-height:0; }
        .ohn-story-scroll .ohn-pen { color:#ad795b; animation:ohn-blink 1s steps(1) infinite; }
        .ohn-story-scroll .ohn-hint { margin-top:14px; font:500 10px 'DM Sans',sans-serif; letter-spacing:.24em; color:#ab9178; text-transform:uppercase; }
        .ohn-story-scroll .ohn-progress { width:min(180px,45vw); height:2px; border-radius:5px; background:#e7d8c8; margin-top:9px; overflow:hidden; }
        .ohn-story-scroll .ohn-progress-fill { height:100%; background:var(--ohn-gold); transition:width 80ms linear; }
        @keyframes ohn-blink { 50% { opacity:0 } }
        @media(max-width:600px) { .ohn-story-scroll .ohn-fixed {padding:15px 16px 25px;} .ohn-story-scroll .ohn-paper {height:min(69svh,640px);padding-top:17px;} .ohn-story-scroll .ohn-title {font-size:30px;} .ohn-story-scroll .ohn-rule {margin:8px 0 15px;} }
        @media(prefers-reduced-motion:reduce) {.ohn-story-scroll .ohn-pen {animation:none;} .ohn-story-scroll .ohn-progress-fill {transition:none;} }
      `}</style>
      <div className="ohn-fixed">
        <h2 className="ohn-title">The Story</h2>
        <div className="ohn-rule" aria-hidden="true" />
        <article className="ohn-paper" aria-label="Scroll-revealed story in Tanglish">
          <div className="ohn-paper-content" lang="en" ref={paperTextRef}>
            {visibleParagraphs.map((part, index) => part ? <p key={index}>{part}{index === visibleParagraphs.findLastIndex(Boolean) && writingProgress < 1 ? <span className="ohn-pen" aria-hidden="true">▏</span> : null}</p> : null)}
          </div>
        </article>
        <div className="ohn-hint">Scroll to unfold the story</div>
        <div className="ohn-progress" aria-hidden="true"><div className="ohn-progress-fill" style={{width:`${writingProgress * 100}%`}} /></div>
      </div>
    </section>
  );
}
