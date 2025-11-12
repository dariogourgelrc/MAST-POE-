import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CourseBadge from './CourseBadge';
import { MenuItem } from '../utils/storage';

interface MenuCardProps {
  item: MenuItem;
  showCourseBadge?: boolean;
  showDescription?: boolean;
  onDelete?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onSelectToggle?: () => void;
}

export default function MenuCard({
  item,
  showCourseBadge = true,
  showDescription = true,
  onDelete,
  selectable = false,
  selected = false,
  onSelectToggle,
}: MenuCardProps) {
  const CardContainer: any = selectable ? TouchableOpacity : View;
  const containerProps = selectable ? { onPress: onSelectToggle } : {};

  return (
    <CardContainer style={styles.card} {...containerProps}>
      <View style={styles.headerRow}>
        <Text style={styles.name} numberOfLines={1}>
          {item.dishName}
        </Text>
        <View style={styles.actionsRow}>
          <Text style={styles.price}>R {item.price}</Text>
          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Delete item"
            >
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          )}
          {selectable && (
            <View style={styles.selectionIndicator}>
              {selected ? (
                <Ionicons name="checkmark-circle" size={24} color="#34C759" />
              ) : (
                <View style={styles.unselectedCircle} />
              )}
            </View>
          )}
        </View>
      </View>

      {showCourseBadge && (
        <View style={styles.badgeRow}>
          <CourseBadge course={item.course as any} />
        </View>
      )}

      {showDescription && !!item.description && (
        <Text style={styles.description}>{item.description}</Text>
      )}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
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
  badgeRow: {
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  selectionIndicator: {
    marginLeft: 4,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
});