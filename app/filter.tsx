import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { StorageService, MenuItem } from '../utils/storage';
import MenuCard from '../components/MenuCard';
import CourseBadge from '../components/CourseBadge';

type Course = 'Starter' | 'Main' | 'Dessert';
const courses: Course[] = ['Starter', 'Main', 'Dessert'];

export default function FilterScreen() {
  const params = useLocalSearchParams<{ course?: string }>();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<'All' | Course>('All');

  // Initialize from query param if present
  useEffect(() => {
    if (params?.course && typeof params.course === 'string') {
      const normalized = params.course as Course;
      if (courses.includes(normalized)) {
        setSelectedCourse(normalized);
      }
    }
  }, [params?.course]);

  const loadItems = useCallback(async () => {
    const all = await StorageService.getAllMenuItems();
    setItems(all);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [loadItems])
  );

  const filteredItems = useMemo(() => {
    if (selectedCourse === 'All') return items;
    return items.filter(i => i.course === selectedCourse);
  }, [items, selectedCourse]);

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuCard item={item} showCourseBadge showDescription />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="funnel-outline" size={48} color="#007AFF" />
        <Text style={styles.title}>Filter by Course</Text>
        <Text style={styles.subtitle}>Quickly view dishes by course</Text>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, selectedCourse === 'All' && styles.filterChipSelected]}
            onPress={() => setSelectedCourse('All')}
          >
            <View style={styles.allBadgeRow}>
              <Ionicons name="grid-outline" size={16} color={selectedCourse === 'All' ? '#FFFFFF' : '#1976D2'} />
              <Text style={[styles.filterText, selectedCourse === 'All' && styles.filterTextSelected]}>All</Text>
            </View>
          </TouchableOpacity>

          {courses.map(course => (
            <TouchableOpacity
              key={course}
              style={[styles.filterChip, selectedCourse === course && styles.filterChipSelected]}
              onPress={() => setSelectedCourse(course)}
            >
              <View style={{ opacity: selectedCourse === course ? 1 : 0.85 }}>
                <CourseBadge course={course} showIcon />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>
          {selectedCourse === 'All' ? 'All Courses' : selectedCourse}
        </Text>
        <Text style={styles.resultsCount}>{filteredItems.length} item(s)</Text>
      </View>

      <View style={styles.listContainer}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={60} color="#CCC" />
            <Text style={styles.emptyStateText}>No items in this course</Text>
            <Text style={styles.emptyStateSubtext}>Try switching filters or add a new dish.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 6,
    textAlign: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  filterChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
    marginLeft: 6,
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  allBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  emptyStateSubtext: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 6,
    textAlign: 'center',
  },
});