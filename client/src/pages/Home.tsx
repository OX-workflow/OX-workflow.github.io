/**
 * ONYX Operational Documentation: evidence-first case-study page with a navy structural rail,
 * precise technical metadata, layered system motifs, and restrained editorial hierarchy.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ExternalLink,
  FileCode2,
  FolderOpen,
  Github,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

const ASSETS = {
  hero: "/manus-storage/onyx-hero-architecture_44510d66.png",
  layers: "/manus-storage/onyx-layers-diagram_334467f9.png",
  evidence: "/manus-storage/onyx-evidence-texture_7f7cb94b.png",
  mark: "/manus-storage/onyx-mark_63214367.png",
  wordmark: "/manus-storage/onyx-official-wordmark_082dbcd2.png",
};

const navItems = [
  ["01", "Overview", "overview"],
  ["02", "Architecture", "architecture"],
  ["03", "IFEM", "ifem"],
  ["04", "Evidence", "evidence"],
  ["05", "Developer", "developer"],
] as const;

const architectureLayers = [
  {
    index: "01",
    title: "Kernel & contract boundary",
    detail:
      "Platform kernel and platform-contracts establish reusable primitives and explicit interaction boundaries before higher-level behavior is composed.",
    tags: ["platform-kernel", "platform-contracts"],
  },
  {
    index: "02",
    title: "Mission domains",
    detail:
      "Dedicated domain crates organize mission, work, communication, file, policy, profile, todo, and notification responsibilities as distinct system concerns.",
    tags: ["mission-domain", "work-domain", "todo-domain"],
  },
  {
    index: "03",
    title: "Applications & composition",
    detail:
      "Query, worker, security, audit, and client-composition applications provide a place to coordinate use cases without collapsing domain boundaries.",
    tags: ["query-application", "audit-application", "client-composition"],
  },
  {
    index: "04",
    title: "Infrastructure & transport",
    detail:
      "Persistence, local blob storage, messaging, observability, background jobs, CRDT synchronization, and transport modules remain separate implementation concerns.",
    tags: ["persistence-sqlite", "synchronization-domain", "sync-transport"],
  },
];

const evidenceItems = [
  {
    icon: Github,
    label: "SOURCE REPOSITORY",
    title: "ONYX workspace",
    copy: "The public repository is the primary evidence surface: its workspace, client folders, deployment artifacts, documentation, and automation can be inspected directly.",
    href: "https://github.com/SMozaff/Onyx-Framwork",
    action: "Open repository",
  },
  {
    icon: FileCode2,
    label: "IMPLEMENTATION RECORD",
    title: "Architecture & verification",
    copy: "The project record describes a Rust-centric, multi-crate mission-operations architecture and names delivered scope alongside current limits rather than presenting a finished product claim.",
    href: "https://SMozaff.github.io/",
    action: "View project record",
  },
  {
    icon: BookOpenText,
    label: "METHODOLOGY",
    title: "IFEM doctrine",
    copy: "The supporting doctrine explains the interface-first approach: explicit boundaries, contracts, ownership, and verification evidence before large-scale parallel implementation.",
    href: "https://IFEM-doctrine.github.io/",
    action: "Read doctrine",
  },
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const stored = window.localStorage.getItem("onyx-theme");
    const initialDark = stored === "dark";
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const sections = navItems
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const topVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topVisible) setActiveSection(topVisible.target.id);
      },
      { rootMargin: "-22% 0px -64% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("onyx-theme", next ? "dark" : "light");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="onyx-shell min-h-screen bg-[#edf3f8] text-[#112847] dark:bg-[#07182f] dark:text-[#edf5fb]">
      <aside className="onyx-rail">
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} className="brand-lockup" aria-label="ONYX Framework overview">
          <span className="wordmark-frame"><img src={ASSETS.wordmark} alt="ONYX Tectosilicate Framework" /></span>
        </a>

        <div className="rail-divider" />
        <nav className="rail-nav" aria-label="Case study sections">
          {navItems.map(([number, label, id]) => (
            <button key={id} className={activeSection === id ? "rail-link active" : "rail-link"} onClick={() => scrollTo(id)}>
              <span>{number}</span>
              <b>{label}</b>
              <ChevronRight aria-hidden="true" />
            </button>
          ))}
        </nav>

        <div className="rail-foot">
          <div className="live-stamp"><span /> CASE STUDY RECORD</div>
          <p>Local-first mission operations architecture.</p>
          <a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer">View source <ArrowUpRight /></a>
        </div>
      </aside>

      <header className="mobile-header">
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} className="brand-lockup" aria-label="ONYX Framework overview">
          <span className="wordmark-frame"><img src={ASSETS.wordmark} alt="ONYX Tectosilicate Framework" /></span>
        </a>
        <div className="mobile-actions">
          <button className="theme-button" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? <Sun /> : <Moon />}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile case study sections">
            {navItems.map(([number, label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}><span>{number}</span>{label}</button>
            ))}
          </nav>
        )}
      </header>

      <main className="onyx-content">
        <header className="topbar">
          <div><span className="eyebrow">SYSTEMS ARCHITECTURE / CASE STUDY</span></div>
          <div className="topbar-actions">
            <a className="source-link" href="/assets"><FolderOpen /> Asset library</a>
            <a className="source-link" href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer"><Github /> Source repository</a>
            <button className="theme-button" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? <Sun /> : <Moon />}</button>
          </div>
        </header>

        <section id="overview" className="hero-section section-anchor">
          <img className="hero-image" src={ASSETS.hero} alt="Abstract ONYX architecture field" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="signal-dot" /> ONYX FRAMEWORK</p>
            <h1>Mission operations,<br /><i>with boundaries</i> in view.</h1>
            <p className="hero-intro">A local-first, authority-aware mission operations system structured as a Rust-centric workspace with separate domain, application, infrastructure, synchronization, transport, and client concerns.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => scrollTo("architecture")}>Inspect architecture <ArrowDownRight /></button>
              <a className="text-action" href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer">Trace the implementation <ArrowUpRight /></a>
            </div>
          </div>
          <div className="hero-record reveal delay-1">
            <div className="record-kicker">REPOSITORY RECORD</div>
            <dl>
              <div><dt>Implementation</dt><dd>Rust-centric workspace</dd></div>
              <div><dt>Client surfaces</dt><dd>Web · Desktop · Mobile</dd></div>
              <div><dt>Project stance</dt><dd>In progress; scope stated</dd></div>
            </dl>
          </div>
          <div className="hero-caption">Interface-first development · explicit responsibility · verification-oriented work</div>
        </section>

        <section className="reading-band overview-band">
          <div className="section-index"><span>01</span><p>FRAMEWORK<br />OVERVIEW</p></div>
          <div className="overview-text">
            <p className="eyebrow">THE ENGINEERING PROBLEM</p>
            <h2>Coordination is not a reason to blur responsibility.</h2>
            <p>ONYX addresses mission work that must operate locally, preserve authority-aware decisions, and synchronize across multiple environments. Its architecture keeps the responsibilities of kernels, domains, applications, infrastructure, transport, and clients inspectable instead of relying on one undifferentiated application layer.</p>
          </div>
          <div className="principles-list">
            <div><span>01</span><b>Modular scope</b><p>Separated concerns make system change locatable.</p></div>
            <div><span>02</span><b>Extensible surface</b><p>Composition and transport layers provide explicit places to connect behavior.</p></div>
            <div><span>03</span><b>Traceable work</b><p>Automation, documentation, and deployment artifacts supply evidence alongside code.</p></div>
          </div>
        </section>

        <section id="architecture" className="architecture-section section-anchor">
          <div className="section-heading reveal">
            <div className="section-index"><span>02</span><p>VERIFIED<br />LAYERS</p></div>
            <div>
              <p className="eyebrow">ARCHITECTURE MAP</p>
              <h2>Independent layers,<br />shared system intent.</h2>
            </div>
            <p className="heading-side-note">The repository’s workspace inventory groups modules by their architectural roles rather than a single feature-oriented package hierarchy.</p>
          </div>
          <div className="architecture-canvas">
            <div className="layer-list">
              {architectureLayers.map((layer, index) => (
                <article className={`layer-card reveal delay-${index + 1}`} key={layer.index}>
                  <span className="layer-no">{layer.index}</span>
                  <div><h3>{layer.title}</h3><p>{layer.detail}</p><div className="tags">{layer.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                </article>
              ))}
            </div>
            <div className="architecture-visual reveal delay-2">
              <figure className="layers-figure">
                <img src={ASSETS.layers} alt="Abstract stacked layers representing explicit system boundaries" />
                <figcaption><CircleDot /> Illustration of separated but connected architectural concerns.</figcaption>
              </figure>
              <div className="boundary-map" aria-label="Architecture boundary route from platform contracts to domains, applications, and adapters">
                <p>INTERFACE ROUTE</p>
                <ol>
                  <li><span>01</span><b>platform-contracts</b><small>shared primitives and contracts</small></li>
                  <li><span>02</span><b>domain crates</b><small>owned mission and policy behavior</small></li>
                  <li><span>03</span><b>applications</b><small>query, worker, audit, and composition</small></li>
                  <li><span>04</span><b>adapters & transports</b><small>persistence, observability, sync, and delivery</small></li>
                </ol>
              </div>
            </div>
          </div>

          <div className="inventory-strip">
            <div><b>08</b><span>increments<br />noted in repository</span></div>
            <div><b>27</b><span>crates<br />listed in overview</span></div>
            <div><b>06</b><span>binaries<br />listed in overview</span></div>
            <p>Repository-reported inventory; architecture and current work are inspectable in source.</p>
          </div>
        </section>

        <section id="ifem" className="ifem-section section-anchor">
          <div className="ifem-intro reveal">
            <div className="section-index"><span>03</span><p>BUILT WITH<br />IFEM</p></div>
            <p className="eyebrow">INTERFACE-FIRST ENGINEERING METHODOLOGY</p>
            <h2>The method shapes the boundary.<br /><i>The framework carries it.</i></h2>
            <p>ONYX is the mission-operations framework. IFEM is the engineering methodology behind its design discipline: treating interfaces, contracts, responsibility, and verification as first-class architectural objects.</p>
            <p className="ifem-clarifier"><b>Positioning:</b> IFEM informs ONYX engineering practice. It is not an ONYX runtime dependency, product layer, or replacement identity.</p>
            <a href="https://IFEM-doctrine.github.io/" target="_blank" rel="noreferrer" className="outlined-action">Read IFEM doctrine <ArrowUpRight /></a>
          </div>
          <div className="ifem-sequence reveal delay-1">
            {[
              ["01", "Boundary", "Make the responsibility line explicit."],
              ["02", "Contract", "Define shared rules before scale."],
              ["03", "Owner", "Keep accountability legible."],
              ["04", "Evidence", "Verify agreement in observable ways."],
            ].map(([number, title, copy]) => (
              <div className="sequence-step" key={number}><span>{number}</span><div><b>{title}</b><p>{copy}</p></div></div>
            ))}
          </div>
        </section>

        <section id="evidence" className="evidence-section section-anchor">
          <img className="evidence-bg" src={ASSETS.evidence} alt="" aria-hidden="true" />
          <div className="section-heading evidence-heading reveal">
            <div className="section-index"><span>04</span><p>TECHNICAL<br />EVIDENCE</p></div>
            <div><p className="eyebrow">INSPECTABLE RECORD</p><h2>Claims point back<br />to the work.</h2></div>
            <p className="heading-side-note">The case study links to source material and project records rather than substituting narrative for technical evidence.</p>
          </div>
          <div className="evidence-grid">
            {evidenceItems.map((item, index) => {
              const Icon = item.icon;
              return <article className={`evidence-card reveal delay-${index + 1}`} key={item.title}>
                <div className="evidence-icon"><Icon /></div>
                <p className="eyebrow">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <a href={item.href} target="_blank" rel="noreferrer">{item.action} <ArrowUpRight /></a>
              </article>;
            })}
          </div>
          <div className="scope-note reveal"><ShieldCheck /><div><b>Scope note</b><p>ONYX is presented as an in-progress architecture. Its public project record explicitly distinguishes delivered components from incomplete or unverified areas.</p></div></div>
        </section>

        <section id="developer" className="developer-section section-anchor">
          <div className="developer-rule" />
          <div className="developer-grid">
            <div className="developer-title reveal"><div className="section-index"><span>05</span><p>DEVELOPER<br />ATTRIBUTION</p></div><p className="eyebrow">DEVELOPED BY</p><h2>Soheil<br /><i>Mozaffari</i></h2></div>
            <div className="developer-bio reveal delay-1"><p>Software Engineer · Systems Architect</p><p className="developer-copy">An independent systems and software practice focused on explicit boundaries, maintainable architectures, and verification paths that remain traceable as a system grows.</p><div className="developer-links"><a href="https://SMozaff.github.io/" target="_blank" rel="noreferrer">Personal website <ArrowUpRight /></a><a href="https://orcid.org/0009-0001-2428-1295" target="_blank" rel="noreferrer">ORCID 0009-0001-2428-1295 <ArrowUpRight /></a><a href="https://github.com/SMozaff" target="_blank" rel="noreferrer">GitHub SMozaff <ArrowUpRight /></a></div></div>
          </div>
          <footer className="footer"><span>ONYX FRAMEWORK</span><span>CASE STUDY / 2026</span><a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }}>Back to top <ArrowUpRight /></a></footer>
        </section>
      </main>
    </div>
  );
}
