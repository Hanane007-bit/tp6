import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "./screens/TodoListScreen";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ title: "Liste des tâches" }}
          />
          <Stack.Screen
            name="TodoDetails"
            component={TodoDetailsScreen}
            options={{ title: "Détails" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
