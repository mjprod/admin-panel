// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"

function App() {
  return (
    <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
    </AuthProvider>
  );
}

export default App;
