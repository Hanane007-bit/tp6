import * as SQLite from "expo-sqlite";

// Ouvre la DB synchronisée
export const db = SQLite.openDatabaseSync("todos.db");

// Initialise la table
export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      title TEXT
    );
  `);
};

// Ajouter une tâche
export const addTodoOffline = (title) => {
  db.runSync(
    "INSERT INTO todos (id, title) VALUES (?, ?)",
    [Date.now(), title]
  );
};

// Mettre à jour une tâche
export const updateTodoOffline = (id, title) => {
  db.runSync(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, id]
  );
};

// Supprimer une tâche
export const deleteTodoOffline = (id) => {
  db.runSync(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );
};

// Charger toutes les tâches
export const loadTodos = () => {
  return db.getAllSync("SELECT * FROM todos");
};
