/* ============================================================
   SUBTLE — editorial, restrained, recruiter-friendly
   ============================================================ */

const subtleStyles = {
  root: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "96px 40px 80px",
  },
  topMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--ink-3)",
    marginBottom: 96,
    paddingBottom: 20,
    borderBottom: "1px solid var(--line)",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 80,
    alignItems: "end",
    paddingBottom: 64,
    borderBottom: "1px solid var(--line)",
  },
  heroName: {
    fontFamily: "var(--serif)",
    fontSize: "clamp(56px, 8vw, 120px)",
    lineHeight: 0.95,
    letterSpacing: "-0.02em",
    margin: 0,
    fontWeight: 400,
  },
  heroItalic: {
    fontStyle: "italic",
    color: "var(--accent-deep)",
  },
  heroRight: {
    paddingBottom: 12,
  },
  roles: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    fontSize: 15,
    color: "var(--ink-2)",
    marginBottom: 24,
  },
  tagline: {
    fontFamily: "var(--serif)",
    fontSize: 22,
    lineHeight: 1.35,
    color: "var(--ink)",
    margin: "0 0 24px",
    fontStyle: "italic",
    textWrap: "pretty",
  },
};

function SubtleHero() {
  const d = window.PORTFOLIO;
  return (
    <section style={subtleStyles.hero}>
      <div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 24 }}>
          Portfolio · {new Date().getFullYear()}
        </div>
        <h1 style={subtleStyles.heroName}>
          Sagar<br />
          <span style={subtleStyles.heroItalic}>Haremanik.</span>
        </h1>
      </div>
      <div style={subtleStyles.heroRight}>
        <p style={subtleStyles.tagline}>
          Program rigor, regulatory expertise, and emerging AI — meeting in the same role.
        </p>
        <div style={subtleStyles.roles}>
          {d.roles.map((r, i) => (
            <div key={i}>— {r}</div>
          ))}
        </div>
        <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener">
          <LinkedInIcon /> Connect on LinkedIn
        </a>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.338V9.725H5.667v8.613H8.34zM7.003 8.575a1.548 1.548 0 100-3.096 1.548 1.548 0 000 3.096zm11.335 9.763v-4.722c0-2.475-1.337-3.625-3.12-3.625-1.44 0-2.083.79-2.443 1.348V9.725h-2.71c.036.76 0 8.613 0 8.613h2.71v-4.81c0-.243.017-.487.089-.66.196-.487.642-.99 1.392-.99.98 0 1.373.747 1.373 1.844v4.616h2.71z"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function SubtleAbout() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 80 }}>
      <div className="label">About</div>
      <div style={{ maxWidth: 680 }}>
        {d.about.map((p, i) => (
          <p key={i} style={{ fontSize: 19, lineHeight: 1.6, margin: "0 0 20px", color: "var(--ink)", textWrap: "pretty" }}>
            {p}
          </p>
        ))}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
          <span className="chip">Hyderabad, India</span>
          <span className="chip">11+ yrs</span>
          <span className="chip">Pharma · Life Sciences</span>
          <span className="chip">Open to opportunities</span>
        </div>
      </div>
    </section>
  );
}

function SubtleMetrics() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "64px 0", borderBottom: "1px solid var(--line)" }}>
      <div className="label" style={{ marginBottom: 32 }}>Measurable impact · select</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: "1px solid var(--line-2)", borderLeft: "1px solid var(--line-2)" }}>
        {d.metrics.map((m, i) => (
          <div key={i} style={{
            padding: "32px 28px",
            borderRight: "1px solid var(--line-2)",
            borderBottom: "1px solid var(--line-2)",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 12 }}>{m.value}</div>
            <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SubtleProjects() {
  const d = window.PORTFOLIO;
  const [open, setOpen] = React.useState(null);
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 80, marginBottom: 48 }}>
        <div className="label">Selected Work</div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 48, margin: 0, letterSpacing: "-0.02em", fontWeight: 400, maxWidth: 720, textWrap: "balance" }}>
          Validated clinical systems, AI copilots, and the infra that keeps both running in a GxP world.
        </h2>
      </div>
      <div>
        {d.projects.map((p, i) => (
          <SubtleProjectRow key={p.id} p={p} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function SubtleProjectRow({ p, open, onToggle, index }) {
  return (
    <div style={{
      borderTop: "1px solid var(--line-2)",
      transition: "background .3s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--bg-2)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <button onClick={onToggle} style={{
        appearance: "none", border: 0, background: "transparent", width: "100%",
        display: "grid", gridTemplateColumns: "60px 1fr auto 80px", gap: 32,
        alignItems: "center", padding: "28px 0", cursor: "pointer", textAlign: "left",
        fontFamily: "inherit", color: "inherit",
      }}>
        <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{String(index).padStart(2, "0")}</div>
        <div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 28, letterSpacing: "-0.01em", marginBottom: 4 }}>{p.title}</div>
          <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{p.subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {p.tags.slice(0, 3).map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "right" }}>{p.period}</div>
      </button>
      {open && (
        <div style={{ padding: "0 0 40px 92px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 48 }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 20px", color: "var(--ink)", textWrap: "pretty" }}>{p.summary}</p>
            <ul style={{ paddingLeft: 18, margin: 0, color: "var(--ink-2)" }}>
              {p.details.map((d, i) => <li key={i} style={{ marginBottom: 8, lineHeight: 1.55 }}>{d}</li>)}
            </ul>
            <div style={{ marginTop: 20, fontSize: 13, color: "var(--ink-3)" }}>
              <span className="mono" style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10, marginRight: 10 }}>Role</span>
              {p.role}
            </div>
          </div>
          <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 10, padding: 20 }}>
            <div className="label" style={{ marginBottom: 16 }}>Impact</div>
            {p.impact.map((m, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1, marginBottom: 2, color: "var(--accent-deep)" }}>{m.v}</div>
                <div style={{ fontSize: 12, color: "var(--ink-2)" }}>{m.k}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SubtleExperience() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 80 }}>
      <div className="label">Experience</div>
      <div>
        {d.experience.map((e, i) => (
          <div key={i} style={{ paddingBottom: 32, marginBottom: 32, borderBottom: i < d.experience.length - 1 ? "1px solid var(--line-2)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, gap: 20, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 26, letterSpacing: "-0.01em" }}>{e.company}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{e.period}</div>
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", marginBottom: 12 }}>{e.role} · {e.location}</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-2)" }}>
              {e.bullets.map((b, j) => <li key={j} style={{ marginBottom: 4, fontSize: 14 }}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function SubtleCompetencies() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 80 }}>
      <div className="label">Core Competencies</div>
      <div>
        {d.competencies.map((g, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 24, padding: "20px 0", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, letterSpacing: "-0.01em" }}>{g.group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {g.items.map(it => <span key={it} className="chip">{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SubtleCerts() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "240px 1fr", gap: 80 }}>
      <div className="label">Certifications & Education</div>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 40 }}>
          {d.certifications.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--ink-2)" }}>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 24 }}>{String(i + 1).padStart(2, "0")}</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, borderTop: "1px solid var(--line-2)" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 4 }}>{d.education.degree}</div>
          <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{d.education.school} · {d.education.year}</div>
        </div>
      </div>
    </section>
  );
}

function SubtleContact() {
  const d = window.PORTFOLIO;
  return (
    <section style={{ padding: "120px 0 40px", textAlign: "center" }}>
      <div className="label" style={{ marginBottom: 24 }}>Let's talk</div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px, 6vw, 88px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 32px", fontWeight: 400, textWrap: "balance" }}>
        Looking for a TPM, Delivery Manager, or<br />
        <span style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>AI Application Manager</span> role.
      </h2>
      <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 560, margin: "0 auto 40px", textWrap: "pretty" }}>
        Pharma, Life Sciences, or Healthcare IT. Remote or Hyderabad-based. Let's connect.
      </p>
      <div className="cta-row">
        <a className="cta-linkedin" href={d.linkedin} target="_blank" rel="noopener" style={{ fontSize: 15, padding: "14px 24px" }}>
          <LinkedInIcon /> Connect on LinkedIn
        </a>
        <a className="cta-secondary" href="resume.pdf" target="_blank" rel="noopener" style={{ fontSize: 15, padding: "14px 24px" }}>
          <DownloadIcon /> Download Resume
        </a>
      </div>
      <div style={{ marginTop: 48, fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>
        {d.email.toUpperCase()} · {d.phone}
      </div>
    </section>
  );
}

function SubtleVariation() {
  return (
    <div style={subtleStyles.root}>
      <div style={subtleStyles.topMeta}>
        <div>Sagar Haremanik · Portfolio</div>
        <div>Hyderabad · Open to TPM / Delivery / AI App Mgmt</div>
      </div>
      <SubtleHero />
      <SubtleAbout />
      <SubtleMetrics />
      <SubtleProjects />
      <SubtleExperience />
      <SubtleCompetencies />
      <SubtleCerts />
      <SubtleContact />
    </div>
  );
}

window.SubtleVariation = SubtleVariation;
