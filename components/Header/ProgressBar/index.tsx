import { createHomeStyles } from "@/assets/styles/home.style";
import { ColorScheme } from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  colors: ColorScheme;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, colors }) => {
  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.progressContainer}>
      <View style={homeStyles.progressBarContainer}>
        <View style={homeStyles.progressBar}>
          <View
            style={[
              homeStyles.progressFill,
              { width: `${progress}%`, backgroundColor: colors.success },
            ]}
          />
        </View>
        <Text style={homeStyles.progressText}>{progress.toFixed(0)}%</Text>
      </View>
    </View>
  );
};

export default ProgressBar;
