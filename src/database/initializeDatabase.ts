import { type SQLiteAnyDatabase } from "expo-sqlite/build/NativeStatement";

export async function initializeDatabase(database: SQLiteAnyDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS visitante(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone INTEGER NOT NULL,
    observacao TEXT
    );

  `)
}
