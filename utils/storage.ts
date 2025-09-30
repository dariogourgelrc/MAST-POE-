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
  // Salvar um novo item
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
      console.error('Erro ao salvar item:', error);
      throw error;
    }
  },

  // Buscar todos os itens
  async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      const items = await AsyncStorage.getItem(STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      return [];
    }
  },

  // Buscar itens por course
  async getMenuItemsByCourse(course: string): Promise<MenuItem[]> {
    try {
      const allItems = await this.getAllMenuItems();
      return allItems.filter(item => item.course === course);
    } catch (error) {
      console.error('Erro ao buscar itens por course:', error);
      return [];
    }
  },

  // Limpar todos os itens (útil para desenvolvimento)
  async clearAllItems(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar itens:', error);
      throw error;
    }
  }
};