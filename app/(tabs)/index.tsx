import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleTheme, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

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
          <TouchableOpacity onPress={toggleTheme}>
            <Text>Toggle Dark Mode</Text>
          </TouchableOpacity>
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
