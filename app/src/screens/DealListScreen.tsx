import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Deal } from '../domain/types';

interface Props {
  deals: Deal[];
  onCreateDeal: () => void;
  onSelectDeal: (deal: Deal) => void;
}

export const DealListScreen: React.FC<Props> = ({ deals, onCreateDeal, onSelectDeal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Deals</Text>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dealItem} onPress={() => onSelectDeal(item)}>
            <View>
              <Text style={styles.dealName}>{item.name}</Text>
              <Text style={styles.dealStatus}>{item.status === 'archived' ? 'Archiviert' : 'Aktiv'}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Noch keine Deals vorhanden.</Text>}
      />
      <View style={styles.footer}>
        <Button title="Neuer Deal" onPress={onCreateDeal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dealItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dealName: {
    fontSize: 18,
  },
  dealStatus: {
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  footer: {
    marginTop: 20,
  },
});

