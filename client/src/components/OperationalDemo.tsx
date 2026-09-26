import { useEffect, useState } from "react";
import { ArrowRight, Check, CircleDot, ShieldCheck, Wifi } from "lucide-react";

type Locale = "en" | "fa";

type Stage = {
  step: string;
  label: string;
  title: string;
  body: string;
  evidence: string[];
};

const stages: Record<Locale, Stage[]> = {
  en: [
    { step: "01", label: "MISSION", title: "Define the operation", body: "Set the objective, owner, status, and operational boundary before work begins.", evidence: ["Mission defined", "Owner assigned", "Boundary recorded"] },
    { step: "02", label: "AUTHORITY", title: "Establish who can act", body: "Keep responsibility and decision authority visible as work moves through the operation.", evidence: ["Authority recorded", "Responsibility visible", "Decision path clear"] },
    { step: "03", label: "EXECUTION", title: "Turn intent into work", body: "Structure tasks, dependencies, milestones, and deadlines around the mission.", evidence: ["Work structured", "Dependencies linked", "Milestones tracked"] },
    { step: "04", label: "DECISION", title: "Capture the decision", body: "Keep meetings, decisions, and resulting actions attached to the operation.", evidence: ["Decision recorded", "Action attached", "Context retained"] },
    { step: "05", label: "VERIFY", title: "Attach the evidence", body: "Connect approval, verification, and evidence to the outcome rather than leaving them in separate trails.", evidence: ["Approval attached", "Evidence linked", "Outcome verified"] },
    { step: "06", label: "SYNC", title: "Reconcile the state", body: "Make distributed change visible and preserve explicit synchronization and conflict state.", evidence: ["State visible", "Changes reconciled", "Conflict state explicit"] },
    { step: "07", label: "HISTORY", title: "Reconstruct what happened", body: "Keep the operational record so the sequence, authority, decisions, and evidence remain explainable.", evidence: ["Sequence retained", "Authority traceable", "Evidence recoverable"] },
  ],
  fa: [
    { step: "۰۱", label: "مأموریت", title: "عملیات را تعریف کنید", body: "هدف، مالک، وضعیت و مرز عملیاتی را پیش از شروع کار مشخص کنید." },
    { step: "۰۲", label: "اختیار", title: "مشخص کنید چه کسی مجاز است", body: "مسئولیت و اختیار تصمیم را در طول عملیات قابل مشاهده نگه دارید." },
    { step: "۰۳", label: "اجرا", title: "نیت را به کار تبدیل کنید", body: "کارها، وابستگی‌ها، نقاط عطف و مهلت‌ها را حول مأموریت ساختاربندی کنید." },
    { step: "۰۴", label: "تصمیم", title: "تصمیم را ثبت کنید", body: "جلسه، تصمیم و اقدامات حاصل را به خود عملیات متصل نگه دارید." },
    { step: "۰۵", label: "راستی‌آزمایی", title: "شواهد را متصل کنید", body: "تأیید، راستی‌آزمایی و شواهد را به نتیجه متصل کنید، نه به ردپاهای جداگانه." },
    { step: "۰۶", label: "همگام‌سازی", title: "وضعیت را تطبیق دهید", body: "تغییرات توزیع‌شده و وضعیت همگام‌سازی یا تعارض را به‌صورت صریح قابل مشاهده کنید." },
    { step: "۰۷", label: "تاریخچه", title: "آنچه رخ داده را بازسازی کنید", body: "سابقه عملیاتی را نگه دارید تا توالی، اختیار، تصمیم‌ها و شواهد قابل توضیح بمانند." },
  ],
};

export default function OperationalDemo({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = stages[locale];
  const current = items[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % items.length), 5200);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  return (
    <section className="operational-demo section-shell" id="operational-demo">
      <div className="shell-content">
        <div className="operational-demo__intro">
          <div>
            <div className="signal-tag"><span className="signal-tag__node" /><span>{locale === "fa" ? "۰۵ / دموی عملیاتی" : "05 / Operational demo"}</span></div>
            <h2>{locale === "fa" ? <>یک عملیات.<br /><em>یک تاریخچه تحت کنترل.</em></> : <>One operation.<br /><em>One governed history.</em></>}</h2>
          </div>
          <p>{locale === "fa" ? "یک سناریو را از شروع مأموریت تا تاریخچه نهایی دنبال کنید. محصول باید از طریق جریان واقعی عملیات قابل فهم باشد." : "Follow one operation from mission intent to durable history. The product should be understood through the work itself, not through a wall of feature cards."}</p>
        </div>

        <div className="operational-demo__stage">
          <div className="operational-demo__rail" aria-label={locale === "fa" ? "مراحل عملیات" : "Operational stages"}>
            {items.map((item, index) => (
              <button
                type="button"
                key={item.step}
                className={`operational-demo__step ${index === active ? "operational-demo__step--active" : ""}`}
                onClick={() => setActive(index)}
                aria-current={index === active ? "step" : undefined}
                aria-label={item.step + " / " + item.label + ": " + item.title}
              >
                <span>{item.step}</span>
                <i aria-hidden="true" />
                <strong>{item.label}</strong>
              </button>
            ))}
          </div>

          <div className="operational-demo__panel" aria-live="polite">
            <div className="operational-demo__panel-head">
              <span className="mono-label">{current.step} / {current.label}</span>
              <span className="operational-demo__status"><CircleDot size={12} /> {locale === "fa" ? "وضعیت عملیاتی" : "Operational state"}</span>
            </div>
            <div className="operational-demo__signal">
              <div className="operational-demo__ring"><span /><b>{current.step}</b></div>
              <div className="operational-demo__copy">
                <h3>{current.title}</h3>
                <p>{current.body}</p>
                <div className="operational-demo__evidence">
                  {current.evidence.map((item, index) => <span key={item}>{index === 0 ? <ShieldCheck size={14} /> : index === 1 ? <Check size={14} /> : <Wifi size={14} />} {item}</span>)}
                </div>
              </div>
            </div>
            <div className="operational-demo__progress"><span style={{ width: `${((active + 1) / items.length) * 100}%` }} /></div>
          </div>
        </div>

        <div className="operational-demo__footer">
          <span>{locale === "fa" ? "از تصمیم تا اجرا، هر مرحله به مرحله بعدی متصل می‌ماند." : "From decision to execution, every stage remains connected to what comes next."}</span>
          <a href={locale === "fa" ? "/fa/product/" : "/en/product/"}>{locale === "fa" ? "مشاهده محصول" : "Explore the product"} <ArrowRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}
