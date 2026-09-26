import { useEffect, useState } from "react";
import { ArrowRight, Check, CircleDot, ShieldCheck, Wifi } from "lucide-react";

type Locale = "en" | "fa";

type Stage = {
  step: string;
  label: string;
  title: string;
  body: string;
  evidence?: string[];
};

type StateKind = "ring" | "approval" | "evidence" | "forecast" | "automation" | "conflict" | "history";

const stateKinds: StateKind[] = [
  "ring",
  "ring",
  "ring",
  "ring",
  "approval",
  "evidence",
  "forecast",
  "automation",
  "conflict",
  "history",
];

function OperationalState({ kind, locale, step }: { kind: StateKind; locale: Locale; step: string }) {
  if (kind === "approval") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--approval">
        <div className="operational-demo__gate">
          <span className="operational-demo__state-kicker">{locale === "fa" ? "دروازه اختیار" : "AUTHORITY GATE"}</span>
          <strong>{locale === "fa" ? "در انتظار تأیید" : "Approval required"}</strong>
          <div className="operational-demo__gate-line"><i /><span>{locale === "fa" ? "آستانه بررسی" : "Review threshold"}</span><b>{locale === "fa" ? "فعال" : "ACTIVE"}</b></div>
          <div className="operational-demo__gate-line"><i /><span>{locale === "fa" ? "بازبین" : "Reviewer"}</span><b>{locale === "fa" ? "تعیین شد" : "ASSIGNED"}</b></div>
        </div>
        <div className="operational-demo__state-pulse" />
      </div>
    );
  }

  if (kind === "evidence") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--evidence">
        <div className="operational-demo__evidence-stack">
          <span className="operational-demo__state-kicker">{locale === "fa" ? "اثبات عملیات" : "OPERATIONAL PROOF"}</span>
          {["REPORT", "LOG", "RECEIPT"].map((item, index) => (
            <div className="operational-demo__evidence-row" key={item}>
              <span>{item}</span><i /><b>{index === 2 ? "VERIFIED" : "ATTACHED"}</b>
            </div>
          ))}
        </div>
        <div className="operational-demo__verify-mark"><Check size={22} /></div>
      </div>
    );
  }

  if (kind === "forecast") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--forecast">
        <div className="operational-demo__forecast-head">
          <span className="operational-demo__state-kicker">{locale === "fa" ? "ظرفیت" : "CAPACITY"}</span>
          <strong>78%</strong>
        </div>
        <div className="operational-demo__capacity"><i /></div>
        <div className="operational-demo__forecast-chart">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className="operational-demo__forecast-meta"><span>{locale === "fa" ? "فشار پیش‌رو" : "Pressure ahead"}</span><b>+12%</b></div>
      </div>
    );
  }

  if (kind === "automation") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--automation">
        <div className="operational-demo__automation-node"><span>{locale === "fa" ? "قانون" : "RULE"}</span><b>IF</b></div>
        <div className="operational-demo__automation-path"><i /><i /><i /></div>
        <div className="operational-demo__automation-node operational-demo__automation-node--active"><span>{locale === "fa" ? "پاسخ" : "RESPONSE"}</span><b>RUN</b></div>
        <div className="operational-demo__receipt">{locale === "fa" ? "رسید اجرا حفظ شد" : "Execution receipt retained"}</div>
      </div>
    );
  }

  if (kind === "conflict") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--conflict">
        <div className="operational-demo__replica"><span>A</span><b>{locale === "fa" ? "وضعیت محلی" : "LOCAL STATE"}</b><i /></div>
        <div className="operational-demo__conflict-mark">!</div>
        <div className="operational-demo__replica"><span>B</span><b>{locale === "fa" ? "وضعیت همتا" : "PEER STATE"}</b><i /></div>
        <div className="operational-demo__resolution">{locale === "fa" ? "حل‌وفصل ثبت شد" : "Resolution recorded"}</div>
      </div>
    );
  }

  if (kind === "history") {
    return (
      <div className="operational-demo__state-visual operational-demo__state-visual--history">
        <span className="operational-demo__state-kicker">{locale === "fa" ? "بازسازی عملیات" : "OPERATION RECONSTRUCTION"}</span>
        <div className="operational-demo__history-line">
          {["DECISION", "APPROVAL", "EVIDENCE", "SYNC"].map((item, index) => (
            <div key={item}><i /><span>{item}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
          ))}
        </div>
        <strong>{locale === "fa" ? "توالی قابل بازیابی" : "Sequence recoverable"}</strong>
      </div>
    );
  }

  return (
    <div className="operational-demo__ring">
      <span />
      <b>{step}</b>
    </div>
  );
}

const stages: Record<Locale, Stage[]> = {
  en: [
    { step: "01", label: "MISSION", title: "Define the operation", body: "Set the objective, owner, status, and operational boundary before work begins.", evidence: ["Mission defined", "Owner assigned", "Boundary recorded"] },
    { step: "02", label: "AUTHORITY", title: "Establish who can act", body: "Keep responsibility and decision authority visible as work moves through the operation.", evidence: ["Authority recorded", "Responsibility visible", "Decision path clear"] },
    { step: "03", label: "WORK / TIMELINE", title: "Turn intent into work", body: "Structure tasks, dependencies, milestones, and critical deadlines around the mission.", evidence: ["Work structured", "Dependencies linked", "Milestone tracked"] },
    { step: "04", label: "MEETING / DECISION", title: "Capture the decision", body: "Keep the operational meeting, decision, and resulting action attached to the operation.", evidence: ["Decision recorded", "Action attached", "Context retained"] },
    { step: "05", label: "APPROVAL", title: "Require the decision", body: "Route an approval threshold to the right reviewers and keep the decision attached to the operation.", evidence: ["Threshold defined", "Reviewer assigned", "Decision recorded"] },
    { step: "06", label: "EVIDENCE", title: "Attach and verify proof", body: "Connect reports and evidence to the outcome so the result can be checked in context.", evidence: ["Evidence attached", "Verification linked", "Outcome supported"] },
    { step: "07", label: "CAPACITY / FORECAST", title: "See the pressure ahead", body: "Expose resource pressure and scenario projection while the operation is still in motion.", evidence: ["Capacity visible", "Scenario projected", "Pressure identified"] },
    { step: "08", label: "AUTOMATION", title: "Trigger the response", body: "Show a deterministic operational response through notification, escalation, or an execution receipt.", evidence: ["Rule evaluated", "Response triggered", "Receipt retained"] },
    { step: "09", label: "SYNC / CONFLICT", title: "Reconcile distributed change", body: "Make two operational states and their conflict visible, then preserve the explicit resolution.", evidence: ["Replica state visible", "Conflict explicit", "Resolution recorded"] },
    { step: "10", label: "HISTORY", title: "Reconstruct what happened", body: "Keep the operational record so sequence, authority, decisions, and evidence remain explainable.", evidence: ["Sequence retained", "Authority traceable", "Evidence recoverable"] },
  ],
  fa: [
    { step: "۰۱", label: "مأموریت", title: "عملیات را تعریف کنید", body: "هدف، مالک، وضعیت و مرز عملیاتی را پیش از شروع کار مشخص کنید." },
    { step: "۰۲", label: "اختیار", title: "مشخص کنید چه کسی مجاز است", body: "مسئولیت و اختیار تصمیم را در طول عملیات قابل مشاهده نگه دارید." },
    { step: "۰۳", label: "کار / زمان‌بندی", title: "نیت را به کار تبدیل کنید", body: "کارها، وابستگی‌ها، نقاط عطف و مهلت‌های مهم را حول مأموریت ساختاربندی کنید." },
    { step: "۰۴", label: "جلسه / تصمیم", title: "تصمیم را ثبت کنید", body: "جلسه عملیاتی، تصمیم و اقدام حاصل را به خود عملیات متصل نگه دارید." },
    { step: "۰۵", label: "تأیید", title: "تصمیم تأیید را لازم کنید", body: "آستانه تأیید را به بازبینان مناسب بسپارید و تصمیم را به عملیات متصل نگه دارید." },
    { step: "۰۶", label: "شواهد", title: "مدرک را متصل و راستی‌آزمایی کنید", body: "گزارش‌ها و شواهد را به نتیجه متصل کنید تا نتیجه در همان زمینه قابل بررسی باشد." },
    { step: "۰۷", label: "ظرفیت / پیش‌بینی", title: "فشار پیش‌رو را ببینید", body: "فشار منابع و سناریوی پیش‌بینی را در حالی که عملیات ادامه دارد آشکار کنید." },
    { step: "۰۸", label: "اتوماسیون", title: "پاسخ را فعال کنید", body: "یک پاسخ عملیاتی قطعی را از طریق اعلان، تشدید یا رسید اجرا نشان دهید." },
    { step: "۰۹", label: "همگام‌سازی / تعارض", title: "تغییر توزیع‌شده را تطبیق دهید", body: "دو وضعیت عملیاتی و تعارض آن‌ها را قابل مشاهده کنید و حل‌وفصل صریح را حفظ کنید." },
    { step: "۱۰", label: "تاریخچه", title: "آنچه رخ داده را بازسازی کنید", body: "سابقه عملیاتی را نگه دارید تا توالی، اختیار، تصمیم‌ها و شواهد قابل توضیح بمانند." },
  ],
};

export default function OperationalDemo({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = stages[locale];
  const current = items[active];
  const stateKind = stateKinds[active];

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

          <div className={`operational-demo__panel operational-demo__panel--${stateKind}`} data-state={stateKind} aria-live="polite">
            <div className="operational-demo__panel-head">
              <span className="mono-label">{current.step} / {current.label}</span>
              <span className="operational-demo__status"><CircleDot size={12} /> {locale === "fa" ? "وضعیت عملیاتی" : "Operational state"}</span>
            </div>
            <div className="operational-demo__signal">
              <OperationalState kind={stateKind} locale={locale} step={current.step} />
              <div className="operational-demo__copy">
                <h3>{current.title}</h3>
                <p>{current.body}</p>
                <div className="operational-demo__evidence">
                  {(current.evidence ?? (locale === "fa" ? ["اختیار ثبت شد", "سابقه حفظ شد", "وضعیت همگام‌سازی قابل مشاهده"] : ["Authority recorded", "History retained", "Sync state visible"])).map((item, index) => <span key={item}>{index === 0 ? <ShieldCheck size={14} /> : index === 1 ? <Check size={14} /> : <Wifi size={14} />} {item}</span>)}
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
