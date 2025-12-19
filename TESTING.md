# Testing Strategie

Da aktuell noch kein automatisiertes Test-Setup (Jest) vollständig konfiguriert ist, werden Unit Tests in einem späteren Schritt nachgezogen.

## Geplante Tests für Task 2.0 (Deal Management)

### 1. Repository Tests (`app/src/storage/AsyncStorageDealRepository.test.ts`)
- Mock von `AsyncStorage`.
- Test: `createDeal` speichert Deal korrekt mit Default-Werten.
- Test: `listDeals` filtert nach Status (aktiv/archiviert).
- Test: `updateDeal` aktualisiert `updatedAt` Zeitstempel.
- Test: `duplicateDeal` erstellt eine exakte Kopie mit neuer ID und angepasstem Namen.
- Test: `deleteDeal` entfernt den Deal aus dem Storage.

### 2. Schema Migrationen
- Test: Initialisierung bei leerem Storage.
- Test: Zukünftige Migrationen von Schema-Version 1 auf 2.

## Ausführung
Sobald Jest konfiguriert ist, können Tests mit `npm test` im `/app` Verzeichnis ausgeführt werden.

