import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StorageService, MenuItem } from '../utils/storage';

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadMenuItems = async () => {
    try {
      const items = await StorageService.getAllMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMenuItems();
    setRefreshing(false);
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItemCard}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemName}>{item.dishName}</Text>
        <Text style={styles.menuItemPrice}>R {item.price}</Text>
      </View>
      <View style={styles.courseTag}>
        <Text style={styles.courseTagText}>{item.course}</Text>
      </View>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
    </View>
  );
  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Chief Christoffel</Text>
            <Text style={styles.subtitle}>Cozinheiro Profissional</Text>
          </View>
          <View style={styles.chefImageContainer}>
            <View style={styles.chefImage}>
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.menuStatsSection}>
        <View style={styles.menuStatsCard}>
          <Ionicons name="restaurant-outline" size={30} color="#007AFF" />
          <Text style={styles.menuStatsNumber}>{menuItems.length}</Text>
          <Text style={styles.menuStatsLabel}>Itens Disponíveis</Text>
        </View>
      </View>

      <View style={styles.addItemSection}>
        <TouchableOpacity 
          style={styles.addItemButton}
          onPress={() => router.push('/add-item')}
        >
          <Ionicons name="add-circle" size={24} color="#FFFFFF" />
          <Text style={styles.addItemButtonText}>Adicionar Novo Item ao Menu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuListSection}>
        <Text style={styles.sectionTitle}>Todos os Itens do Menu</Text>
        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={60} color="#CCC" />
            <Text style={styles.emptyStateText}>Nenhum item adicionado ainda</Text>
            <Text style={styles.emptyStateSubtext}>Adicione seu primeiro prato ao menu!</Text>
          </View>
        ) : (
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  addItemSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addItemButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addItemButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  menuStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuStatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuStatsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 10,
    marginBottom: 5,
  },
  menuStatsLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  menuListSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  courseTag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  courseTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#CCC',
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  chefImageContainer: {
    marginLeft: 20,
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
});
