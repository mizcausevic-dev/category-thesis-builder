import {
  categoryMap,
  narrativePosture,
  payload,
  summary,
  thesisLane,
  verification,
  whyNow
} from "./verticalBriefService.js";

function layout(title: string, active: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/thesis-lane", label: "Thesis Lane" },
    { href: "/category-map", label: "Category Map" },
    { href: "/why-now", label: "Why Now" },
    { href: "/narrative-posture", label: "Narrative Posture" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title><style>
  :root { color-scheme: dark; --bg:#07111c; --panel:#0f1a2b; --panel-2:#152235; --line:#1d3452; --text:#edf4ff; --muted:#97a9c3; --accent:#6fe1b0; --accent-2:#6da8ff; --warn:#ffc66b; --bad:#ff8d88; }
  * { box-sizing:border-box; } body { margin:0; font-family:Georgia, serif; background:linear-gradient(180deg,#07111c 0%,#091524 100%); color:var(--text); }
  .wrap { max-width:1320px; margin:0 auto; padding:32px 24px 56px; }
  .topbar,.hero,.section,.footer { border:1px solid var(--line); border-radius:24px; background:rgba(15,26,43,.92); }
  .topbar { display:flex; justify-content:space-between; gap:16px; padding:18px 22px; margin-bottom:24px; font-family:"Consolas","SFMono-Regular",monospace; color:var(--muted); }
  .hero { padding:28px; margin-bottom:24px; }
  .hero h1 { margin:16px 0; font-size:clamp(2.4rem,4vw,4.4rem); line-height:.98; letter-spacing:-.04em; }
  .hero p,.card p,table,.footer { font-family:system-ui,-apple-system,sans-serif; }
  .hero p { color:var(--muted); font-size:1.05rem; max-width:940px; }
  .chiprow,.navrow,.footer-links { display:flex; gap:10px; flex-wrap:wrap; }
  .meta-chip,.navchip,.status { border:1px solid var(--line); border-radius:999px; padding:8px 12px; font-family:"Consolas","SFMono-Regular",monospace; text-decoration:none; color:var(--text); font-size:.9rem; display:inline-flex; }
  .meta-chip { color:var(--accent); background:rgba(111,225,176,.08); }
  .navrow { margin-top:18px; }
  .navchip.active { border-color:var(--accent); color:var(--accent); }
  .section { padding:24px; margin-bottom:24px; }
  .sh { display:flex; justify-content:space-between; gap:16px; align-items:end; margin-bottom:18px; }
  .sh h2 { margin:0; font-size:1.8rem; }
  .note { color:var(--muted); font-family:"Consolas","SFMono-Regular",monospace; }
  .kpis,.grid { display:grid; gap:16px; }
  .kpis { grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); }
  .grid { grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
  .kpi,.card { border:1px solid var(--line); border-radius:20px; padding:18px; background:rgba(21,34,53,.8); }
  .kpi .v { font-size:2rem; font-weight:700; }
  .kpi .lbl,.card .name { font-family:"Consolas","SFMono-Regular",monospace; color:var(--accent); text-transform:lowercase; }
  .kpi .h { margin-top:8px; color:var(--muted); font-family:system-ui,-apple-system,sans-serif; }
  .card h3 { margin:10px 0 8px; font-size:1.25rem; }
  .card p { margin:0; color:var(--muted); line-height:1.55; }
  table { width:100%; border-collapse:collapse; font-size:.96rem; }
  th,td { padding:12px 10px; border-bottom:1px solid var(--line); vertical-align:top; text-align:left; }
  th { color:var(--muted); font-weight:600; }
  .status.DEFEND { color:var(--accent); }
  .status.SHORE_UP { color:var(--warn); }
  .status.MUST_FIX { color:var(--bad); }
  .footer { display:flex; justify-content:space-between; gap:16px; padding:18px 22px; color:var(--muted); }
  @media (max-width:820px) { .topbar,.footer,.sh { flex-direction:column; align-items:flex-start; } .wrap { padding:18px 14px 40px; } .hero,.section { padding:18px; } table { display:block; overflow:auto; } }
  </style><meta name="description" content="Category Thesis Builder is the executive narrative surface for category framing, investor-ready positioning, why-now clarity, and thesis-defensible company stories."><meta property="og:type" content="website"><meta property="og:title" content="Category Thesis Builder"><meta property="og:description" content="Executive intelligence for category narrative, investor framing, why-now posture, and market-defensible positioning."><meta property="og:url" content="https://thesis.kineticgain.com/"><meta property="og:site_name" content="Kinetic Gain"></head><body><div class="wrap"><div class="topbar"><div class="left">Kinetic Gain · Category Thesis Builder</div><div class="right"><div>category framing · why-now clarity · investor posture</div><div>synthetic sample data only</div></div></div><section class="hero"><div class="chiprow"><span class="meta-chip">Executive narrative layer</span><span class="meta-chip">Investor-ready category memo</span><span class="meta-chip">Synthetic sample data only</span></div><h1>One narrative surface that shows which category claims can lead, which stories still lack enough proof, and which why-now themes are actually strong enough to defend with investors and boards now.</h1><p>Category Thesis Builder turns a scattered product and proof estate into a cleaner market thesis. It helps leadership decide what category to claim, what timing story to tell, what wedge is actually defensible, and what should stay out of the lead narrative until evidence catches up.</p><div class="navrow">${nav.map((link) => `<a class="navchip${active === link.href ? " active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</div></section>${body}<div class="footer"><div>category-thesis-builder · synthetic sample data only</div><div class="footer-links"><a class="meta-chip" href="https://github.com/mizcausevic-dev/">GitHub</a><a class="meta-chip" href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a><a class="meta-chip" href="https://kineticgain.com/">Kinetic Gain</a></div></div></div></body></html>`;
}

function sev(value: string) {
  return value.replace(/\s+/g, "_");
}

export function renderOverview() {
  const s = summary();
  return layout(
    "Category Thesis Builder",
    "/",
    `<section class="section"><div class="sh"><h2>Narrative Snapshot</h2><div class="note">coherence · tailwind · clarity</div></div><div class="kpis"><div class="kpi"><div class="v">${s.items}</div><div class="lbl">themes</div><div class="h">Modeled executive themes in the narrative review set.</div></div><div class="kpi"><div class="v">${s.averageCoherence}</div><div class="lbl">coherence</div><div class="h">How clearly the category claim matches the underlying product estate.</div></div><div class="kpi"><div class="v">${s.averageTailwind}</div><div class="lbl">tailwind</div><div class="h">How strong the why-now story is across the modeled themes.</div></div><div class="kpi"><div class="v">${s.averageInvestorClarity}</div><div class="lbl">investor clarity</div><div class="h">How easily an outsider can repeat the narrative back accurately.</div></div><div class="kpi"><div class="v">${s.defensibleThemes}</div><div class="lbl">lead themes</div><div class="h">Themes strong enough to anchor the category memo now.</div></div><div class="kpi"><div class="v">${s.missingEvidenceItems}</div><div class="lbl">evidence gaps</div><div class="h">Themes still relying on stale or missing proof.</div></div><div class="kpi"><div class="v">${s.narrativeRiskScore}</div><div class="lbl">narrative risk</div><div class="h">Modeled score showing how much story fragility still remains.</div></div></div></section><section class="section"><div class="sh"><h2>What the builder resolves</h2><div class="note">what leads · what waits · what sharpens</div></div><div class="grid"><div class="card"><div class="name">lead claim</div><h3>What category should lead now</h3><p>${s.recommendation}</p></div><div class="card"><div class="name">why now</div><h3>Why the timing story matters</h3><p>The builder keeps market tailwind visible so leadership does not overclaim a category before the timing story is actually there.</p></div><div class="card"><div class="name">investor lens</div><h3>What a board or investor can repeat</h3><p>The surface checks whether the story survives the simplest outsider question: what are they, why now, and why this team?</p></div><div class="card"><div class="name">next move</div><h3>What to fix before the memo goes out</h3><p>Every theme lands in must-fix, shore-up, or defend so the narrative can tighten before it gets reused in public or investor-facing materials.</p></div></div></section><section class="section"><div class="sh"><h2>What this product does</h2><div class="note">gtm · value · technical proof</div></div><div class="grid"><div class="card"><div class="name">gtm analyst lens</div><h3>Turns scattered proof into a defendable market thesis</h3><p>Revenue, product marketing, and investor-facing teams can see which category claim is sharp enough to lead and which one still needs proof before it becomes external messaging.</p></div><div class="card"><div class="name">saas value lens</div><h3>Connects story quality to capital allocation</h3><p>The page explains where narrative risk creates wasted GTM effort, confused buyers, and weaker diligence posture before leadership commits budget to a market story.</p></div><div class="card"><div class="name">technical proof</div><h3>CLI, JSON routes, and reproducible sample data</h3><p>The repo is not a static brochure: it exposes reusable route handlers, fixture generation, typed services, CLI output, and verification notes that can feed downstream briefs.</p></div><div class="card"><div class="name">What these repos have in common</div><h3>Reusable executive-intelligence pattern</h3><p>Each Kinetic Gain surface converts raw operational complexity into board-readable evidence, clear owners, action lanes, and a safer decision story.</p></div></div></section>`
  );
}

export function renderThesisLane() {
  return layout(
    "Category Thesis Builder — Thesis Lane",
    "/thesis-lane",
    `<section class="section"><div class="sh"><h2>Thesis Lane</h2><div class="note">claim · investor question · next move</div></div><table><thead><tr><th>Theme</th><th>Buyer</th><th>Category claim</th><th>Band</th><th>Coherence</th><th>Wedge</th><th>Next move</th></tr></thead><tbody>${thesisLane().map((item) => `<tr><td><b>${item.theme}</b></td><td>${item.executiveBuyer}</td><td>${item.categoryClaim}</td><td><span class="status ${sev(item.priorityBand)}">${item.priorityBand}</span></td><td>${item.coherenceScore}</td><td>${item.wedgeSummary}</td><td>${item.nextMove}</td></tr>`).join("")}</tbody></table></section>`
  );
}

export function renderCategoryMap() {
  return layout(
    "Category Thesis Builder — Category Map",
    "/category-map",
    `<section class="section"><div class="sh"><h2>Category Map</h2><div class="note">evidence · clarity · company tags</div></div><table><thead><tr><th>Theme</th><th>Evidence</th><th>Investor clarity</th><th>Tailwind</th><th>Company tags</th><th>Related surfaces</th></tr></thead><tbody>${categoryMap().map((item) => `<tr><td><b>${item.theme}</b></td><td>${item.evidenceState}</td><td>${item.investorClarityScore}</td><td>${item.marketTailwindScore}</td><td>${item.companyTags.join(" · ")}</td><td>${item.relatedSurfaces.join("<br />")}</td></tr>`).join("")}</tbody></table></section>`
  );
}

export function renderWhyNow() {
  return layout(
    "Category Thesis Builder — Why Now",
    "/why-now",
    `<section class="section"><div class="sh"><h2>Why Now</h2><div class="note">timing thesis · market pull</div></div><div class="grid">${whyNow().map((item) => `<div class="card"><div class="name">${item.executiveBuyer} · tailwind ${item.marketTailwindScore}</div><h3>${item.theme}</h3><p>${item.whyNowThesis}</p></div>`).join("")}</div></section>`
  );
}

export function renderNarrativePosture() {
  return layout(
    "Category Thesis Builder — Narrative Posture",
    "/narrative-posture",
    `<section class="section"><div class="sh"><h2>Narrative Posture</h2><div class="note">claim · coherence · investor clarity</div></div><div class="grid">${narrativePosture().map((item) => `<div class="card"><div class="name">${item.executiveBuyer}</div><h3>${item.theme}</h3><p>${item.categoryClaim}</p><p>Coherence ${item.coherenceScore} · Investor clarity ${item.investorClarityScore}</p></div>`).join("")}</div></section>`
  );
}

export function renderVerification() {
  return layout(
    "Category Thesis Builder — Verification",
    "/verification",
    `<section class="section"><div class="sh"><h2>Verification</h2><div class="note">narrative-safe claims only</div></div><div class="grid">${verification().map((item) => `<div class="card"><div class="name">verification</div><h3>${item}</h3><p>The builder stays bounded to synthetic narrative posture and category-thesis evidence signals.</p></div>`).join("")}</div></section>`
  );
}

export function renderDocs() {
  return layout(
    "Category Thesis Builder — Docs",
    "/docs",
    `<section class="section"><div class="sh"><h2>Docs</h2><div class="note">cli · apis · narrative layer</div></div><div class="grid"><div class="card"><div class="name">cli</div><h3>Offline thesis generation</h3><p><code>npx category-thesis-builder fixtures/category-thesis-builder.json --format summary</code> renders the same posture the dashboard exposes.</p></div><div class="card"><div class="name">apis</div><h3>Machine-readable payloads</h3><p>Use <code>/api/dashboard/summary</code>, <code>/api/thesis-lane</code>, <code>/api/category-map</code>, and <code>/api/why-now</code> as the canonical JSON layers.</p></div><div class="card"><div class="name">product role</div><h3>Narrative layer after the scorecards and briefs</h3><p>This builder turns scorecards, signals, risk maps, and board materials into one explicit category and why-now thesis surface.</p></div></div></section>`
  );
}

export function renderSample() {
  return JSON.stringify(payload(), null, 2);
}
