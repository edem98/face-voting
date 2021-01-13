import "react-native-gesture-handler";
import React from "react";
import App from "./RootApp";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import redux to create the store
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./src/reducers/RootReducer";
// import redux and thunk
// import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import { AsyncStorage } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
);

const persistor = persistStore(store);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      </SafeAreaProvider>
    );
  }
}

export default AppWrapper;
