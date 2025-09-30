import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.todayMenuSection}>
        <Text style={styles.sectionTitle}>Menu de Hoje</Text>
        <View style={styles.todayMenuItem}>
          <View style={styles.foodImageContainer}>
            <View style={styles.foodImage}>
              <Ionicons name="restaurant" size={60} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuItemName}>Risotto de Camarão</Text>
            <Text style={styles.menuItemPrice}>R$ 45,90</Text>
            <Text style={styles.menuItemDescription}>
              Delicioso risotto cremoso com camarões frescos, temperos especiais e finalizado com queijo parmesão. Uma especialidade do Chef Christoffel.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.menuStatsSection}>
        <View style={styles.menuStatsCard}>
          <Ionicons name="restaurant-outline" size={30} color="#007AFF" />
          <Text style={styles.menuStatsNumber}>23</Text>
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
  todayMenuSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  todayMenuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  foodImage: {
    width: 200,
    height: 150,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemInfo: {
    alignItems: 'center',
  },
  menuItemName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  menuItemDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
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
