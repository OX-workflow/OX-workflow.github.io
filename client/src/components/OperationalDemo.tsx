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

const stages: Record<Locale, Stage[]> = {
  en: [
    { step: "01", label: "MISSION", title: "Define the operation", body: "Set the objective, owner, status, and operational boundary before work begins.", evidence: ["Mission defined", "Owner assigned", "Boundary recorded"] },
    { step: "02", label: "AUTHORITY", title: "Establish who can act", body: "Keep responsibility and decision authority visible as work moves through the operation.", evidence: ["Authority recorded", "Responsibility visible", "Decision path clear"] },
    { step: "03", label: "WORK / TIMELINE", title: "Turn intent into work", body: "Structure tasks, dependencies, milestones, and critical deadlines around the mission.", evidence: ["Work structured", "Dependencies linked", "Milestone tracked"] },
    { step: "04", label: "MEETING / DECISION", title: "Capture the decision", body: "Keep the operational meeting, decision, and resulting action attached to the operation.", evidence: ["Decision recorded", "Action attached", "Context retained"] },
    { step: "05", label: "APPROVAL / EVIDENCE", title: "Verify the outcome", body: "Connect approval, verification, and evidence to the outcome rather than leaving separate trails.", evidence: ["Approval attached", "Evidence linked", "Outcome verified"] },
    { step: "06", label: "CAPACITY / FORECAST", title: "See the pressure ahead", body: "Expose resource pressure and scenario projection while the operation is still in motion.", evidence: ["Capacity visible", "Scenario projected", "Pressure identified"] },
    { step: "07", label: "AUTOMATION", title: "Trigger the response", body: "Show a deterministic operational response through notification, escalation, or an execution receipt.", evidence: ["Rule evaluated", "Response triggered", "Receipt retained"] },
    { step: "08", label: "SYNC / CONFLICT", title: "Reconcile distributed change", body: "Make two operational states and their conflict visible, then preserve the explicit resolution.", evidence: ["Replica state visible", "Conflict explicit", "Resolution recorded"] },
    { step: "09", label: "HISTORY", title: "Reconstruct what happened", body: "Keep the operational record so sequence, authority, decisions, and evidence remain explainable.", evidence: ["Sequence retained", "Authority traceable", "Evidence recoverable"] },
    { step: "10", label: "GOVERNED CLOSE", title: "Leave a complete record", body: "Close the operation with the decisions, evidence, responses, and history still connected.", evidence: ["Operation closed", "Record complete", "History preserved"] },
  ],
  fa: [
    { step: "۰۱", label: "مأموریت", title: "عملیات را تعریف کنید", body: "هدف، مالک، وضعیت و مرز عملیاتی را پیش از شروع کار مشخص کنید." },
    { step: "۰۲", label: "اختیار", title: "مشخص کنید چه کسی مجاز است", body: "مسئولیت و اختیار تصمیم را در طول عملیات قابل مشاهده نگه دارید." },
    { step: "۰۳", label: "کار / زمان‌بندی", title: "نیت را به کار تبدیل کنید", body: "کارها، وابستگی‌ها، نقاط عطف و مهلت‌های مهم را حول مأموریت ساختاربندی کنید." },
    { step: "۰۴", label: "جلسه / تصمیم", title: "تصمیم را ثبت کنید", body: "جلسه عملیاتی، تصمیم و اقدام حاصل را به خود عملیات متصل نگه دارید." },
    { step: "۰۵", label: "تأیید / شواهد", title: "نتیجه را راستی‌آزمایی کنید", body: "تأیید، راستی‌آزمایی و شواهد را به نتیجه متصل کنید، نه به ردپاهای جداگانه." },
    { step: "۰۶", label: "ظرفیت / پیش‌بینی", title: "فشار پیش‌رو را ببینید", body: "فشار منابع و سناریوی پیش‌بینی را در حالی که عملیات ادامه دارد آشکار کنید." },
    { step: "۰۷", label: "اتوماسیون", title: "پاسخ را فعال کنید", body: "یک پاسخ عملیاتی قطعی را از طریق اعلان، تشدید یا رسید اجرا نشان دهید." },
    { step: "۰۸", label: "همگام‌سازی / تعارض", title: "تغییر توزیع‌شده را تطبیق دهید", body: "دو وضعیت عملیاتی و تعارض آن‌ها را قابل مشاهده کنید و حل‌وفصل صریح را حفظ کنید." },
    { step: "۰۹", label: "تاریخچه", title: "آنچه رخ داده را بازسازی کنید", body: "سابقه عملیاتی را نگه دارید تا توالی، اختیار، تصمیم‌ها و شواهد قابل توضیح بمانند." },
    { step: "۱۰", label: "بستن تحت کنترل", title: "یک سابقه کامل باقی بگذارید", body: "عملیات را با اتصال تصمیم‌ها، شواهد، پاسخ‌ها و تاریخچه ببندید." },
  ],
};
