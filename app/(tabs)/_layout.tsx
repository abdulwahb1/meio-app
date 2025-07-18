import { GradientMicButton } from "@/components/GradientMicButton";
import { useRouter } from "expo-router";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Svg, { Path } from "react-native-svg";

// Import your screen components
import CommunityScreen from "./community";
import JourneyScreen from "./journey";
import SpeakWithMeio1 from "./speak-with-meio-1";

export default function TabLayout() {
  const router = useRouter();

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let label = "";

    switch (routeName) {
      case "journey":
        label = "Journey";
        break;
      case "community":
        label = "Community";
        break;
    }

    const isActive = routeName === selectedTab;
    const iconColor = isActive ? "#DF97ED" : "#fff";
    const textColor = isActive ? "#DF97ED" : "#fff";

    const renderSvgIcon = () => {
      if (routeName === "journey") {
        return (
          <Svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <Path
              d="M17.2083 17.0417C17.0142 17.2232 16.9255 17.4849 16.9709 17.7406L17.5796 21.1359C17.703 21.8247 16.9498 22.3501 16.3053 22.0255L13.1154 20.4196C12.8759 20.2989 12.5911 20.2989 12.3516 20.4196L9.16365 22.0235C8.51701 22.3491 7.7628 21.8226 7.88728 21.1328L8.49495 17.7396C8.54136 17.4829 8.45172 17.2222 8.25762 17.0406L5.59825 14.5594C5.10984 14.1039 5.37874 13.3076 6.05281 13.2142L9.73127 12.7029C9.99922 12.6654 10.2301 12.5041 10.3504 12.2718L11.9433 9.18088C12.2661 8.55396 13.1987 8.55396 13.5225 9.18088L15.1154 12.2718C15.2357 12.5041 15.4666 12.6654 15.7346 12.7029L19.413 13.2142C20.0871 13.3086 20.3572 14.1039 19.8677 14.5594L17.2083 17.0417ZM12.7324 6.65497C13.1691 6.65497 13.5236 6.31413 13.5236 5.89416V3.86531C13.5236 3.44534 13.1691 3.10449 12.7324 3.10449C12.2957 3.10449 11.9412 3.44534 11.9412 3.86531V5.89416C11.9412 6.31413 12.2957 6.65497 12.7324 6.65497ZM19.0617 10.7127C19.4985 10.7127 19.8529 10.3718 19.8529 9.95185V3.86531C19.8529 3.44534 19.4985 3.10449 19.0617 3.10449C18.625 3.10449 18.2706 3.44534 18.2706 3.86531V9.95185C18.2706 10.3718 18.625 10.7127 19.0617 10.7127ZM6.40307 10.7127C6.83979 10.7127 7.19424 10.3718 7.19424 9.95185V3.86531C7.19424 3.44534 6.83979 3.10449 6.40307 3.10449C5.96635 3.10449 5.6119 3.44534 5.6119 3.86531V9.95185C5.6119 10.3718 5.96635 10.7127 6.40307 10.7127Z"
              fill={iconColor}
            />
          </Svg>
        );
      } else if (routeName === "community") {
        return (
          <Svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <Path
              d="M19.9712 19.437C19.9712 21.4983 18.7782 22.6324 16.6135 22.6324H9.08794C6.92331 22.6324 5.73025 21.4973 5.73025 19.437C5.73025 17.116 7.10156 14.4055 10.9677 14.4055H14.7327C18.5999 14.4045 19.9712 17.116 19.9712 19.437ZM12.8592 12.5004C14.9078 12.5004 16.5735 10.9047 16.5735 8.94381C16.5735 6.98191 14.9068 5.38726 12.8592 5.38726C10.8117 5.38726 9.14601 6.98293 9.14601 8.94381C9.14601 10.9047 10.8106 12.5004 12.8592 12.5004ZM20.0135 9.88121H18.3151C18.1674 9.88121 18.0408 9.98263 18.0092 10.1145C17.7771 11.0782 17.2496 11.9404 16.5217 12.5998C16.3424 12.7621 16.4479 13.0461 16.6906 13.107C18.5577 13.5331 19.8552 14.5881 20.6253 15.9271C20.678 16.0387 20.7835 16.1097 20.9207 16.1097H21.3636C23.0198 16.1097 23.9271 15.2373 23.9271 13.6548C23.9271 11.9202 22.9039 9.88121 20.0135 9.88121ZM18.6632 3.35841C17.6104 3.35841 16.6915 3.91326 16.2095 4.73393C16.1704 4.80088 16.1725 4.87496 16.1873 4.93887C16.2031 5.00582 16.2338 5.0414 16.2992 5.09415C17.332 5.93105 18.0208 7.14326 18.1337 8.51374C18.14 8.59084 18.1674 8.63851 18.216 8.68822C18.2645 8.73793 18.3372 8.76827 18.4332 8.77639C18.5081 8.78247 18.5851 8.78654 18.6632 8.78654C20.2139 8.78654 21.4798 7.5693 21.4798 6.06796C21.4798 4.57574 20.2139 3.35841 18.6632 3.35841ZM1.77441 13.6548C1.77441 15.2373 2.68167 16.1097 4.33785 16.1097H4.78082C4.91796 16.1097 5.02348 16.0387 5.07622 15.9271C5.84629 14.5881 7.14378 13.5331 9.01093 13.107C9.25356 13.0461 9.35908 12.7621 9.17975 12.5998C8.45188 11.9404 7.9244 11.0782 7.69232 10.1145C7.66068 9.98263 7.53405 9.88121 7.38636 9.88121H5.68801C2.79761 9.88121 1.77441 11.9202 1.77441 13.6548ZM4.2217 6.06697C4.2217 7.56831 5.48761 8.78555 7.0383 8.78555C7.11636 8.78555 7.19338 8.78148 7.26828 8.7754C7.36533 8.76728 7.43699 8.73694 7.48552 8.68723C7.53404 8.63752 7.56147 8.58985 7.5678 8.51275C7.68067 7.14227 8.36953 5.92994 9.40227 5.09304C9.46662 5.04029 9.49835 5.00483 9.51417 4.93788C9.52894 4.87397 9.53105 4.8009 9.49202 4.73294C9.00888 3.91227 8.09108 3.35742 7.0383 3.35742C5.48761 3.35844 4.2217 4.57576 4.2217 6.06697Z"
              fill={iconColor}
            />
          </Svg>
        );
      }
      return null;
    };

    return (
      <View style={styles.tabItem}>
        {renderSvgIcon()}
        <Text style={[styles.tabLabel, { color: textColor }]}>{label}</Text>
      </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    console.log("Tab pressed:", routeName, "Current tab:", selectedTab);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("Navigating to:", routeName);
          navigate(routeName);
        }}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={70}
      circleWidth={90}
      bgColor="black"
      initialRouteName="journey"
      borderTopLeftRight
      renderCircle={({
        selectedTab,
        navigate,
      }: {
        selectedTab: string;
        navigate: any;
      }) => (
        <Animated.View style={styles.btnCircleUp}>
          <GradientMicButton
            size={120}
            onPress={() => {
              console.log("Mic button pressed");
              navigate("speak-with-meio-3");
            }}
          />
        </Animated.View>
      )}
      tabBar={renderTabBar}
      width={undefined}
      borderColor="black"
      borderWidth={0}
      circlePosition="CENTER"
      screenListeners={undefined}
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="initialRoute"
      id="main-navigator"
      defaultScreenOptions={undefined}
    >
      <CurvedBottomBarExpo.Screen
        name="journey"
        position="LEFT"
        component={() => <JourneyScreen />}
      />
      <CurvedBottomBarExpo.Screen
        name="community"
        position="RIGHT"
        component={() => <CommunityScreen />}
      />
      <CurvedBottomBarExpo.Screen
        name="speak-with-meio-1"
        position="CENTER"
        component={() => <SpeakWithMeio1 />}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomBar: {},
  shadow: {},
  btnCircleUp: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
  },
});
