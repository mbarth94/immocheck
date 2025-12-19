# PRD: Immobilien Investment Kalkulator (Deal-Cockpit) — DE

## Introduction / Overview

Diese App ermöglicht privaten Immobilieninvestoren in Deutschland, **neue Investment-Deals (vermietete Bestandsimmobilien) schnell anzulegen, zu speichern und bank-/steuerberater-tauglich aufzubereiten**. Kern ist ein **Cockpit**, das Eingaben strukturiert erfasst und daraus KPIs, Cashflows, Darlehensverläufe und eine transparente (vereinfachte) Steuer-/AfA-Sicht berechnet.

Der Fokus liegt auf:
- **Zuverlässigen, nachvollziehbaren Berechnungen**
- **Report-Export für Bankgespräche**
- **Schnellen Szenariovergleichen** (Zins/Kaufpreis/Mietentwicklung)

Zusätzlich enthält das Produkt ein **Freemium-Abo-Modell** mit Limits über „aktive Deals“ und Report/Export-Funktionen.

## Goals

1. Nutzer können in < 10 Minuten einen Deal vollständig erfassen und eine Entscheidungsvorlage erzeugen.
2. Nutzer können mehrere Deals speichern, duplizieren, archivieren und vergleichen.
3. Nutzer erhalten einen **Bankgespräch-Report** (PDF) mit allen wichtigsten Zahlen, Annahmen und einem Tilgungsplan.
4. Die Berechnungen sind transparent (Audit/Trace) und reproduzierbar.
5. Monetarisierung: Free → Paid Conversion durch sinnvolle Feature-Gates (Deals/Reports/Exporte).

## User Stories

1. Als Einsteiger-Investor möchte ich einen Deal eingeben und sofort sehen, ob der Cashflow (vor/nach Steuer) plausibel ist.
2. Als fortgeschrittener Investor möchte ich 20–50 Deals speichern und später wieder öffnen, vergleichen und für Finanzierungsgespräche vorbereiten.
3. Als Investor möchte ich verschiedene Zinssätze, Kaufpreise und Mietentwicklungen simulieren, um Risiko/Robustheit zu verstehen.
4. Als Investor möchte ich eine PDF für die Bank erstellen, die KPIs, Cashflows, Tilgungsplan und Annahmen klar zeigt.
5. Als Nutzer (Free) möchte ich die App ausprobieren, ohne sofort zu zahlen, aber die Limits sollen mich motivieren upzugraden.
6. Als zahlender Nutzer (Starter/Pro) möchte ich unbegrenzt Reports/Exporte erstellen und deutlich mehr Deals speichern.

## Functional Requirements

### A. Deal Management (Core)

1. The system must allow users to create a new deal with a name, optional address/location, and purchase date.
2. The system must allow users to save, edit, duplicate, archive, and delete deals.
3. The system must distinguish **active deals** (count toward plan limits) vs. **archived deals** (do not count).
4. The system must display a deal list with filters (active/archived) and basic sorting (recently edited, name).
5. The system must persist all deal inputs locally (local-first) so calculations remain available without network.

### B. Data Input Model

6. The system must capture purchase details: purchase price, closing costs (itemized or %), and initial investments/CapEx at acquisition.
7. The system must support “tax treatment” flags for acquisition investments (e.g., capitalize vs. expense) and store them with the deal.
8. The system must capture rental income: cold rent, optional additional income, vacancy/mietausfall, and rent growth assumptions.
9. The system must capture operating costs: house fees split (umlagefähig/nicht umlagefähig), admin/insurance (optional), reserves/CapEx, and cost inflation.
10. The system must support up to **4 loans** per deal with: principal, interest rate, initial amortization or payment, fixed-rate period, optional special repayment, and refinance assumption.
11. The system must capture tax assumptions for DE: building share (for AfA), AfA rate, and a simplified marginal tax rate for “after-tax” estimation.

### C. Calculation Engine

12. The system must calculate investment totals: total acquisition cost, equity required, and loan-to-value ratios.
13. The system must calculate yearly projections for at least 10 years (configurable horizon; default 10) including income, opex, debt service, and cashflows.
14. The system must generate a loan amortization schedule (yearly; optionally monthly for year 1 if feasible) for each loan and aggregated.
15. The system must calculate KPIs (at minimum):
    - gross/net rental yield (Brutto-/Netto-Mietrendite)
    - cashflow before/after tax (jährlich, plus “today” and “target year”)
    - cash-on-cash / equity return approximation (EK-Rendite)
    - debt service coverage proxy (DSCR or similar) if definable from inputs
16. The system must calculate a simplified tax view, including AfA on building share, and clearly label results as **estimates** (no tax advice).
17. The system must calculate value projection (property value growth) and net worth (value minus remaining debt) with configurable growth.
18. The system must support scenario analysis:
    - purchase price sensitivity (range + step)
    - interest rate sensitivity (range + step)
    - comparison of base vs. alternative scenarios

### D. Cockpit UI

19. The system must provide a primary “Cockpit” screen that contains:
    - structured input sections (purchase, rent, opex, financing, tax, assumptions)
    - live-updating results panel with KPIs and key tables
20. The system must provide a “Target Year” selector and show key KPIs for that year.
21. The system must surface warnings for unusual inputs (e.g., very low rent, extreme vacancy, negative cashflow, potential 15%-rule relevance) without blocking save.

### E. Audit / Trace (Trust)

22. The system must provide an “Audit” view listing all assumptions (defaults vs. user overrides) used in the calculation.
23. The system must show “KPI derivations” for the main KPIs (inputs → formula description → output) in human-readable form.
24. The system must include calculation/version metadata per deal output (engine version, last calculated timestamp).

### F. Reports & Export (Bankgespräch)

25. The system must generate a “Bankgespräch PDF” report containing:
    - deal summary, key KPIs
    - income/expense overview
    - debt service summary + amortization highlights
    - assumptions list (compact)
26. The system must generate a “Detail PDF” report with extended tables (projection, amortization schedule, assumptions).
27. The system must support export of key tables as CSV/XLSX (projection, amortization, assumptions).
28. The system must stamp exports with: export date, app version, engine version, and disclaimers.

### G. Market Data References (Optional Defaults)

29. The system must show market reference indicators (price/miet trend) by region when available and display “as-of” date and source attribution.
30. The system must allow users to apply market references as default assumptions, and store the applied “as-of” in the deal audit trail.
31. The system must gracefully fall back to manual-only assumptions when market data is unavailable.

### H. Commercialization / Plans & Entitlements

**Plan definitions (V1 proposal):**
- **Free:** up to 3 active deals, unlimited archived; limited reports (e.g., 1 bank PDF/month) and/or watermark.
- **Starter:** up to 20 active deals; unlimited exports; no watermark.
- **Pro:** up to 50–100 active deals; extended scenarios/audit; unlimited exports.

32. The system must implement plan entitlements that gate:
    - max active deals
    - report/export limits
    - watermarking and/or “premium” templates
    - advanced scenario features (if part of Pro)
33. The system must prevent creating a new active deal when the user is at the plan limit and provide an upgrade CTA.
34. The system must allow archiving deals to free up active deal slots.
35. The system must enforce report limits for Free (e.g., 1 bank PDF/month) and show remaining quota.
36. The system must apply watermarking (or a “Free” badge) on Free PDF exports if watermarking is chosen.
37. The system must provide an upgrade flow from within the app, showing plan comparison and starting a subscription.
38. The system must record subscription state and entitlements locally, and refresh them when the user is online.
39. The system must ensure users do not lose access to their data if a subscription expires; instead, it must:
    - keep read access to all deals
    - restrict creating new active deals beyond the Free limit
    - restrict premium exports/features

## Non-Goals (Out of Scope)

- Full tax filing support, ELSTER export, or tax advisor workflows.
- Legal/financial advice, suitability checks, or automated investment recommendations.
- Automated extraction from PDFs/exposés (OCR/AI ingest) in V1.
- Multi-user collaboration/team workspaces in V1.
- Full portfolio accounting across multiple objects with bank transaction sync in V1.

## Design Considerations (Optional)

- Cockpit-first: ein primärer Screen mit klaren Sektionen + Sticky KPI-Leiste.
- Report A4, druckoptimiert, klare Tabellen, wenig Farbe.
- Eingaben mit Einheiten (€/Monat, €/Jahr, €/m²) und Tooltips.
- UX für Limits: “2/3 aktive Deals”, “0/1 Bank-PDF dieses Monats”.

## Technical Considerations (Optional)

- Calculation engine als deterministische Pure Functions (Input → Output), testbar.
- Golden-Master Tests: eine Referenzkalkulation (z. B. aus Excel) als Fixture, KPI-Vergleich mit Toleranzen.
- Billing: z. B. Stripe (Web) + später Mobile entitlements (IAP/RevenueCat).
- Local-first Storage (IndexedDB/SQLite), später optional Cloud Sync.
- **Projektion**: Jährliche Betrachtung, Standard-Horizont: 10 Jahre.
- **Rundungsregeln**: Beträge (Währungen) werden auf 2 Dezimalstellen gerundet. KPIs (Renditen, etc.) werden vorläufig auf 2 Dezimalstellen gerundet.

## Success Metrics

- Time-to-first-complete-deal: Median < 10 Minuten.
- Anteil Nutzer, die innerhalb von 7 Tagen einen Bank-PDF erstellen.
- Free → Paid Conversion innerhalb 30 Tage.
- Retention 30 Tage: Nutzer öffnen/editieren mind. einen Deal.
- Golden-master Parity: KPI-Abweichungen innerhalb Toleranzen.

## Open Questions

1. Exakte Planpreise und Deal-Limits (Pro: 50 oder 100?).
2. Free-Export-Gate: Watermark oder Quota (1 Report/Monat) oder beides?
3. Trial: 7 oder 14 Tage Pro?
4. **Entschieden**: Projection horizon (10 Jahre Default) und Rounding rules (2 Dezimalstellen).
5. Marktdaten: Quellen/Lizenzen und Region-Mapping (PLZ/City).
6. Account/Login: Pflicht in V1 oder device-bound bis später Sync?
