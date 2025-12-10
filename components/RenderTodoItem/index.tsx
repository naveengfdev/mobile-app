import { createHomeStyles } from "@/assets/styles/home.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Doc, Id } from "@/convex/_generated/dataModel";

const RenderTodoItem = ({ item, handleToggleTodo }: { item: Doc<"todos">, handleToggleTodo: (id: Id<"todos">) => void }) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

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
              item.completed ? colors.gradients.success : colors.gradients.muted
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
