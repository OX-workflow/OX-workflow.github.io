import { ArrowLeft, ArrowRight, Check, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    tag:"01 / Architecture", titleA:"DESIGNED FOR", titleB:"DISCONNECTED REALITY.",
    body:"ONYX treats connectivity as a variable, not a prerequisite. The architecture separates local execution, distributed state, synchronization, authority, and operational visibility so each layer can remain explicit.",
    explore:"Product model", contact:"Request a demo", home:"Back to home",
    modelTag:"02 / System model", modelTitleA:"Five layers.", modelTitleB:"One operational state.",
    modelBody:"The system can be understood as a chain from point-of-action state to coordinated operational visibility. Each layer has a distinct responsibility and boundary.",
    layers:[
      ["01","EDGE","Local execution","The operator works against the state available at the point of action. Connectivity loss does not have to stop local work."],
      ["02","STATE","Operational state","Work, decisions, outcomes, and relevant context are represented as operational state that can be inspected and reconciled."],
      ["03","SYNC","Synchronization","Distributed changes are exchanged and reconciled when communication is available, according to defined system rules."],
      ["04","AUTHORITY","Control plane","Authority and responsibility remain explicit so synchronization does not silently become permission to act."],
      ["05","OPS","Operational view","Teams can coordinate around a shared operational picture without requiring every action to originate from the center."],
    ],
    topologyTag:"03 / Topology", topologyTitleA:"The network can", topologyTitleB:"disappear.",
    topologyBody:"A node may be connected, degraded, or offline. The architectural invariant is that local operational state remains meaningful and that reconciliation is an explicit transition when connectivity returns.",
    states:[["CONNECTED","Coordinate + synchronize","The node exchanges state and participates in the shared operational view."],["DEGRADED","Continue + queue","Local execution continues while synchronization capacity is constrained."],["OFFLINE","Execute + preserve","The node operates against its available state and preserves outcomes for later reconciliation."],["RESTORED","Reconcile + verify","Connectivity returns and distributed changes are brought back together under system rules."]],
    syncTag:"04 / Synchronization", syncTitleA:"Synchronization is", syncTitleB:"a system boundary.",
    syncBody:"Synchronization should not be treated as a background transport detail. It is the boundary where distributed state becomes coordinated state, and therefore needs explicit rules for identity, ordering, conflicts, authority, and verification.",
    rules:["State identity","Change ordering","Conflict handling","Authority boundaries","Verification / audit trail"],
    authorityTag:"05 / Authority", authorityTitleA:"Coordination does not", authorityTitleB:"erase responsibility.",
    authorityBody:"A distributed system needs more than data movement. ONYX keeps authority and responsibility conceptually separate from connectivity so the architecture can answer who may act, what changed, and what was verified.",
    graph:["ACTOR","AUTHORITY","ACTION","STATE","VERIFICATION"],
    futureTag:"06 / Future interface", futureTitleA:"A governed interface", futureTitleB:"for agents.",
    futureBody:"The future Agentic AI / Plugin layer should sit above the operational model rather than bypass it. Agents can propose, inspect, coordinate, or trigger governed actions while the same authority, state, and verification boundaries remain in force.",
    futureRules:[["OBSERVE","Read operational state and context."],["PROPOSE","Generate a candidate action without silently executing it."],["AUTHORIZE","Respect the authority boundary required for the action."],["EXECUTE","Invoke an allowed operation through the system boundary."],["VERIFY","Record and expose the resulting operational state."]],
    statusTag:"07 / Implementation status", statusTitleA:"Architecture claims", statusTitleB:"must stay honest.",
    statusBody:"This architecture page describes the system model and intended boundaries. It does not imply that every layer or future interface is already shipped.",
    statuses:[["DOCUMENTED","Operating model","Local-first execution, synchronization, authority, and verification are the architectural model presented by ONYX."],["IN DEVELOPMENT","Platform components","Implementation details should be tracked against the roadmap rather than inferred from this diagram."],["PLANNED","Agent interface","Agentic AI / Plugin integration is a future layer and is explicitly separated from the current product model."]],
    ctaTag:"08 / Continue", ctaTitleA:"Move from", ctaTitleB:"architecture to scenarios.", ctaBody:"See how the system maps onto operational environments, or return to the product model.", solutions:"View solutions", product:"View product", contact:"Contact team",
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
    ctaTag:"۰۸ / ادامه", ctaTitleA:"از معماری", ctaTitleB:"به سناریوها بروید.", ctaBody:"ببینید سامانه چگونه روی محیط‌های عملیاتی می‌نشیند یا به مدل محصول بازگردید.", solutions:"مشاهده راهکارها", product:"مشاهده محصول", contact:"تماس با تیم",
    light:"حالت روشن", dark:"حالت تاریک", language:"English"
  }
} as const;

export default function ArchitecturePage({locale}:{locale:Locale}) {
  const [theme,setTheme]=useState<Theme>(()=>typeof window!=="undefined" && window.localStorage.getItem("onyx-theme")==="dark"?"dark":"light");
  const t=copy[locale]; const rtl=locale==="fa";
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;document.documentElement.dir=rtl?"rtl":"ltr";window.localStorage.setItem("onyx-theme",theme)},[theme,locale,rtl]);
  const home=`/${locale}/`; const link=(p:string)=>`/${locale}/${p}/`;
  return <div className={`architecture-page architecture-page--${theme}`} dir={rtl?"rtl":"ltr"}>
    <header className="architecture-header"><a href={home}><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/></a><nav><a href={link("product")}>{rtl?"محصول":"Product"}</a><a href={link("solutions")}>{rtl?"راهکارها":"Solutions"}</a><a href={link("architecture")}>{rtl?"معماری":"Architecture"}</a><a href={link("security")}>{rtl?"امنیت":"Security"}</a><a href={link("resources")}>{rtl?"منابع":"Resources"}</a></nav><div className="architecture-tools"><a href={locale==="en"?"/fa/architecture/":"/en/architecture/"}>{t.language}</a><button onClick={()=>setTheme(x=>x==="dark"?"light":"dark")} aria-label={theme==="dark"?t.light:t.dark}>{theme==="dark"?<Sun size={16}/>:<Moon size={16}/>}</button><a className="architecture-contact" href={link("contact")}>{t.contact}<ChevronRight size={14}/></a></div></header>
    <main>
      <section className="architecture-hero"><div className="architecture-grid" aria-hidden="true"/><div className="shell-content"><div className="architecture-kicker"><span/>{t.tag}</div><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p>{t.body}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("product")}>{t.explore}{rtl?<ArrowLeft size={15}/>:<ArrowRight size={15}/>}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div><a className="architecture-home" href={home}>{rtl?<ArrowRight size={15}/>:<ArrowLeft size={15}/>} {t.home}</a></div></section>
      <section className="architecture-section"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.modelTag}</div><h2>{t.modelTitleA}<br/><em>{t.modelTitleB}</em></h2><p>{t.modelBody}</p></div><div className="architecture-layers">{t.layers.map(([n,code,title,body])=><article key={code}><div><span>{n}</span><b>{code}</b></div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="architecture-section architecture-section--topology"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.topologyTag}</div><h2>{t.topologyTitleA}<br/><em>{t.topologyTitleB}</em></h2><p>{t.topologyBody}</p></div><div className="architecture-states">{t.states.map(([code,title,body])=><article key={code}><span>{code}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="architecture-section"><div className="shell-content architecture-two-col"><div><div className="architecture-kicker"><span/>{t.syncTag}</div><h2>{t.syncTitleA}<br/><em>{t.syncTitleB}</em></h2><p>{t.syncBody}</p></div><div className="architecture-rules">{t.rules.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><Check size={16}/></div>)}</div></div></section>
      <section className="architecture-section architecture-section--authority"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.authorityTag}</div><h2>{t.authorityTitleA}<br/><em>{t.authorityTitleB}</em></h2><p>{t.authorityBody}</p></div><div className="architecture-graph">{t.graph.map((x,i)=><div key={x} className={i===2?"architecture-graph__node architecture-graph__node--active":"architecture-graph__node"}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></div></div></section>
      <section className="architecture-section architecture-section--agent"><div className="shell-content"><div className="architecture-heading"><div className="architecture-kicker"><span/>{t.futureTag}</div><h2>{t.futureTitleA}<br/><em>{t.futureTitleB}</em></h2><p>{t.futureBody}</p></div><div className="architecture-agent-grid">{t.futureRules.map(([a,b],i)=><article key={a}><span>0{i+1}</span><b>{a}</b><p>{b}</p></article>)}</div></div></section>
      <section className="architecture-section architecture-section--status"><div className="shell-content"><div className="architecture-two-col"><div><div className="architecture-kicker"><span/>{t.statusTag}</div><h2>{t.statusTitleA}<br/><em>{t.statusTitleB}</em></h2><p>{t.statusBody}</p></div><div className="architecture-status">{t.statuses.map(([a,b,c])=><article key={a}><span>{a}</span><div><h3>{b}</h3><p>{c}</p></div></article>)}</div></div></div></section>
      <section className="architecture-final"><div className="shell-content"><div className="architecture-kicker"><span/>{t.ctaTag}</div><h2>{t.ctaTitleA}<br/><em>{t.ctaTitleB}</em></h2><p>{t.ctaBody}</p><div className="architecture-actions"><a className="architecture-button architecture-button--primary" href={link("solutions")}>{t.solutions}</a><a className="architecture-button" href={link("product")}>{t.product}</a><a className="architecture-button" href={link("contact")}>{t.contact}</a></div></div></section>
    </main>
    <footer className="architecture-footer"><div className="shell-content"><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/><span>© {new Date().getFullYear()} ONYX · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></footer>
  </div>;
}
