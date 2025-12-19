import AsyncStorage from '@react-native-async-storage/async-storage';
import { Deal, DealStatus, DealSchema } from '../domain/types';
import { DealRepository } from './DealRepository';

const STORAGE_KEY = '@immocheck_deals';
const SCHEMA_VERSION = 1;

export class AsyncStorageDealRepository implements DealRepository {
  private async getSchema(): Promise<DealSchema> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { version: SCHEMA_VERSION, deals: [] };
    }
    try {
      const parsed = JSON.parse(data);
      // Hier später Migrationslogik einbauen, falls parsed.version < SCHEMA_VERSION
      return parsed;
    } catch (e) {
      console.error('Failed to parse deals storage', e);
      return { version: SCHEMA_VERSION, deals: [] };
    }
  }

  private async saveSchema(schema: DealSchema): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  }

  async listDeals(filter?: { status?: DealStatus }): Promise<Deal[]> {
    const schema = await this.getSchema();
    if (filter?.status) {
      return schema.deals.filter(d => d.status === filter.status);
    }
    return schema.deals;
  }

  async getDeal(id: string): Promise<Deal | null> {
    const schema = await this.getSchema();
    return schema.deals.find(d => d.id === id) || null;
  }

  async createDeal(name: string): Promise<Deal> {
    const schema = await this.getSchema();
    const newDeal: Deal = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'active',
      inputs: {},
    };
    schema.deals.push(newDeal);
    await this.saveSchema(schema);
    return newDeal;
  }

  async updateDeal(id: string, partial: Partial<Deal>): Promise<Deal> {
    const schema = await this.getSchema();
    const index = schema.deals.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Deal not found');

    const updatedDeal = {
      ...schema.deals[index],
      ...partial,
      updatedAt: Date.now(),
    };
    schema.deals[index] = updatedDeal;
    await this.saveSchema(schema);
    return updatedDeal;
  }

  async duplicateDeal(id: string): Promise<Deal> {
    const schema = await this.getSchema();
    const deal = schema.deals.find(d => d.id === id);
    if (!deal) throw new Error('Deal not found');

    const newDeal: Deal = {
      ...deal,
      id: Math.random().toString(36).substring(2, 11),
      name: `${deal.name} (Kopie)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    schema.deals.push(newDeal);
    await this.saveSchema(schema);
    return newDeal;
  }

  async archiveDeal(id: string): Promise<Deal> {
    return this.updateDeal(id, { status: 'archived' });
  }

  async deleteDeal(id: string): Promise<void> {
    const schema = await this.getSchema();
    schema.deals = schema.deals.filter(d => d.id !== id);
    await this.saveSchema(schema);
  }
}

