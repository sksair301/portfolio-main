import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "../config";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  // Spotlight mouse tracking on each card
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  useEffect(() => {
    // Touch toggle
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    // IntersectionObserver — stagger cards + tags on scroll-into-view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("what-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    containerRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  const renderCard = (
    skillKey: "develop" | "design",
    index: number,
    extraBorder?: React.ReactNode
  ) => {
    const skill = config.skills[skillKey];
    return (
      <div
        className={`what-content what-noTouch what-card-${index}`}
        ref={(el) => setRef(el, index)}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight glow */}
        <div className="what-spotlight" />

        {/* Animated gradient border */}
        <div className="what-glow-border" />

        {/* SVG dashed borders */}
        <div className="what-border1">
          <svg height="100%">
            <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
            {index === 0 && (
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
            )}
            {index === 1 && (
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
            )}
          </svg>
        </div>
        <div className="what-corner" />

        {/* Category badge */}
        <div className="what-badge">0{index + 1}</div>

        <div className="what-content-in" data-lenis-prevent="true">
          <h3>
            {skill.title.split(" ").map((word, i) => (
              <span key={i} className="what-title-word" style={{ animationDelay: `${i * 0.08}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </h3>
          <h4>{skill.description}</h4>
          <p>{skill.details}</p>
          <h5>Skillset &amp; tools</h5>
          <div className="what-content-flex">
            {skill.tools.map((tool, i) => (
              <div
                key={i}
                className="what-tags"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                {tool}
              </div>
            ))}
          </div>
          <div className="what-arrow" />
        </div>

        {extraBorder}
      </div>
    );
  };

  return (
    <div className="whatIDO" id="whatido" ref={sectionRef}>
      {/* Floating orbs */}
      <div className="what-orb what-orb--1" />
      <div className="what-orb what-orb--2" />
      <div className="what-orb what-orb--3" />

      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            &nbsp;I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          {/* Vertical dashed border (shared) */}
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {renderCard("develop", 0)}
          {renderCard("design", 1)}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    Array.from(container.parentElement.children).forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
