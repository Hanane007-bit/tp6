import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { loadTodos, addTodoOffline, updateTodoOffline, deleteTodoOffline } from "../services/database";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Charger ou rafraîchir les todos
  const refreshTodos = async () => {
    const data = await loadTodos();
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  // Ajouter ou mettre à jour
  const handleAddOrUpdate = async () => {
    if (!title.trim()) return;

    if (editingId) {
      await updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      await addTodoOffline(title);
    }

    setTitle("");
    refreshTodos();
  };

  // Supprimer
  const handleDelete = async (id) => {
    await deleteTodoOffline(id);
    refreshTodos();
  };

  return (
    <View style={[styles.container, theme === "dark" ? styles.dark : styles.light]}>
      {/* Toggle Theme */}
      <Button
        title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
        onPress={toggleTheme}
      />

      {/* Ajouter / Mettre à jour */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tâche offline"
          value={title}
          onChangeText={setTitle}
          style={styles.textInput}
        />
        <Button
          title={editingId ? "✏ Mettre à jour" : "➕ Ajouter hors ligne"}
          onPress={handleAddOrUpdate}
        />
      </View>

      {/* Liste des tâches */}
      {todos.length === 0 ? (
        <Text style={styles.emptyText}>Aucune tâche disponible hors ligne</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.title}</Text>
              <View style={styles.buttons}>
                <Button
                  title="✏"
                  onPress={() => {
                    setTitle(item.title);
                    setEditingId(item.id);
                  }}
                />
                <Button
                  title="🗑"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#121212",
  },
  inputContainer: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
