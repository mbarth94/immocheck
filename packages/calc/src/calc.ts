import { InvestmentInputs, ProjectionOutput } from './types';

/**
 * Rundet einen Betrag auf 2 Dezimalstellen (Cents).
 */
export function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Kern-Berechnungsfunktion der Engine.
 * Erhält Eingabedaten und liefert deterministisch berechnete Ergebnisse zurück.
 */
export function calculateDeal(inputs: InvestmentInputs): ProjectionOutput {
  const totalAcquisitionCost = roundMoney(inputs.purchasePrice * (1 + inputs.closingCosts));
  
  return {
    totalAcquisitionCost,
    kpis: {
      grossYield: 0, // Platzhalter
    },
  };
}

