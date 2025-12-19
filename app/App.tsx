import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { Deal } from './src/domain/types';
import { AsyncStorageDealRepository } from './src/storage/AsyncStorageDealRepository';
import { DealListScreen } from './src/screens/DealListScreen';
import { DealEditorScreen } from './src/screens/DealEditorScreen';

export default function App() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const repository = useMemo(() => new AsyncStorageDealRepository(), []);

  const loadDeals = async () => {
    const allDeals = await repository.listDeals();
    setDeals(allDeals);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleCreateDeal = async () => {
    const newDeal = await repository.createDeal('Neuer Deal');
    await loadDeals();
    setSelectedDealId(newDeal.id);
  };

  const handleSaveDeal = async (id: string, partial: Partial<Deal>) => {
    await repository.updateDeal(id, partial);
    await loadDeals();
  };

  const handleDeleteDeal = async (id: string) => {
    await repository.deleteDeal(id);
    await loadDeals();
  };

  const selectedDeal = deals.find(d => d.id === selectedDealId);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedDealId && selectedDeal ? (
        <DealEditorScreen
          deal={selectedDeal}
          onSave={handleSaveDeal}
          onDelete={handleDeleteDeal}
          onBack={() => setSelectedDealId(null)}
        />
      ) : (
        <DealListScreen
          deals={deals}
          onCreateDeal={handleCreateDeal}
          onSelectDeal={(deal) => setSelectedDealId(deal.id)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
