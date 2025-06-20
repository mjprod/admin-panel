// App.js
import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupInterceptors } from "./api/axios-config";
import "./App.css";
import AppRouter from "./AppRouter.tsx";
import Loading from "./components/loading/Loading";
import { AuthProvider } from "./context/AuthContext.tsx";
import { useLoading } from "./context/LoadingContext";
import store from "./store/store";

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
