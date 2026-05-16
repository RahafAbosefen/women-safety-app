import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

export default function SOSButton({ onPress, disabled = false }: Props) {
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    const animation1 = createPulse(pulse1, 0);
    const animation2 = createPulse(pulse2, 900);

    animation1.start();
    animation2.start();

    return () => {
      animation1.stop();
      animation2.stop();
    };
  }, [pulse1, pulse2]);

  const handlePressIn = () => {
    Animated.spring(pressScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const pulseStyle = (anim: Animated.Value) => ({
    transform: [
      {
        scale: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.9],
        }),
      },
    ],
    opacity: anim.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0.35, 0.2, 0],
    }),
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.pulseRing, pulseStyle(pulse1)]} />
      <Animated.View style={[styles.pulseRing, pulseStyle(pulse2)]} />

      <Animated.View
        style={[
          styles.buttonShadowWrapper,
          { transform: [{ scale: pressScale }] },
        ]}
      >
        <Pressable
          disabled={disabled}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
          ]}
        >
          <View style={styles.innerCircle}>
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.helpText}>EMERGENCY</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 230,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  pulseRing: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(217, 83, 79, 0.22)",
  },

  buttonShadowWrapper: {
    shadowColor: "#C0392B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 12,
  },

  button: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#D9534F",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#F6C7C5",
  },

  buttonPressed: {
    opacity: 0.92,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  innerCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#C8433F",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.18)",
  },

  sosText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
  },

  helpText: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#FFEAEA",
    letterSpacing: 1.2,
  },
});