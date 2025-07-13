import { useRouter } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface AuthHeaderProps {
  title: string;
  onClick?: () => void;
  showBackButton?: boolean;
  showUserIcon?: boolean;
}

export function AuthHeader({
  title,
  onClick,
  showBackButton = true,
  showUserIcon = false,
}: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  const handleUserPress = () => {
    if (onClick) {
      onClick();
    }
    // Add user menu logic here
    console.log("User icon pressed");
  };

  const UserIcon = () => (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <Path
        d="M17.3333 7.56413C17.3333 8.6692 16.8943 9.729 16.1129 10.5104C15.3315 11.2918 14.2717 11.7308 13.1667 11.7308C12.0616 11.7308 11.0018 11.2918 10.2204 10.5104C9.43899 9.729 9 8.6692 9 7.56413C9 6.45906 9.43899 5.39925 10.2204 4.61785C11.0018 3.83645 12.0616 3.39746 13.1667 3.39746C14.2717 3.39746 15.3315 3.83645 16.1129 4.61785C16.8943 5.39925 17.3333 6.45906 17.3333 7.56413ZM13.1667 14.8558C11.2328 14.8558 9.37813 15.624 8.01068 16.9915C6.64323 18.3589 5.875 20.2136 5.875 22.1475H20.4583C20.4583 20.2136 19.6901 18.3589 18.3227 16.9915C16.9552 15.624 15.1005 14.8558 13.1667 14.8558Z"
        stroke="black"
        strokeOpacity="0.6"
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {/* Left section - empty space */}
        <View style={styles.leftSection}></View>

        {/* Center section - title */}
        <View style={styles.centerSection}>
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            {title}
          </Text>
        </View>

        {/* Right section - back button or user button */}
        <View style={styles.rightSection}>
          {showBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <MoveLeft size={25} color="#333" />
            </TouchableOpacity>
          )}
          {!showBackButton && (
            <TouchableOpacity
              style={styles.userButton}
              onPress={handleUserPress}
            >
              <UserIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 36,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "libre-extrabold",
    textAlign: "center",
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  userButton: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
