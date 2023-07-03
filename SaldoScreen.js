import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SaldoScreen = () => {
const nome = "Matheus e Vanessa"; 
const saldo = 1500.35; 

return (
<View style={styles.container}>
<Text style={styles.text}>Saldo de {nome}: R$ {saldo.toFixed(2)}</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},
text: {
fontSize: 20,
fontWeight: "bold",
},
});

export default SaldoScreen;
