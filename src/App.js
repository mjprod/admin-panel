// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import Loading from "./components/loading/Loading";
import { setupInterceptors } from "./api/axios-config";
import { useLoading } from "./context/LoadingContext";
import { useEffect } from "react";

// setupInterceptors(() => {});

function App() {
  const { setLoading } = useLoading();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  return (
    <AuthProvider>
      <Provider store={store}>
          <Router>
            <Loading />
            <AppRouter />
          </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
