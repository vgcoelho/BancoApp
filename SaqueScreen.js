import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert } from "react-native";

export default function SaqueScreen({ route }) {
const [valor, setValor] = useState("");
const saldoAtual = route.params.saldoAtual;

const handleSaque = () => {
const valorSaque = parseFloat(valor);

if (valorSaque > saldoAtual) {
Alert.alert("Erro", "Saldo insuficiente para realizar o saque.");
return;
}

const novoSaldo = saldoAtual - valorSaque;
// Realizar outras ações necessárias com o novo saldo

Alert.alert("Sucesso", `Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso.`);
};

return (
<View>
<TextInput
style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
placeholder="Valor do saque"
keyboardType="numeric"
value={valor}
onChangeText={text => setValor(text)}
/>
<TouchableOpacity
style={{ backgroundColor: "blue", padding: 10, alignItems: "center", borderRadius: 5 }}
onPress={handleSaque}
>
<Text style={{ color: "white" }}>Realizar Saque</Text>
</TouchableOpacity>
</View>
);
}