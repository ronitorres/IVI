//Operações/Lógicas do Banco de Dados

import { useSQLiteContext } from "expo-sqlite"

export type VisitanteDatabase = {
  id: number,
  nome: string,
  telefone: number,
  observacao: string

}

export default function useVisitanteDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<VisitanteDatabase, "id">) {

    const statement = await database.prepareAsync(
      "INSERT INTO visitante (nome, telefone, observacao) VALUES ($nome, $telefone, $observacao)"
    )

    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
        $telefone: data.telefone,
        $observacao: data.observacao
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }

    } catch (error) {
      throw (error)
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function buscarPorNome(nome: string) {
    try {
      const query = "SELECT nome, telefone, observacao FROM visitante WHERE nome LIKE ?"
      const response = await database.getAllAsync<VisitanteDatabase>(query, `%${nome}%`)
      return response;

    } catch (error) {
      throw error
    }
  }

  async function limparVisitantes(nome: string) {
    try {
      const query = "DELETE from visitante"
      const response = await database.getAllAsync<VisitanteDatabase>(query, `%${nome}%`)
      return response;
    } catch (error) {
      throw error;
    }

  }

  return { create, buscarPorNome, limparVisitantes }
}
