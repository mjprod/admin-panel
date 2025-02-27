// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <AppRouter />
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
