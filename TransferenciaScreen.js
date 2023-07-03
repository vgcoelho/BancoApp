import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const TransferenciaScreen = ({ handleTransferencia }) => {
const [contaDestino, setContaDestino] = useState("");
const [valorTransferencia, setValorTransferencia] = useState("");

const handleTransferir = () => {
if (contaDestino === "" || valorTransferencia === "") {
Alert.alert("Erro", "Por favor, informe a conta de destino e o valor da transferência.");
return;
}

const valor = parseFloat(valorTransferencia.replace(",", "."));

if (isNaN(valor)) {
Alert.alert("Erro", "Valor de transferência inválido.");
return;
}

if (valor < 0) {
Alert.alert("Erro", "Não é permitido informar um valor de transferência negativo.");
return;
}

handleTransferencia(contaDestino, valor);
setContaDestino("");
setValorTransferencia("");
};

return (
<View style={styles.container}>
<Text style={styles.label}>Conta de Destino:</Text>
<TextInput
style={styles.input}
placeholder="Informe a conta"
keyboardType="numeric"
value={contaDestino}
onChangeText={text => setContaDestino(text)}
/>
<Text style={styles.label}>Valor da Transferência:</Text>
<TextInput
style={styles.input}
placeholder="Informe o valor"
keyboardType="numeric"
value={valorTransferencia}
onChangeText={text => setValorTransferencia(text)}
/>
<TouchableOpacity style={styles.btnTransferir} onPress={handleTransferir}>
<Text style={styles.btnText}>Transferir</Text>
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
btnTransferir: {
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

export default TransferenciaScreen;