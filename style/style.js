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
        backgroundColor: '#FFF1E6', 
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
    },
    homebuttontext: {
        color: '#fdf1f5',
        fontSize: 20,
        
    },

    //RANDOM.JS TYYLIT//
    randombutton: {
        backgroundColor: '#511414',
        color: '#3F3A3C',
        marginTop: 15,
        paddingHorizontal: 35,
        paddingVertical: 20,
        borderRadius: 10,
    }, 
    randombuttonpieni: {
        backgroundColor: '#92736C',
        color: '#3F3A3C',
        margin: 15,
        paddingHorizontal: 35,
        paddingVertical: 20,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    randombuttontext: {
        color: '#fdf1f5',
        fontSize: 20,
        
    },
    randombuttontextpieni: {
        color: '#fdf1f5',
        fontSize: 15,
        textAlign: 'center',
    },
    buttoncontainer: {
        flexDirection: 'row',
        
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
});