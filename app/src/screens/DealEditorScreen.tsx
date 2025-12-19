import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { Deal } from '../domain/types';

interface Props {
  deal: Deal;
  onSave: (id: string, partial: Partial<Deal>) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export const DealEditorScreen: React.FC<Props> = ({ deal, onSave, onDelete, onBack }) => {
  const [name, setName] = useState(deal.name);
  const [isArchived, setIsArchived] = useState(deal.status === 'archived');

  const handleSave = () => {
    onSave(deal.id, {
      name,
      status: isArchived ? 'archived' : 'active',
    });
    onBack();
  };

  const handleDelete = () => {
    onDelete(deal.id);
    onBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deal bearbeiten</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Deal Name"
        />
      </View>

      <View style={styles.inputGroupRow}>
        <Text style={styles.label}>Archiviert</Text>
        <Switch
          value={isArchived}
          onValueChange={setIsArchived}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Speichern" onPress={handleSave} />
        <View style={{ marginVertical: 5 }} />
        <Button title="Löschen" color="red" onPress={handleDelete} />
        <View style={{ marginVertical: 5 }} />
        <Button title="Abbrechen" color="#888" onPress={onBack} />
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
  inputGroup: {
    marginBottom: 20,
  },
  inputGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 30,
  },
});

