import React from "react";
import { View, StyleSheet, Image, Linking } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Section,
  SectionContent,
} from "react-native-rapi-ui";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="About"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/cool-cat.png")}
        />
        <Section>
          <SectionContent>
            <Text fontWeight="bold">Just a simple app for all cat lovers!</Text>
            <Text></Text>
            <View style={{ alignItems: "center" }}>
              <Text style={{ width: "100%", textAlign: "center" }}>
                version 1.0.0
              </Text>
            </View>
          </SectionContent>
        </Section>
      </View>
      <AntDesign
        style={{ width: "100%", textAlign: "center" }}
        size={75}
        color={isDarkmode ? "white" : "black"}
        name="github"
        onPress={() => Linking.openURL("https://github.com/syfqpie/kat-fact")}
      />
    </Layout>
  );
}
const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    width: 100,
    height: 100,
  },
});
