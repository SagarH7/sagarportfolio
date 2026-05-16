/* ============================================================
   KINETIC — scroll reveals, animated counters, magnetic hovers,
   live marquee. Still professional; motion makes it alive.
   ============================================================ */

const kineticStyles = {
  root: {
    position: "relative",
    overflow: "hidden"
  },
  hero: {
    minHeight: "100vh",
    padding: "120px 48px 80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: 1400,
    margin: "0 auto"
  }
};

// reveal-on-scroll wrapper
function Reveal({ children, delay = 0, y = 30, as: As = "div", style }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If element is already in viewport (common when switching variations
    // or when element is above-the-fold), show immediately.
    const checkVisible = () => {
      if (!el.isConnected) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = r.top < vh * 0.92 && r.bottom > 0 && r.width > 0;
      if (visible) {setShown(true);return true;}
      return false;
    };
    if (checkVisible()) return;
    const io = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) {setShown(true);io.disconnect();}},
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    // Fallback: if the observer never fires (e.g. was display:none at mount),
    // re-check on resize, scroll, and after a short delay.
    const onCheck = () => {if (checkVisible()) {io.disconnect();window.removeEventListener('scroll', onCheck);window.removeEventListener('resize', onCheck);}};
    window.addEventListener('scroll', onCheck, { passive: true });
    window.addEventListener('resize', onCheck);
    const t1 = setTimeout(onCheck, 120);
    const t2 = setTimeout(() => setShown(true), 1500); // hard fallback
    return () => {io.disconnect();clearTimeout(t1);clearTimeout(t2);window.removeEventListener('scroll', onCheck);window.removeEventListener('resize', onCheck);};
  }, []);
  return (
    <As ref={ref} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}s, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}s`,
      willChange: "opacity, transform"
    }}>
      {children}
    </As>);

}

// count-up number
function CountUp({ value, duration = 1400 }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(value);
  const started = React.useRef(false);
  // parse the leading number
  const match = String(value).match(/^(-?\d+(?:\.\d+)?)/);
  const num = match ? parseFloat(match[1]) : null;
  const suffix = match ? String(value).slice(match[0].length) : value;

  React.useEffect(() => {
    if (num == null) {setDisplay(value);return;}
    setDisplay("0" + suffix);
    const el = ref.current;
    if (!el) return;
    const startAnim = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const cur = num * eased;
        const formatted = num % 1 === 0 ? Math.round(cur) : cur.toFixed(1);
        setDisplay(formatted + suffix);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const checkVisible = () => {
      if (!el.isConnected) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0 && r.width > 0) {startAnim();return true;}
      return false;
    };
    if (checkVisible()) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {startAnim();io.disconnect();}
    }, { threshold: 0.2 });
    io.observe(el);
    const onCheck = () => {if (checkVisible()) {io.disconnect();window.removeEventListener('scroll', onCheck);}};
    window.addEventListener('scroll', onCheck, { passive: true });
    const t1 = setTimeout(onCheck, 120);
    const t2 = setTimeout(startAnim, 1500);
    return () => {io.disconnect();clearTimeout(t1);clearTimeout(t2);window.removeEventListener('scroll', onCheck);};
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

// magnetic hover wrapper
function Magnetic({ children, strength = 20, style }) {
  const ref = React.useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x / rect.width * strength}px, ${y / rect.height * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div onMouseMove={handleMove} onMouseLeave={reset} style={{ display: "inline-block" }}>
      <div ref={ref} style={{ ...style, transition: "transform .3s cubic-bezier(.2,.7,.2,1)" }}>
        {children}
      </div>
    </div>);

}

function KineticHero() {
  const d = window.PORTFOLIO;
  // parallax mouse-track on large "S"
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const h = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section style={kineticStyles.hero}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)" }}>
        <div>Sagar Haremanik · 2026</div>
        <div><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", marginRight: 8, verticalAlign: "middle", animation: "pulse 2s infinite" }}></span>Open to roles</div>
      </div>

      <div style={{ position: "relative" }}>
        <div aria-hidden style={{
          position: "absolute",
          right: "-4%",
          top: "-40%",
          fontFamily: "var(--serif)",
          fontSize: "min(48vw, 760px)",
          lineHeight: 0.8,
          color: "var(--accent-soft)",
          letterSpacing: "-0.04em",
          transform: `translate(${mouse.x}px, ${mouse.y}px)`,
          transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0
        }}>S</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal delay={0.1}>
            <div className="label" style={{ marginBottom: 24 }}>AI × Life Sciences × Ops</div>
          </Reveal>
          <Reveal delay={0.2} y={40}>
            <h1 style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(56px, 11vw, 180px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
              fontWeight: 400,
              textWrap: "balance"
            }}>
              I Lead Applications run Programs in<br />
              <span style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>regulated</span> pharma,<br />
              built for AI.
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 620, lineHeight: 1.5, margin: "0 0 32px", textWrap: "pretty" }}>
              I'm <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Sagar</strong> — Technical Program & Delivery Manager with {d.years} years across validated clinical and life-sciences apps for global pharma (incl. Novartis).
              Currently at Cognizant. Open to TPM, Delivery, and AI Application Manager roles.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <Magnetic strength={10}>
                <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener">
                  <LinkedInIconK /> Connect on LinkedIn
                </a>
              </Magnetic>
              <span className="chip">Hyderabad</span>
              <span className="chip">11+ yrs</span>
              <span className="chip">GxP · SOX</span>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.7}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <div>↓ Scroll to explore</div>
          <div style={{ textAlign: "right" }}>8 projects · 3 companies · 11+ years</div>
        </div>
      </Reveal>
    </section>);

}

function LinkedInIconK() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.338V9.725H5.667v8.613H8.34zM7.003 8.575a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763v-4.722c0-2.475-1.337-3.625-3.12-3.625-1.44 0-2.083.79-2.443 1.348V9.725h-2.71c.036.76 0 8.613 0 8.613h2.71v-4.81c0-.243.017-.487.089-.66.196-.487.642-.99 1.392-.99.98 0 1.373.747 1.373 1.844v4.616h2.71z" />
    </svg>);

}

function DownloadIconK() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

// marquee of keywords
function KineticMarquee() {
  const items = ["TPM · Delivery", "GxP Validated", "~99% Uptime", "Clean Audit Track Record", "AWS Migrations", "CTMS · Veeva ODH", "FDA 21 CFR Part 11", "HIPAA · GDPR · SOX", "AI Productivity", "ITIL v4", "ServiceNow", "Azure · AWS · GCP"];
  return (
    <section style={{ padding: "40px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--bg-2)", overflow: "hidden" }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "k-marquee 40s linear infinite", gap: 48 }}>
        {[...items, ...items, ...items].map((it, i) =>
        <div key={i} style={{ fontFamily: "var(--serif)", fontSize: 32, letterSpacing: "-0.01em", color: "var(--ink)", display: "flex", alignItems: "center", gap: 48 }}>
            {it}
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }}></span>
          </div>
        )}
      </div>
    </section>);

}

function KineticMetrics() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "start", marginBottom: 64 }}>
        <Reveal>
          <div className="label">Measurable Impact</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, fontWeight: 400, textWrap: "balance" }}>
            Six years of <em style={{ color: "var(--accent-deep)" }}>numbers</em> that actually move.
          </h2>
        </Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
        {d.metrics.map((m, i) =>
        <Reveal key={i} delay={i * 0.06}>
            <div style={{ padding: "40px 32px", background: "var(--bg)", height: "100%" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(56px, 6vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--ink)", marginBottom: 16, minHeight: "112px" }}>
                <CountUp value={m.value} />
              </div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{m.sub}</div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

function KineticProjects() {
  const d = window.PORTFOLIO;
  const [active, setActive] = React.useState(d.projects[0].id);
  const current = d.projects.find((p) => p.id === active);

  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <Reveal>
        <div className="label" style={{ marginBottom: 24 }}>Selected Work · 2019 — 2026</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 64px", fontWeight: 400, maxWidth: 900, textWrap: "balance" }}>
          Every one under GxP, SOX, or both.
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          {d.projects.map((p, i) =>
          <button
            key={p.id}
            onMouseEnter={() => setActive(p.id)}
            onFocus={() => setActive(p.id)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              appearance: "none", border: 0, background: "transparent", cursor: "pointer",
              padding: "24px 0", borderTop: "1px solid var(--line)",
              color: active === p.id ? "var(--ink)" : "var(--ink-3)",
              transition: "color .3s ease, padding .3s ease",
              paddingLeft: active === p.id ? 16 : 0,
              fontFamily: "inherit"
            }}>
            
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20 }}>
                <div style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(32px, 4vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                fontStyle: active === p.id ? "italic" : "normal",
                transition: "font-style .2s ease"
              }}>
                  {p.title}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", whiteSpace: "nowrap" }}>{p.period}</div>
              </div>
              <div style={{ fontSize: 14, marginTop: 4, color: "var(--ink-3)" }}>{p.subtitle}</div>
            </button>
          )}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>

        <div style={{ position: "sticky", top: 100 }}>
          <div key={current.id} style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: 32,
            animation: "k-fade .4s cubic-bezier(.2,.7,.2,1)"
          }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {current.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 34, letterSpacing: "-0.02em", marginBottom: 6, lineHeight: 1.1 }}>{current.title}</div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 20 }}>{current.role}</div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 24px", textWrap: "pretty" }}>{current.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${current.impact.length}, 1fr)`, gap: 16, marginBottom: 24 }}>
              {current.impact.map((m, i) =>
              <div key={i} style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--accent-deep)", lineHeight: 1, marginBottom: 4 }}>{m.v}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "var(--mono)" }}>{m.k}</div>
                </div>
              )}
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", fontSize: 14 }}>
              {current.details.map((d, i) => <li key={i} style={{ marginBottom: 6 }}>{d}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

function KineticExperience() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <Reveal>
        <div className="label" style={{ marginBottom: 24 }}>Experience</div>
      </Reveal>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 160, top: 0, bottom: 0, width: 1, background: "var(--line)" }} />
        {d.experience.map((e, i) =>
        <Reveal key={i} delay={i * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "140px 40px 1fr", gap: 20, marginBottom: 48, alignItems: "start" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em", textAlign: "right", paddingTop: 6 }}>{e.period}</div>
              <div style={{ position: "relative", height: 14, paddingTop: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--bg)", position: "relative", zIndex: 1 }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, letterSpacing: "-0.01em", marginBottom: 2 }}>{e.company}</div>
                <div style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 10 }}>{e.role} · {e.location}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)", fontSize: 14 }}>
                  {e.bullets.map((b, j) => <li key={j} style={{ marginBottom: 4 }}>{b}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

function KineticCompetencies() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <Reveal>
        <div className="label" style={{ marginBottom: 48 }}>What I bring</div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {d.competencies.map((g, i) =>
        <Reveal key={i} delay={i * 0.05}>
            <div style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: 24,
            height: "100%",
            transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease"
          }}
          onMouseEnter={(e) => {e.currentTarget.style.transform = "translateY(-4px)";e.currentTarget.style.borderColor = "var(--accent)";e.currentTarget.style.boxShadow = "0 12px 28px -16px oklch(0.2 0.02 60 / 0.25)";}}
          onMouseLeave={(e) => {e.currentTarget.style.transform = "translateY(0)";e.currentTarget.style.borderColor = "var(--line)";e.currentTarget.style.boxShadow = "none";}}>
            
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 12, letterSpacing: "-0.01em" }}>{g.group}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map((it) => <span key={it} className="chip">{it}</span>)}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

function KineticCerts() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
      <Reveal>
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Certifications</div>
          <div>
            {d.certifications.map((c, i) =>
            <div key={i} style={{ display: "flex", gap: 16, fontSize: 15, color: "var(--ink-2)", padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 24 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{c}</span>
              </div>
            )}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Education</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 8, letterSpacing: "-0.01em" }}>{d.education.degree}</div>
          <div style={{ fontSize: 16, color: "var(--ink-2)", marginBottom: 32 }}>{d.education.school}</div>
          <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.08em" }}>CLASS OF {d.education.year}</div>
        </div>
      </Reveal>
    </section>);

}

function KineticContact() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "160px 48px 80px", maxWidth: 1400, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <Reveal>
        <div className="label" style={{ marginBottom: 32 }}>Let's talk</div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(56px, 10vw, 160px)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          margin: "0 0 40px",
          fontWeight: 400,
          textWrap: "balance"
        }}>
          Open to the<br />
          <em style={{ color: "var(--accent-deep)" }}>right</em> opportunity.
        </h2>
      </Reveal>
      <Reveal delay={0.25}>
        <p style={{ fontSize: 19, color: "var(--ink-2)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.5, textWrap: "pretty" }}>
          Technical Program · Delivery · AI Application Manager. Pharma, Life Sciences, Healthcare IT.
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <div className="cta-row">
          <Magnetic strength={12}>
            <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener" style={{ fontSize: 16, padding: "16px 28px" }}>
              <LinkedInIconK /> Connect on LinkedIn
            </a>
          </Magnetic>
          <Magnetic strength={10}>
            <a className="cta-secondary" href="resume.pdf" target="_blank" rel="noopener" style={{ fontSize: 16, padding: "16px 28px" }}>
              <DownloadIconK /> Download Resume
            </a>
          </Magnetic>
        </div>
      </Reveal>
      <Reveal delay={0.5}>
        <div style={{ marginTop: 64, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
          {d.email.toUpperCase()} · {d.phone} · HYDERABAD
        </div>
      </Reveal>
    </section>);

}

function KineticVariation() {
  return (
    <div style={kineticStyles.root}>
      <KineticHero />
      <KineticMarquee />
      <KineticMetrics />
      <KineticProjects />
      <KineticExperience />
      <KineticCompetencies />
      <KineticCerts />
      <KineticContact />
    </div>);

}

window.KineticVariation = KineticVariation;