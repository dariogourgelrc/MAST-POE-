import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const courses = [
  { id: 'starter', name: 'Starter', icon: 'restaurant-outline', description: 'Entradas e aperitivos' },
  { id: 'main', name: 'Main', icon: 'restaurant', description: 'Pratos principais' },
  { id: 'dessert', name: 'Dessert', icon: 'ice-cream-outline', description: 'Sobremesas e doces' },
];

export default function MenuScreen() {
  const handleCourseSelection = (courseId: string) => {
    router.push(`/chose?course=${courseId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <Text style={styles.subtitle}>Escolha o tipo de prato</Text>
      </View>

      <View style={styles.coursesContainer}>
        {courses.map((course) => (
          <TouchableOpacity 
            key={course.id} 
            style={styles.courseCard}
            onPress={() => handleCourseSelection(course.id)}
          >
            <View style={styles.courseIcon}>
              <Ionicons name={course.icon as any} size={40} color="#007AFF" />
            </View>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <View style={styles.arrowIcon}>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  coursesContainer: {
    padding: 20,
    flex: 1,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
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
  courseIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D1D1F",
    flex: 1,
  },
  courseDescription: {
    fontSize: 14,
    color: "#8E8E93",
    flex: 2,
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});