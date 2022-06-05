import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
// import { FactsContext } from "../../store/facts-context";
// import { fetchFacts } from "../../util/http";
import { getImage } from "../../assets/images";
import {
  Layout,
  TopNav,
  Text,
  Button,
  useTheme,
  themeColor,
  SectionContent,
  Section,
} from "react-native-rapi-ui";
import { Ionicons, Feather } from "@expo/vector-icons";
export default function ({ navigation }) {
  const minImageIndex = 1;
  const maxImageIndex = 40;
  // Image is updated based on this value
  const [target, setTarget] = useState("default");
  // Default image path
  const [imagePath, setImagePath] = useState({ path: getImage("default") });
  const [fact, setFact] = useState("");

  const [isFetching, setIsFetching] = useState(true);

  const { isDarkmode, setTheme } = useTheme();

  const update = () => {
    setIsFetching(true);
    axios.get("https://catfact.ninja/fact").then((res) => {
      setFact(res.data);
      setIsFetching(false);
    });
  };
  useEffect(update, []);

  const updateImage = () => {
    imageChangeHandler();
    setImagePath({
      path: getImage(target),
    });
  };
  useEffect(updateImage, []);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  function imageChangeHandler() {
    setTarget(() => {
      return randomIntFromInterval(minImageIndex, maxImageIndex);
    });
  }

  return (
    <Layout>
      <TopNav
        middleContent="Home"
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
        leftContent={
          <Feather
            name="chevron-right"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.navigate("SecondScreen")}
      />

      <View style={styles.container}>
        <Section>
          <SectionContent style={styles.CircleShapeView}>
            <Image source={imagePath.path} style={styles.logo} />
            <Text></Text>
            <Text fontWeight="bold">{fact.fact}</Text>
            <Button
              style={{ marginTop: 10, color: "#FFFFFF" }}
              text={
                isFetching ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  "More facts ! "
                )
              }
              status="dark"
              onPress={() => {
                updateImage();
                update();
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  CircleShapeView: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
