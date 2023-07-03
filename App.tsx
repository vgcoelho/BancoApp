import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated, Text, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SaldoScreen from "./componentes/SaldoScreen";
import SaqueScreen from "./componentes/SaqueScreen";
import DepositoScreen from "./componentes/DepositoScreen";
import TransferenciaScreen from "./componentes/TransferenciaScreen";

const Stack = createStackNavigator();

export default function App() {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [logo] = useState(new Animated.ValueXY({ x: 150, y: 170 }));
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [saldo, setSaldo] = useState(1500.35); 

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 20,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = (navigation) => {
    const matriculasValidas = ["20222017861", "20222017914"];
    const senhasValidas = ["matheus", "vanessa"];

    const index = matriculasValidas.indexOf(matricula.trim());

    if (index !== -1 && senha.trim() === senhasValidas[index]) {
      navigation.navigate("Menu");
    } else {
      Alert.alert("Erro", "Matrícula ou senha incorretos.");
      setSenha(""); 
    }
  };

  const handleLogout = (navigation) => {
    navigation.navigate("Login");
  };

  const handleSaque = (valor) => {
    if (valor > saldo) {
      Alert.alert("Erro", "Saldo insuficiente para realizar o saque.");
      return;
    }

    const novoSaldo = saldo - valor;
    setSaldo(novoSaldo);
    Alert.alert("Sucesso", `Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  };

  const handleDeposito = (valor) => {
    if (valor < 0) {
      Alert.alert("Erro", "Não é permitido informar um valor negativo.");
      return;
    }

    const novoSaldo = saldo + valor;
    setSaldo(novoSaldo);
    Alert.alert("Sucesso", `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
  };

  const handleTransferencia = (valor, contaDestino) => {
    if (valor < 0) {
      Alert.alert("Erro", "Não é permitido informar um valor negativo.");
      return;
    }

    if (valor > saldo) {
      Alert.alert("Erro", "Saldo insuficiente para realizar a transferência.");
      return;
    }

    const contasExistentes = ["20222017861", "20222017914"];
    const contaLogada = "20222017861"; 

    if (!contasExistentes.includes(contaDestino)) {
      Alert.alert("Erro", "A conta informada não existe.");
      return;
    }

    if (contaDestino === contaLogada) {
      Alert.alert("Erro", "Não é permitido transferir para a conta atualmente logada.");
      return;
    }

    const novoSaldo = saldo - valor;
    setSaldo(novoSaldo);
    Alert.alert("Sucesso", `Transferência de R$ ${valor.toFixed(2)} realizada com sucesso.`);
  };

  const handleRelatorio = () => {
    Alert.alert("Relatório", `Nome: Matheus\nSaldo: R$ ${saldo.toFixed(2)}`);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <KeyboardAvoidingView style={styles.background}>
              <Text style={styles.tela}>Desenvolvido por: Matheus (20222017861)</Text>
              <Text style={styles.tela}>Vanessa (20222017914)</Text>
              <Animated.View style={[styles.container, { transform: [{ translateY: offset.y }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Matrícula"
                  autoCorrect={false}
                  onChangeText={(text) => setMatricula(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={senha}
                  onChangeText={(text) => setSenha(text)}
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => handleLogin(props.navigation)}>
                  <Text style={styles.submitText}>Acessar</Text>
                </TouchableOpacity>
              </Animated.View>
            </KeyboardAvoidingView>
          )}
        </Stack.Screen>
        <Stack.Screen name="Menu">
          {(props) => (
            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => props.navigation.navigate("Saldo")}
              >
                <Text style={styles.menuOptionText}>Saldo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => props.navigation.navigate("Saque", { saldoAtual: saldo, handleSaque })}
              >
                <Text style={styles.menuOptionText}>Saque</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => props.navigation.navigate("Deposito", { handleDeposito })}
              >
                <Text style={styles.menuOptionText}>Depósito</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => props.navigation.navigate("Transferencia", { handleTransferencia })}
              >
                <Text style={styles.menuOptionText}>Transferência</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOption} onPress={handleRelatorio}>
                <Text style={styles.menuOptionText}>Relatório</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuOptionDesc} onPress={() => handleLogout(props.navigation)}>
                <Text style={styles.menuOptionText}>Desconectar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Saldo">
          {(props) => <SaldoScreen {...props} saldo={saldo} />}
        </Stack.Screen>
        <Stack.Screen name="Saque">
          {(props) => <SaqueScreen {...props} saldoAtual={saldo} handleSaque={handleSaque} />}
        </Stack.Screen>
        <Stack.Screen name="Deposito">
          {(props) => <DepositoScreen {...props} handleDeposito={handleDeposito} />}
        </Stack.Screen>
        <Stack.Screen name="Transferencia">
          {(props) => <TransferenciaScreen {...props} handleTransferencia={handleTransferencia} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingBottom: 25,
  },
  tela: {
    color: "#35AAFF",
  },
  input: {
    backgroundColor: "#FFF",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  submitText: {
    color: "#FFF",
    fontSize: 18,
  },
  menuContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
  },
  menuTitle: {
    color: "#FFF",
    fontSize: 24,
    marginBottom: 30,
  },
  menuOption: {
    backgroundColor: "#35AAFF",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 10,
  },
  menuOptionDesc: {
    backgroundColor: "#FF4500",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginBottom: 10,
  },
  menuOptionText: {
    color: "#FFF",
    fontSize: 18,
  },
});
