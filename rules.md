# Yuma Ops PWA — Agent Rules
> Read this before touching any file in this project.

---

## What this project is

A single-file PWA (`abhilash_yuma_pwa_demo.html`) for Abhilash, Business Head of Yuma — an EV battery swapping company. He manages 5 cities (Delhi, Noida, Jaipur, Meerut, Lucknow) and 14 operational domains. His core pain: he spends his day chasing people for updates. This product must eliminate that.

Read `Abhilash.md` for his full profile before writing any copy, prompt, or logic.

---

## The one thing this product does

It is NOT a dashboard. It is a **commitment and accountability tracker** that:
1. Knows who committed to what and by when
2. Detects silence and missed deadlines automatically
3. Drafts and sends follow-ups on Abhilash's behalf
4. Surfaces what needs his attention RIGHT NOW, ranked by impact

---

## Tech rules

- **Single HTML file only.** No separate JS, CSS, or config files. Everything inline.
- **No external libraries.** No React, no Vue, no Chart.js. Vanilla JS + inline CSS only.
- **Gemini 2.0 Flash** for all AI calls via the Antigravity-managed API key.
- Mobile viewport, max-width 375px. Matches an iPhone screen.
- Use the existing CSS variable system (`--color-*`, `--border-radius-*`, `--font-sans`). Do not hardcode colours.
- All dummy data must live in a single JS object called `COMMITMENTS` at the top of the script block for easy editing.
- Must work offline after first load. No backend, no server.

---

## AI / Gemini rules

Inject this context into **every** Gemini call, no exceptions:

```
You are an AI operations assistant for Abhilash, Business Head of Yuma, an EV battery swapping company.

Abhilash's style: data-first, numbers before narrative, hates chasing people, direct and brief.

Current date: 23 Apr 2025.

Commitments and accountability status:
- Delhi: Ravi (Ops Head) flagged swap rate issue 2 days ago. No resolution. Swap rate 2.4 vs 3.0 target. 18 underperforming batteries. ₹32K daily revenue gap. SILENT 2 DAYS.
- Lucknow: Sandeep (Growth Manager) last responded Friday. DAU 38 (↓5). Swap rate 2.1 — lowest in network. SILENT 3 DAYS.
- Noida: Amit (Inventory) committed Thu 18 Apr to confirm 40-battery procurement. No update since. COMMITMENT MISSED BY 4 DAYS.
- Meerut: Vikram (Growth) performing well. Swap rate 3.6. Zone B expansion proposal due 25 Apr. ON TRACK.
- Jaipur: DAU 61 (↑12). Station 2 down. No owner assigned yet.
- 31 drivers doing <1 swap/day: Delhi 14, Lucknow 9, Jaipur 5, Noida 3. ₹58K/month idle battery cost.

When drafting WhatsApp messages: under 5 lines, reference the specific commitment or silence duration, firm but not aggressive, sound like something Abhilash would write himself.
When answering data questions: lead with numbers, use tables or comparisons where useful.
When asked about revenue or P&L: connect to swap rates and battery utilisation.
```

Temperature: 0.4. Max tokens: 400.

---

## Commitment data schema

The `COMMITMENTS` object at the top of the script must follow this shape:

```js
const COMMITMENTS = [
  {
    id: "delhi-swap",
    city: "Delhi",
    owner: "Ravi",
    role: "Ops Head",
    issue: "Swap rate 2.4 vs 3.0 target — ₹32K daily gap",
    lastUpdateDaysAgo: 2,
    commitmentDate: null,         // null = no commitment made
    commitmentText: null,
    financialImpact: 32000,       // daily ₹ impact
    priority: "blocker",
    silenceThresholdHours: 48
  },
  // ... one entry per card
]
```

---

## Silence detection logic

Run this on every page load, not on a timer:

```
silenceDays = lastUpdateDaysAgo
if silenceDays * 24 >= silenceThresholdHours AND commitmentDate == null → badge = "Silent Xd" (red)
if commitmentDate is set AND commitmentDate < today AND no update → badge = "Overdue Xd" (red)
if commitmentDate is set AND commitmentDate >= today → badge = "Committed" (amber)
if lastUpdateDaysAgo == 0 → badge = "Active" (green)
```

---

## Card priority scoring

Sort cards on every page load by this score (highest first):

```
score = (lastUpdateDaysAgo × 2) + (financialImpact / 10000) + (commitmentMissed ? 3 : 0)
```

The greeting line ("X things need you today") must dynamically list the top 3 scored issues by owner name and reason. Example: "Sandeep silent 3d · Amit missed commitment · Ravi blocking ₹32K/day"

---

## Button copy rules

Never use generic labels. Every action button must be contextual:

| Situation | Button label |
|---|---|
| Owner silent, no commitment | "Follow up with [Name] — silent [X]d ↗" |
| Commitment missed | "Chase [Name] — commitment missed ↗" |
| Commitment upcoming | "Check in with [Name] ↗" |
| Breakdown needed | "See breakdown ↗" |
| Delegation needed | "Delegate ↗" |

---

## Modal behaviour

After Gemini returns a response:
1. Show the message text in an editable `<textarea>` (not static text)
2. Two buttons at the bottom:
   - **"Send on WhatsApp ↗"** → opens `https://wa.me/?text=` with the message URL-encoded
   - **"Edit first"** → focuses the textarea for editing, hides this button
3. A small label above the textarea: "AI draft — edit before sending"
4. Close button at top right of modal

---

## Ask tab — chat interface

- Full chat UI: input at bottom, history above, user messages right-aligned (primary colour background), AI messages left-aligned (secondary background)
- Pre-built chips populate the input when tapped, don't send immediately
- Every message sent to Gemini with full business context prepended
- If the response contains numbers across multiple cities → render an inline HTML bar chart inside the chat bubble using inline `<div>` bars with percentage widths. No canvas, no SVG.
- If the response contains a list of people → render as a compact `<table>` inside the chat bubble
- Typing indicator (animated dots) while waiting for Gemini

---

## Dynamic refresh behaviour

On every hard refresh (not tab switch):
- Recalculate all silence durations and commitment overdue flags
- Re-sort cards by priority score
- Update greeting line with top 3 issues
- Randomly vary the greeting tone slightly (use one of 3 preset greeting variants) so it doesn't feel static

---

## Copy and tone rules

- Card titles frame accountability, not status. Wrong: "Delhi swap rate critical". Right: "Ravi hasn't resolved Delhi swap — 2 days"
- Body text leads with numbers. Wrong: "Swap rate is below target". Right: "2.4 swaps/battery vs 3.0 target — ₹32K/day at risk"
- Never say "insights", "analytics", or "dashboard" anywhere in the UI copy
- Abhilash reads this at 8am. Every word must earn its place.

---

## What NOT to do

- Do not add charts, graphs, or visualisations to the Today tab — Abhilash wants text and numbers, not pictures
- Do not add animations or transitions beyond the modal slide-up
- Do not add loading skeletons — show content immediately
- Do not ask Abhilash to configure anything — all logic runs automatically
- Do not split into multiple files
- Do not use `localStorage` or `sessionStorage`
- Do not add a settings screen
- Do not add a settings screen

---

## Testing checklist before finishing any change

- [ ] All 5 cards render with owner, last update, and commitment fields
- [ ] Silence badges appear correctly based on `lastUpdateDaysAgo`
- [ ] Cards are sorted by priority score, not hardcoded order
- [ ] Greeting line reflects top 3 issues dynamically
- [ ] Every action button has contextual label (no generic "Draft message")
- [ ] Tapping a button calls Gemini and shows response in modal
- [ ] Modal has editable textarea + WhatsApp send button
- [ ] Ask tab has working chat with typing indicator
- [ ] Inline bar chart renders when Gemini returns city comparison data
- [ ] Page works on 375px mobile viewport
- [ ] No console errors
