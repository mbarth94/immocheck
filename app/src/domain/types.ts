export type DealStatus = 'active' | 'archived';

export interface DealInputs {
  // Wird später erweitert
  [key: string]: any;
}

export interface Deal {
  id: string;
  name: string;
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
  status: DealStatus;
  inputs: DealInputs;
}

export interface DealSchema {
  version: number;
  deals: Deal[];
}

