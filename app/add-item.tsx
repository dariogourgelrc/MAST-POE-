import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StorageService, MenuItem } from "../utils/storage";
import Toast from 'react-native-toast-message';
import MenuCard from '../components/MenuCard';

const courses = ['Starter', 'Main', 'Dessert'];

export default function AddItemScreen() {
  const [dishName, setDishName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [existingItems, setExistingItems] = useState<MenuItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const handleAddItem = async () => {
    if (!dishName || !itemPrice || !selectedCourse) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Prevent negative prices and show a toast error
    const priceValue = parseFloat(itemPrice);
    if (!isNaN(priceValue) && priceValue < 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid price',
        text2: 'Price cannot be negative.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }

    try {
      await StorageService.saveMenuItem({
        dishName,
        course: selectedCourse as 'Starter' | 'Main' | 'Dessert',
        description: itemDescription,
        price: itemPrice,
      });

      Toast.show({
        type: 'success',
        text1: 'Item added',
        text2: `Dish "${dishName}" added successfully!`,
        position: 'bottom',
        visibilityTime: 1500,
      });

      setDishName('');
      setItemPrice('');
      setItemDescription('');
      setSelectedCourse('');
      // Reload items to reflect the new addition
      await loadExistingItems();
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      Alert.alert('Error', 'Could not save the item. Please try again.');
      console.error('Erro ao salvar item:', error);
    }
  };

  const loadExistingItems = async () => {
    try {
      setLoadingItems(true);
      const items = await StorageService.getAllMenuItems();
      setExistingItems(items);
    } catch (error) {
      console.error('Error loading existing items:', error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    loadExistingItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadExistingItems();
    }, [])
  );

  const handleDeleteItem = async (item: MenuItem) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Delete "${item.dishName}"? This cannot be undone.`);
      if (!confirmed) return;
      try {
        await StorageService.deleteMenuItem(item.id);
        await loadExistingItems();
        Toast.show({
          type: 'success',
          text1: 'Item deleted',
          position: 'bottom',
          visibilityTime: 1200,
        });
      } catch (err) {
        console.error('Delete error:', err);
        Toast.show({
          type: 'error',
          text1: 'Failed to delete',
          text2: 'Please try again.',
          position: 'bottom',
          visibilityTime: 1500,
        });
      }
      return;
    }

    Alert.alert(
      'Delete Item',
      `Delete "${item.dishName}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteMenuItem(item.id);
              await loadExistingItems();
              Toast.show({
                type: 'success',
                text1: 'Item deleted',
                position: 'bottom',
                visibilityTime: 1200,
              });
            } catch (err) {
              console.error('Delete error:', err);
              Toast.show({
                type: 'error',
                text1: 'Failed to delete',
                text2: 'Please try again.',
                position: 'bottom',
                visibilityTime: 1500,
              });
            }
          }
        }
      ]
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={existingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <MenuCard
            item={item}
            showCourseBadge
            showDescription
            onDelete={() => handleDeleteItem(item)}
          />
        </View>
      )}
      ListHeaderComponent={
        <View>
          <View style={styles.header}>
            <Ionicons name="add-circle" size={60} color="#34C759" />
            <Text style={styles.title}>Add Item</Text>
            <Text style={styles.subtitle}>Add a new dish to Guest View</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dish Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Shrimp Risotto"
                value={dishName}
                onChangeText={setDishName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select the Course *</Text>
              <FlatList
                horizontal
                data={courses}
                keyExtractor={(c) => c}
                contentContainerStyle={styles.coursesContainer}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: course }) => (
                  <TouchableOpacity
                    style={[
                      styles.courseButton,
                      selectedCourse === course && styles.selectedCourse
                    ]}
                    onPress={() => setSelectedCourse(course)}
                  >
                    <Text style={[
                      styles.courseText,
                      selectedCourse === course && styles.selectedCourseText
                    ]}>
                      {course}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the ingredients and characteristics of the dish..."
                value={itemDescription}
                onChangeText={setItemDescription}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 25.90"
                value={itemPrice}
                onChangeText={setItemPrice}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.manageSection}>
            <View style={styles.manageHeader}>
              <Text style={styles.manageTitle}>Your Items</Text>
              <Text style={styles.manageCount}>{existingItems.length}</Text>
            </View>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={[styles.manageSection, styles.emptyState]}>
          <Ionicons name="restaurant-outline" size={60} color="#CCC" />
          <Text style={styles.emptyStateText}>No items added yet</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    />
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
  form: {
    padding: 20,
  },
  manageSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  manageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  manageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  manageCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1F",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  coursesContainer: {
    marginTop: 5,
  },
  courseButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  selectedCourse: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  courseText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  selectedCourseText: {
    color: "#FFFFFF",
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
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