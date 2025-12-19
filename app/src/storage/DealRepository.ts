import { Deal, DealStatus } from '../domain/types';

export interface DealRepository {
  listDeals(filter?: { status?: DealStatus }): Promise<Deal[]>;
  getDeal(id: string): Promise<Deal | null>;
  createDeal(name: string): Promise<Deal>;
  updateDeal(id: string, partial: Partial<Deal>): Promise<Deal>;
  duplicateDeal(id: string): Promise<Deal>;
  archiveDeal(id: string): Promise<Deal>;
  deleteDeal(id: string): Promise<void>;
}

