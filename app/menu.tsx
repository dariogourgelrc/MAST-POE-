import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
  { id: '1', name: 'Hambúrguer Clássico', price: 'R$ 25,90', category: 'Hambúrguers', icon: 'fast-food' },
  { id: '2', name: 'Pizza Margherita', price: 'R$ 35,90', category: 'Pizzas', icon: 'pizza' },
  { id: '3', name: 'Salada Caesar', price: 'R$ 18,90', category: 'Saladas', icon: 'leaf' },
  { id: '4', name: 'Lasanha Bolonhesa', price: 'R$ 28,90', category: 'Massas', icon: 'restaurant' },
  { id: '5', name: 'Suco Natural', price: 'R$ 8,90', category: 'Bebidas', icon: 'wine' },
  { id: '6', name: 'Brownie', price: 'R$ 12,90', category: 'Sobremesas', icon: 'ice-cream' },
];

const categories = ['Todos', 'Hambúrguers', 'Pizzas', 'Saladas', 'Massas', 'Bebidas', 'Sobremesas'];

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cardápio</Text>
        <Text style={styles.subtitle}>Escolha seus pratos favoritos</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon as any} size={24} color="#007AFF" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <View style={styles.itemPrice}>
              <Text style={styles.priceText}>{item.price}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
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
  categoriesContainer: {
    paddingVertical: 15,
    paddingLeft: 20,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  itemCategory: {
    fontSize: 12,
    color: "#8E8E93",
  },
  itemPrice: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34C759",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});