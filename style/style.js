import { StyleSheet } from 'react-native'
import Constants from "expo-constants"

export default StyleSheet.create({
    container: {
    flex: 1,  
    alignItems: 'center', 
    backgroundColor: '#fff',
},
    header: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: Constants.statusBarHeight + 10,
    marginBottom: Constants.statusBarHeight + 5,
},
    text: {
    color: '#070000',
    fontWeight: 'thin',
    fontSize: 20,
    textAlign: 'center',
},
    textinput: {
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: 250
},
    button: {
    margin: 10,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
},
});