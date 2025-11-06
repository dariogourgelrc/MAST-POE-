import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StorageService, MenuItem } from "../utils/storage";
import Toast from 'react-native-toast-message';
import MenuCard from '../components/MenuCard';

const courseNames = {
  Starter: 'Starters',
  Main: 'Main Courses', 
  Dessert: 'Desserts'
};

export default function ChoseScreen() {
  const { course } = useLocalSearchParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentCourse, setCurrentCourse] = useState<string>('Starter');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      if (currentCourse) {
        const items = await StorageService.getMenuItemsByCourse(currentCourse);
        setMenuItems(items);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (course && typeof course === 'string') {
      setCurrentCourse(course);
    }
  }, [course]);

  useEffect(() => {
    loadMenuItems();
  }, [currentCourse]);

  // Refresh menu items when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadMenuItems();
    }, [currentCourse])
  );

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddItems = () => {
    Toast.show({
      type: 'success',
      text1: 'Items added',
      text2: 'Items added successfully!',
      position: 'bottom',
      visibilityTime: 1500,
    });
    setSelectedItems([]);
  };

  const getCourseIcon = (course: string) => {
    switch(course) {
      case 'Starter': return 'restaurant-outline';
      case 'Main': return 'restaurant';
      case 'Dessert': return 'ice-cream-outline';
      default: return 'restaurant';
    }
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <MenuCard
      item={item}
      selectable
      selected={selectedItems.includes(item.id)}
      onSelectToggle={() => toggleItemSelection(item.id)}
      showCourseBadge={false}
      showDescription
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={getCourseIcon(currentCourse)} size={60} color="#007AFF" />
        <Text style={styles.title}>{courseNames[currentCourse as keyof typeof courseNames]}</Text>
        <Text style={styles.subtitle}>Select the desired dishes</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading dishes...</Text>
        </View>
      ) : menuItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={60} color="#CCC" />
          <Text style={styles.emptyText}>No dishes found</Text>
          <Text style={styles.emptySubtext}>Add dishes from this category to the Guest View!</Text>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsList}
          renderItem={renderMenuItem}
        />
      )}

      {selectedItems.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSelectedItems([])}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddItems}>
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              Add ({selectedItems.length})
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8E8E93",
    marginTop: 20,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#C7C7CC",
    marginTop: 8,
    textAlign: "center",
  },
});