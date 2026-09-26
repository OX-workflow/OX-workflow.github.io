import { ArrowLeft, ArrowRight, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SiteHeader, { getInitialTheme, type Theme } from "./SiteHeader";

type Locale = "en" | "fa";
type Theme = "light" | "dark";

const copy = {
  en: {
    nav:["Product","Solutions","Architecture","Security","About","Resources"],
    tag:"01 / Solutions", titleA:"WHEN THE", titleB:"NETWORK IS NOT ENOUGH.",
    body:"ONYX is designed for operations where work must continue across distributed teams, intermittent connectivity, and changing conditions. The scenarios differ; the operating model stays consistent.",
    primary:"Explore product", secondary:"Request a demo", home:"Back to home", language:"فارسی", light:"Light mode", dark:"Dark mode",
    scenarioTag:"02 / Operational scenarios", scenarioTitleA:"Four environments.", scenarioTitleB:"One continuity model.",
    scenarioBody:"Use cases are expressed as operational conditions rather than industry slogans: where work happens, what fails when connectivity disappears, and what must remain accountable.",
    scenarios:[
      ["01","DEFENSE & GOVERNMENT","Distributed command","Field teams need to continue working when links are intermittent, constrained, or unavailable, while operational authority and state remain explicit.","Local execution · controlled sync · authority"],
      ["02","SPACE OPERATIONS","Mission teams at the edge","Remote or latency-sensitive operations require local state and disciplined reconciliation instead of assuming continuous communication.","Local state · delayed links · reconciliation"],
      ["03","EMERGENCY RESPONSE","Coordination under disruption","Responders operate in changing conditions where infrastructure may be degraded. The system must preserve useful local state while coordination recovers.","Degraded networks · local work · shared visibility"],
      ["04","CRITICAL INFRASTRUCTURE","Operations that cannot pause","Infrastructure teams need continuity across sites, devices, and operational roles without turning every action into a dependency on central connectivity.","Distributed sites · operational memory · verification"],
    ],
    conditionTag:"03 / Operating conditions", conditionTitleA:"The scenario changes.", conditionTitleB:"The invariant does not.",
    conditionBody:"Across these environments, ONYX applies the same basic operating sequence. The system adapts to the state of the network without making connectivity the definition of operational continuity.",
    conditions:[
      ["CONNECTED","COORDINATE","Use available connectivity to synchronize state and coordinate teams."],
      ["DEGRADED","CONTINUE","Keep local work available while communication capacity is constrained."],
      ["OFFLINE","PRESERVE","Execute against available state and preserve outcomes for reconciliation."],
      ["RESTORED","RECONCILE","Bring distributed changes together under explicit synchronization rules."],
    ],
    valueTag:"04 / Operational value", valueTitleA:"What changes", valueTitleB:"for the operator.",
    values:[
      ["LESS BLOCKING","Network loss does not automatically become a work stoppage."],
      ["CLEARER STATE","Operators work from an explicit local operational state rather than an assumed live connection."],
      ["CONTROLLED RECOVERY","Reconnection is a defined reconciliation event, not an improvised recovery process."],
      ["VISIBLE RESPONSIBILITY","Authority, action, outcome, and verification remain part of the operational picture."],
    ],
    boundaryTag:"05 / Fit boundaries", boundaryTitleA:"Where ONYX", boundaryTitleB:"should not be overclaimed.",
    boundaryBody:"The solution model describes environments ONYX is intended to address. It does not mean every organization or workflow requires the platform, nor does it imply a particular certification, deployment guarantee, or field result.",
    boundaries:[
      ["DOCUMENTED FIT","Distributed operations where continuity, synchronization, and authority are meaningful requirements."],
      ["REQUIRES DESIGN","Security controls, identity models, retention, compliance, and deployment topology depend on the target environment."],
      ["NOT A CLAIM","No certification, customer outcome, or operational deployment should be inferred unless separately documented."],
    ],
    ctaTag:"06 / Next", ctaTitleA:"Map your operation", ctaTitleB:"to the model.", ctaBody:"Start with the product model, inspect the architecture, or contact the team to discuss a concrete operational environment.",
    product:"View product", architecture:"View architecture", contact:"Contact the team"
  },
  fa: {
    nav:["محصول","راهکارها","معماری","امنیت","درباره","منابع"],
    tag:"۰۱ / راهکارها", titleA:"وقتی شبکه", titleB:"کافی نیست.",
    body:"ONYX برای عملیاتی طراحی شده است که در آن کار باید میان تیم‌های توزیع‌شده، ارتباطات ناپایدار و شرایط متغیر ادامه پیدا کند. سناریوها متفاوت‌اند؛ مدل عملیاتی ثابت می‌ماند.",
    primary:"مشاهده محصول", secondary:"درخواست دمو", home:"بازگشت به خانه", language:"فارسی", light:"حالت روشن", dark:"حالت تاریک",
    scenarioTag:"۰۲ / سناریوهای عملیاتی", scenarioTitleA:"چهار محیط.", scenarioTitleB:"یک مدل تداوم.",
    scenarioBody:"موارد استفاده بر اساس شرایط عملیاتی بیان می‌شوند، نه شعارهای صنعتی: کار کجا انجام می‌شود، با قطع ارتباط چه چیزی از کار می‌افتد و چه چیزی باید پاسخ‌گو باقی بماند.",
    scenarios:[
      ["۰۱","دفاع و دولت","فرماندهی توزیع‌شده","تیم‌های میدانی باید هنگام ارتباط ناپایدار، محدود یا قطع‌شده به کار ادامه دهند و در عین حال اختیار و وضعیت عملیاتی صریح باقی بماند.","اجرای محلی · همگام‌سازی کنترل‌شده · اختیار"],
      ["۰۲","عملیات فضایی","تیم‌های مأموریت در لبه","عملیات دوردست یا حساس به تأخیر به وضعیت محلی و تلفیق منضبط نیاز دارد، نه فرض ارتباط دائمی.","وضعیت محلی · لینک‌های تأخیردار · تلفیق"],
      ["۰۳","پاسخ به بحران","هماهنگی در اختلال","پاسخ‌دهندگان در شرایط متغیری کار می‌کنند که زیرساخت ممکن است دچار اختلال شود. سامانه باید وضعیت محلی مفید را حفظ کند تا هماهنگی بازیابی شود.","شبکه ضعیف · کار محلی · دید مشترک"],
      ["۰۴","زیرساخت حیاتی","عملیاتی که نمی‌تواند متوقف شود","تیم‌های زیرساخت باید میان سایت‌ها، دستگاه‌ها و نقش‌های عملیاتی تداوم داشته باشند، بدون اینکه هر اقدام به اتصال مرکزی وابسته شود.","سایت‌های توزیع‌شده · حافظه عملیاتی · راستی‌آزمایی"],
    ],
    conditionTag:"۰۳ / شرایط عملیاتی", conditionTitleA:"سناریو تغییر می‌کند.", conditionTitleB:"اصل ثابت می‌ماند.",
    conditionBody:"در همه این محیط‌ها، ONYX همان توالی پایه عملیاتی را اعمال می‌کند. سامانه با وضعیت شبکه سازگار می‌شود، بدون اینکه اتصال را تعریف تداوم عملیات قرار دهد.",
    conditions:[
      ["متصل","هماهنگی","از اتصال موجود برای همگام‌سازی وضعیت و هماهنگی تیم‌ها استفاده کنید."],
      ["مختل","ادامه","در حالی که ظرفیت ارتباط محدود است، کار محلی را در دسترس نگه دارید."],
      ["قطع","حفظ","با وضعیت موجود اجرا کنید و نتایج را برای تلفیق حفظ کنید."],
      ["بازیابی‌شده","تلفیق","تغییرات توزیع‌شده را طبق قواعد صریح همگام‌سازی دوباره یکپارچه کنید."],
    ],
    valueTag:"۰۴ / ارزش عملیاتی", valueTitleA:"چه چیزی", valueTitleB:"برای اپراتور تغییر می‌کند.",
    values:[
      ["کاهش توقف","قطع شبکه به‌صورت خودکار به توقف کار تبدیل نمی‌شود."],
      ["وضعیت روشن‌تر","اپراتور بر اساس وضعیت عملیاتی محلی و صریح کار می‌کند، نه فرض اتصال زنده."],
      ["بازیابی کنترل‌شده","بازگشت ارتباط یک رویداد مشخص تلفیق است، نه فرایندی بداهه."],
      ["مسئولیت قابل مشاهده","اختیار، اقدام، نتیجه و راستی‌آزمایی بخشی از تصویر عملیاتی باقی می‌مانند."],
    ],
    boundaryTag:"۰۵ / مرزهای تناسب", boundaryTitleA:"جایی که نباید", boundaryTitleB:"بیش از حد ادعا کرد.",
    boundaryBody:"مدل راهکارها محیط‌هایی را توضیح می‌دهد که ONYX برای آن‌ها در نظر گرفته شده است. این به معنای مناسب بودن سامانه برای هر سازمان یا تضمین گواهی، استقرار یا نتیجه میدانی خاص نیست.",
    boundaries:[
      ["تناسب مستند","عملیات توزیع‌شده‌ای که در آن تداوم، همگام‌سازی و اختیار نیازهای معنادار هستند."],
      ["نیازمند طراحی","کنترل‌های امنیتی، مدل هویت، نگهداری داده، انطباق و توپولوژی استقرار به محیط هدف وابسته‌اند."],
      ["ادعای ممنوع","هیچ گواهی، نتیجه مشتری یا استقرار عملیاتی نباید بدون مستندات جداگانه استنباط شود."],
    ],
    ctaTag:"۰۶ / گام بعد", ctaTitleA:"عملیات خود را", ctaTitleB:"روی این مدل بنشانید.", ctaBody:"با مدل محصول شروع کنید، معماری را بررسی کنید یا درباره یک محیط عملیاتی مشخص با تیم گفت‌وگو کنید.",
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
      <section className="solutions-section"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.scenarioTag}</div><h2>{t.scenarioTitleA}<br/><em>{t.scenarioTitleB}</em></h2><p>{t.scenarioBody}</p></div><div className="solutions-scenarios">{t.scenarios.map(([n,sector,title,body,tags])=><article key={n}><header><span>{n}</span><b>{sector}</b></header><h3>{title}</h3><p>{body}</p><small>{tags}</small></article>)}</div></div></section>
      <section className="solutions-section solutions-section--conditions"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.conditionTag}</div><h2>{t.conditionTitleA}<br/><em>{t.conditionTitleB}</em></h2><p>{t.conditionBody}</p></div><div className="solutions-conditions">{t.conditions.map(([state,title,body],i)=><article key={state}><span>0{i+1}</span><b>{state}</b><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="solutions-section"><div className="shell-content"><div className="solutions-heading"><div className="solutions-kicker"><span/>{t.valueTag}</div><h2>{t.valueTitleA}<br/><em>{t.valueTitleB}</em></h2></div><div className="solutions-values">{t.values.map(([title,body],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="solutions-section solutions-section--boundaries"><div className="shell-content"><div className="solutions-two-col"><div><div className="solutions-kicker"><span/>{t.boundaryTag}</div><h2>{t.boundaryTitleA}<br/><em>{t.boundaryTitleB}</em></h2><p>{t.boundaryBody}</p></div><div className="solutions-boundaries">{t.boundaries.map(([a,b])=><article key={a}><b>{a}</b><p>{b}</p></article>)}</div></div></div></section>
      <section className="solutions-final"><div className="shell-content"><div className="solutions-kicker"><span/>{t.ctaTag}</div><h2>{t.ctaTitleA}<br/><em>{t.ctaTitleB}</em></h2><p>{t.ctaBody}</p><div className="solutions-actions"><a className="solutions-button solutions-button--primary" href={link("product")}>{t.product}</a><a className="solutions-button" href={link("architecture")}>{t.architecture}</a><a className="solutions-button" href={link("contact")}>{t.contact}</a></div></div></section>
    </main>
    <footer className="solutions-footer"><div className="shell-content"><img src={theme==="dark"?"/assets/onyx-horizontal-dark.svg":"/assets/onyx-horizontal-light.svg"} alt="ONYX"/><span>© {new Date().getFullYear()} ONYX · <a href="https://bound-method.github.io/" target="_blank" rel="noreferrer">BOUND Method</a></span></div></footer>
  </div>;
}
