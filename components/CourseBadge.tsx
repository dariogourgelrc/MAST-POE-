import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Course = 'Starter' | 'Main' | 'Dessert';

interface CourseBadgeProps {
  course: Course;
  showIcon?: boolean;
}

const iconForCourse = (course: Course) => {
  switch (course) {
    case 'Starter':
      return 'restaurant-outline';
    case 'Main':
      return 'restaurant';
    case 'Dessert':
      return 'ice-cream-outline';
    default:
      return 'restaurant';
  }
};

export default function CourseBadge({ course, showIcon = false }: CourseBadgeProps) {
  return (
    <View style={styles.badge}>
      {showIcon && (
        <Ionicons name={iconForCourse(course) as any} size={16} color="#1976D2" />
      )}
      <Text style={styles.text}>{course}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#E3F2FD',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
  },
});