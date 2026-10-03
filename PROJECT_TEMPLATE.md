# Project Submission Template

**How to use:** fill in the fields below, then paste the whole file back to me.
Unknown value? write `TBD` — I render it as "pending" rather than inventing a number.
Italic lines starting with `→` are hints; you can delete them.

---

## 1. Basics

- **Title:** e.g. Expense Tracker
- **Slug (URL):** lowercase + dashes only, e.g. `expense-tracker` → shows up as `/projects/expense-tracker`
- **Year:** e.g. 2024
- **Category badge:** short label on the thumbnail, e.g. `Web`, `AI / ML`, `Mobile`
- **Filter tags:** any of `AI / ML`, `Cybersecurity`, `Web`, `Mobile`, `Other` (comma-separated, 1–3 tags)
- **Short description:** 1–2 sentences shown on the project card
- **Long description:** 2–4 sentences shown under the title on the case-study page

## 2. Links

- **GitHub repository URL:** full URL, or `none`
- **Live demo URL:** full URL, or `none`

## 3. Tech stack

- **Technologies:** comma-separated, e.g. `Next.js, TypeScript, Tailwind CSS, Firebase`

## 4. Thumbnail

- **Image file:** place it in `public/images/projects/` — ideally **16:10** (e.g. 1200×750), PNG/SVG/JPG
  → or tell me the idea and I'll generate an SVG artwork like the existing four
- **Alt text:** describe the image for screen readers / SEO

## 5. Case study

- **5.1 Summary:** one sentence

- **5.2 Overview:** 2–3 bullet points explaining what the project is and how it works

- **5.3 Key features:** bullet list (5–8 items)

- **5.4 Problem:** bullet points, one per concern
  `**Concern title** — one or two sentences.`

- **5.5 Approach:** numbered steps
  `**Step title** — one or two sentences.`

- **5.6 Architecture / pipeline flow:** stages in order, comma-separated
  → e.g. `Input, Preprocessing, Feature extraction, Model, Decision layer, Output`
  → optionally add a short detail line per stage

- **5.7 Datasets:** one per line → `Name | Type | Note | Actually used? (yes/no)`
  → `no` renders as *Candidate* instead of *Used* — keep `no` unless it really was used

- **5.8 Results / metrics:** one per line → `Label | Value | Hint (optional)`
  → leave the value empty if not verified; it renders as `—` + "pending verified evaluation"
  → e.g. `Accuracy | 94.2% | 5-fold cross-validation`

- **5.9 Challenges:** bullet points
  `**Challenge title** — one or two sentences.`

- **5.10 Lessons learned:** bullet list

## 6. Notes

- Anything else you want on the page (badges, warnings, extra links):

---

### Example (filled, ShieldAI-style — use this as your guide)

```text
1. Basics
Title: ShieldAI
Slug: shieldai
Year: 2023
Category badge: AI / ML
Filter tags: AI / ML, Cybersecurity
Short description: A phishing email and URL detection system combining deep learning, NLP and rule-based security signals.
Long description: ShieldAI examines email content and URL structure... (2-4 sentences)

2. Links
GitHub: none
Demo: none

3. Tech stack
Python, NLP, DeBERTa, TF-IDF, XGBoost

4. Thumbnail
File: shieldai.svg
Alt: ShieldAI concept visual: a shield with a checkmark surrounded by connected neural network nodes.

5.1 Summary: One sentence summary of the system.
5.2 Overview: bullet, bullet
5.3 Key features: feature, feature, feature
5.4 Problem: **Phishing language keeps changing** — static rules stop being reliable.
5.5 Approach: **Collect labelled data** — one or two sentences.
5.6 Architecture: Email text, URL features, Transformer model, Classical ML, Rule-based signals, Ensemble decision
5.7 Datasets: PhishTank | URL list | Candidate source for malicious URLs | no
5.8 Metrics: Accuracy | (leave empty if unverified) | 5-fold CV
5.9 Challenges: **Class imbalance** — legitimate messages vastly outnumber malicious ones.
5.10 Lessons: Ensembling text and structural features beat either alone.
```
