import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MenuItem {
  id: string;
  dishName: string;
  course: 'Starter' | 'Main' | 'Dessert';
  description: string;
  price: string;
  createdAt: string;
}

const STORAGE_KEY = 'menu_items';

export const StorageService = {
  // Save a new item
  async saveMenuItem(item: Omit<MenuItem, 'id' | 'createdAt'>): Promise<MenuItem> {
    try {
      const existingItems = await this.getAllMenuItems();
      const newItem: MenuItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      const updatedItems = [...existingItems, newItem];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      return newItem;
    } catch (error) {
      console.error('Error saving item:', error);
      throw error;
    }
  },

  // Get all items
  async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  },

  // Get items by course
  async getMenuItemsByCourse(course: string): Promise<MenuItem[]> {
    try {
      const allItems = await this.getAllMenuItems();
      return allItems.filter(item => item.course === course);
    } catch (error) {
      console.error('Error fetching items by course:', error);
      return [];
    }
  },

  // Delete a specific item by ID
  async deleteMenuItem(itemId: string): Promise<void> {
    try {
      const existingItems = await this.getAllMenuItems();
      const updatedItems = existingItems.filter(item => item.id !== itemId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },

  // Clear all items (useful for development)
  async clearAllItems(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing items:', error);
      throw error;
    }
  }
};