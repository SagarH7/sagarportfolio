/* ============================================================
   PLAYFUL — cursor follower, tilt cards, scramble text,
   unexpected moments. Still professional, just alive.
   ============================================================ */

const playfulStyles = {
  root: {
    position: "relative",
    overflow: "hidden",
  },
};

// scramble-in text on reveal
function Scramble({ text, trigger = "view", delay = 0, style }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(text);
  const started = React.useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·";

  const run = () => {
    if (started.current) return;
    started.current = true;
    const target = text;
    const t0 = performance.now() + delay * 1000;
    const duration = 900;
    const tick = (now) => {
      if (now < t0) { requestAnimationFrame(tick); return; }
      const t = Math.min(1, (now - t0) / duration);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        const charProgress = Math.max(0, Math.min(1, (t - (i / target.length) * 0.6) * 2.5));
        if (charProgress >= 1 || target[i] === " " || target[i] === "\n") out += target[i];
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(out);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { run(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  return <span ref={ref} style={style}>{display}</span>;
}

// tilt card
function Tilt({ children, style, max = 8 }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ ...style, transition: "transform .3s cubic-bezier(.2,.7,.2,1)", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

// cursor follower (dot + ring)
function CursorFollower() {
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const [label, setLabel] = React.useState("");
  React.useEffect(() => {
    let tx = 0, ty = 0, rx = 0, ry = 0;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    };
    const rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    const onEnter = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) setLabel(t.getAttribute("data-cursor") || "");
    };
    const onLeave = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) setLabel("");
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden style={{
        position: "fixed", top: 0, left: 0, width: 6, height: 6, borderRadius: "50%",
        background: "var(--ink)", pointerEvents: "none", zIndex: 150,
        marginLeft: -3, marginTop: -3, mixBlendMode: "difference",
      }} />
      <div ref={ringRef} aria-hidden style={{
        position: "fixed", top: 0, left: 0, zIndex: 149, pointerEvents: "none",
        width: label ? 100 : 36, height: label ? 100 : 36, borderRadius: "50%",
        border: "1px solid var(--ink)",
        marginLeft: label ? -50 : -18, marginTop: label ? -50 : -18,
        transition: "width .3s cubic-bezier(.2,.7,.2,1), height .3s cubic-bezier(.2,.7,.2,1), margin .3s cubic-bezier(.2,.7,.2,1), background .3s",
        background: label ? "var(--ink)" : "transparent",
        color: "var(--bg)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
        textAlign: "center",
        mixBlendMode: label ? "normal" : "difference",
      }}>{label}</div>
    </>
  );
}

function PlayfulHero() {
  const d = window.PORTFOLIO;
  const [pill, setPill] = React.useState(0);
  const pills = ["Technical Program Manager", "Application Delivery Manager", "AI Application Manager", "GxP Operator", "Life Sciences IT"];
  React.useEffect(() => {
    const id = setInterval(() => setPill(p => (p + 1) % pills.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      padding: "120px 48px 64px",
      maxWidth: 1400,
      margin: "0 auto",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>
      {/* floating shapes */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 180, height: 180, borderRadius: "50%", background: "var(--accent-soft)", filter: "blur(40px)", animation: "p-float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "6%", width: 120, height: 120, borderRadius: "50%", background: "oklch(0.92 0.04 260)", filter: "blur(30px)", animation: "p-float 10s ease-in-out infinite reverse" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 80 }}>
        <div>Portfolio · Hyderabad</div>
        <div data-cursor="hello">👋 Sagar here</div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <span className="chip" data-cursor="online" style={{ background: "var(--accent-soft)", borderColor: "var(--accent)", color: "var(--accent-deep)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-deep)", marginRight: 8, display: "inline-block", animation: "pulse 2s infinite" }}></span>
            Currently: {pills[pill]}
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(64px, 13vw, 220px)",
          lineHeight: 0.88,
          letterSpacing: "-0.04em",
          margin: "0 0 32px",
          fontWeight: 400,
          textWrap: "balance",
        }}>
          Hi, I'm{" "}
          <span data-cursor="that's me!" style={{ fontStyle: "italic", color: "var(--accent-deep)", display: "inline-block", transition: "transform .3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(-2deg) scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotate(0) scale(1)"}
          >Sagar</span>.<br />
          I run programs in<br />
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ position: "relative", zIndex: 1 }}>regulated</span>
            <svg aria-hidden style={{ position: "absolute", left: "-2%", bottom: "-8%", width: "104%", height: "32%", zIndex: 0 }} viewBox="0 0 300 30" preserveAspectRatio="none">
              <path d="M 4,20 Q 80,4 160,16 T 296,18" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: "p-draw 2s .5s forwards cubic-bezier(.2,.7,.2,1)" }} />
            </svg>
          </span>{" "}
          places.
        </h1>

        <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.5, margin: "0 0 40px", textWrap: "pretty" }}>
          11+ years running validated clinical & life-sciences apps for global pharma — including Novartis.
          Now bringing emerging AI into the same regulated world, carefully — because here, a hallucination isn't a UX bug, it's a compliance event.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener" data-cursor="let's connect"
            style={{ transition: "transform .3s cubic-bezier(.2,.7,.2,1)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px) rotate(-1deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) rotate(0)"}
          >
            <LinkedInIconP /> Connect on LinkedIn →
          </a>
          <span className="chip">Open to roles · TPM / Delivery / AI App Mgmt</span>
        </div>
      </div>
    </section>
  );
}

function LinkedInIconP() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.338V9.725H5.667v8.613H8.34zM7.003 8.575a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763v-4.722c0-2.475-1.337-3.625-3.12-3.625-1.44 0-2.083.79-2.443 1.348V9.725h-2.71c.036.76 0 8.613 0 8.613h2.71v-4.81c0-.243.017-.487.089-.66.196-.487.642-.99 1.392-.99.98 0 1.373.747 1.373 1.844v4.616h2.71z"/>
    </svg>
  );
}

function DownloadIconP() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function PlayfulAbout() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="label" style={{ marginBottom: 24 }}>The short version</div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          {d.about.map((p, i) => (
            <p key={i} style={{ fontSize: 22, lineHeight: 1.5, color: "var(--ink)", margin: "0 0 24px", textWrap: "pretty", fontFamily: i === 0 ? "var(--serif)" : "var(--sans)", fontStyle: i === 0 ? "italic" : "normal" }}>
              {p}
            </p>
          ))}
        </div>
        <Tilt max={6} style={{ position: "relative" }}>
          <div style={{
            background: "var(--bg-2)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 32,
            transform: "rotate(1.5deg)",
          }}>
            <div className="label" style={{ marginBottom: 20 }}>Quick facts</div>
            {[
              ["Base", "Hyderabad, IN"],
              ["Years", "11+"],
              ["Current", "Cognizant → Novartis"],
              ["Looking for", "TPM / Delivery / AI App Mgmt"],
              ["Domain", "Pharma · Life Sci · Healthcare"],
              ["Superpower", "AI in GxP environments"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "10px 0", borderTop: "1px solid var(--line-2)", fontSize: 14 }}>
                <span style={{ color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", alignSelf: "center" }}>{k}</span>
                <span style={{ color: "var(--ink)", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        </Tilt>
      </div>
    </section>
  );
}

function PlayfulMetrics() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "80px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="label" style={{ marginBottom: 40 }}>The receipts</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {d.metrics.map((m, i) => (
          <Tilt key={i} max={10}>
            <div data-cursor={m.label.toLowerCase()} style={{
              padding: "32px 24px",
              background: i % 2 === 0 ? "var(--bg-2)" : "var(--ink)",
              color: i % 2 === 0 ? "var(--ink)" : "var(--bg)",
              borderRadius: 16,
              border: "1px solid var(--line)",
              height: "100%",
            }}>
              <div style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(56px, 6vw, 88px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                marginBottom: 16,
                color: i % 2 === 0 ? "var(--accent-deep)" : "var(--accent)",
              }}>
                {m.value}
              </div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{m.sub}</div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

function PlayfulProjects() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <div className="label" style={{ marginBottom: 16 }}>Things I've shipped</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", margin: 0, fontWeight: 400, maxWidth: 900, textWrap: "balance" }}>
          <Scramble text="Eight programs. Seven years. All regulated." />
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 20 }}>
        {d.projects.map((p, i) => (
          <PlayfulProjectCard key={p.id} p={p} idx={i} />
        ))}
      </div>
    </section>
  );
}

function PlayfulProjectCard({ p, idx }) {
  const [hover, setHover] = React.useState(false);
  const rotations = [-1.2, 0.8, -0.5, 1, -0.8, 0.5];
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="explore"
      style={{
        background: hover ? "var(--ink)" : "var(--bg)",
        color: hover ? "var(--bg)" : "var(--ink)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: 28,
        transform: `rotate(${hover ? 0 : rotations[idx % rotations.length]}deg) translateY(${hover ? -6 : 0}px)`,
        transition: "transform .4s cubic-bezier(.2,.7,.2,1), background .3s, color .3s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", opacity: 0.6 }}>{String(idx + 1).padStart(2, "0")} / {p.period}</span>
        <span style={{ fontSize: 18, transition: "transform .3s", transform: hover ? "translate(4px, -4px) rotate(-8deg)" : "none" }}>↗</span>
      </div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 6 }}>{p.title}</div>
      <div style={{ fontSize: 14, opacity: 0.75, marginBottom: 20 }}>{p.subtitle}</div>
      <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85, margin: "0 0 20px", textWrap: "pretty", flex: 1 }}>{p.summary}</p>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${p.impact.length}, 1fr)`, gap: 12, marginBottom: 16, paddingTop: 16, borderTop: hover ? "1px solid oklch(1 0 0 / 0.15)" : "1px solid var(--line)" }}>
        {p.impact.map((m, i) => (
          <div key={i}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: hover ? "var(--accent)" : "var(--accent-deep)", lineHeight: 1 }}>{m.v}</div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{m.k}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            padding: "3px 8px",
            borderRadius: 999,
            border: hover ? "1px solid oklch(1 0 0 / 0.2)" : "1px solid var(--line)",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function PlayfulExperience() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="label" style={{ marginBottom: 24 }}>Path so far</div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 56px", letterSpacing: "-0.02em", fontWeight: 400, textWrap: "balance" }}>
        From <em style={{ color: "var(--accent-deep)" }}>BFSI checks</em> to <em style={{ color: "var(--accent-deep)" }}>regulated pharma</em>.
      </h2>
      <div>
        {d.experience.map((e, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 2fr", gap: 40,
            padding: "32px 0",
            borderTop: "1px solid var(--line)",
            transition: "padding .3s ease",
          }}
            onMouseEnter={ev => { ev.currentTarget.style.paddingLeft = "16px"; ev.currentTarget.style.background = "var(--bg-2)"; }}
            onMouseLeave={ev => { ev.currentTarget.style.paddingLeft = "0"; ev.currentTarget.style.background = "transparent"; }}
          >
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 32, letterSpacing: "-0.01em", marginBottom: 6 }}>{e.company}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{e.period.toUpperCase()} · {e.location.toUpperCase()}</div>
            </div>
            <div>
              <div style={{ fontSize: 16, color: "var(--ink)", marginBottom: 12, fontWeight: 500 }}>{e.role}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)" }}>
                {e.bullets.map((b, j) => <li key={j} style={{ marginBottom: 6, fontSize: 14 }}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

function PlayfulCompetencies() {
  const d = window.PORTFOLIO;
  const all = d.competencies.flatMap(g => g.items.map(item => ({ item, group: g.group })));
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="label" style={{ marginBottom: 24 }}>Toolkit</div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 5vw, 56px)", margin: "0 0 48px", letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 800, textWrap: "balance" }}>
        Everything I pull from, on any given day.
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {all.map((it, i) => (
          <span
            key={i}
            data-cursor={it.group.toLowerCase()}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid var(--line)",
              background: "var(--bg-2)",
              fontSize: 14,
              color: "var(--ink-2)",
              cursor: "pointer",
              transition: "all .25s cubic-bezier(.2,.7,.2,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.transform = "translateY(-2px) rotate(-2deg)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-2)"; e.currentTarget.style.color = "var(--ink-2)"; e.currentTarget.style.transform = "translateY(0) rotate(0)"; e.currentTarget.style.borderColor = "var(--line)"; }}
          >
            {it.item}
          </span>
        ))}
      </div>
    </section>
  );
}

function PlayfulCerts() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 48px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Certifications</div>
          <div style={{ display: "grid", gap: 8 }}>
            {d.certifications.map((c, i) => (
              <div key={i} data-cursor="certified" style={{
                padding: "14px 18px",
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                fontSize: 14,
                display: "flex",
                gap: 14,
                alignItems: "center",
                transition: "transform .3s, border-color .3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "var(--line)"; }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }}></span>
                {c}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="label" style={{ marginBottom: 24 }}>Education</div>
          <Tilt max={6}>
            <div style={{
              padding: 32,
              background: "var(--ink)",
              color: "var(--bg)",
              borderRadius: 16,
            }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1.1, marginBottom: 8, letterSpacing: "-0.01em" }}>{d.education.degree}</div>
              <div style={{ fontSize: 16, opacity: 0.8, marginBottom: 32 }}>{d.education.school}</div>
              <div className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.1em", textTransform: "uppercase" }}>Class of {d.education.year}</div>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

function PlayfulContact() {
  const d = window.PORTFOLIO;
  const [waving, setWaving] = React.useState(false);
  return (
    <section style={{ padding: "160px 48px 80px", maxWidth: 1400, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <div
        onMouseEnter={() => setWaving(true)}
        onMouseLeave={() => setWaving(false)}
        style={{
          fontSize: 80,
          display: "inline-block",
          marginBottom: 24,
          transformOrigin: "70% 70%",
          animation: waving ? "p-wave .6s ease-in-out infinite" : "p-wave 2s ease-in-out 3",
          cursor: "pointer",
        }}
        data-cursor="wave back!"
      >
        👋
      </div>
      <h2 style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(56px, 9vw, 140px)",
        lineHeight: 0.95,
        letterSpacing: "-0.03em",
        margin: "0 0 32px",
        fontWeight: 400,
        textWrap: "balance",
      }}>
        So — <em style={{ color: "var(--accent-deep)" }}>let's talk</em>?
      </h2>
      <p style={{ fontSize: 19, color: "var(--ink-2)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.5, textWrap: "pretty" }}>
        Technical Program · Delivery · AI Application Manager. Pharma, Life Sciences, Healthcare IT. Remote or Hyderabad.
      </p>
      <div className="cta-row">
        <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener" data-cursor="👋 connect"
          style={{ fontSize: 16, padding: "16px 28px", transition: "transform .3s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) rotate(-2deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}
        >
          <LinkedInIconP /> Connect on LinkedIn
        </a>
        <a className="cta-secondary" href="resume.pdf" target="_blank" rel="noopener" data-cursor="grab the pdf"
          style={{ fontSize: 16, padding: "16px 28px", transition: "transform .3s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px) rotate(2deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}
        >
          <DownloadIconP /> Download Resume
        </a>
      </div>
      <div style={{ marginTop: 64, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
        {d.email.toUpperCase()} · {d.phone}
      </div>
    </section>
  );
}

function PlayfulVariation() {
  return (
    <div style={playfulStyles.root}>
      <CursorFollower />
      <PlayfulHero />
      <PlayfulAbout />
      <PlayfulMetrics />
      <PlayfulProjects />
      <PlayfulExperience />
      <PlayfulCompetencies />
      <PlayfulCerts />
      <PlayfulContact />
    </div>
  );
}

window.PlayfulVariation = PlayfulVariation;
