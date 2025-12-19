export interface InvestmentInputs {
  purchasePrice: number;
  closingCosts: number; // e.g., 0.12 for 12%
}

export interface ProjectionOutput {
  totalAcquisitionCost: number;
  kpis: {
    grossYield: number;
  };
}

