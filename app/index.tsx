import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StorageService, MenuItem } from '../utils/storage';
import MenuCard from '../components/MenuCard';

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const formatCurrency = (value: number) => `R ${value.toFixed(2)}`;

  const averageForCourse = (course: 'Starter' | 'Main' | 'Dessert') => {
    const prices = menuItems
      .filter(item => item.course === course)
      .map(item => parseFloat(item.price))
      .filter(p => Number.isFinite(p) && p >= 0);
    if (prices.length === 0) return 0;
    const sum = prices.reduce((acc, p) => acc + p, 0);
    return sum / prices.length;
  };

  const loadMenuItems = async () => {
    try {
      const items = await StorageService.getAllMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleDeleteItem = async (item: MenuItem) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.dishName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteMenuItem(item.id);
              await loadMenuItems(); // Refresh the list
            } catch (error) {
              Alert.alert('Error', 'Could not delete the item. Please try again.');
              console.error('Error deleting item:', error);
            }
          },
        },
      ]
    );
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
    <MenuCard
      item={item}
      showCourseBadge
      showDescription
      onDelete={() => handleDeleteItem(item)}
    />
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
            <Text style={styles.subtitle}>Professional Chef</Text>
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
          <Text style={styles.menuStatsLabel}>Available Items</Text>
        </View>
      </View>

      <View style={styles.avgStatsSection}>
        <Text style={styles.avgSectionTitle}>Average Price by Course</Text>
        <View style={styles.avgRow}>
          <View style={[styles.avgCard, styles.avgCardFirst]}> 
            <Ionicons name="restaurant-outline" size={24} color="#007AFF" />
            <Text style={styles.avgCourseLabel}>Starter</Text>
            <Text style={styles.avgValue}>{formatCurrency(averageForCourse('Starter'))}</Text>
          </View>
          <View style={styles.avgCard}> 
            <Ionicons name="restaurant" size={24} color="#34C759" />
            <Text style={styles.avgCourseLabel}>Main</Text>
            <Text style={styles.avgValue}>{formatCurrency(averageForCourse('Main'))}</Text>
          </View>
          <View style={styles.avgCard}> 
            <Ionicons name="ice-cream-outline" size={24} color="#FF9500" />
            <Text style={styles.avgCourseLabel}>Dessert</Text>
            <Text style={styles.avgValue}>{formatCurrency(averageForCourse('Dessert'))}</Text>
          </View>
        </View>
      </View>


      <View style={styles.menuListSection}>
        <Text style={styles.sectionTitle}>All Guest View Items</Text>
        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={60} color="#CCC" />
            <Text style={styles.emptyStateText}>No items added yet</Text>
            <Text style={styles.emptyStateSubtext}>Add your first dish to the menu!</Text>
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
  avgStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avgSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  avgRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avgCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avgCardFirst: {
    marginRight: 10,
  },
  avgCourseLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
  avgValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginTop: 4,
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
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE5E5',
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
