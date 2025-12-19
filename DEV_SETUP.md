# Entwicklungs-Setup (Monorepo)

Diese Anwendung ist als Monorepo strukturiert, um Logik (wie die Berechnungs-Engine) sauber von der UI (App) zu trennen.

## Erstmalige Einrichtung

Da dieses Projekt `npm workspaces` verwendet, müssen folgende Schritte manuell im Terminal ausgeführt werden (da der Assistent keine Commands ausführt):

1. **Abhängigkeiten installieren**:
   Führe im Hauptverzeichnis (Root) aus:
   ```bash
   npm install
   ```
   Dies installiert alle Pakete für das Root, die App und das Calc-Paket.

2. **Calc-Engine bauen**:
   ```bash
   npm run build -w @immocheck/calc
   ```

## Entwicklung

### Calc-Engine Tests ausführen
Im Root:
```bash
npm test
```
Oder direkt im Paket:
```bash
cd packages/calc
npm test
```

### App starten
```bash
cd app
npm start
```

## Import der Calc-Engine in der App

Die App kann die Engine via `@immocheck/calc` importieren, sobald `npm install` im Root ausgeführt wurde.
Beispiel (geplant):
```typescript
import { calculateDeal } from '@immocheck/calc';
```

