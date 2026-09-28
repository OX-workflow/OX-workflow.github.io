import { ArrowLeft, ArrowRight, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme } from "./SiteHeader";
import ProductVisuals from "../components/ProductVisuals";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav:["Product","Solutions","Architecture","Security","About","Resources"],
    tag:"01 / Solutions", titleA:"WHEN THE", titleB:"OPERATION GETS COMPLEX.",
    body:"ONYX is built for operations where people, work, decisions, and evidence need to stay connected as conditions change.",
    primary:"Explore product", secondary:"Request a demo", home:"Back to home", language:"فارسی", light:"Light mode", dark:"Dark mode",
    scenarioTag:"02 / Where it fits", scenarioTitleA:"Different environments.", scenarioTitleB:"One operating model.",
    scenarioBody:"These are representative operating patterns, not customer claims. The environment changes; the core model stays focused on authority, work, evidence, and continuity.",
    scenarios:[
      ["01","DEFENSE & GOVERNMENT","A distributed mission changes state","A mission lead activates an operation, assigns work to teams, records decisions and approvals, and evaluates how locally available state behaves when communications become intermittent.","AUTHORITY","Mission activation · delegated roles · scoped access","EVIDENCE","Decisions · approvals · files · operational history","RECOVERY","Local operational state and synchronization behavior can be evaluated as connectivity returns; disconnected command queuing is not currently guaranteed."],
      ["02","SPACE OPERATIONS","A mission operates across delayed links","A mission team plans work against known constraints, executes from available local state, records observations and decisions, and reconciles updates when communication windows reopen.","AUTHORITY","Mission roles · approval boundaries · controlled actions","EVIDENCE","Mission state · observations · files · decision history","RECOVERY","Delayed updates are brought back into the shared operational record under synchronization rules."],
      ["03","EMERGENCY RESPONSE","An incident unfolds while infrastructure is degraded","An incident lead establishes the response, assigns tasks, tracks changing conditions, shares evidence, and coordinates teams while parts of the network or supporting infrastructure are unavailable.","AUTHORITY","Incident lead · team roles · delegated actions","EVIDENCE","Incident updates · assignments · reports · attached files","RECOVERY","Teams can evaluate available local state and reconciliation as coordination is restored; the current command path does not guarantee queued disconnected actions."],
      ["04","CRITICAL INFRASTRUCTURE","A site incident requires controlled continuity","An operations team records an incident, assigns inspection or maintenance work, captures findings and approvals, and coordinates across sites without making every action dependent on a central connection.","AUTHORITY","Site roles · work ownership · approval scope","EVIDENCE","Inspection findings · work records · approvals · supporting files","RECOVERY","Site-state synchronization can be evaluated after connectivity is restored; the current command path does not guarantee queued disconnected actions."],
    ],
    conditionTag:"03 / Conditions", conditionTitleA:"Conditions change.", conditionTitleB:"The operation keeps its structure.",
    conditionBody:"ONYX does not define continuity as permanent connectivity. The operating model keeps authority, work, evidence, and state explicit as conditions move from connected to degraded, offline, and restored.",
    conditions:[
      ["CONNECTED","COORDINATE","Use available connectivity to distribute current state, decisions, assignments, and evidence across authorized participants."],
      ["DEGRADED","CONTINUE","Keep the relevant local operational state available while communication capacity is limited or unreliable."],
      ["OFFLINE","PRESERVE","Inspect available local state and record supported outcomes; disconnected command queuing is not currently guaranteed."],
      ["RESTORED","RECONCILE","Synchronize distributed changes and return the operation to a coherent shared state under explicit rules."],
    ],
    workflowTag:"04 / Workflow anatomy", workflowTitleA:"Every scenario still answers", workflowTitleB:"the same questions.",
    workflowBody:"The environment changes the operational details. The core questions remain: who may act, what must happen, what proves it happened, and how does the record recover when conditions change?",
    workflow:[
      ["01","AUTHORITY","Who may act?","Identity, roles, organizational boundaries, delegation, and approval scope establish the authority for the operation."],
      ["02","WORK","What must happen?","Missions, tasks, ownership, dependencies, timelines, and state define the work being executed."],
      ["03","EVIDENCE","What proves it?","Decisions, approvals, files, reports, verification, and operational history connect outcomes to their supporting record."],
      ["04","RECOVERY","What happens after disruption?","Local state, synchronization, conflict handling, and reconciliation preserve continuity when the operating conditions change."],
    ],
    resilienceLabel:"06 / Resilience boundary", resilienceTitleA:"The synchronization model is real.", resilienceTitleB:"The full offline command story is not yet.", resilienceBody:"Current evidence supports local operational state and synchronization/conflict handling in trusted clients. The desktop UI explicitly does not queue commands while disconnected; the operator reconnects and retries. The browser surface is online-only and does not own a local domain replica. Treat queued offline mutations, reconnection replay, and end-to-end conflict validation as implementation evidence still to be completed.",
    valueTag:"07 / Value", valueTitleA:"The value is", valueTitleB:"operational clarity.",
    values:[
      ["CONTINUITY","Relevant local operational state can remain available across changing connectivity; command behavior while disconnected must be validated for the target client."],
      ["AUTHORITY","Actions remain connected to the roles, organizational boundaries, and approval context that govern them."],
      ["EVIDENCE","Operational decisions and outcomes can carry their supporting records instead of being reconstructed from disconnected tools."],
      ["RECOVERY","Reconnection can become an explicit synchronization and reconciliation step, while the current disconnected command path still requires reconnect-and-retry."],
    ],
    boundaryTag:"07 / Fit boundaries", boundaryTitleA:"Representative scenarios.", boundaryTitleB:"No invented proof.",
    boundaryBody:"The scenarios on this page are representative operating patterns derived from ONYX's documented capabilities and target environments. They are not claims that ONYX has been deployed by a named customer or achieved a particular field result.",
    boundaries:[
      ["DOCUMENTED FIT","Distributed, authority-sensitive operations where continuity, synchronization, evidence, and reconstruction matter."],
      ["SCENARIO, NOT PROOF","Defense, space, emergency response, and critical-infrastructure examples describe intended operating patterns; they are not customer testimonials."],
      ["ENVIRONMENT-SPECIFIC","Identity, security controls, retention, compliance, deployment topology, and recovery procedures must be designed for the target organization."],
    ],
    ctaTag:"08 / Next", ctaTitleA:"Bring your operation", ctaTitleB:"into the model.", ctaBody:"Start with the product lifecycle, inspect the architecture behind synchronization and state, or discuss a concrete operating environment with the team.",
    product:"View product", architecture:"View architecture", contact:"Contact the team"
  },
  fa: {
    nav:["محصول","راهکارها","معماری","امنیت","درباره","منابع"],
    tag:"۰۱ / راهکارها", titleA:"وقتی شبکه", titleB:"کافی نیست.",
    body:"ONYX برای عملیاتی طراحی شده است که در آن کار باید میان تیم‌های پراکنده، ارتباطات ناپایدار و شرایط متغیر بدون از دست رفتن زمینه ادامه پیدا کند. سناریوها متفاوت‌اند؛ مدل عملیاتی ثابت می‌ماند.",
    primary:"مشاهده محصول", secondary:"درخواست دمو", home:"بازگشت به خانه", language:"فارسی", light:"حالت روشن", dark:"حالت تاریک",
    scenarioTag:"۰۲ / سناریوهای عملیاتی", scenarioTitleA:"چهار محیط کاری.", scenarioTitleB:"یک مدل برای تداوم کار.",
    scenarioBody:"سناریوها بر اساس شرایط واقعی کار توضیح داده می‌شوند، نه صرفاً بر اساس نام صنایع: کار کجا انجام می‌شود، با قطع ارتباط چه چیزی از کار می‌افتد و چه چیزی باید پاسخ‌گو باقی بماند.",
    scenarios:[
      ["۰۱","دفاع و دولت","فرماندهی توزیع‌شده","تیم‌های میدانی باید هنگام ارتباط ناپایدار، محدود یا قطع‌شده به کار ادامه دهند و در عین حال اختیار و وضعیت عملیاتی صریح باقی بماند.","اجرای محلی · همگام‌سازی کنترل‌شده · اختیار"],
      ["۰۲","عملیات فضایی","تیم‌های مأموریت در لبه","عملیات دوردست یا حساس به تأخیر به وضعیت محلی و تلفیق منضبط نیاز دارد، نه فرض ارتباط دائمی.","وضعیت محلی · لینک‌های تأخیردار · تلفیق"],
      ["۰۳","پاسخ به بحران","هماهنگی در اختلال","پاسخ‌دهندگان در شرایط متغیری کار می‌کنند که زیرساخت ممکن است دچار اختلال شود. سامانه باید وضعیت محلی مفید را حفظ کند تا هماهنگی بازیابی شود.","شبکه ضعیف · کار محلی · دید مشترک"],
      ["۰۴","زیرساخت حیاتی","عملیاتی که نمی‌تواند متوقف شود","تیم‌های زیرساخت باید میان سایت‌ها، دستگاه‌ها و نقش‌های عملیاتی تداوم داشته باشند، بدون اینکه هر اقدام به اتصال مرکزی وابسته شود.","سایت‌های توزیع‌شده · حافظه عملیاتی · راستی‌آزمایی"],
    ],
    conditionTag:"۰۳ / شرایط عملیاتی", conditionTitleA:"سناریو تغییر می‌کند.", conditionTitleB:"اصل ثابت می‌ماند.",
    conditionBody:"در همه این محیط‌ها، ONYX همان توالی پایه عملیاتی را دنبال می‌کند. وضعیت محلی و همگام‌سازی بخشی از معماری هستند، اما صف‌کردن فرمان‌های آفلاین در مسیر فعلی تضمین نشده است.",
    conditions:[
      ["متصل","هماهنگی","از اتصال موجود برای همگام‌سازی وضعیت و هماهنگی تیم‌ها استفاده کنید."],
      ["مختل","ادامه","در حالی که ظرفیت ارتباط محدود است، کار محلی را در دسترس نگه دارید."],
      ["قطع","اعتبارسنجی","وضعیت محلی و رفتار فرمان را در کلاینت هدف بررسی کنید؛ فرمان‌های قطع‌شده فعلاً صف نمی‌شوند."],
      ["بازیابی‌شده","تلفیق","تغییرات توزیع‌شده را طبق قواعد صریح همگام‌سازی دوباره یکپارچه کنید."],
    ],
    valueTag:"۰۴ / ارزش عملیاتی", valueTitleA:"چه چیزی", valueTitleB:"برای اپراتور تغییر می‌کند.",
    values:[
      ["وضعیت محلی","وضعیت عملیاتی محلی می‌تواند در دسترس بماند؛ رفتار فرمان در قطع ارتباط باید در کلاینت هدف اعتبارسنجی شود."],
      ["وضعیت روشن‌تر","اپراتور بر اساس وضعیت عملیاتی محلی و صریح کار می‌کند، نه فرض اتصال زنده."],
      ["بازگشت کنترل‌شده به کار","بازگشت ارتباط یک رویداد مشخص تلفیق است، نه فرایندی بداهه."],
      ["مسئولیت قابل مشاهده","اختیار، اقدام، نتیجه و راستی‌آزمایی بخشی از تصویر عملیاتی باقی می‌مانند."],
    ],
    resilienceLabel:"۰۶ / مرز تاب‌آوری", resilienceTitleA:"مدل همگام‌سازی واقعی است.", resilienceTitleB:"اما داستان کامل فرمان آفلاین هنوز نیست.", resilienceBody:"شواهد فعلی وضعیت عملیاتی محلی و همگام‌سازی/مدیریت تعارض را در کلاینت‌های مورد اعتماد پشتیبانی می‌کند. رابط دسکتاپ هنگام قطع ارتباط فرمان‌ها را صف نمی‌کند و کاربر باید دوباره متصل شود و اقدام را تکرار کند. رابط مرورگر آنلاین است و وضعیت دامنه محلی ندارد. صف‌کردن تغییرات آفلاین، بازپخش پس از اتصال مجدد و اعتبارسنجی کامل تعارض باید با شواهد پیاده‌سازی تکمیل شوند.",
    boundaryTag:"۰۷ / مرزهای تناسب", boundaryTitleA:"جایی که نباید", boundaryTitleB:"بیش از شواهد ادعا کرد.",
    boundaryBody:"مدل راهکارها محیط‌هایی را توضیح می‌دهد که ONYX برای آن‌ها در نظر گرفته شده است. این به معنای مناسب بودن سامانه برای هر سازمان یا تضمین گواهی، استقرار یا نتیجه میدانی خاص نیست.",
    boundaries:[
      ["تناسب مستند","عملیات توزیع‌شده‌ای که در آن تداوم، همگام‌سازی و اختیار نیازهای معنادار هستند."],
      ["نیازمند طراحی","کنترل‌های امنیتی، مدل هویت، نگهداری داده، انطباق و توپولوژی استقرار به محیط هدف وابسته‌اند."],
      ["ادعای ممنوع","هیچ گواهی، نتیجه مشتری یا استقرار عملیاتی نباید بدون مستندات جداگانه استنباط شود."],
    ],
    ctaTag:"۰۸ / گام بعد", ctaTitleA:"سناریوی عملیاتی خود را", ctaTitleB:"با این مدل تطبیق دهید.", ctaBody:"با مدل محصول شروع کنید، معماری را بررسی کنید یا درباره یک محیط عملیاتی مشخص با تیم گفت‌وگو کنید.",
    product:"مشاهده محصول", architecture:"مشاهده معماری", contact:"تماس با تیم"
  }
} as const;

export default function SolutionsPage({locale}:{locale:Locale}) {
  const [theme,setTheme]=useState<Theme>(()=>typeof window!=="undefined"&&window.localStorage.getItem("onyx-theme")==="dark"?"dark":"light");
  const rtl=locale==="fa"; const t=copy[locale];
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;document.documentElement.dir=rtl?"rtl":"ltr";window.localStorage.setItem("onyx-theme",theme)},[theme,locale,rtl]);
  const link=(p:string)=>`/${locale}/${p}/`; const home=`/${locale}/`;
  return <div className={`solutions-page solutions-page--${theme}`} dir={rtl?"rtl":"ltr"}>
    <SiteHeader locale={locale} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} activePage="solutions" />
    <main>
      <section className="solutions-hero"><div className="solutions-hero__grid" aria-hidden="true"/><div className="shell-content"><div className="solutions-kicker"><span/>{t.tag}</div><h1>{t.titleA}<br/><em>{t.titleB}</em></h1><p>{t.body}</p><div className="solutions-actions"><a className="solutions-button solutions-button--primary" href={link("product")}>{t.primary}{rtl?<ArrowLeft size={15}/>:<ArrowRight size={15}/>}</a><a className="solutions-button" href={link("contact")}>{t.secondary}</a></div><a className="solutions-home" href={home}>{rtl?<ArrowRight size={15}/>:<ArrowLeft size={15}/>} {t.home}</a></div></section>
      <ProductVisuals locale={locale} variant="hero" />
      <section className="solutions-section"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.scenarioTag}</div><h2>{t.scenarioTitleA}<br/><em>{t.scenarioTitleB}</em></h2><p>{t.scenarioBody}</p></div><div className="solutions-scenarios">{locale === "en" ? copy.en.scenarios.map(([n,sector,title,body,aLabel,aText,eLabel,eText,rLabel,rText]) => <article key={n}><header><span>{n}</span><b>{sector}</b></header><h3>{title}</h3><p>{body}</p><div className="solutions-scenario-detail"><div><small>{aLabel}</small><strong>{aText}</strong></div><div><small>{eLabel}</small><strong>{eText}</strong></div><div><small>{rLabel}</small><strong>{rText}</strong></div></div></article>) : copy.fa.scenarios.map(([n,sector,title,body,tags]) => <article key={n}><header><span>{n}</span><b>{sector}</b></header><h3>{title}</h3><p>{body}</p><small>{tags}</small></article>)}</div></div></section>
      <section className="solutions-section solutions-section--conditions"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.conditionTag}</div><h2>{t.conditionTitleA}<br/><em>{t.conditionTitleB}</em></h2><p>{t.conditionBody}</p></div><div className="solutions-conditions">{t.conditions.map(([state,title,body],i)=><article key={state}><span>0{i+1}</span><b>{state}</b><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      {locale === "en" && <section className="solutions-section solutions-section--workflow"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{copy.en.workflowTag}</div><h2>{copy.en.workflowTitleA}<br/><em>{copy.en.workflowTitleB}</em></h2><p>{copy.en.workflowBody}</p></div><div className="solutions-workflow">{copy.en.workflow.map(([n,title,question,body])=><article key={n}><span>{n}</span><small>{title}</small><h3>{question}</h3><p>{body}</p></article>)}</div></div></section>}
      <section className="solutions-section solutions-section--conditions">
        <div className="shell-content">
          <div className="solutions-heading">
            <div className="solutions-kicker"><span/>{t.resilienceLabel}</div>
            <h2>{t.resilienceTitleA}<br/><em>{t.resilienceTitleB}</em></h2>
            <p>{t.resilienceBody}</p>
          </div>
        </div>
      </section>
      <section className="solutions-section"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.valueTag}</div><h2>{t.valueTitleA}<br/><em>{t.valueTitleB}</em></h2></div><div className="solutions-values">{t.values.map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="solutions-section solutions-section--boundaries"><div className="shell-content"><div className="solutions-two-col"><div><div className="solutions-kicker"><span/>{t.boundaryTag}</div><h2>{t.boundaryTitleA}<br/><em>{t.boundaryTitleB}</em></h2><p>{t.boundaryBody}</p></div><div className="solutions-boundaries">{t.boundaries.map(([a,b])=><article key={a}><b>{a}</b><p>{b}</p></article>)}</div></div></div></section>
      <section className="solutions-final"><div className="shell-content"><div className="solutions-kicker"><span/>{t.ctaTag}</div><h2>{t.ctaTitleA}<br/><em>{t.ctaTitleB}</em></h2><p>{t.ctaBody}</p><div className="solutions-actions"><a className="solutions-button solutions-button--primary" href={link("product")}>{t.product}</a><a className="solutions-button" href={link("architecture")}>{t.architecture}</a><a className="solutions-button" href={link("contact")}>{t.contact}</a></div></div></section>
    </main>
    <footer className="solutions-footer"><div className="shell-content"><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/><span>© {new Date().getFullYear()} ONYX</span></div></footer>
  </div>;
}