import { createHomeStyles } from "@/assets/styles/home.style";
import EmptyList from "@/components/EmptyList";
import Header from "@/components/Header";
import TodoInputs from "@/components/TodoInputs";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type TodoType = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to toggle todo", [{ text: "OK" }]);
    } finally {
    }
  };

  const renderTodoItem = ({ item }: { item: TodoType }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.8}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.completed
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.completed ? colors.success : colors.border,
                },
              ]}
            >
              {item.completed && (
                <Ionicons name="checkmark" color="#fff" size={24} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.completed && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.5,
                },
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity style={homeStyles.todoActions}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil-outline" color="#fff" size={14} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash-outline" color="#fff" size={14} />
                </LinearGradient>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.safeArea}
    >
      <StatusBar
        barStyle={colors.statusBarStyle as "light-content" | "dark-content"}
      />
      <SafeAreaView style={homeStyles.safeArea}>
        <View style={homeStyles.container}>
          <Header />
          <TodoInputs />

          <FlatList
            data={todos ?? []}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id.toString()}
            style={homeStyles.todoList}
            contentContainerStyle={homeStyles.todoListContent}
            ListEmptyComponent={<EmptyList />}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ref
// const creatStyle = (colors: ColorScheme) => {
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.bg,
//       gap: 10,
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     text: {
//       color: colors.text,
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//   });
//   return styles;
// };
