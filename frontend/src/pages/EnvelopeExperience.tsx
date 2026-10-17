import { useEffect, useState } from 'react';
import type { FC } from 'react';
import './EnvelopeExperience.css';

type Stage = 'closed' | 'opening' | 'letter';

// Temporary text; replace with the final invitation later.
const MESSAGE = [
  'A little something,',
  'just for you...',
  'Every beautiful story',
  'begins somewhere.',
];

type EnvelopeExperienceProps = { onNoteComplete?: () => void };

export const EnvelopeExperience: FC<EnvelopeExperienceProps> = ({ onNoteComplete }) => {
  const [stage, setStage] = useState<Stage>('closed');
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (stage !== 'opening') return;
    const id = window.setTimeout(() => setStage('letter'), 2900);
    return () => window.clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (stage !== 'letter' || revealed === MESSAGE.length) return;
    const id = window.setTimeout(() => setRevealed((n) => n + 1), revealed === 0 ? 700 : 1450);
    return () => window.clearTimeout(id);
  }, [stage, revealed]);

  useEffect(() => {
    if (stage === 'letter' && revealed === MESSAGE.length) {
      onNoteComplete?.();
    }
  }, [stage, revealed, onNoteComplete]);

  const open = () => {
    if (stage === 'closed') setStage('opening');
  };
  const replay = () => {
    setRevealed(0);
    setStage('closed');
  };

  return (
    <main className={`invitation invitation--${stage}`}>
      <div className="ambient-light ambient-light--left" aria-hidden="true" />
      <div className="ambient-light ambient-light--right" aria-hidden="true" />
      <div className="botanical botanical--top" aria-hidden="true">✧ ❀ ✧</div>
      <div className="botanical botanical--bottom" aria-hidden="true">✧ ❀ ✧</div>
      <div className="floating-petal floating-petal--one" aria-hidden="true" />
      <div className="floating-petal floating-petal--two" aria-hidden="true" />
      <div className="floating-petal floating-petal--three" aria-hidden="true" />

      <section className="envelope-scene" aria-label="A special invitation">
        <div className="invocation" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div className="gold-ornament" aria-hidden="true"><span />✦<span /></div>

        <button className="envelope-button" type="button" onClick={open} disabled={stage !== 'closed'} aria-label="Open the invitation envelope">
          <span className="envelope" aria-hidden="true">
            <span className="envelope-back" />
            <span className="envelope-flap" />
            <span className="envelope-letter"><span className="envelope-letter-text">For someone special ♡</span></span>
            <span className="envelope-front">
              <span className="envelope-front-left" />
              <span className="envelope-front-right" />
              <span className="envelope-front-bottom" />
            </span>
            <span className="envelope-seal"><span className="seal-flower">✿</span></span>
          </span>
        </button>

        <div className="tap-cue">
          <span>TAP TO OPEN</span>
          <div className="gold-ornament gold-ornament--small" aria-hidden="true"><span />✦<span /></div>
          <div className="down-arrow" aria-hidden="true"><span>⌄</span></div>
        </div>
      </section>

      <section className="letter-scene" aria-label="Handwritten note" aria-hidden={stage !== 'letter'}>
        <div className="letter-sparkle" aria-hidden="true">✧</div>
        <div className="letter-kicker">A NOTE, JUST FOR YOU</div>
        <div className="handwritten-message">
          {MESSAGE.map((line, i) => (
            <div key={i} className={`handwritten-line ${i < revealed ? 'handwritten-line--visible' : ''}`}>{line}</div>
          ))}
        </div>
        <div className="letter-ornament" aria-hidden="true">✦</div>
        {revealed === MESSAGE.length && <button className="replay-button" onClick={replay} type="button">↻ Replay opening</button>}
      </section>
    </main>
  );
}
