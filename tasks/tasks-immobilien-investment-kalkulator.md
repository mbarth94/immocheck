## Relevant Files

> **Phase 1 (Parent Tasks)**: Diese Datei enthält zunächst nur die High-Level Tasks.
> Wenn du bereit bist für die detaillierten Sub-Tasks, antworte mit **„Go“**.

- `tasks/prd-immobilien-investment-kalkulator.md` - PRD als Source of Truth (inkl. Monetarisierung/Entitlements).
- `app/` - Expo App (iOS/Android/Web).
- `app/src/` (oder `app/` je nach Template) - UI Screens/Components.
- `packages/calc/` (empfohlen) - Deterministische Calculation Engine (Pure Functions).
- `packages/domain/` (empfohlen) - Shared Types/Interfaces.
- `app/src/lib/billing/` - Entitlements/Paywall/Billing (später).
- `app/src/lib/export/` - PDF/XLSX/CSV Exporte (Bankgespräch & Detail).
- `app/src/lib/marketData/` - Marktdaten-Referenzen inkl. Attribution.

### Notes

- Unit tests sollten neben den Code-Dateien liegen; Testausführung via `npx jest`.
- In Phase 2 ergänzen wir pro Task konkrete Files + Testfiles + Subtasks.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file`

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch

- [x] 1.0 Align PRD scope, assumptions, and architecture baseline
- [ ] 2.0 Implement deal management + local-first persistence (create/save/duplicate/archive)
- [ ] 3.0 Build calculation engine (purchase/rent/opex/financing/tax/value) + tests
- [ ] 4.0 Build core UI (Deal-Liste → Cockpit → Szenarien → Audit/Trace)
- [ ] 5.0 Implement reports & exports (Bankgespräch PDF, Detail PDF, CSV/XLSX)
- [ ] 6.0 Implement monetization (Free/Starter/Pro entitlements, limits, upgrade flow, billing)
- [ ] 7.0 Integrate market data references (sources, as-of, apply defaults, attribution) + QA/release hardening
