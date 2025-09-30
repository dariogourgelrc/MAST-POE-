import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const selectionOptions = [
  { id: '1', title: 'Pratos Populares', description: 'Os mais pedidos pelos clientes', icon: 'trending-up', color: '#FF9500' },
  { id: '2', title: 'Novidades', description: 'Últimos pratos adicionados', icon: 'sparkles', color: '#AF52DE' },
  { id: '3', title: 'Promoções', description: 'Ofertas especiais do dia', icon: 'pricetag', color: '#FF3B30' },
  { id: '4', title: 'Vegetarianos', description: 'Opções sem carne', icon: 'leaf', color: '#34C759' },
  { id: '5', title: 'Rápidos', description: 'Preparo em até 15 minutos', icon: 'time', color: '#007AFF' },
  { id: '6', title: 'Gourmet', description: 'Pratos especiais do chef', icon: 'star', color: '#FFD60A' },
];

const quickFilters = [
  { id: '1', name: 'Até R$ 20', active: false },
  { id: '2', name: 'Vegetariano', active: false },
  { id: '3', name: 'Sem Glúten', active: false },
  { id: '4', name: 'Picante', active: false },
  { id: '5', name: 'Doce', active: false },
];

export default function ChoseScreen() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={60} color="#FF9500" />
        <Text style={styles.title}>Escolher</Text>
        <Text style={styles.subtitle}>Selecione suas preferências</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filtros Rápidos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {quickFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilters.includes(filter.id) && styles.activeFilter
              ]}
              onPress={() => toggleFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                activeFilters.includes(filter.id) && styles.activeFilterText
              ]}>
                {filter.name}
              </Text>
              {activeFilters.includes(filter.id) && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias Especiais</Text>
        <View style={styles.optionsContainer}>
          {selectionOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption === option.id && styles.selectedCard
              ]}
              onPress={() => selectOption(option.id)}
            >
              <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                <Ionicons name={option.icon as any} size={28} color={option.color} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <View style={styles.selectionIndicator}>
                {selectedOption === option.id ? (
                  <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                ) : (
                  <View style={styles.unselectedCircle} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ordenar Por</Text>
        <View style={styles.sortContainer}>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="star" size={20} color="#FFD60A" />
            <Text style={styles.sortText}>Mais Avaliados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="pricetag" size={20} color="#34C759" />
            <Text style={styles.sortText}>Menor Preço</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="time" size={20} color="#007AFF" />
            <Text style={styles.sortText}>Mais Rápido</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpar Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          <Text style={styles.applyButtonText}>Aplicar</Text>
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
  header: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginTop: 15,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D1D1F",
    marginBottom: 15,
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  activeFilter: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  checkIcon: {
    marginLeft: 5,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#34C759",
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: "#8E8E93",
  },
  selectionIndicator: {
    marginLeft: 10,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  sortButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sortText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1D1D1F",
    marginLeft: 5,
  },
  actionContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 15,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  clearButtonText: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 5,
  },
});