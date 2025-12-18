import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function TodoListScreen({ navigation }) {
  const todos = useSelector((state) => state.todos.list);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TodoDetails", {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                borderBottomWidth: 1,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
