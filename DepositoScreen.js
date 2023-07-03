import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const DepositoScreen = ({ handleDeposito }) => {
const [valorDeposito, setValorDeposito] = useState("");

const handleDepositar = () => {
if (valorDeposito === "") {
Alert.alert("Erro", "Por favor, informe o valor do depósito.");
return;
}

const valor = parseFloat(valorDeposito.replace(",", "."));

if (isNaN(valor)) {
Alert.alert("Erro", "Valor de depósito inválido.");
return;
}

if (valor < 0) {
Alert.alert("Erro", "Não é permitido informar um valor de depósito negativo.");
return;
}

handleDeposito(valor);
setValorDeposito("");
};

return (
<View style={styles.container}>
<Text style={styles.label}>Valor do Depósito:</Text>
<TextInput
style={styles.input}
placeholder="Informe o valor"
keyboardType="numeric"
value={valorDeposito}
onChangeText={text => setValorDeposito(text)}
/>
<TouchableOpacity style={styles.btnDepositar} onPress={handleDepositar}>
<Text style={styles.btnText}>Depositar</Text>
</TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
backgroundColor: "#191919",
},
label: {
color: "#fff",
fontSize: 18,
marginBottom: 10,
},
input: {
backgroundColor: "#fff",
width: "90%",
marginBottom: 20,
color: "#222",
fontSize: 17,
borderRadius: 7,
padding: 10,
},
btnDepositar: {
backgroundColor: "#35aaff",
width: "60%",
height: 45,
alignItems: "center",
justifyContent: "center",
borderRadius: 7,
},
btnText: {
color: "#fff",
fontSize: 18,
},
});

export default DepositoScreen;