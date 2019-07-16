import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Gradient from "react-native-css-gradient";
import { interpolate } from "flubber";
import { tween, easing } from "popmotion";
import * as SVG from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { rgba } from "style-value-types";

const { width, height } = Dimensions.get("screen");
const { Path, G, Svg } = SVG;

const TYPES = ["upsad", "sad", "neutral", "smile", "excited"];

const PATHS = {
  upsad:
    "M123.96 141.87C117.9 97.21 104.2 74.77 82.87 74.55C61.54 74.34 45.88 96.49 35.9 141L123.96 141.87Z",
  sad:
    "M83.36 83.04C63.62 83.19 54.13 95.91 54.91 121.2L110.71 121.52C112.22 95.71 103.1 82.89 83.36 83.04Z",
  neutral: "M58.2 94.74L106.01 85.44L107.54 93.31L59.73 102.6L58.2 94.74Z",
  smile:
    "M82.38 121.52C102.12 121.37 111.6 108.65 110.83 83.36L55.02 83.03C53.52 108.84 62.64 121.67 82.38 121.52Z",
  excited:
    "M37.19 74.55C43.26 119.22 56.95 141.66 78.29 141.87C99.62 142.09 115.27 119.94 125.25 75.42L37.19 74.55Z",
  eyes:
    "M129.69 33.89L130.96 34.17L132.2 34.55L133.38 35.03L134.5 35.6L135.57 36.26L136.57 37L137.5 37.82L138.35 38.71L139.13 39.67L139.82 40.69L140.41 41.77L140.91 42.9L141.31 44.07L141.6 45.29L141.78 46.55L141.84 47.84L141.78 49.13L141.6 50.39L141.31 51.61L140.91 52.79L140.41 53.92L139.82 55L139.13 56.02L138.35 56.97L137.5 57.87L136.57 58.68L135.57 59.42L134.5 60.08L133.38 60.65L132.2 61.13L130.96 61.51L129.69 61.79L128.38 61.96L127.03 62.02L125.68 61.96L124.37 61.79L123.09 61.51L121.86 61.13L120.68 60.65L119.56 60.08L118.49 59.42L117.49 58.68L116.56 57.87L115.71 56.97L114.93 56.02L114.24 55L113.65 53.92L113.15 52.79L112.75 51.61L112.46 50.39L112.28 49.13L112.22 47.84L112.28 46.55L112.46 45.29L112.75 44.07L113.15 42.9L113.65 41.77L114.24 40.69L114.93 39.67L115.71 38.71L116.56 37.82L117.49 37L118.49 36.26L119.56 35.6L120.68 35.03L121.86 34.55L123.09 34.17L124.37 33.89L125.68 33.72L127.03 33.66L128.38 33.72L129.69 33.89ZM41.63 33.89L42.91 34.17L44.14 34.55L45.32 35.03L46.44 35.6L47.51 36.26L48.51 37L49.44 37.82L50.29 38.71L51.07 39.67L51.76 40.69L52.35 41.77L52.85 42.9L53.25 44.07L53.54 45.29L53.72 46.55L53.78 47.84L53.72 49.13L53.54 50.39L53.25 51.61L52.85 52.79L52.35 53.92L51.76 55L51.07 56.02L50.29 56.97L49.44 57.87L48.51 58.68L47.51 59.42L46.44 60.08L45.32 60.65L44.14 61.13L42.91 61.51L41.63 61.79L40.32 61.96L38.97 62.02L37.62 61.96L36.31 61.79L35.04 61.51L33.8 61.13L32.62 60.65L31.5 60.08L30.43 59.42L29.43 58.68L28.5 57.87L27.65 56.97L26.87 56.02L26.18 55L25.59 53.92L25.09 52.79L24.69 51.61L24.4 50.39L24.22 49.13L24.16 47.84L24.22 46.55L24.4 45.29L24.69 44.07L25.09 42.9L25.59 41.77L26.18 40.69L26.87 39.67L27.65 38.71L28.5 37.82L29.43 37L30.43 36.26L31.5 35.6L32.62 35.03L33.8 34.55L35.04 34.17L36.31 33.89L37.62 33.72L38.97 33.66L40.32 33.72L41.63 33.89Z"
};

const GRADIENTS = {
  upsad: "linear-gradient(to bottom, rgb(231,97,97), rgb(236,49,49))",
  neutral: "linear-gradient(to bottom, rgb(247,152,48), rgb(231,97,97))",
  smile: "linear-gradient(to bottom, rgb(243,189,67), rgb(203,96,32))",
  sad: "linear-gradient(to bottom, rgb(238,120,77), rgb(187,230,95))",
  excited: "linear-gradient(to bottom, rgb(95,230,118), rgb(46,232,78))"
};

export default class App extends React.Component {
  state = {
    path: PATHS.neutral,
    background: GRADIENTS.neutral,
    type: "neutral",
    index: -1
  };

  interpolatePaths = (type, index) => {
    const interpolator = interpolate(this.state.path, PATHS[type], {
      maxSegmentLength: 2
    });
    tween({
      duration: 400,
      ease: easing.easeInOut,
      from: { i: 0, background: this.state.background },
      to: { i: 1, background: GRADIENTS[type] }
    })
      .pipe(({ i, background }) => ({
        path: interpolator(i),
        background
      }))
      .start(({ path, background }) => {
        this.setState({ path, background, type, index });
      });
  };

  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: this.state.background }]}
      >
        <Svg width={width} height={height / 3} viewBox="0 0 166 166">
          <G>
            <Path d={PATHS["eyes"]} />
            <Path d={this.state.path} />
          </G>
        </Svg>
        <View style={styles.feedBack}>
          {TYPES.map((type, index) => (
            <TouchableOpacity
              key={type}
              onPress={_ => this.interpolatePaths(type, index)}
            >
              <AntDesign
                name={this.state.index >= index ? "star" : "staro"}
                size={26}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  feedBack: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width * 0.8,
    backgroundColor: "rgba(0,0,0,.1)",
    padding: 20,
    borderRadius: 50
  }
});
