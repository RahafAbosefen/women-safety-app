import { View, StyleSheet, Text, Pressable } from 'react-native';
import { MapColors } from '@/constants/theme';

type ReportButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

const ReportButton = ({ onPress, disabled = false }: ReportButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.disabledButton,
          pressed && !disabled && styles.pressedButton,
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>Report from this location</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: MapColors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressedButton: {
    opacity: 0.75,
  },
  text: {
    color: MapColors.sheetBackground,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportButton;