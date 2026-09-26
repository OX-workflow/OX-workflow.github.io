import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag:"01 / Technology", titleA:"THE SYSTEM", titleB:"UNDER THE OPERATION.",
    body:"ONYX is an interface-first execution system built around explicit contracts, governed state, synchronization, authority, and operational evidence. The technical surface makes those boundaries inspectable rather than hiding them behind the UI.",
    explore:"Product model", contact:"Request a demo", home:"Back to home",
    modelTag:"02 / System model", modelTitleA:"Contracts → state →", modelTitleB:"execution → evidence.",
    modelBody:"The implementation separates domain contracts, application execution, persistence, synchronization, transport, and client composition. The boundary matters: an operational action is not just a UI event; it is a governed change to system state.",
    layers:[
      ["01","EDGE","Local execution","The operator works against the state available at the point of action. Connectivity loss does not have to stop local work."],
      ["02","STATE","Operational state","Work, decisions, outcomes, and relevant context are represented as operational state that can be inspected and reconciled."],
      ["03","SYNC","Synchronization","Distributed changes are exchanged and reconciled when communication is available, according to defined system rules."],
      ["04","AUTHORITY","Control plane","Authority and responsibility remain explicit so synchronization does not silently become permission to act."],
      ["05","OPS","Operational view","Teams can coordinate around a shared operational picture without requiring every action to originate from the center."],
    ],
    topologyTag:"03 / Runtime topology", topologyTitleA:"Connectivity is", topologyTitleB:"a transport condition.",
    topologyBody:"ONYX separates synchronization from transport. The framework contains transport paths for Wi‑Fi Direct, Bluetooth LE, QUIC, and Cloud Relay, while synchronization owns causal state, merge behavior, and conflict handling. Availability of a transport does not grant authority.",
    states:[["CONNECTED","Coordinate + synchronize","The node exchanges state and participates in the shared operational view."],["DEGRADED","Continue + queue","Local execution continues while synchronization capacity is constrained."],["OFFLINE","Execute + preserve","The node operates against its available state and preserves outcomes for later reconciliation."],["RESTORED","Reconcile + verify","Connectivity returns and distributed changes are brought back together under system rules."]],
    syncTag:"04 / State & synchronization", syncTitleA:"Distributed state needs", syncTitleB:"explicit semantics.",
    syncBody:"The synchronization subsystem includes CRDT primitives, causal context through vector clocks, aggregate deltas, sync cursors, conflict records, and explicit conflict resolution. Deterministic merge is a property of the state model—not a promise that every concurrent change disappears automatically.",
    rules:["State identity","Change ordering","Conflict handling","Authority boundaries","Verification / audit trail"],
    authorityTag:"05 / Authority & execution", authorityTitleA:"Synchronization does not", authorityTitleB:"become permission.",
    authorityBody:"Authority is evaluated independently of connectivity. The application model distinguishes identity, user class, reporting-line ownership, client capability, aggregate lifecycle, and command context. Trusted operational clients execute authorized mutations; awareness does not silently become authority.",
    graph:["ACTOR","AUTHORITY","ACTION","STATE","VERIFICATION"],
    futureTag:"06 / Implementation surface", futureTitleA:"Rust at the core.", futureTitleB:"Contracts at the boundary.",
    futureBody:"The current workspace is a Rust workspace with domain, application, infrastructure, synchronization, transport, binary, and mobile-core crates. Platform contracts define the boundary between callers and execution; events, persistence, audit, and synchronization carry the operational state through the system.",
    futureRules:[["CONTRACTS","Versioned command/event interfaces define what the platform can accept and emit."],["DOMAINS","Mission, Work, Communication, File, Policy, Profile, Todo, and Notification domains isolate operational responsibility."],["PERSISTENCE","SQLite and Postgres adapters support different execution contexts and deployment needs."],["OBSERVABILITY","Tracing, metrics, OpenTelemetry, audit, and durable history expose what the system did."],["DEPLOYMENT","Docker, Helm, Terraform, runbooks, and dedicated binaries form the production-oriented delivery surface."]],
    statusTag:"07 / Status discipline", statusTitleA:"Technical pages", statusTitleB:"must separate shipped from intended.",
    statusBody:"The technology surface distinguishes repository-grounded implementation from architecture, planned work, and research. The framework README documents the current Rust workspace and deployment tooling; application-level evidence supplies the client and synchronization caveats.",
    statuses:[["IMPLEMENTED","Repository evidence","Rust workspace, domain/application/infrastructure crates, synchronization and transport subsystems, deployment configurations, and multiple client classes are present in the reviewed repositories."],["ARCHITECTURAL","System boundaries","The diagrams explain intended boundaries and relationships; they are not a substitute for implementation evidence for every path."],["PLANNED / RESEARCH","Future interfaces","Agent/plugin federation and broader deployment capabilities remain future-facing and are not presented as shipped functionality."]],
    ctaTag:"08 / Continue", ctaTitleA:"Go deeper into", ctaTitleB:"security and roadmap.", ctaBody:"Inspect the security boundary and maturity model next. Return to the product surface when you need the operational view.", solutions:"View security", product:"View product",
    light:"Light mode", dark:"Dark mode", language:"فارسی"
  },
  fa: {
    tag:"۰۱ / معماری", titleA:"برای واقعیت", titleB:"بدون اتصال طراحی شده.",
    body:"ONYX اتصال را یک متغیر می‌داند، نه پیش‌شرط. معماری، اجرای محلی، وضعیت توزیع‌شده، همگام‌سازی، اختیار و دید عملیاتی را از هم جدا می‌کند تا مرز مسئولیت هرکدام صریح بماند.",
    explore:"مدل محصول", contact:"درخواست دمو", home:"بازگشت به خانه",
    modelTag:"۰۲ / مدل سامانه", modelTitleA:"پنج لایه.", modelTitleB:"یک وضعیت عملیاتی.",
    modelBody:"سامانه را می‌توان زنجیره‌ای از وضعیت در نقطه اقدام تا دید عملیاتی هماهنگ در نظر گرفت. هر لایه مسئولیت و مرز مشخصی دارد.",
    layers:[
      ["۰۱","EDGE","اجرای محلی","اپراتور با وضعیت موجود در نقطه اقدام کار می‌کند. قطع ارتباط الزاماً نباید اجرای محلی را متوقف کند."],
      ["۰۲","STATE","وضعیت عملیاتی","کار، تصمیم، نتیجه و زمینه مرتبط به‌صورت وضعیت عملیاتی قابل مشاهده و قابل تلفیق نمایش داده می‌شوند."],
      ["۰۳","SYNC","همگام‌سازی","تغییرات توزیع‌شده هنگام امکان ارتباط طبق قواعد مشخص مبادله و تلفیق می‌شوند."],
      ["۰۴","AUTHORITY","صفحه کنترل","اختیار و مسئولیت صریح می‌مانند تا همگام‌سازی به‌صورت ضمنی به مجوز اقدام تبدیل نشود."],
      ["۰۵","OPS","دید عملیاتی","تیم‌ها می‌توانند بر یک تصویر عملیاتی مشترک هماهنگ شوند، بدون اینکه هر اقدام الزاماً از مرکز آغاز شود."],
    ],
    topologyTag:"۰۳ / توپولوژی", topologyTitleA:"شبکه می‌تواند", topologyTitleB:"ناپدید شود.",
    topologyBody:"یک گره ممکن است متصل، دچار افت ارتباط یا کاملاً آفلاین باشد. اصل معماری این است که وضعیت محلی معنادار بماند و با بازگشت ارتباط، تلفیق به‌عنوان یک گذار صریح انجام شود.",
    states:[["CONNECTED","هماهنگی + همگام‌سازی","گره وضعیت را مبادله می‌کند و در دید عملیاتی مشترک مشارکت دارد."],["DEGRADED","ادامه + صف","اجرای محلی در حالی ادامه می‌یابد که ظرفیت همگام‌سازی محدود شده است."],["OFFLINE","اجرا + حفظ","گره با وضعیت موجود خود کار می‌کند و نتایج را برای تلفیق بعدی حفظ می‌کند."],["RESTORED","تلفیق + راستی‌آزمایی","ارتباط بازمی‌گردد و تغییرات توزیع‌شده طبق قواعد سامانه دوباره یکپارچه می‌شوند."]],
    syncTag:"۰۴ / همگام‌سازی", syncTitleA:"همگام‌سازی یک", syncTitleB:"مرز سامانه است.",
    syncBody:"همگام‌سازی نباید صرفاً یک جزئیات انتقال در پس‌زمینه باشد. این نقطه‌ای است که وضعیت توزیع‌شده به وضعیت هماهنگ تبدیل می‌شود و بنابراین به قواعد صریح برای هویت، ترتیب، تعارض، اختیار و راستی‌آزمایی نیاز دارد.",
    rules:["هویت وضعیت","ترتیب تغییرات","مدیریت تعارض","مرزهای اختیار","راستی‌آزمایی / ردپا"],
    authorityTag:"۰۵ / اختیار", authorityTitleA:"هماهنگی", authorityTitleB:"مسئولیت را حذف نمی‌کند.",
    authorityBody:"سامانه توزیع‌شده فقط به جابه‌جایی داده نیاز ندارد. ONYX اختیار و مسئولیت را از اتصال جدا نگه می‌دارد تا معماری بتواند مشخص کند چه کسی مجاز به اقدام است، چه چیزی تغییر کرده و چه چیزی راستی‌آزمایی شده است.",
    graph:["ACTOR","AUTHORITY","ACTION","STATE","VERIFICATION"],
    futureTag:"۰۶ / رابط آینده", futureTitleA:"یک رابط کنترل‌شده", futureTitleB:"برای عامل‌ها.",
    futureBody:"لایه آینده Agentic AI / Plugin باید روی مدل عملیاتی قرار بگیرد، نه اینکه آن را دور بزند. عامل‌ها می‌توانند پیشنهاد دهند، وضعیت را بررسی کنند، هماهنگ کنند یا اقدامات کنترل‌شده را اجرا کنند؛ در حالی که همان مرزهای اختیار، وضعیت و راستی‌آزمایی پابرجا می‌مانند.",
    futureRules:[["OBSERVE","خواندن وضعیت و زمینه عملیاتی."],["PROPOSE","تولید اقدام پیشنهادی بدون اجرای پنهانی."],["AUTHORIZE","رعایت مرز اختیار موردنیاز اقدام."],["EXECUTE","فراخوانی عملیات مجاز از طریق مرز سامانه."],["VERIFY","ثبت و نمایش وضعیت عملیاتی حاصل."]],
    statusTag:"۰۷ / وضعیت پیاده‌سازی", statusTitleA:"ادعاهای معماری", statusTitleB:"باید دقیق بمانند.",
    statusBody:"این صفحه مدل سامانه و مرزهای موردنظر را توضیح می‌دهد و به‌معنای عرضه شدن همه لایه‌ها یا رابط آینده نیست.",
    statuses:[["DOCUMENTED","مدل عملیاتی","اجرای محلی‌محور، همگام‌سازی، اختیار و راستی‌آزمایی مدل معماری ONYX را تشکیل می‌دهند."],["IN DEVELOPMENT","اجزای پلتفرم","جزئیات پیاده‌سازی باید با نقشه راه دنبال شوند و از این نمودار استنباط نشوند."],["PLANNED","رابط عامل","یکپارچه‌سازی Agentic AI / Plugin یک لایه آینده است و از مدل فعلی محصول جدا نگه داشته شده است."]],
    ctaTag:"۰۸ / ادامه", ctaTitleA:"از معماری", ctaTitleB:"به سناریوها بروید.", ctaBody:"ببینید سامانه چگونه روی محیط‌های عملیاتی می‌نشیند یا به مدل محصول بازگردید.", solutions:"مشاهده راهکارها", product:"مشاهده محصول",
    light:"حالت روشن", dark:"حالت تاریک", language:"English"
  }
} as const;

export default function ArchitecturePage({locale}:{locale:Locale}) {
  const [theme,setTheme]=useState<Theme>(()=>typeof window!=="undefined" && window.localStorage.getItem("onyx-theme")==="dark"?"dark":"light");
  const t=copy[locale]; const rtl=locale==="fa";
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;document.documentElement.dir=rtl?"rtl":"ltr";window.localStorage.setItem("onyx-theme",theme)},[theme,locale,rtl]);
  const home=`/${locale}/`; const link=(p:string)=>`/${locale}/${p}/`;
  return <div className={`architecture-page architecture-page--${theme}`} dir={rtl?"rtl":"ltr"}>
    <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="architecture" />
    <main>
      <section className="architecture-hero"><div className="architecture-grid" aria-hidden="true"/><div className="shell-content"><div className="architecture-kicker"><span/>{t.tag}</div><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p>{t.body}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("product")}>{t.explore}{rtl?<ArrowLeft size={15}/>:<ArrowRight size={15}/>}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div><a className="architecture-home" href={home}>{rtl?<ArrowRight size={15}/>:<ArrowLeft size={15}/>} {t.home}</a></div></section>
      <section className="architecture-section"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.modelTag}</div><h2>{t.modelTitleA}<br/><em>{t.modelTitleB}</em></h2><p>{t.modelBody}</p></div><div className="architecture-layers">{t.layers.map(([n,code,title,body])=><article key={code}><div><span>{n}</span><b>{code}</b></div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="architecture-section architecture-section--topology"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.topologyTag}</div><h2>{t.topologyTitleA}<br/><em>{t.topologyTitleB}</em></h2><p>{t.topologyBody}</p></div><div className="architecture-states">{t.states.map(([code,title,body])=><article key={code}><span>{code}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="architecture-section"><div className="shell-content architecture-two-col"><div><div className="architecture-kicker"><span/>{t.syncTag}</div><h2>{t.syncTitleA}<br/><em>{t.syncTitleB}</em></h2><p>{t.syncBody}</p></div><div className="architecture-rules">{t.rules.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><Check size={16}/></div>)}</div></div></section>
      <section className="architecture-section architecture-section--authority"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.authorityTag}</div><h2>{t.authorityTitleA}<br/><em>{t.authorityTitleB}</em></h2><p>{t.authorityBody}</p></div><div className="architecture-graph">{t.graph.map((x,i)=><div key={x} className={i===2?"architecture-graph__node architecture-graph__node--active":"architecture-graph__node"}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></div></div></section>
      <section className="architecture-section architecture-section--agent"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.futureTag}</div><h2>{t.futureTitleA}<br/><em>{t.futureTitleB}</em></h2><p>{t.futureBody}</p></div><div className="architecture-agent-grid">{t.futureRules.map(([a,b],i)=><article key={a}><span>0{i+1}</span><b>{a}</b><p>{b}</p></article>)}</div></div></section>
      <section className="architecture-section architecture-section--status"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.statusTag}</div><h2>{t.statusTitleA}<br/><em>{t.statusTitleB}</em></h2><p>{t.statusBody}</p></div><div className="architecture-status">{t.statuses.map(([a,b,c])=><article key={a}><span>{a}</span><div><h3>{b}</h3><p>{c}</p></div></article>)}</div></div></div></section>
      <section className="architecture-final"><div className="shell-content"><div className="architecture-kicker"><span/>{t.ctaTag}</div><h2>{t.ctaTitleA}<br/><em>{t.ctaTitleB}</em></h2><p>{t.ctaBody}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("security")}>{t.solutions}</a><a className="architecture-button" href={link("product")}>{t.product}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div></div></section>
    </main>
    <footer className="architecture-footer"><div className="shell-content"><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/><span>© {new Date().getFullYear()} ONYX · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></footer>
  </div>;
}
