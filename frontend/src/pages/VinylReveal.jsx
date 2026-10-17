
import React, { useEffect, useRef, useState } from "react";
import "./VinylReveal.css";

const SONG_URL = "/song.mp3";
const PORTRAIT_URL = "/portrait-sketch.png";
const WHATSAPP_NUMBER = "918525919332";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

const WAVE_HEIGHTS = Array.from({ length: 42 }, (_, i) => {
  const a = Math.abs(Math.sin(i * 0.48));
  const b = Math.abs(Math.cos(i * 0.91));
  return 15 + a * b * 78;
});

function Icon({ name, size = 22 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "play") {
    return (
      <svg {...props}>
        <path
          d="m8 5 11 7-11 7V5Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (name === "pause") {
    return (
      <svg {...props}>
        <rect
          x="6"
          y="5"
          width="4"
          height="14"
          rx="1"
          fill="currentColor"
          stroke="none"
        />
        <rect
          x="14"
          y="5"
          width="4"
          height="14"
          rx="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (name === "back") {
    return (
      <svg {...props}>
        <path d="m11 5-7 7 7 7V5Zm9 0-7 7 7 7V5Z" />
      </svg>
    );
  }

  if (name === "forward") {
    return (
      <svg {...props}>
        <path d="m4 5 7 7-7 7V5Zm9 0 7 7-7 7V5Z" />
      </svg>
    );
  }

  if (name === "volume") {
    return (
      <svg {...props}>
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        <path d="M17 9a5 5 0 0 1 0 6" />
      </svg>
    );
  }

  if (name === "mute") {
    return (
      <svg {...props}>
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        <path d="m17 9 5 6m0-6-5 6" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }

  return null;
}

function buildWhatsAppMessage(phone, instagram) {
  return [
    "*ORU HELLO - Response*",
    "",
    "*My Response:* Aama, thodaralam",
    "",
    "Namma pazhakkatha ippadiye thodaralam.",
    "",
    `*WhatsApp Number:* ${phone || "Not shared"}`,
    `*Instagram ID:* ${instagram || "Not shared"}`,
    "",
    "Namma ippadiye pesittu irukkalam.",
  ].join("\n");
}

/* FINAL RESPONSE POPUP */

function FinalPopup({ open, onClose }) {
  const [choice, setChoice] = useState(null);
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [consent, setConsent] = useState(false);

  const timerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) {
      clearTimeout(timerRef.current);
      setChoice(null);
      setVisible(false);
      setPhone("");
      setInstagram("");
      setConsent(false);
      closeRef.current?.focus();
    }

    return () => clearTimeout(timerRef.current);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  function choose(value) {
    clearTimeout(timerRef.current);
    setChoice(value);
    setVisible(false);

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 480);
  }

  function sendResponse(event) {
    event.preventDefault();

    if (choice !== "yes" || !consent) return;

    const message = buildWhatsAppMessage(
      phone.trim(),
      instagram.trim()
    );

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.location.assign(url);
  }

  if (!open) return null;

  return (
    <div
      className="oh-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="oh-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="oh-question"
      >
        <button
          ref={closeRef}
          type="button"
          className="oh-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <span className="oh-dialog-kicker">
          ORU HELLO · ONE QUESTION
        </span>

        <h2 id="oh-question">Thodaralama?</h2>

        <div className="oh-divider">
          <span />
        </div>

        <p className="oh-description">
          Oru unexpected hello-la aarambicha namma
          pazhakkam... Unakkum pidichirundha, namma
          ippadiye pesittu irukkalama?
        </p>

        <div className="oh-choices">
          <button
            type="button"
            className={`oh-choice ${
              choice === "yes" ? "active" : ""
            }`}
            aria-pressed={choice === "yes"}
            onClick={() => choose("yes")}
          >
            Aama, thodaralam
          </button>

          <button
            type="button"
            className={`oh-choice ${
              choice === "think" ? "active" : ""
            }`}
            aria-pressed={choice === "think"}
            onClick={() => choose("think")}
          >
            Konjam yosikkiren
          </button>
        </div>

        {choice && !visible && (
          <div
            className="oh-loading"
            aria-label="Opening response"
          >
            <span />
            <span />
            <span />
          </div>
        )}

        {choice === "yes" && visible && (
          <form
            className="oh-form oh-reveal"
            onSubmit={sendResponse}
          >
            <div className="oh-form-separator" />

            <label htmlFor="oh-phone">
              Phone / WhatsApp Number
            </label>

            <input
              id="oh-phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="+91 XXXXX XXXXX"
              autoComplete="tel"
            />

            <label htmlFor="oh-instagram">
              Original Instagram ID
            </label>

            <input
              id="oh-instagram"
              type="text"
              value={instagram}
              onChange={(event) =>
                setInstagram(event.target.value)
              }
              placeholder="@username"
              autoComplete="off"
            />

            <label className="oh-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) =>
                  setConsent(event.target.checked)
                }
              />
              <span>
                En details-a WhatsApp message-la share
                panna sammathikkiren.
              </span>
            </label>

            <button
              type="submit"
              disabled={!consent}
              className="oh-send"
            >
              Send Response
              <span aria-hidden="true">↗</span>
            </button>

            <p className="oh-form-hint">
              WhatsApp open aagum. Message-a check
              pannittu Send pannunga. Details share
              pannradhu optional.
            </p>
          </form>
        )}

        {choice === "think" && visible && (
          <div className="oh-think oh-reveal">
            <div className="oh-form-separator" />

            <div className="oh-think-icon">
              <Icon name="clock" size={36} />
            </div>

            <h3>Seri, onnum avasaram illa.</h3>

            <p>
              Nee yosichu edukkura mudivai naan
              madhikkiren. Unakku thevaiyana neram
              eduthukko.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* MAIN MUSIC EXPERIENCE */

export default function VinylReveal() {
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const progress =
    duration > 0
      ? clamp(current / duration, 0, 1)
      : 0;

  const percentage = Math.round(progress * 100);

  /*
   * CLEAN REVEAL:
   * 0%   - completely hidden
   * 50%  - upper half visible
   * 100% - fully visible
   *
   * No fade, blur, filters, or pencil effect.
   */
  const hiddenBottom = (1 - progress) * 100;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function syncTime() {
      setCurrent(audio.currentTime || 0);
    }

    function syncDuration() {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDuration(audio.duration);
      }
    }

    function animate() {
      syncTime();

      if (!audio.paused && !audio.ended) {
        rafRef.current =
          requestAnimationFrame(animate);
      }
    }

    function onPlay() {
      setPlaying(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current =
        requestAnimationFrame(animate);
    }

    function onPause() {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
      syncTime();
    }

    function onEnded() {
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);

      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setCurrent(audio.duration);
      }

      setPopup(true);
    }

    function onError() {
      setError(
        "Song load aagala. public/song.mp3 check pannunga."
      );
    }

    audio.addEventListener(
      "loadedmetadata",
      syncDuration
    );
    audio.addEventListener(
      "durationchange",
      syncDuration
    );
    audio.addEventListener(
      "timeupdate",
      syncTime
    );
    audio.addEventListener(
      "seeked",
      syncTime
    );
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    syncDuration();

    return () => {
      cancelAnimationFrame(rafRef.current);

      audio.removeEventListener(
        "loadedmetadata",
        syncDuration
      );
      audio.removeEventListener(
        "durationchange",
        syncDuration
      );
      audio.removeEventListener(
        "timeupdate",
        syncTime
      );
      audio.removeEventListener(
        "seeked",
        syncTime
      );
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError("");
      await audio.play();
    } catch {
      setError(
        "Song play aagala. Audio file check pannunga."
      );
    }
  }

  function seek(value) {
    const audio = audioRef.current;

    if (!audio || duration <= 0) return;

    const target = clamp(
      Number(value),
      0,
      duration
    );

    audio.currentTime = target;
    setCurrent(target);
  }

  function skip(seconds) {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;

    seek(audio.currentTime + seconds);
  }

  async function replay() {
    const audio = audioRef.current;
    if (!audio) return;

    setPopup(false);
    audio.currentTime = 0;
    setCurrent(0);

    try {
      setError("");
      await audio.play();
    } catch {
      setError("Replay start aagala.");
    }
  }

  return (
    <section className="oh-page">
      <audio
        ref={audioRef}
        src={SONG_URL}
        preload="metadata"
      />

      <div className="oh-layout">
        <header className="oh-header">
          <span className="oh-brand">
            ORU <strong>HELLO.</strong>
          </span>

          <span className="oh-header-right">
            A PERSONAL MUSIC EXPERIENCE
          </span>
        </header>

        <main className="oh-main">
          {/* LEFT — CLEAN PORTRAIT REVEAL */}
          <div className="oh-visual">
            <div className="oh-portrait-heading">
              <span>
                01 / A PORTRAIT IN PROGRESS
              </span>
              <span>{percentage}%</span>
            </div>

            <div className="oh-sketch-card">
              <div className="oh-sketch-stage">
                {!imageError ? (
                  <img
                    src={PORTRAIT_URL}
                    alt="Portrait revealing as the song plays"
                    className="oh-sketch-image"
                    onError={() => setImageError(true)}
                    style={{
                      clipPath: `inset(0 0 ${hiddenBottom}% 0)`
                    }}
                  />
                ) : (
                  <div className="oh-image-fallback">
                    <span>Portrait image not found</span>
                    <small>
                      public/portrait-sketch.png
                    </small>
                  </div>
                )}
              </div>

              <div className="oh-portrait-footer">
                <span>
                  Every second, a little more.
                </span>

                <div className="oh-portrait-progress">
                  <span
                    style={{
                      width: `${percentage}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — SIGNATURE MUSIC PLAYER */}
          <div className="oh-audio">
            <div className="oh-player-top">
              <span>02 / A SONG FOR YOU</span>

              <span className="oh-playing-status">
                <i className={playing ? "on" : ""} />
                {playing ? "PLAYING" : "READY"}
              </span>
            </div>

            <div className="oh-player-content">
              <span className="oh-overline">
                ONE HELLO · ONE LITTLE STORY
              </span>

              <h1>இப்படியே தொடரலாமா?</h1>

              <p className="oh-subtitle">
                A melody that began with one hello.
              </p>

              <div
                className={`oh-waveform ${
                  playing ? "is-playing" : ""
                }`}
                aria-hidden="true"
              >
                {WAVE_HEIGHTS.map((height, index) => (
                  <span
                    key={index}
                    style={{
                      height: `${height}%`,
                      animationDelay:
                        `${index * -0.063}s`,
                      opacity:
                        index / WAVE_HEIGHTS.length <= progress
                          ? 1
                          : 0.36
                    }}
                  />
                ))}
              </div>

              <div className="oh-timeline">
                <input
                  type="range"
                  aria-label="Song progress"
                  min="0"
                  max={duration || 1}
                  step="0.1"
                  value={current}
                  onChange={(event) =>
                    seek(event.target.value)
                  }
                  style={{
                    "--progress": `${progress * 100}%`
                  }}
                />

                <div className="oh-times">
                  <span>
                    {formatTime(current)}
                  </span>

                  <span>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="oh-controls">
                <button
                  type="button"
                  className="oh-skip"
                  onClick={() => skip(-10)}
                  aria-label="Back 10 seconds"
                >
                  <Icon name="back" />
                </button>

                <button
                  type="button"
                  className="oh-play"
                  onClick={togglePlay}
                  aria-label={
                    playing ? "Pause" : "Play"
                  }
                >
                  <Icon
                    name={playing ? "pause" : "play"}
                    size={25}
                  />
                </button>

                <button
                  type="button"
                  className="oh-skip"
                  onClick={() => skip(10)}
                  aria-label="Forward 10 seconds"
                >
                  <Icon name="forward" />
                </button>
              </div>

              <div className="oh-volume">
                <button
                  type="button"
                  onClick={() => setMuted(!muted)}
                  aria-label={
                    muted ? "Unmute" : "Mute"
                  }
                >
                  <Icon
                    name={muted ? "mute" : "volume"}
                    size={18}
                  />
                </button>

                <input
                  type="range"
                  aria-label="Volume"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={(event) => {
                    setVolume(
                      Number(event.target.value)
                    );
                    setMuted(false);
                  }}
                />

                <span>
                  {muted
                    ? 0
                    : Math.round(volume * 100)}
                  %
                </span>
              </div>

              {error && (
                <p
                  className="oh-error"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="oh-player-bottom">
              <span>
                A LITTLE SOMETHING, JUST FOR YOU.
              </span>

              <span>✦</span>
            </div>
          </div>
        </main>

        <footer className="oh-footer">
          <span>
            MADE WITH A LITTLE COURAGE.
          </span>

          <button
            type="button"
            onClick={replay}
          >
            REPLAY OUR STORY ↗
          </button>
        </footer>
      </div>

      <FinalPopup
        open={popup}
        onClose={() => setPopup(false)}
      />
    </section>
  );
}
