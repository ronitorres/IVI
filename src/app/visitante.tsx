import { useEffect, useState } from 'react';
import { Text, View, FlatList, Button, Alert } from 'react-native';
import useVisitanteDatabase, { VisitanteDatabase } from '@/database/useVisitanteDatabase';
import { Visitante } from '@/components/visitante';

import Input from '@/components/input'

import *as Print from 'expo-print'

export default function ListarVisitante() {

  const [busca, setBusca] = useState('');
  const [deleta, setDeleta] = useState('');
  const [visitante, setVisitante] = useState<VisitanteDatabase[]>([]);
  const visitanteDatabase = useVisitanteDatabase();


  async function listar() {
    try {
      const response = await visitanteDatabase.buscarPorNome(busca);
      setVisitante(response);
    } catch (error) {
      console.error(error);
    }
  }


  async function exportarParaPDF() {
    const htmlContent = `
      <h1>Lista de Visitantes</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid black; padding: 8px;">Nome</th>
          <th style="border: 1px solid black; padding: 8px;">Telefone</th>
          <th style="border: 1px solid black; padding: 8px;">Observação</th>
        </tr>
        ${visitante.map(v => `
          <tr>
            <td style="border: 1px solid black; padding: 8px;">${v.nome}</td>
            <td style="border: 1px solid black; padding: 8px;">${v.telefone}</td>
            <td style="border: 1px solid black; padding: 8px;">${v.observacao}</td>
          </tr>
        `).join('')}
      </table>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent })
    console.log('PDF Gerado: ', uri)

    await Print.printAsync({ uri });

  }


  async function limparVisitantes() {
    try {
      await visitanteDatabase.limparVisitantes(deleta); // Chame um método para limpar os visitantes
      console.log("Todos os visitantes foram removidos.");
      listar(); // Atualize a lista após limpar
    } catch (error) {
      console.error("Erro ao limpar visitantes: ", error);
    }
  }

  const handleRefresh = () => {
    listar();
  }


  useEffect(() => {
    listar();
  }, [busca]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
      <Text style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: 30
      }}>
        Lista de Visitantes
      </Text>

      <Input placeholder='Pesquisar Visitante' onChangeText={setBusca} />
      <Button title="Atualizar" onPress={handleRefresh} />
      <FlatList

        data={visitante}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Visitante data={item} />}
        contentContainerStyle={{ gap: 16 }}
      />
      <Button title="Exportar para PDF" onPress={exportarParaPDF} />

      <Button title="Limpar Visitantes" onPress={limparVisitantes} />


    </View>
  );
}
