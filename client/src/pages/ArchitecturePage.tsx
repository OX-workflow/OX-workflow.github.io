import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag:"01 / Architecture", titleA:"ENGINEERED FOR", titleB:"DISTRIBUTED OPERATIONS.",
    body:"ONYX treats connectivity, authority, and recovery as architectural concerns. Local execution, durable state, synchronization, event history, and auditability are explicit boundaries—not assumptions hidden inside transport.",
    explore:"Product model", contact:"Request a demo", home:"Back to home",
    modelTag:"02 / System model", modelTitleA:"One operation.", modelTitleB:"Multiple execution surfaces.",
    modelBody:"An ONYX operation can be acted on locally, persisted durably, synchronized across replicas, and reconstructed from its operational history. Each boundary has a defined responsibility.",
    layers:[
      ["01","AUTHORITY","Who may act","Identity, organization boundaries, roles, delegation, and approval scope determine which operations a principal is allowed to perform."],
      ["02","LOCAL","Execute locally","A node can work against its available operational state instead of making every action dependent on a continuously reachable central service."],
      ["03","STATE","Persist durably","Operational state and event history are persisted so completed work survives process failure and can be reconstructed."],
      ["04","SYNC","Reconcile replicas","Changes move between replicas when communication is available. Vector-clock based synchronization supports convergence, conflict detection, and explicit resolution."],
      ["05","AUDIT","Explain what happened","Operational history and tamper-evident audit partitions provide a trace of actions, decisions, evidence, and verification."],
    ],
    languageTag:"03 / Ring · Orbit · Grid · Signal",
    languageTitleA:"The identity",
    languageTitleB:"maps to the architecture.",
    languageBody:"ONYX uses the same four-part language to describe system behavior: authority around execution, coordination across replicas, structured operational state, and live signals from events and evidence.",
    languageItems:[
      ["RING","AUTHORITY","Controlled execution","Identity and authority boundaries determine which actions are permitted and keep execution inside an explicit control surface."],
      ["ORBIT","COORDINATION","Synchronization","Replicas, participants, acknowledgements, and reconciliation connect distributed operation without making connectivity the source of authority."],
      ["GRID","STRUCTURE","Operational state","Durable state, lifecycle, relationships, policies, and event history provide the structured substrate on which the operation exists."],
      ["SIGNAL","AWARENESS","Events + evidence","Events, audit records, verification, and operational evidence expose what changed, what was observed, and what can be reconstructed."],
    ],
    localTag:"04 / Local-first execution", localTitleA:"The local node", localTitleB:"is part of the system.",
    localBody:"Local-first means the point of action is not merely a thin terminal for a remote database. A node can operate against the state available to it, persist outcomes, and retain changes for later synchronization. The current architecture supports this resilience model; the public web client should not be read as proof of a complete offline browser experience.",
    localSteps:[
      ["READ","Use available state","The operator reads the replica current operational state and authority context."],
      ["ACT","Execute within authority","A permitted command changes local operational state without requiring every interaction to round-trip through a central node."],
      ["PERSIST","Durably retain outcome","State and the corresponding operational history are written so a completed action is not dependent on an in-memory session."],
      ["SYNC","Exchange later","When communication is available, the replica exchanges changes and participates in reconciliation."],
    ],
    topologyTag:"04 / Network state", topologyTitleA:"The network can", topologyTitleB:"disappear.",
    topologyBody:"A node may be connected, degraded, or offline. The architectural invariant is that meaningful local state can remain available and reconciliation becomes an explicit transition when connectivity returns.",
    states:[
      ["CONNECTED","Coordinate + synchronize","The node exchanges state and participates in the shared operational view."],
      ["DEGRADED","Continue + queue","Local execution continues while synchronization capacity is constrained."],
      ["OFFLINE","Execute + preserve","The node operates against its available state and preserves outcomes for later reconciliation."],
      ["RESTORED","Reconcile + verify","Connectivity returns and distributed changes are brought back together under system rules."],
    ],
    syncTag:"05 / Synchronization", syncTitleA:"Synchronization is", syncTitleB:"reconciliation, not transport.",
    syncBody:"ONYX treats synchronization as a consistency boundary. Replicas exchange operation batches and causal information, converge when changes are compatible, and surface conflicts when independent changes cannot be silently reconciled. The documented model uses vector clocks, replica acknowledgement, immutable operation batches, and explicit conflict resolution.",
    syncRules:[
      ["IDENTITY","Identify the replica and operation"],["CAUSALITY","Track causal relationships with vector clocks"],["DELIVERY","Exchange durable operation batches"],["CONVERGENCE","Apply compatible changes across replicas"],["CONFLICT","Detect and resolve divergent state explicitly"],["ACKNOWLEDGE","Track replica acknowledgement and progress"],
    ],
    durabilityTag:"06 / Durable state & event history", durabilityTitleA:"State tells you", durabilityTitleB:"what is true.",
    durabilityBody:"Event history tells you how it became true. ONYX keeps durable operational state and event history as separate but connected concerns: current state supports execution; historical events support reconstruction, replay, investigation, and audit.",
    durabilityCards:[
      ["STATE","Current operational truth","Durable state is the materialized view used by the platform to answer what the operation currently looks like."],
      ["EVENT","Recorded transition","Events capture meaningful changes so the system can preserve an operational sequence rather than only the latest snapshot."],
      ["REPLAY","Reconstruct behavior","Replay/idempotency safeguards allow event processing to be retried without treating duplicate delivery as a new business action."],
      ["RECOVERY","Resume after failure","Durable persistence, retries, and crash-recovery behavior keep recovery as an explicit system concern."],
    ],
    authorityTag:"07 / Authority model", authorityTitleA:"Data movement", authorityTitleB:"does not grant authority.",
    authorityBody:"Synchronization can move information between replicas, but it must not silently expand who is allowed to act. ONYX models identity, organizational boundaries, roles, delegated authority, approval scope, and policy decisions as control boundaries around operational actions.",
    graph:["IDENTITY","ORG BOUNDARY","AUTHORITY","ACTION","VERIFICATION"],
    conflictTag:"08 / Conflict handling", conflictTitleA:"Independent changes", conflictTitleB:"must become explicit.",
    conflictBody:"Disconnected replicas can legitimately change related state before they can communicate. A resilient architecture therefore distinguishes convergence from conflict resolution: compatible changes can converge automatically; conflicting changes are detected and routed through explicit resolution rather than hidden overwrites.",
    conflictRules:[
      ["DETECT","Identify divergent concurrent changes."],["CLASSIFY","Determine whether the changes can converge under the domain rules."],["RESOLVE","Apply an explicit conflict-resolution path when they cannot."],["RECORD","Preserve the resolution and its operational history."],["VERIFY","Make the resulting state and authority context inspectable."],
    ],
    deliveryTag:"09 / Outbox · replay · idempotency", deliveryTitleA:"Reliable delivery", deliveryTitleB:"needs durable boundaries.",
    deliveryBody:"The transactional outbox pattern connects state change to event delivery without relying on an in-memory handoff. A change and its outgoing operation/event record are persisted transactionally; delivery can then retry from durable state. Idempotency and replay protection prevent retries or duplicate delivery from becoming duplicate business actions.",
    deliveryFlow:[
      ["1","TRANSACTION","Persist state change + outbox record"],["2","DELIVER","Read pending durable records"],["3","RETRY","Retry failed delivery without losing the operation"],["4","IDEMPOTENT","Ignore already-applied duplicates"],["5","REPLAY","Reprocess history safely when reconstruction is required"],
    ],
    auditTag:"10 / Auditability", auditTitleA:"The system should answer", auditTitleB:"what happened.",
    auditBody:"Auditability is more than a log of HTTP requests. The documented model includes tamper-evident audit partitions and integrity verification so operational history can support reconstruction: who acted, under what authority, what changed, what evidence was attached, and what was verified.",
    auditQuestions:["WHO ACTED?","UNDER WHICH AUTHORITY?","WHAT CHANGED?","WHAT EVIDENCE EXISTED?","WHAT WAS VERIFIED?"],
    statusTag:"11 / Implementation status", statusTitleA:"Architecture claims", statusTitleB:"stay explicit.",
    statusBody:"This page separates the documented architecture from product maturity. A mechanism may be represented in the repository contracts or backend design without implying that every client surface is production-complete.",
    statuses:[
      ["IMPLEMENTED / DOCUMENTED","Operational foundation","The repository documents and implements durable state/event history, authority controls, synchronization primitives, audit structures, transactional outbox delivery, retries, and replay/idempotency safeguards across the platform model."],
      ["ARCHITECTURAL / VALIDATION REQUIRED","Local-first end-user experience","The architecture supports local execution and resilient synchronization. The current marketing evidence does not, by itself, prove a complete offline-first experience across every client surface; that should be demonstrated and tested explicitly."],
      ["IN DEVELOPMENT","Production hardening","Deployment, browser security, CORS fail-closed behavior, WebSocket authentication, supply-chain controls, and related production-hardening work remain implementation concerns rather than assumptions of this page."],
      ["PLANNED / RESEARCH","Agent and plugin interface","Future agentic or plugin interfaces remain above the governed operational model and must use the same authority, state, audit, and verification boundaries."],
    ],
    ctaTag:"12 / Continue", ctaTitleA:"From architecture", ctaTitleB:"to operational scenarios.", ctaBody:"See how these boundaries map onto real environments, or return to the platform lifecycle.", solutions:"View solutions", product:"View product",
    light:"Light mode", dark:"Dark mode", language:"فارسی"
  },
  fa: {
    tag:"۰۱ / معماری", titleA:"برای واقعیت", titleB:"بدون اتصال طراحی شده.",
    body:"ONYX اتصال را یک متغیر می‌داند، نه پیش‌شرط. معماری، اجرای محلی، وضعیت توزیع‌شده، همگام‌سازی، اختیار و دید عملیاتی را از هم جدا می‌کند تا مرز مسئولیت هرکدام صریح بماند.",
    explore:"مدل محصول", contact:"درخواست دمو", home:"بازگشت به خانه",
    modelTag:"۰۲ / مدل سامانه", modelTitleA:"پنج لایه.", modelTitleB:"یک وضعیت عملیاتی.",
    modelBody:"سامانه را می‌توان زنجیره‌ای از وضعیت در نقطه اقدام تا دید عملیاتی هماهنگ در نظر گرفت. هر لایه مسئولیت و مرز مشخصی دارد.",
    layers:[
      ["۰۱","لبه","اجرای محلی","اپراتور با وضعیت موجود در نقطه اقدام کار می‌کند. قطع ارتباط الزاماً نباید اجرای محلی را متوقف کند."],
      ["۰۲","وضعیت","وضعیت عملیاتی","کار، تصمیم، نتیجه و زمینه مرتبط به‌صورت وضعیت عملیاتی قابل مشاهده و قابل تلفیق نمایش داده می‌شوند."],
      ["۰۳","همگام‌سازی","همگام‌سازی","تغییرات توزیع‌شده هنگام امکان ارتباط طبق قواعد مشخص مبادله و تلفیق می‌شوند."],
      ["۰۴","اختیار","صفحه کنترل","اختیار و مسئولیت صریح می‌مانند تا همگام‌سازی به‌صورت ضمنی به مجوز اقدام تبدیل نشود."],
      ["۰۵","عملیات","دید عملیاتی","تیم‌ها می‌توانند بر یک تصویر عملیاتی مشترک هماهنگ شوند، بدون اینکه هر اقدام الزاماً از مرکز آغاز شود."],
    ],
    topologyTag:"۰۳ / توپولوژی", topologyTitleA:"شبکه می‌تواند", topologyTitleB:"ناپدید شود.",
    topologyBody:"یک گره ممکن است متصل، دچار افت ارتباط یا کاملاً آفلاین باشد. اصل معماری این است که وضعیت محلی معنادار بماند و با بازگشت ارتباط، تلفیق به‌عنوان یک گذار صریح انجام شود.",
    states:[["متصل","هماهنگی + همگام‌سازی","گره وضعیت را مبادله می‌کند و در دید عملیاتی مشترک مشارکت دارد."],["مختل","ادامه + صف","اجرای محلی در حالی ادامه می‌یابد که ظرفیت همگام‌سازی محدود شده است."],["قطع","اجرا + حفظ","گره با وضعیت موجود خود کار می‌کند و نتایج را برای تلفیق بعدی حفظ می‌کند."],["بازیابی‌شده","تلفیق + راستی‌آزمایی","ارتباط بازمی‌گردد و تغییرات توزیع‌شده طبق قواعد سامانه دوباره یکپارچه می‌شوند."]],
    syncTag:"۰۴ / همگام‌سازی", syncTitleA:"همگام‌سازی یک", syncTitleB:"مرز سامانه است.",
    syncBody:"همگام‌سازی نباید صرفاً یک جزئیات انتقال در پس‌زمینه باشد. این نقطه‌ای است که وضعیت توزیع‌شده به وضعیت هماهنگ تبدیل می‌شود و بنابراین به قواعد صریح برای هویت، ترتیب، تعارض، اختیار و راستی‌آزمایی نیاز دارد.",
    rules:["هویت وضعیت","ترتیب تغییرات","مدیریت تعارض","مرزهای اختیار","راستی‌آزمایی / ردپا"],
    authorityTag:"۰۵ / اختیار", authorityTitleA:"هماهنگی", authorityTitleB:"مسئولیت را حذف نمی‌کند.",
    authorityBody:"سامانه توزیع‌شده فقط به جابه‌جایی داده نیاز ندارد. ONYX اختیار و مسئولیت را از اتصال جدا نگه می‌دارد تا معماری بتواند مشخص کند چه کسی مجاز به اقدام است، چه چیزی تغییر کرده و چه چیزی راستی‌آزمایی شده است.",
    graph:["بازیگر","اختیار","اقدام","وضعیت","راستی‌آزمایی"],
    futureTag:"۰۶ / رابط آینده", futureTitleA:"یک رابط کنترل‌شده", futureTitleB:"برای عامل‌ها.",
    futureBody:"لایه آینده هوش مصنوعی عامل‌محور / افزونه باید روی مدل عملیاتی قرار بگیرد، نه اینکه آن را دور بزند. عامل‌ها می‌توانند پیشنهاد دهند، وضعیت را بررسی کنند، هماهنگ کنند یا اقدامات کنترل‌شده را اجرا کنند؛ در حالی که همان مرزهای اختیار، وضعیت و راستی‌آزمایی پابرجا می‌مانند.",
    futureRules:[["OBSERVE","خواندن وضعیت و زمینه عملیاتی."],["PROPOSE","تولید اقدام پیشنهادی بدون اجرای پنهانی."],["AUTHORIZE","رعایت مرز اختیار موردنیاز اقدام."],["EXECUTE","فراخوانی عملیات مجاز از طریق مرز سامانه."],["VERIFY","ثبت و نمایش وضعیت عملیاتی حاصل."]],
    statusTag:"۰۷ / وضعیت پیاده‌سازی", statusTitleA:"ادعاهای معماری", statusTitleB:"باید دقیق بمانند.",
    statusBody:"این صفحه مدل سامانه و مرزهای موردنظر را توضیح می‌دهد و به‌معنای عرضه شدن همه لایه‌ها یا رابط آینده نیست.",
    statuses:[["مستند","مدل عملیاتی","اجرای محلی‌محور، همگام‌سازی، اختیار و راستی‌آزمایی مدل معماری ONYX را تشکیل می‌دهند."],["در حال توسعه","اجزای پلتفرم","جزئیات پیاده‌سازی باید با نقشه راه دنبال شوند و از این نمودار استنباط نشوند."],["برنامه‌ریزی‌شده","رابط عامل","یکپارچه‌سازی هوش مصنوعی عامل‌محور / افزونه یک لایه آینده است و از مدل فعلی محصول جدا نگه داشته شده است."]],
    ctaTag:"۰۸ / ادامه", ctaTitleA:"از معماری", ctaTitleB:"به سناریوها بروید.", ctaBody:"ببینید سامانه چگونه روی محیط‌های عملیاتی می‌نشیند یا به مدل محصول بازگردید.", solutions:"مشاهده راهکارها", product:"مشاهده محصول",
    light:"حالت روشن", dark:"حالت تاریک", language:"فارسی"
  }

} as const;

export default function ArchitecturePage({locale}:{locale:Locale}) {
  const [theme,setTheme]=useState<Theme>(()=>typeof window!=="undefined" && window.localStorage.getItem("onyx-theme")==="dark"?"dark":"light");
  const t=copy[locale]; const rtl=locale==="fa"; const syncRules = locale==="en" ? copy.en.syncRules : copy.fa.rules.map((x)=>[x,x] as const);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;document.documentElement.dir=rtl?"rtl":"ltr";window.localStorage.setItem("onyx-theme",theme)},[theme,locale,rtl]);
  const home=`/${locale}/`; const link=(p:string)=>`/${locale}/${p}/`;
  return <div className={`architecture-page architecture-page--${theme}`} dir={rtl?"rtl":"ltr"}>
    <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="architecture" />
    <main>
      <section className="architecture-hero"><div className="architecture-grid" aria-hidden="true"/><div className="shell-content"><div className="architecture-kicker"><span/>{t.tag}</div><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p>{t.body}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("product")}>{t.explore}{rtl?<ArrowLeft size={15}/>:<ArrowRight size={15}/>}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div><a className="architecture-home" href={home}>{rtl?<ArrowRight size={15}/>:<ArrowLeft size={15}/>} {t.home}</a></div></section>
      <section className="architecture-section"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.modelTag}</div><h2>{t.modelTitleA}<br/><em>{t.modelTitleB}</em></h2><p>{t.modelBody}</p></div><div className="architecture-layers">{t.layers.map(([n,code,title,body])=><article key={code}><div><span>{n}</span><b>{code}</b></div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      {locale==="en" && <section className="architecture-section architecture-section--local"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{copy.en.localTag}</div><h2>{copy.en.localTitleA}<br/><em>{copy.en.localTitleB}</em></h2><p>{copy.en.localBody}</p></div><div className="architecture-mechanism-grid">{copy.en.localSteps.map(([a,b,c],i)=><article key={a}><span>0{i+1}</span><b>{a}</b><h3>{b}</h3><p>{c}</p></article>)}</div></div></section>}
      <section className="architecture-section architecture-section--topology"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.topologyTag}</div><h2>{t.topologyTitleA}<br/><em>{t.topologyTitleB}</em></h2><p>{t.topologyBody}</p></div><div className="architecture-states">{t.states.map(([code,title,body])=><article key={code}><span>{code}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="architecture-section"><div className="shell-content architecture-two-col"><div><div className="architecture-kicker"><span/>{t.syncTag}</div><h2>{t.syncTitleA}<br/><em>{t.syncTitleB}</em></h2><p>{t.syncBody}</p></div><div className="architecture-rules">{syncRules.map(([a,b],i)=><div key={a}><span>0{i+1}</span><strong>{a}</strong><small>{b}</small></div>)}</div></div></section>
      {locale==="en" && <section className="architecture-section architecture-section--durability"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{copy.en.durabilityTag}</div><h2>{copy.en.durabilityTitleA}<br/><em>{copy.en.durabilityTitleB}</em></h2><p>{copy.en.durabilityBody}</p></div><div className="architecture-mechanism-grid">{copy.en.durabilityCards.map(([a,b,c],i)=><article key={a}><span>0{i+1}</span><b>{a}</b><h3>{b}</h3><p>{c}</p></article>)}</div></div></section>}
      <section className="architecture-section architecture-section--authority"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.authorityTag}</div><h2>{t.authorityTitleA}<br/><em>{t.authorityTitleB}</em></h2><p>{t.authorityBody}</p></div><div className="architecture-graph">{t.graph.map((x,i)=><div key={x} className={i===2?"architecture-graph__node architecture-graph__node--active":"architecture-graph__node"}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></div></div></section>
      {locale==="en" && <section className="architecture-section architecture-section--conflict"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{copy.en.conflictTag}</div><h2>{copy.en.conflictTitleA}<br/><em>{copy.en.conflictTitleB}</em></h2><p>{copy.en.conflictBody}</p></div><div className="architecture-rule-stack">{copy.en.conflictRules.map(([a,b],i)=><article key={a}><span>0{i+1}</span><b>{a}</b><p>{b}</p></article>)}</div></div></section>}
      {locale==="en" && <section className="architecture-section architecture-section--delivery"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{copy.en.deliveryTag}</div><h2>{copy.en.deliveryTitleA}<br/><em>{copy.en.deliveryTitleB}</em></h2><p>{copy.en.deliveryBody}</p></div><div className="architecture-delivery-flow">{copy.en.deliveryFlow.map(([n,a,b])=><article key={n}><span>{n}</span><b>{a}</b><p>{b}</p></article>)}</div></div></section>}
      {locale==="en" && <section className="architecture-section architecture-section--audit"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{copy.en.auditTag}</div><h2>{copy.en.auditTitleA}<br/><em>{copy.en.auditTitleB}</em></h2><p>{copy.en.auditBody}</p></div><div className="architecture-audit-grid">{copy.en.auditQuestions.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div></div></section>}
      <section className="architecture-section architecture-section--status"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.statusTag}</div><h2>{t.statusTitleA}<br/><em>{t.statusTitleB}</em></h2><p>{t.statusBody}</p></div><div className="architecture-status">{t.statuses.map(([a,b,c])=><article key={a}><span>{a}</span><div><h3>{b}</h3><p>{c}</p></div></article>)}</div></div></div></section>
      <section className="architecture-final"><div className="shell-content"><div className="architecture-kicker"><span/>{t.ctaTag}</div><h2>{t.ctaTitleA}<br/><em>{t.ctaTitleB}</em></h2><p>{t.ctaBody}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("solutions")}>{t.solutions}</a><a className="architecture-button" href={link("product")}>{t.product}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div></div></section>
    </main>
    <footer className="architecture-footer"><div className="shell-content"><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/><span>© {new Date().getFullYear()} ONYX · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></footer>
  </div>;
}
