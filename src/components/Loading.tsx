import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

// SVG ring circumference for r=90: 2π×90 ≈ 565.48
const CIRCUMFERENCE = 2 * Math.PI * 90;

const TAGS = ["PHP", "Laravel", "Python", "FastAPI", "GoLang", "DevOps", "AI / ML", "System Design", "Docker"];

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [displayPct, setDisplayPct] = useState(0);

  // Smoothly animate the displayed percentage
  const displayRef = useRef(0);
  useEffect(() => {
    const target = percent;
    const step = () => {
      if (displayRef.current < target) {
        displayRef.current = Math.min(displayRef.current + 1, target);
        setDisplayPct(displayRef.current);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [percent]);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => setIsLoaded(true), 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) module.initialFX();
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  // SVG ring offset
  const offset = CIRCUMFERENCE - (displayPct / 100) * CIRCUMFERENCE;

  return (
    <>
      {/* ── Header ── */}
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Sabir Shaikh
        </a>
        {/* Mini game loader */}
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, i) => (
                <div className="loaderGame-line" key={i} />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>

      {/* ── Main loading screen ── */}
      <div className={`loading-screen ${clicked && "loading-clicked"}`}>

        {/* Corner decorations */}
        <div className="loading-corner loading-corner--tl" />
        <div className="loading-corner loading-corner--tr" />
        <div className="loading-corner loading-corner--bl" />
        <div className="loading-corner loading-corner--br" />

        {/* Background marquee */}
        <div className="loading-marquee">
          <Marquee speed={30} gradient={false}>
            <span>&nbsp; Backend Dev &nbsp;</span>
            <span>&nbsp; DevOps &amp; AI ML &nbsp;</span>
            <span>&nbsp; System Design &nbsp;</span>
            <span>&nbsp; Backend Dev &nbsp;</span>
            <span>&nbsp; DevOps &amp; AI ML &nbsp;</span>
            <span>&nbsp; System Design &nbsp;</span>
          </Marquee>
        </div>

        {/* ── Centre Content ── */}
        <div className={`loading-wrap ${loaded && "loading-complete"}`}>

          {/* SVG Ring */}
          <div className="loading-ring-wrap">
            <div className="ring-spinner" />
            <div className="ring-spinner-2" />
            <div className="ring-orb" />

            <svg className="loading-ring-svg" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#a87cff" />
                  <stop offset="100%" stopColor="#00e5ff" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle className="ring-track"    cx="100" cy="100" r="90" />
              {/* Glow (blur copy) */}
              <circle
                className="ring-glow"
                cx="100" cy="100" r="90"
                style={{ strokeDashoffset: offset }}
              />
              {/* Progress */}
              <circle
                className="ring-progress"
                cx="100" cy="100" r="90"
                style={{ strokeDashoffset: offset }}
              />
            </svg>

            {/* Percent inside ring */}
            <div className="loading-percent">
              <div className="loading-percent-num">{displayPct}<span style={{ fontSize: "0.45em", opacity: 0.5 }}>%</span></div>
              <div className="loading-percent-label">{loaded ? "Ready" : "Loading"}</div>
            </div>
          </div>

          {/* Status + bar */}
          <div className="loading-status">
            <div className="loading-status-text">
              {loaded ? "Initialising experience..." : "Compiling assets..."}
            </div>
            <div className="loading-bar-track">
              <div className="loading-bar-fill" style={{ width: `${displayPct}%` }} />
            </div>
          </div>

          {/* Tech tags */}
          <div className="loading-tags">
            {TAGS.map((tag) => (
              <div className="loading-tag" key={tag}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) clearInterval(interval);
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }

  return { loaded, percent, clear };
};
