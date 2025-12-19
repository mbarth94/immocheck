import { calculateDeal } from '../calc';

describe('calculateDeal', () => {
  it('should calculate total acquisition cost correctly', () => {
    const inputs = {
      purchasePrice: 100000,
      closingCosts: 0.10, // 10%
    };
    
    const result = calculateDeal(inputs);
    
    expect(result.totalAcquisitionCost).toBe(110000);
  });
});

