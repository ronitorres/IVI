import Input from '@/components/input';
import { useEffect, useState } from 'react';
import { Text, View, Button, Alert, Image, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import useVisitanteDatabase from '@/database/useVisitanteDatabase';
import { VisitanteDatabase } from '@/database/useVisitanteDatabase';

const logoImage = require('../image/logoMVN2.jpeg'); // Ajuste o caminho conforme necessário

export default function Index() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacao, setObservacao] = useState('');
  const [visitante, setVisitante] = useState<VisitanteDatabase[]>([]);

  const visitanteDatabase = useVisitanteDatabase();

  async function create() {
    try {
      if (isNaN(Number(telefone))) {
        return Alert.alert('Telefone', 'Informar apenas números');
      }

      const response = await visitanteDatabase.create({
        nome,
        telefone: Number(telefone),
        observacao,
      });

      Alert.alert('Visitante cadastrado com o ID: ' + response.insertedRowId);

      setNome('');
      setTelefone('');
      setObservacao('');

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // listar()
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.innerContainer}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.title}>Ivi</Text>
        <Text style={styles.subtitle}>Seja bem-vindo!</Text>
        <Input placeholder='Nome' onChangeText={setNome} value={nome} style={styles.input} />
        <Input placeholder='Telefone' onChangeText={setTelefone} value={telefone} keyboardType='phone-pad' style={styles.input} />
        <Input placeholder='Observação' onChangeText={setObservacao} value={observacao} style={styles.input} />
        <Button title='Salvar' onPress={create} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logo: {
    marginBottom: 20,
    width: 150, // Ajuste conforme necessário
    height: 150, // Ajuste conforme necessário
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16, // Espaço entre os campos
    borderWidth: 1, // Borda do campo
    borderColor: '#ccc', // Cor da borda
    borderRadius: 5, // Bordas arredondadas
    width: '100%', // Largura total
    padding: 10, // Espaço interno
  },
});
