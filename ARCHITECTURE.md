# Architektur: Immobilien Investment Kalkulator

Diese Dokumentation beschreibt die grundlegende Architektur der Anwendung "Immobilien Investment Kalkulator".

## Grundprinzipien

- **Local-first MVP**: Alle Daten werden primär lokal auf dem Gerät gespeichert. Für das MVP ist kein Login (Account) erforderlich.
- **Separation of Concerns**: Die Berechnungslogik (Engine) ist strikt von der Benutzeroberfläche (UI) getrennt.
- **Deterministische Engine**: Die `calc-engine` besteht aus Pure Functions (Input -> Output), was sie hochgradig testbar und nachvollziehbar macht.

## Projektstruktur

Das Projekt ist als **Monorepo** mit `npm workspaces` strukturiert:

- `/app`: Die Hauptanwendung (Expo / React Native).
- `/packages/calc`: (@immocheck/calc) Die deterministische Berechnungs-Engine (Pure Functions).
- `/tasks`: Dokumentation, PRD und Aufgabenlisten.

## Geplante Module & Datenfluss

### 1. Deal Storage (Local-first)
Verwaltet das Speichern, Laden, Duplizieren und Archivieren von Investment-Deals.
- **Technologie**: SQLite oder IndexedDB (via Expo SQLite).
- **Scope**: CRUD-Operationen für Deal-Objekte.

### 2. Calc Engine (Pure Functions)
Der mathematische Kern der Anwendung.
- **Funktion**: Erhält Deal-Inputs und gibt berechnete KPIs, Cashflows und Tilgungspläne zurück.
- **Eigenschaft**: Keine Seiteneffekte, deterministisch.

### 3. Export & Reporting
Generierung von bank- und steuerberater-tauglichen Dokumenten.
- **Formate**: PDF (Bankgespräch-Report), CSV/XLSX.
- **Scope**: Transformation von Engine-Outputs in druckbare/exportierbare Formate.

### 4. Entitlements (Monetarisierung)
Verwaltet Feature-Gates basierend auf dem gewählten Plan (Free/Starter/Pro).
- **Scope**: Prüfung von Limits (Anzahl aktiver Deals, Export-Quotas).
- **Integration**: Später via Stripe/RevenueCat.

## Dateistruktur (Vorschau)

```text
/app
  /src
    /components     # UI-Komponenten (Widgets, Listen, Inputs)
    /screens        # Haupt-Screens (Cockpit, Deal-Liste, Settings)
    /lib
      /storage      # Deal Storage Logik
      /calc         # Calculation Engine (Pure Functions)
      /export       # PDF/CSV Generierung
      /billing      # Entitlements & Plans
/tasks              # PRD, Tasks, Architektur-Docs
```

