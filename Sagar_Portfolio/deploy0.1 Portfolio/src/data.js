// Portfolio data — shared across all three variations
// Updated from latest resume (May 2026): more conservative metrics,
// TPM-forward positioning, Operations Copilot reframed as prototype,
// added Perseus & GNW.
window.PORTFOLIO = {
  name: "Sagar Haremanik",
  roles: [
    "Technical Program Manager",
    "Application Delivery Manager",
    "Life Sciences AI & Clinical Systems",
  ],
  tagline: "Program rigor, regulatory expertise, and emerging AI — meeting in the same role.",
  location: "Hyderabad, India",
  email: "sagarharemanik@outlook.com",
  phone: "+91 78422 92789",
  linkedin: "https://www.linkedin.com/in/sagar-haremanik",
  years: "11+",

  about: [
    "I'm a Technical Program & Delivery Manager with 11+ years leading validated clinical and life-sciences applications, AI initiatives, and cross-functional programs for global pharma clients including Novartis.",
    "Currently at Cognizant, managing multiple regulated applications — directing 8–10 engineers across teams, owning full SDLC under Agile and ITIL, and partnering with senior stakeholders on roadmap, delivery, and operations.",
    "Looking for leadership roles as Technical Program Manager, Delivery Manager, or AI Application Manager — where program rigor, regulatory expertise, and emerging AI capability intersect to deliver measurable impact.",
  ],

  metrics: [
    { value: "~99%", label: "Uptime sustained", sub: "7 mission-critical clinical trial apps · 7 consecutive years" },
    { value: "8+", label: "Apps owned", sub: "Within a GxP & SOX-regulated portfolio at Cognizant" },
    { value: "8–10", label: "Engineers led", sub: "across application teams (2–4 per app)" },
    { value: "0", label: "Major critical findings", sub: "across GxP, SOX, FDA 21 CFR Part 11 & HIPAA audits" },
    { value: "2", label: "AWS migrations", sub: "Led from the operations side as application owner" },
    { value: "TFS → Bitbucket", label: "CI/CD modernization", sub: "end-to-end repo & pipeline migration" },
  ],

  projects: [
    {
      id: "ai-prototype",
      title: "AI-Assisted Ops Productivity",
      subtitle: "Self-driven prototype on enterprise Custom GPT",
      role: "Builder · Scoping peer rollout",
      period: "2025 – Present",
      tags: ["Custom GPT", "RAG-style", "Clinical IT", "Productivity"],
      summary: "Identified incident-triage and knowledge-retrieval as the highest-friction loops in clinical IT operations, and built a personal prototype on enterprise Custom GPT that pulls relevant context from internal documentation.",
      impact: [
        { k: "Status", v: "Personal use → peer pilot" },
        { k: "Validation", v: "Time savings in own use" },
        { k: "Next", v: "Governance scoping" },
      ],
      details: [
        "Built on the sanctioned enterprise Custom GPT — no shadow infrastructure, no data leaving validated boundaries.",
        "Shared with peer Application Managers; positive feedback led to a proposal to extend it across the AM cohort for productivity feedback.",
        "Currently scoping the validation, audit logging, and governance considerations any future formal rollout in a GxP environment would require.",
      ],
    },
    {
      id: "gma-vision",
      title: "GMA Vision",
      subtitle: "Novartis Global Medical Affairs — drug review & approval platform",
      role: "Application Manager · SME · Tech Lead",
      period: "2024 – Present",
      tags: ["GxP", "Regulatory", ".NET", "Azure"],
      summary: "Novartis global drug review and approval platform supporting regulatory submissions across multiple markets. In-house developed; I own end-to-end product delivery with business and technology stakeholders.",
      impact: [
        { k: "Server migration", v: "On-prem → hybrid cloud" },
        { k: "Code migration", v: "TFS → Bitbucket" },
        { k: "Cadence", v: "Faster delivery downstream" },
      ],
      details: [
        "Led end-to-end server migration and code-repository move to Bitbucket; partnered as application owner on the on-prem → hybrid-cloud cutover.",
        "Smoother data validation and faster delivery cadence for downstream regulatory workflows.",
        "Stack: C# · ASP.NET · SQL Server · jQuery · Bootstrap · SSIS / SSRS.",
      ],
    },
    {
      id: "ctms-veeva",
      title: "CTMS · Veeva ODH",
      subtitle: "Downstream impact ownership for the ODH program",
      role: "Application Owner · Downstream Impact Lead",
      period: "2024 – 2025",
      tags: ["Integration", "CTMS", "Veeva ODH"],
      summary: "Owned the downstream applications affected by the CTMS Operational Data Hub program — impact assessment, fixes, and enhancements to keep clinical data pipelines stable through ODH releases.",
      impact: [
        { k: "Scope", v: "Multi-app downstream" },
        { k: "Ownership", v: "Impact → cutover → stabilization" },
      ],
      details: [
        "Coordinated with the ODH program team and clinical data stakeholders on release readiness, regression coverage, and post-release stabilization.",
        "Stack: C# · ASP.NET · SQL Server · jQuery · Bootstrap · Tibco ODBC drivers via Dv12n API · Postman · Azure DevOps.",
      ],
    },
    {
      id: "perseus-gnw",
      title: "Perseus & GNW",
      subtitle: "Pharma intelligence + Global News Watch platforms",
      role: "Application Manager",
      period: "2025 – Present",
      tags: ["AWS", "Angular", ".NET Core", "Intelligence"],
      summary: "Perseus monitors drug pipeline development, clinical trials, patent filings, and partnership deals — generating automated business summaries for global pharma stakeholders. GNW is the corporate communications & daily-newsletter platform that sits alongside it.",
      impact: [
        { k: "Hosting", v: "AWS IaaS" },
        { k: "Audience", v: "Global pharma stakeholders" },
      ],
      details: [
        "Both in-house developed and cloud-hosted on AWS (IaaS).",
        "Stack: C# .NET Core · ASP.NET Web API · SQL Server · Angular · Bootstrap · AWS services · Postman · Azure DevOps.",
      ],
    },
    {
      id: "pricepro",
      title: "PricePro · iEnvision",
      subtitle: "Competitive pricing (SOX) & publication review SaaS platforms",
      role: "Application Manager",
      period: "Late 2025 – Present",
      tags: ["SaaS", "SOX", "Salesforce"],
      summary: "Established end-to-end operational ownership for two SaaS platforms — standardizing incident triage, SLA adherence, and vendor coordination across both.",
      impact: [
        { k: "Audit cycles", v: "SOX controls executed" },
        { k: "Ops", v: "Standardized triage" },
      ],
      details: [
        "Drove standardized, compliant operations and timely ticket resolution; supported control completion and SOX audit cycles.",
        "Tech context: SaaS apps by Model N and iEnvision vendors on Salesforce + SQL Server, with SOX audit-trail controls.",
      ],
    },
    {
      id: "oncology",
      title: "GMA Vision Oncology",
      subtitle: "Global oncology clinical study review platform",
      role: "Operations Manager & Tech Lead",
      period: "2021 – 2024",
      tags: ["Clinical", ".NET", "SQL"],
      summary: "SME for the global oncology study review platform — drug discovery, study design, and regulatory data workflows.",
      impact: [
        { k: "CI/CD", v: "TFS → Bitbucket" },
        { k: "Query tuning", v: "Contributed perf gains" },
      ],
      details: [
        "Led end-to-end CI/CD migration from TFS to Bitbucket.",
        "Contributed SQL query performance tuning supporting clinical workflows.",
        "Stack: C# / .NET · ASP.NET MVC · SQL Server · SSRS / SSIS · JavaScript.",
      ],
    },
    {
      id: "qr-trace",
      title: "QR Medical Traceability",
      subtitle: "Automated tracking & validation for global medical facilities",
      role: "Technical Lead",
      period: "2021 – 2023",
      tags: ["Automation", "Compliance", "Traceability"],
      summary: "Built the automated data tracking and validation capability for global medical facility operations and clinical study traceability.",
      impact: [
        { k: "Manual reconciliation", v: "Reduced" },
        { k: "Audit readiness", v: "Improved for GxP" },
      ],
      details: [
        "Reduced manual reconciliation effort across facility operations.",
        "Improved audit readiness for GxP inspections on the owned scope.",
      ],
    },
    {
      id: "dbcs",
      title: "DBCS Clinical Data Repository",
      subtitle: "Drug discovery, compound processing & lifecycle data",
      role: "Application Manager",
      period: "2019 – 2021",
      tags: ["GxP", "Clinical Data"],
      summary: "Managed operations for the clinical database application storing and managing drug discovery, compound processing, and lifecycle data under GxP controls.",
      impact: [
        { k: "Compliance", v: "GxP controls" },
        { k: "Scope", v: "Data lifecycle ops" },
      ],
      details: [
        "Owned day-to-day operations under GxP controls.",
        "Supported compound processing and drug discovery data pipelines end-to-end.",
      ],
    },
  ],

  experience: [
    {
      company: "Cognizant Technology Solutions",
      role: "IT Application Manager — Life Sciences Division",
      period: "Jun 2019 – Present",
      location: "Hyderabad, India",
      bullets: [
        "Application Manager for GxP and SOX-regulated clinical and life-sciences apps serving global pharma (incl. Novartis).",
        "Leading 8–10 engineers across application teams — typically 2–4 per application.",
        "Owning SDLC, Agile delivery, ITIL operations, validated releases, and compliance audit support.",
      ],
    },
    {
      company: "Unisys India",
      role: "Software Engineer",
      period: "Mar 2017 – Jun 2019",
      location: "Bangalore · Hyderabad",
      bullets: [
        "Built and maintained financial payment, remittance, and Lockbox systems on a high-volume BFSI platform.",
        "Real-time payments and remittance development in C# / .NET and SQL Server.",
        "Contributed to automation of check-clearing workflows and DB stored-procedure / query optimization.",
      ],
    },
    {
      company: "Gatix E-Solutions",
      role: "Jr. Software Engineer → Programmer Analyst Trainee",
      period: "Apr 2014 – Mar 2017",
      location: "Hyderabad",
      bullets: [
        "Application development, QA, and defect resolution on enterprise software projects.",
        "Foundational SDLC, debugging, and structured delivery-team experience.",
      ],
    },
  ],

  competencies: [
    {
      group: "AI & Productivity",
      items: ["GPT", "Gemini", "Claude", "Prompt Engineering", "Enterprise Custom GPT", "M365 Copilot", "GitHub Copilot", "AI productivity prototyping"],
    },
    {
      group: "GxP & Compliance",
      items: ["GxP / SOX Applications", "FDA 21 CFR Part 11", "HIPAA", "GDPR", "Validated Systems", "Audit Trails", "E-Records & Signatures", "Audit Evidence & Controls Execution"],
    },
    {
      group: "Clinical Systems",
      items: ["CTMS", "Veeva CTMS / ODH downstream", "Global Medical Affairs", "Drug Review Workflows", "Oncology Studies", "Clinical Data Mgmt", "Medical Traceability"],
    },
    {
      group: "Program Management",
      items: ["Product Roadmap", "Stakeholder Mgmt", "Feature Prioritization", "Agile Sprint Planning", "Backlog Grooming", "Cross-functional Leadership", "Risk Management"],
    },
    {
      group: "App Mgmt & Ops",
      items: ["SDLC", "ITIL / ITSM", "ServiceNow", "SLA Management", "Incident / Change / Problem", "Production Support", "Vulnerability Remediation", "APM"],
    },
    {
      group: "Technical",
      items: ["Python", "C#", ".NET Framework / Core", "ASP.NET MVC", "SQL Server", "REST APIs", "Postman", "Azure DevOps", "JavaScript", "CI/CD Pipelines"],
    },
    {
      group: "Cloud & Tools",
      items: ["Azure", "AWS", "GCP", "Azure DevOps", "Bitbucket", "JIRA", "Confluence", "ServiceNow", "PROTON", "Postman"],
    },
  ],

  certifications: [
    "Microsoft Azure AI Fundamentals (AI-900)",
    "Google AI Leader Certified",
    "GitHub Copilot Certified",
    "RAG Applications — Coursera",
    "AI for Everyone · AI for Developers — DeepLearning.AI",
    "AI Agents Fundamentals — Udemy",
    "Kick-off Agile (PMP-aligned)",
  ],

  education: {
    degree: "B.Sc. Computer Science",
    school: "Osmania University, Hyderabad",
    year: "2013",
  },
};
