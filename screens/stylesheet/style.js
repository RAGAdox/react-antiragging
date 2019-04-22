import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#ffffff",
    //alignItems: "center",
    padding: "10%"
  },
  scroller: {
    backgroundColor: "#ffffff",
    //alignItems: "center",
    paddingBottom: "20%",
    margin: 10,
  },
  invalid: {
    backgroundColor: '#ff0000'
  },
  text: {
    justifyContent: "center",
  },
  bar: {
    marginTop: 24,
    backgroundColor: "#0c0c0c",

  },
  card: {
    backgroundColor: '#f0f0f0',
    borderColor: '#fcfcfc',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 10,
    padding: 10
  },
  textborder: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#010101',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    padding: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 3
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#010101'
  },
  input: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    alignSelf: "stretch",
    margin: 5,
    padding: 3
  },
  forms: {
    //flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    alignSelf: "stretch"
  },
  lable: {
    margin: 5,
    justifyContent: "flex-start",
    fontWeight: "bold"
  }
});
module.exports = styles;
