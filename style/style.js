import { StyleSheet } from 'react-native'
import Constants from "expo-constants"

export default StyleSheet.create({
    body: {
        backgroundColor: '#FFF1E6',
        fontFamily: 'montserrat',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: '#F1E9DC',
        textAlign: 'center',
        marginTop: Constants.statusBarHeight + 10,
        marginBottom: Constants.statusBarHeight + 5,
    },
    text: {
        color: '#070000',
        fontWeight: 'thin',
        fontSize: 16,
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
        borderRadius: 10,
        shadowColor: '#511414',
        elevation: 5,
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
        color: '#511414',
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
    },
    gradient: { 
        flex: 1, 
    },

    //home.js tyylit//
    homecontainer: {
        alignItems: 'center',
        flex: 1,
    },
    homeimage: {
        width: 400,
        height: 400,
        margin: 0,
    },
    homeheading: {
        fontWeight: '600',
        fontSize: 20,
        color: '#F1E9DC',
    },
    hometext: {
        color: '#F1E9DC',
        fontWeight: 400,
        fontSize: 20,
        textAlign: 'justify',
        marginTop: 15,
        width: 250,
    },
    csr: {
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 30,
    },
    homebutton: {
        backgroundColor: '#2e0002',
        color: '#3F3A3C',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 10,
        shadowColor: '#511414',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    homebuttontext: {
        color: '#fdf1f5',
        fontSize: 20,
        
    },
    card: {
        backgroundColor: '#ffff',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        elevation: 10,
    },
    cardImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    cardTitle: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
     //RANDOM.JS TYYLIT//
     randContainer: {
            flex: 1,
     },
     randomcontainer: {
        padding: 20,
        alignContent: 'center',
        alignItems: 'center', 
    },
    randombutton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: '#FFF1E6',
        borderWidth: 2,
        borderColor: '#511414',
        color: '#511414',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '90%',
        marginBottom: 15,
        shadowColor: '#511414',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    randombuttonpieni: {
        backgroundColor: '#FFF1E6',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,
        borderWidth: 2,
        borderColor: '#511414',
        shadowColor: '#511414',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    randombuttontext: {
        color: '#511414',
        fontSize: 20,
    },
    randombuttontextpieni: {
        color: '#511414',
        fontSize: 15,
        textAlign: 'center',
    },
    ingredientContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
});