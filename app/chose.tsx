import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

// Dados de exemplo dos pratos por course
const menuItemsByCourse = {
  starter: [
    { id: '1', name: 'Bruschetta Italiana', price: 'R$ 18,90', description: 'Pão italiano com tomate, manjericão e mozzarella', icon: 'restaurant-outline' },
    { id: '2', name: 'Carpaccio de Salmão', price: 'R$ 24,90', description: 'Fatias finas de salmão com alcaparras e limão', icon: 'fish-outline' },
    { id: '3', name: 'Salada Caesar', price: 'R$ 16,90', description: 'Alface romana, croutons, parmesão e molho caesar', icon: 'leaf-outline' },
    { id: '4', name: 'Coxinha Gourmet', price: 'R$ 12,90', description: 'Coxinha artesanal com frango desfiado', icon: 'fast-food-outline' },
  ],
  main: [
    { id: '5', name: 'Risotto de Camarão', price: 'R$ 45,90', description: 'Arroz arbóreo cremoso com camarões frescos', icon: 'restaurant' },
    { id: '6', name: 'Filé Mignon Grelhado', price: 'R$ 52,90', description: 'Filé mignon com batatas rústicas e legumes', icon: 'nutrition' },
    { id: '7', name: 'Salmão Grelhado', price: 'R$ 38,90', description: 'Salmão fresco com quinoa e aspargos', icon: 'fish' },
    { id: '8', name: 'Lasanha da Casa', price: 'R$ 28,90', description: 'Lasanha tradicional com molho bolonhesa', icon: 'pizza' },
  ],
  dessert: [
    { id: '9', name: 'Tiramisu', price: 'R$ 16,90', description: 'Sobremesa italiana com café e mascarpone', icon: 'ice-cream' },
    { id: '10', name: 'Brownie com Sorvete', price: 'R$ 14,90', description: 'Brownie quente com sorvete de baunilha', icon: 'cafe' },
    { id: '11', name: 'Cheesecake de Frutas Vermelhas', price: 'R$ 18,90', description: 'Cheesecake cremoso com calda de frutas', icon: 'heart' },
    { id: '12', name: 'Pudim de Leite', price: 'R$ 12,90', description: 'Pudim tradicional com calda de caramelo', icon: 'wine' },
  ],
};

const courseNames = {
  starter: 'Starters',
  main: 'Main Courses', 
  dessert: 'Desserts'
};

export default function ChoseScreen() {
  const { course } = useLocalSearchParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentCourse, setCurrentCourse] = useState<string>('starter');

  useEffect(() => {
    if (course && typeof course === 'string') {
      setCurrentCourse(course);
    }
  }, [course]);

  const currentItems = menuItemsByCourse[currentCourse as keyof typeof menuItemsByCourse] || [];

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getCourseIcon = (course: string) => {
    switch(course) {
      case 'starter': return 'restaurant-outline';
      case 'main': return 'restaurant';
      case 'dessert': return 'ice-cream-outline';
      default: return 'restaurant';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={getCourseIcon(currentCourse)} size={60} color="#007AFF" />
        <Text style={styles.title}>{courseNames[currentCourse as keyof typeof courseNames]}</Text>
        <Text style={styles.subtitle}>Selecione os pratos desejados</Text>
      </View>

      <FlatList
        data={currentItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.itemsList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.menuItem,
              selectedItems.includes(item.id) && styles.selectedItem
            ]}
            onPress={() => toggleItemSelection(item.id)}
          >
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon as any} size={24} color="#007AFF" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <View style={styles.itemPrice}>
              <Text style={styles.priceText}>{item.price}</Text>
              <View style={styles.selectionIndicator}>
                {selectedItems.includes(item.id) ? (
                  <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                ) : (
                  <View style={styles.unselectedCircle} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedItems.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSelectedItems([])}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              Adicionar ({selectedItems.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  itemsList: {
    padding: 20,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
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
  selectedItem: {
    borderColor: "#34C759",
    backgroundColor: "#F0FFF4",
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 16,
  },
  itemPrice: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  selectionIndicator: {
    alignItems: "center",
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  addButton: {
    flex: 2,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 5,
  },
});