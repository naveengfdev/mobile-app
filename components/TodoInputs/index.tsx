import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TodoInputs = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [input, setInput] = useState("");
  const addTodo = useMutation(api.todos.createTodo);

  const handleAddTodo = async () => {
    if (input.trim()) {
      try {
        await addTodo({ title: input });
        setInput("");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add todo", [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={[homeStyles.input, input.trim() && homeStyles.inputFocused]}
          placeholder="Add a new task"
          value={input}
          onChangeText={setInput}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          disabled={!input.trim()}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              !input.trim() ? colors.gradients.muted : colors.gradients.primary
            }
            style={[
              homeStyles.addButton,
              !input.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add-outline" color={colors.text} size={24} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TodoInputs;
