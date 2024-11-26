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
    image: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    ingredient: {
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
    },
    measure: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        color: 'red',
    },
    label: {
        fontSize: 20,
        margin: 5,
    },
    back: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: Constants.statusBarHeight + 20,
        marginBottom: Constants.statusBarHeight + 5,
        marginLeft: Constants.statusBarHeight + 1,
    },
    radioButtonText: {
        textAlignVertical: "center"
    },
    radioButtonRow: {
        flexDirection: "row"
    }
});