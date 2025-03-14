// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import Loading from "./components/Loading";
import { setupInterceptors } from "./api/axios-config";
import { useLoading } from "./context/LoadingContext";
import { useEffect } from "react";
import { ConversationsProvider } from "./context/ConversationProvider";

setupInterceptors(() => {});

function App() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  return (
    <AuthProvider>
      <Provider store={store}>
        <ConversationsProvider>
          <Router>
            <Loading />
            <AppRouter />
          </Router>
        </ConversationsProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
