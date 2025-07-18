import React, { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface HummingAnimationProps {
  isVisible: boolean;
}

export function HummingAnimation({ isVisible }: HummingAnimationProps) {
  const scaleAnim1 = React.useRef(new Animated.Value(1)).current;
  const scaleAnim2 = React.useRef(new Animated.Value(1)).current;
  const scaleAnim3 = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Fade in the animation
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Create pulsing animation for each circle
      const createPulseAnimation = (
        animValue: Animated.Value,
        delay: number
      ) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(animValue, {
              toValue: 1.3,
              duration: 800,
              delay,
              useNativeDriver: true,
            }),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
      };

      // Start animations with different delays for wave effect
      createPulseAnimation(scaleAnim1, 0).start();
      createPulseAnimation(scaleAnim2, 200).start();
      createPulseAnimation(scaleAnim3, 400).start();
    } else {
      // Fade out the animation
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, scaleAnim1, scaleAnim2, scaleAnim3, opacityAnim]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
      <View style={styles.waveContainer}>
        <Animated.View
          style={[
            styles.wave,
            styles.wave1,
            { transform: [{ scale: scaleAnim1 }] },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave2,
            { transform: [{ scale: scaleAnim2 }] },
          ]}
        />
        <Animated.View
          style={[
            styles.wave,
            styles.wave3,
            { transform: [{ scale: scaleAnim3 }] },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  waveContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  wave: {
    position: "absolute",
    borderRadius: 50,
    borderWidth: 2,
  },
  wave1: {
    width: 60,
    height: 60,
    borderColor: "rgba(223, 151, 237, 0.8)",
  },
  wave2: {
    width: 80,
    height: 80,
    borderColor: "rgba(223, 151, 237, 0.6)",
  },
  wave3: {
    width: 100,
    height: 100,
    borderColor: "rgba(223, 151, 237, 0.4)",
  },
});
