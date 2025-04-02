// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import Loading from "./components/loading/Loading";
import { setupInterceptors } from "./api/axios-config";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

function App() {

  const dispatch = useAppDispatch()
  
  useEffect(() => {
    setupInterceptors(); 
  }, [dispatch]);

  return (
      <Router>
        <Loading />
        <AppRouter />
      </Router>
  );
}

export default App;
