import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  Github,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

const ASSETS = {
  brandLogo: "/assets/onyx-logo.png",
  brandWordmark: "/assets/onyx-wordmark-wide.png",
  secureAccess: "/assets/product/secure-browser-access.webp",
  missions: "/assets/product/mission-operations.png",
  overview: "/assets/product/operational-overview.png",
};

const navItems = [
  ["01", "Overview", "overview"],
  ["02", "Capabilities", "capabilities"],
  ["03", "Experience", "experience"],
  ["04", "Architecture", "architecture"],
  ["05", "IFEM", "ifem"],
  ["06", "Evidence", "evidence"],
  ["07", "Developer", "developer"],
] as const;

const capabilities = [
  ["Secure Access", "Controlled browser access and authority-aware workflows for sensitive operational contexts."],
  ["Mission Operations", "Coordinate missions, tasks, decisions, and states without losing responsibility boundaries."],
  ["Decision Evidence", "Maintain reviewable records that connect actions, decisions, and operational outcomes."],
  ["Extensible Architecture", "Expand capabilities through explicit contracts instead of collapsing system boundaries."],
];

const architectureLayers = [
  ["01", "Kernel & contract boundary", "Reusable primitives and interaction boundaries establish a stable foundation before higher-level behavior is composed.", ["platform-kernel", "platform-contracts"]],
  ["02", "Mission domains", "Dedicated domains keep mission, work, communication, policy, profile, todo, and notification responsibilities distinct.", ["mission-domain", "work-domain", "todo-domain"]],
  ["03", "Applications & composition", "Query, worker, security, audit, and client-composition applications coordinate use cases without becoming the domain model.", ["query-application", "audit-application", "client-composition"]],
  ["04", "Infrastructure & transport", "Persistence, synchronization, observability, messaging, and delivery remain separated implementation concerns.", ["persistence-sqlite", "sync-transport", "observability"]],
] as const;

const evidenceItems = [
  [Github, "Source repository", "ONYX workspace", "Inspect the public workspace, client surfaces, documentation, and automation evidence.", "https://github.com/SMozaff/Onyx-Framwork", "Open repository"],
  [FileCode2, "Implementation record", "Architecture & verification", "Review the published project record, delivered scope, and stated limitations.", "https://SMozaff.github.io/", "View project record"],
  [BookOpenText, "Methodology", "IFEM doctrine", "Read the interface-first engineering principles that inform the ONYX architecture.", "https://IFEM-doctrine.github.io/", "Read doctrine"],
] as const;

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const initialDark = window.localStorage.getItem("onyx-theme") === "dark";
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);

    const sections = navItems
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.35, 0.65] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("onyx-theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#06172c] dark:text-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/10 bg-[#071f43] p-5 text-white lg:flex">
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} aria-label="ONYX Framework overview" className="rounded-2xl bg-white p-3 shadow-sm">
          <img src={ASSETS.brandLogo} alt="ONYX Tectosilicate Framework" className="h-28 w-full object-contain" />
        </a>
        <div className="my-6 h-px bg-white/15" />
        <nav aria-label="Case study sections" className="space-y-1">
          {navItems.map(([number, label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${activeSection === id ? "bg-white text-[#082348] shadow-sm" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>
              <span className="w-5 text-[10px] font-bold tracking-wider opacity-60">{number}</span>
              <span className="flex-1 font-semibold">{label}</span>
              <ChevronRight className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5" />
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-slate-300">
          <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-white">Case study record</p>
          <p>Local-first mission operations architecture.</p>
          <a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-semibold text-white hover:text-sky-200">View source <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#07182f]/95 lg:hidden">
        <a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} aria-label="ONYX Framework overview" className="w-24 rounded-lg bg-white p-1.5">
          <img src={ASSETS.brandLogo} alt="ONYX Tectosilicate Framework" className="h-12 w-full object-contain" />
        </a>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle color theme" className="rounded-lg border border-slate-200 p-2 dark:border-white/15">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" className="rounded-lg bg-[#082348] p-2 text-white">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && <nav aria-label="Mobile case study sections" className="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-3 shadow-lg dark:border-white/10 dark:bg-[#07182f]">{navItems.map(([number, label, id]) => <button key={id} onClick={() => scrollTo(id)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-medium hover:bg-slate-100 dark:hover:bg-white/10"><span className="text-xs text-slate-500">{number}</span>{label}</button>)}</nav>}
      </header>

      <main className="lg:ml-64">
        <header className="hidden min-h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-white/10 dark:bg-[#07182f] lg:flex">
          <div className="flex items-center gap-5"><img src={ASSETS.brandWordmark} alt="ONYX Tectosilicate Framework" className="h-10 w-40 object-contain object-left" /><span className="border-l border-slate-200 pl-5 text-xs font-bold tracking-[0.2em] text-slate-500 dark:border-white/15 dark:text-slate-300">SYSTEMS ARCHITECTURE / CASE STUDY</span></div>
          <div className="flex items-center gap-4"><a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#1467b8] dark:text-slate-100"><Github className="h-4 w-4" /> Source repository</a><button onClick={toggleTheme} aria-label="Toggle color theme" className="rounded-lg border border-slate-200 p-2 dark:border-white/15">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button></div>
        </header>

        <section id="overview" className="scroll-mt-20 overflow-hidden bg-[#eff5fa] px-5 py-16 dark:bg-[#07182f] sm:px-8 lg:min-h-[720px] lg:px-14 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-[#1269b8]"><span className="h-2 w-2 rounded-full bg-emerald-500" /> ONYX FRAMEWORK</div>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[#082348] dark:text-white sm:text-6xl lg:text-7xl">Operational intelligence, <em className="font-normal text-[#287bc2]">for complex systems.</em></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">A framework and operational environment for designing, coordinating, and verifying complex software systems.</p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">ONYX brings secure workflows, traceable decisions, controlled access, and architecture that remains understandable as systems grow.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => scrollTo("experience")} className="inline-flex items-center gap-2 rounded-xl bg-[#082348] px-5 py-3 font-semibold text-white transition hover:bg-[#1467b8]">Explore the experience <ArrowDownRight className="h-4 w-4" /></button><a href="https://github.com/SMozaff/Onyx-Framwork" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:border-[#1467b8] hover:text-[#1467b8] dark:border-white/20 dark:text-white">Trace the implementation <ArrowUpRight className="h-4 w-4" /></a></div>
            </div>
            <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-white/5 dark:shadow-none"><img src={ASSETS.brandWordmark} alt="ONYX Framework" className="mb-8 h-16 w-full object-contain" /><p className="text-xs font-bold tracking-[0.18em] text-slate-500 dark:text-slate-300">REPOSITORY RECORD</p><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10"><dt className="text-slate-500 dark:text-slate-300">Implementation</dt><dd className="font-semibold">Rust-centric workspace</dd></div><div className="flex justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10"><dt className="text-slate-500 dark:text-slate-300">Client surfaces</dt><dd className="font-semibold">Web · Desktop · Mobile</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500 dark:text-slate-300">Project stance</dt><dd className="font-semibold">In progress; scope stated</dd></div></dl></aside>
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-6xl"><div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">01 / CAPABILITIES</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Designed for operational environments where reliability matters.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-slate-600 dark:text-slate-300">ONYX keeps operational work legible: each responsibility has a clear boundary, each decision can carry evidence, and each new capability has an intentional place to connect.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2">{capabilities.map(([title, copy], index) => <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/5"><span className="text-xs font-bold text-[#1467b8]">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy}</p></article>)}</div><div dir="rtl" className="mt-8 rounded-2xl border border-[#b8d6ef] bg-[#eaf4fc] p-6 text-right dark:border-[#1a5d94] dark:bg-[#0a2947]"><p className="text-sm font-bold text-[#1467b8]">معرفی محصول</p><h3 className="mt-2 text-2xl font-semibold">ONYX؛ پلتفرم عملیاتی برای سازمان‌های پیچیده</h3><p className="mt-3 max-w-3xl leading-8 text-slate-700 dark:text-slate-200">ONYX برای مدیریت عملیات، کنترل دسترسی، گردش فرآیندها و ثبت تصمیمات قابل ردیابی در محیط‌های پیچیده طراحی شده است.</p></div></div>
        </section>

        <section id="experience" className="scroll-mt-20 bg-slate-100 px-5 py-16 dark:bg-[#0a213c] sm:px-8 lg:px-14 lg:py-24">
          <div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">02 / ONYX EXPERIENCE</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Operational interfaces for real work.</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">Product evidence anchors the case study in the surfaces teams use to access, coordinate, and review mission-critical work.</p></div><div className="mt-12 space-y-10">{[[ASSETS.secureAccess, "Secure Access Layer", "A focused browser sign-in surface designed for authorized operators and clear session expectations."], [ASSETS.missions, "Mission Operations", "Review purpose, ownership, lifecycle status, temporal constraints, and evidence as one coordinated mission picture."], [ASSETS.overview, "Operational Overview", "Bring alerts, approvals, active work, and the next operator actions into a single read-only projection."]].map(([image, title, copy], index) => <article key={title} className={`grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#07182f] lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}><div className="bg-[#e9f0f6] p-3 dark:bg-[#0d2b4b]"><img src={image} alt={`${title} interface screenshot`} className="h-full w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-white/10" loading={index === 0 ? "eager" : "lazy"} /></div><div className="flex flex-col justify-center p-8 sm:p-12"><span className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">0{index + 1} / PRODUCT SCREEN</span><h3 className="mt-4 text-3xl font-semibold">{title}</h3><p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">{copy}</p><div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1467b8]"><CheckCircle2 className="h-4 w-4" /> Interface evidence from ONYX</div></div></article>)}</div></div>
        </section>

        <section id="architecture" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">03 / ARCHITECTURE</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Independent layers, shared system intent.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-slate-600 dark:text-slate-300">The workspace groups modules by architectural role rather than one undifferentiated application layer. The question that follows is why those boundaries matter.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2">{architectureLayers.map(([number, title, copy, tags]) => <article key={number} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10"><span className="text-sm font-bold text-[#1467b8]">{number}</span><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy}</p><div className="mt-5 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/10 dark:text-slate-200">{tag}</span>)}</div></article>)}</div></div></section>

        <section id="ifem" className="scroll-mt-20 bg-[#082348] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-sky-300">04 / WHY THIS ARCHITECTURE?</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">IFEM principles make the boundaries intentional.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">ONYX demonstrates Interface-First Engineering Methodology in practice. IFEM informs the framework’s engineering discipline; it is not an ONYX runtime dependency, product layer, or replacement identity.</p><a href="https://IFEM-doctrine.github.io/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl border border-sky-300/50 px-5 py-3 font-semibold text-white hover:bg-white/10">Read IFEM doctrine <ArrowUpRight className="h-4 w-4" /></a></div><div className="space-y-4">{[["01", "Boundary", "Make the responsibility line explicit."], ["02", "Contract", "Define shared rules before scale."], ["03", "Owner", "Keep accountability legible."], ["04", "Evidence", "Verify agreement in observable ways."]].map(([number, title, copy]) => <div key={number} className="flex gap-5 rounded-2xl border border-white/15 bg-white/5 p-5"><span className="font-bold text-sky-300">{number}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p></div></div>)}</div></div></section>

        <section id="evidence" className="scroll-mt-20 px-5 py-16 sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-xs font-bold tracking-[0.2em] text-[#1467b8]">05 / TECHNICAL EVIDENCE</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Claims point back to the work.</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">The case study links to source material and published records instead of substituting narrative for technical evidence.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{evidenceItems.map(([Icon, label, title, copy, href, action]) => <article key={title} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10"><Icon className="h-6 w-6 text-[#1467b8]" /><p className="mt-5 text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-300">{label}</p><h3 className="mt-3 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{copy}</p><a href={href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#1467b8]">{action} <ArrowUpRight className="h-4 w-4" /></a></article>)}</div><div className="mt-8 flex gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 dark:border-emerald-700/40 dark:bg-emerald-900/20 dark:text-emerald-100"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p><b>Scope note.</b> ONYX is presented as an in-progress architecture. Public records distinguish delivered components from incomplete or unverified areas.</p></div></div></section>

        <section id="developer" className="scroll-mt-20 bg-[#06172c] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24"><div className="mx-auto max-w-6xl"><div className="rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-12"><img src={ASSETS.brandWordmark} alt="ONYX Framework" className="h-16 w-52 object-contain object-left" /><p className="mt-8 text-xs font-bold tracking-[0.2em] text-sky-300">ONYX FRAMEWORK</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">A framework for building the next generation of operational systems.</h2><div className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-2"><div><p className="text-xs font-bold tracking-[0.18em] text-slate-400">DEVELOPED BY</p><h3 className="mt-2 text-2xl font-semibold">Suhail Muzaffari</h3><p className="mt-2 text-slate-300">Software Engineer · Systems Architect</p></div><div><p className="text-xs font-bold tracking-[0.18em] text-slate-400">BUILT WITH</p><h3 className="mt-2 text-2xl font-semibold">IFEM Doctrine</h3><p className="mt-2 text-slate-300">Interface-first engineering for explicit, reviewable system boundaries.</p></div></div><div className="mt-10 flex flex-wrap gap-4"><a href="https://SMozaff.github.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#082348] hover:bg-sky-100">SMozaff.github.io <ArrowUpRight className="h-4 w-4" /></a><a href="https://IFEM-doctrine.github.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 font-semibold text-white hover:bg-white/10">IFEM-doctrine.github.io <ArrowUpRight className="h-4 w-4" /></a></div></div><footer className="mt-8 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm text-slate-400 sm:flex-row"><span>ONYX FRAMEWORK · CASE STUDY / 2026</span><a href="#overview" onClick={(event) => { event.preventDefault(); scrollTo("overview"); }} className="inline-flex items-center gap-2 font-semibold text-white hover:text-sky-200">Back to top <ArrowUpRight className="h-4 w-4" /></a></footer></div>
        </section>
      </main>
    </div>
  );
}
