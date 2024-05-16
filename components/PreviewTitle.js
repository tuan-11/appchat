import { Text, StyleSheet } from "react-native";
import { useAppContext } from "../context/AppContext";
import {getPreviewName} from "../hooks/useChannel"
export const CustomPreviewTitle = ({ channel }) => {
  return <Text style={styles.channelTitle}>{getPreviewName(channel)}</Text>;
};

const styles = StyleSheet.create({
  channelTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
